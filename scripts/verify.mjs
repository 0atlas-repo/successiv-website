#!/usr/bin/env node
// Verification for the Successiv site. Run after `npm run build`.
//
// These checks encode the rules in CLAUDE.md and docs/BRIEF.md that a reviewer
// would otherwise have to remember. The client-safety check is the important
// one: it greps the BUILT output, because that is what actually ships.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');

let failures = 0;
const fail = (msg) => { console.error(`  FAIL  ${msg}`); failures++; };
const pass = (msg) => console.log(`  ok    ${msg}`);

if (!existsSync(dist)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const allFiles = walk(dist);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));

// ---------------------------------------------------------------------------
console.log('\n1. Client safety - no real client name or internal slug may ship');
// The terms themselves are NOT stored here. This repository is public, and a
// plaintext list of forbidden client names leaks exactly what the site exists
// to protect: the list is as revealing as the mapping table it guards.
//
// scripts/forbidden-hashes.json holds salted SHA-256 prefixes instead. The built
// output is tokenised, each token and adjacent pair is hashed the same way, and
// the hashes are compared.
//
// Be clear about what this is: obfuscation, not secrecy. The salt is committed,
// so anyone who already suspects a specific name can confirm it by hashing their
// guess. What it does stop is the thing that actually happens - the repo being
// grepped, or indexed, and handing the client list over for free. For real
// secrecy, move the list to a CI secret and inject it at build time.
const { salt, separator, hashes } = JSON.parse(
  readFileSync(join(root, 'scripts/forbidden-hashes.json'), 'utf8')
);
const forbiddenHashes = new Set(hashes);
const digest = (term) =>
  createHash('sha256').update(salt + separator + term).digest('hex').slice(0, 32);

function scanForbidden(text) {
  // Hyphens and underscores stay inside tokens so slugs survive tokenising.
  const tokens = text.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g) || [];
  const hits = new Set();
  for (let i = 0; i < tokens.length; i++) {
    if (forbiddenHashes.has(digest(tokens[i]))) hits.add(tokens[i]);
    if (i + 1 < tokens.length) {
      const pair = tokens[i] + ' ' + tokens[i + 1];
      if (forbiddenHashes.has(digest(pair))) hits.add(pair);
    }
  }
  return [...hits];
}

let leaks = 0;
for (const file of allFiles.filter((f) => /\.(html|css|js|txt|xml)$/.test(f))) {
  for (const hit of scanForbidden(readFileSync(file, 'utf8'))) {
    // Do not echo the term - this output can land in a public CI log.
    fail(relative(dist, file) + ' contains a forbidden term (' + hit.length + ' chars)');
    leaks++;
  }
}
if (leaks === 0) pass('no forbidden terms in ' + allFiles.length + ' built files');

// ---------------------------------------------------------------------------
console.log('\n2. Routes — every route in the sitemap must exist');
const routes = [
  '', 'products', 'work', 'capabilities', 'about', 'contact',
  'products/creators-sphere', 'products/shopmgr', 'products/kyc',
  'products/accounting',
  'work/tender-rfp-management', 'work/contract-lifecycle',
  'work/document-bundling-redaction', 'work/ops-incident-support',
  'work/content-cms-platforms', 'work/sharepoint-extensions',
  'work/awards-portals', 'work/scheduling-systems',
];
for (const r of routes) {
  const f = join(dist, r, 'index.html');
  existsSync(f) ? pass(`/${r}${r ? '/' : ''}`) : fail(`missing /${r}/`);
}

