#!/usr/bin/env node
// Verification for the Successiv site. Run after `npm run build`.
//
// These checks encode the rules in CLAUDE.md and docs/BRIEF.md that a reviewer
// would otherwise have to remember. The client-safety check is the important
// one: it greps the BUILT output, because that is what actually ships.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
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
console.log('\n1. Client safety — no real client name or internal slug may ship');
// Real client names and the private repo slugs from the BRIEF.md mapping table.
// "[redacted-client]" and "[redacted-client]" are matched with word boundaries so ordinary words do not trip them.
const forbidden = [
  /\b[redacted-client]\b/i, /\b[redacted-client]\b/i, /\b[redacted-client]\b/i, /\b[redacted-client]\b/i,
  /\b[redacted-client]\b/i, /\b[redacted-client]\b/i, /\b[redacted-client]\b/i, /\b[redacted-client]\b/i,
  /[redacted-slug]/i, /[redacted-slug]/i, /[redacted-slug]/i,
  /[redacted-slug]/i, /[redacted-slug]/i, /[redacted-slug]/i, /[redacted-slug]/i,
  // Former employers. The founder asked that neither be named: the site
  // describes them instead ("a global investment bank", "a Fortune 100
  // insurer"). Gated here so a later edit cannot reintroduce them.
  /[redacted-employer]/i, /[redacted-employer]/i, /liberty\s*mutual/i,
  /[redacted-slug]/i, /[redacted-slug]/i, /[redacted-slug]/i, /0atlas-repo/i,
];
let leaks = 0;
for (const file of allFiles.filter((f) => /\.(html|css|js|txt|xml)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const pattern of forbidden) {
    const hit = text.match(pattern);
    if (hit) {
      fail(`${relative(dist, file)} contains "${hit[0]}"`);
      leaks++;
    }
  }
}
if (leaks === 0) pass(`no forbidden terms in ${allFiles.length} built files`);

// ---------------------------------------------------------------------------
console.log('\n2. Routes — every route in the sitemap must exist');
const routes = [
  '', 'products', 'work', 'capabilities', 'about', 'contact',
  'products/creators-sphere', 'products/shopmgr', 'products/kyc',
  'products/leave', 'products/1line-ai',
];
for (const r of routes) {
  const f = join(dist, r, 'index.html');
  existsSync(f) ? pass(`/${r}${r ? '/' : ''}`) : fail(`missing /${r}/`);
}

// ---------------------------------------------------------------------------
console.log('\n3. Products — BRIEF.md requires six fields on every product');
const productsSrc = readFileSync(join(root, 'src/content/products.ts'), 'utf8');
const slugs = [...productsSrc.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
slugs.length === 5
  ? pass(`5 products defined: ${slugs.join(', ')}`)
  : fail(`expected 5 products, found ${slugs.length}`);

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
existsSync(join(dist, 'CNAME')) ? pass('CNAME present') : fail('CNAME missing');
existsSync(join(dist, '.nojekyll'))
  ? pass('.nojekyll present (Pages would otherwise drop _astro/)')
  : fail('.nojekyll missing');
readFileSync(join(dist, 'CNAME'), 'utf8').trim() === 'successiv.com'
  ? pass('CNAME points at successiv.com')
  : fail('CNAME contents wrong');

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
console.log(
  failures === 0
    ? `\nAll checks passed (${htmlFiles.length} pages).\n`
    : `\n${failures} check(s) failed.\n`
);
process.exit(failures === 0 ? 0 : 1);