// ---------------------------------------------------------------------------
console.log('\n3. Products — BRIEF.md requires six fields on every product');
// Discover from the BUILT output, not from a grep of products.ts. The source
// still holds the hidden entries, so a source grep counts products that never
// ship — and would then read a page that does not exist, killing this script
// instead of failing a check.
const slugs = readdirSync(join(dist, 'products'), { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();
slugs.length === 4
  ? pass(`4 products shipped: ${slugs.join(', ')}`)
  : fail(`expected 4 products, found ${slugs.length}: ${slugs.join(', ')}`);

// Hiding a product is a founder decision, so assert it rather than leaving the
// count above to catch a regression by accident. The failure names what broke.
for (const slug of ['leave', '1line-ai']) {
  existsSync(join(dist, 'products', slug, 'index.html'))
    ? fail(`${slug} is hidden but its page was built`)
    : pass(`${slug}: hidden, no page built`);
}

for (const slug of slugs) {
  const html = readFileSync(join(dist, 'products', slug, 'index.html'), 'utf8');
  const checks = {
    'one-liner': /class="[^"]*text-\[clamp\(18px/.test(html),
    'problem': /The problem/.test(html),
    'steps': /How it works/.test(html),
    'mock': /Illustrative mockup/.test(html),
    'cta': /mailto:/.test(html),
  };
  const missing = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
  missing.length === 0
    ? pass(`${slug}: all required sections present`)
    : fail(`${slug}: missing ${missing.join(', ')}`);
}

// ---------------------------------------------------------------------------
// The founder asked for at least three paragraphs of real capability detail on
// every entry. A target nobody measures decays, so measure it — and measure the
// rendered page rather than the source, because that is what a reader gets.
console.log('\n3b. Depth — three paragraphs minimum on every entry');

// Count <p> elements inside the long-form section of a built page.
const depthOf = (html, heading) => {
  const start = html.indexOf(heading);
  if (start === -1) return 0;
  const end = html.indexOf('</section>', start);
  if (end === -1) return 0;
  return (html.slice(start, end).match(/<p[\s>]/g) || []).length;
};

// 1line.ai is hidden as of 2026-09-17, so this loop never reaches it — `slugs`
// now comes from the built output. The exemption stays because it is the rule
// that applies if the product is ever unhidden: a real product the founder has
// not cleared for publication, shipping as a placeholder. Exempt by name, so
// that adding a second exemption is a visible decision rather than a quiet one.
const depthExempt = new Set(['1line-ai']);

for (const slug of slugs) {
  if (depthExempt.has(slug)) {
    const html = readFileSync(join(dist, 'products', slug, 'index.html'), 'utf8');
    /placeholder/i.test(html) && /noindex/.test(html)
      ? pass(`${slug}: exempt placeholder, still marked noindex`)
      : fail(`${slug}: exempt from depth but no longer a noindexed placeholder`);
    continue;
  }
  const html = readFileSync(join(dist, 'products', slug, 'index.html'), 'utf8');
  // 2026-09-24: the founder asked for "our solution", shorter, in place of the
  // long form. A page that has it is held to short instead of long: one or two
  // sentences, 45 words at most, and never both sections at once.
  const sol = html.indexOf('Our solution');
  if (sol !== -1) {
    const end = html.indexOf('</section>', sol);
    const text = html.slice(sol, end).replace(/<[^>]+>/g, ' ').replace('Our solution', '').replace(/\s+/g, ' ').trim();
    const words = text.split(' ').length;
    const sentences = (text.match(/[.?!](\s|$)/g) || []).length;
    const alsoLong = html.includes('What it actually does');
    words <= 45 && sentences >= 1 && sentences <= 2 && !alsoLong
      ? pass(`${slug}: solution, ${sentences} sentence(s), ${words} words`)
      : fail(`${slug}: solution must be 1–2 sentences and ≤45 words, without the long form (got ${sentences}, ${words}${alsoLong ? ', long form present' : ''})`);
    continue;
  }
  const n = depthOf(html, 'What it actually does');
  n >= 3 ? pass(`${slug}: ${n} paragraphs`) : fail(`${slug}: ${n} paragraphs, needs 3`);
}

const workSrc = readFileSync(join(root, 'src/content/work.ts'), 'utf8');
const workSlugs = [...workSrc.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
for (const slug of workSlugs) {
  const html = readFileSync(join(dist, 'work', slug, 'index.html'), 'utf8');
  const n = depthOf(html, 'What we built');
  n >= 3 ? pass(`${slug}: ${n} paragraphs`) : fail(`${slug}: ${n} paragraphs, needs 3`);
}

// ---------------------------------------------------------------------------
console.log('\n4. Mocks — illustrations only, never real screenshots');
const homeHtml = readFileSync(join(dist, 'index.html'), 'utf8');
const mockCount = (homeHtml.match(/Illustrative mockup/g) || []).length;
mockCount >= 6
  ? pass(`${mockCount} labelled mockups on the home page`)
  : fail(`expected at least 6 mockups on home, found ${mockCount}`);

const rasterInContent = allFiles.filter(
  (f) => /\.(png|jpe?g|webp)$/i.test(f) && !/favicon|og-placeholder|logo/i.test(f)
);
rasterInContent.length === 0
  ? pass('no screenshot-like raster images in the build')
  : fail(`unexpected raster images: ${rasterInContent.map((f) => relative(dist, f)).join(', ')}`);

// ---------------------------------------------------------------------------
console.log('\n5. Themes — both must be present in the stylesheet');
const cssFiles = allFiles.filter((f) => f.endsWith('.css'));
const css = cssFiles.map((f) => readFileSync(f, 'utf8')).join('\n');
const themeChecks = {
  'dark tokens (--color-bg)': /--color-bg:\s*#0e0d0f/.test(css),
  // The minifier strips quotes from attribute selectors, so accept both forms.
  'light override block': /\[data-theme=["']?light["']?\]/.test(css),
  'light foreground = brand ink': /--color-fg:\s*#231f20/.test(css),
  'prefers-color-scheme handling': /prefers-color-scheme:\s*light/.test(css),
  'reduced-motion handling': /prefers-reduced-motion/.test(css),
};
for (const [label, ok] of Object.entries(themeChecks)) {
  ok ? pass(label) : fail(`missing ${label}`);
}

// ---------------------------------------------------------------------------
console.log('\n6. Deploy — GitHub Pages needs these or the site breaks');
existsSync(join(dist, '.nojekyll'))
  ? pass('.nojekyll present (Pages would otherwise drop _astro/)')
  : fail('.nojekyll missing');

// A CNAME in the output forces the custom domain at the domain root, which
// breaks the project-page URL. It is kept in deploy/ until the domain is ready.
existsSync(join(dist, 'CNAME'))
  ? fail('CNAME is in the build — it will override the project-page URL')
  : pass('no CNAME in build (correct for the project-page URL)');

// The whole point of the base path: every asset and internal link must carry it,
// or the page loads with no CSS. Check what the HTML actually references.
const base = (process.env.SITE_BASE ?? '/successiv-website').replace(/\/+$/, '');
if (base) {
  const refs = [...homeHtml.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]);
  const unprefixed = refs.filter((r) => !r.startsWith(base + '/') && r !== base);
  unprefixed.length === 0
    ? pass(`all ${refs.length} root-relative refs carry the base "${base}"`)
    : fail(`${unprefixed.length} refs missing the base path, e.g. ${unprefixed.slice(0, 3).join(', ')}`);
}

// ---------------------------------------------------------------------------
console.log('\n7. SEO — each page needs its own title and description');
const titles = new Set();
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="(.*?)"/)?.[1];
  const rel = relative(dist, file);
  if (!title) fail(`${rel}: no <title>`);
  else titles.add(title);
  if (!desc) fail(`${rel}: no meta description`);
  if (title && /Applied AI Solutions/.test(title)) {
    fail(`${rel}: still carries the old services-era title`);
  }
}
titles.size === htmlFiles.length
  ? pass(`${titles.size} unique page titles`)
  : fail(`${htmlFiles.length} pages but only ${titles.size} unique titles`);

// ---------------------------------------------------------------------------
console.log('\n8. Accessibility basics');
const a11y = {
  'skip link': /Skip to main content/.test(homeHtml),
  'lang attribute': /<html lang="en"/.test(homeHtml),
  'theme toggle labelled': /aria-label="Switch theme"/.test(homeHtml),
  'viewport meta': /name="viewport"/.test(homeHtml),
};
for (const [label, ok] of Object.entries(a11y)) {
  ok ? pass(label) : fail(`missing ${label}`);
}

// ---------------------------------------------------------------------------
console.log('\n9. Mock animation — the settled frame is the claim, motion is extra');
// A .mock-step starts hidden (fill-mode: both), and a .mock-before (an earlier
// state stacked over the final one) starts shown. If either animation ran without
// the scroll trigger, a screen with no JavaScript, or outside a .reveal, would be
// stuck mid-story. So every rule that animates them must be gated by .is-visible.
const cssRules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
const animated = (sel) => sel.includes('.mock-step') || sel.includes('.mock-before');
const ungated = cssRules.filter(
  ([, sel, body]) =>
    animated(sel) &&
    /animation(-name)?:/.test(body) &&
    !/animation:\s*none/.test(body) &&
    !sel.includes('.is-visible')
);
const stepRules = cssRules.filter(([, sel]) => animated(sel));
stepRules.length > 0 && ungated.length === 0
  ? pass(`${stepRules.length} mock animation rule(s), every animation gated by .is-visible`)
  : fail(stepRules.length === 0 ? 'no .mock-step rule in the CSS' : `ungated mock animation: ${ungated[0][1].trim()}`);

// Without the trigger, the settled frame must show: earlier states hidden.
cssRules.some(([, sel, body]) => sel.trim().split(',').includes('.mock-before') && /opacity:\s*0\b/.test(body))
  ? pass('.mock-before is hidden by default (the settled frame shows without the trigger)')
  : fail('.mock-before is not hidden by default');

// The global reduced-motion rule shortens durations but keeps delays, so a
// staggered step would sit hidden for its delay and then pop. Both must be off.
const rmAt = css.search(/prefers-reduced-motion:\s*reduce\)\s*\{/);
let rmBlock = '';
if (rmAt !== -1) {
  let i = css.indexOf('{', rmAt), depth = 0, j = i;
  for (; j < css.length; j++) {
    if (css[j] === '{') depth++;
    else if (css[j] === '}' && --depth === 0) break;
  }
  rmBlock = css.slice(i + 1, j);
}
const rmOff = [...rmBlock.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(([, , body]) => /animation:\s*none/.test(body));
['.mock-step', '.mock-before'].every((c) => rmOff.some(([, sel]) => sel.includes(c)))
  ? pass('reduced motion turns step and swap animation off')
  : fail('reduced motion does not set animation: none on both .mock-step and .mock-before');

// Each sequence must be numbered 0..n, each number once, and its length must
// match the spec's table — a missing step means a claimed stage vanished.
// A swap (--swap: N) retires an earlier state as step N arrives, so every
// swap must name a step that exists.
// Page order: the hero, then the screens in step order.
const expectedSteps = { accounting: [8, 6, 4, 7, 8, 3] };
for (const [slug, expected] of Object.entries(expectedSteps)) {
  const html = readFileSync(join(dist, 'products', slug, 'index.html'), 'utf8');
  const frames = html.split(/class="mock-frame\b/).slice(1);
  const seqs = frames
    .map((f) => ({
      steps: [...f.matchAll(/--step:\s*(\d+)/g)].map((m) => Number(m[1])),
      swaps: [...f.matchAll(/--swap:\s*(\d+)/g)].map((m) => Number(m[1])),
    }))
    .filter((q) => q.steps.length > 0);
  const maxes = seqs.map((q) => Math.max(...q.steps));
  const exact = seqs.every(
    (q) => new Set(q.steps).size === q.steps.length && q.steps.length === Math.max(...q.steps) + 1
  );
  const swapsOk = seqs.every((q) => q.swaps.every((n) => q.steps.includes(n)));
  exact && swapsOk && JSON.stringify(maxes) === JSON.stringify(expected)
    ? pass(`${slug}: ${seqs.length} sequences, steps 0–${maxes.join(', 0–')}, none missing or repeated`)
    : fail(`${slug}: expected step maxima ${JSON.stringify(expected)}, found ${JSON.stringify(maxes)}${exact ? '' : ' (gaps or repeats)'}${swapsOk ? '' : ' (a swap names no step)'}`);
}

// ---------------------------------------------------------------------------
console.log('\n10. Accounting — the shipped app only (research 2026-09-24)');
{
  const html = readFileSync(join(dist, 'products', 'accounting', 'index.html'), 'utf8');
  const text = html.replace(/<[^>]+>/g, ' ');
  // Each of these was on the page, and none of it is in the shipped app. See
  // local_pm/research/2026-09-24-accounting-ui-walkthrough.md for each one.
  const retired = [
    /revers(al|ed)/i, /unreviewed rule/i, /which account/i, /\bTerms\b/, /bank lines unmatched/i,
    /client on their phone/i, /Auto-confirmed/i, /Audit Confidence/i, /classif/i,
  ];
  const hits = retired.filter((re) => re.test(text));
  hits.length === 0
    ? pass('no retired claim on the Accounting page')
    : fail(`retired claims still on the Accounting page: ${hits.map(String).join(', ')}`);
  // One screen per step, plus the hero; and the gallery they replace is gone.
  const frameCount = (html.match(/class="mock-frame\b/g) || []).length;
  frameCount === 6 && !html.includes('Drawn, not screenshotted')
    ? pass('5 steps each carry a screen, plus the hero; no gallery')
    : fail(`expected 6 screens and no gallery, found ${frameCount}${html.includes('Drawn, not screenshotted') ? ' and the gallery' : ''}`);
}

// ---------------------------------------------------------------------------
console.log(
  failures === 0
    ? `\nAll checks passed (${htmlFiles.length} pages).\n`
    : `\n${failures} check(s) failed.\n`
);
process.exit(failures === 0 ? 0 : 1);
