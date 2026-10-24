# Deployment

Three places already point at this file — `CLAUDE.md`, `local_pm/board.md`, and
a log entry from 2026-09-17 saying the options were "written up in
`docs/DEPLOYMENT.md`". It did not exist. Everything below is read out of
`package.json`, `astro.config.mjs`, `.github/workflows/deploy.yml` and
`scripts/verify.mjs`, so it can be regenerated rather than remembered.

## Where the site actually is today

**`https://successiv.com/`** — GitHub Pages with a custom domain, served at the
domain root, since 2026-10-24. The old project-page URL
`https://0atlas-repo.github.io/successiv-website/` redirects there.

The domain is set in the repository's Pages settings (Settings → Pages → Custom
domain), not by a `CNAME` file: Actions-based Pages deploys ignore one, and
`scripts/verify.mjs` **fails** if a `CNAME` reaches `dist/`. DNS is at the
registrar, Namecheap — see "DNS" at the bottom.

<!-- AUTO-GENERATED: commands -->

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | `astro dev` — dev server with hot reload |
| `npm run build` | `astro build`, then `node scripts/verify.mjs`. Verify is part of the build, so a rule breach fails the build instead of shipping. Neither step type-checks — run `npm run check` for that |
| `npm run preview` | `astro preview` — serves the built `dist/` |
| `npm run verify` | `scripts/verify.mjs` alone, against whatever is already in `dist/` |
| `npm run check` | `astro check` — TypeScript and template diagnostics |
| `npm run astro` | the Astro CLI directly |

Node `>=22.12.0`, per `engines` in `package.json`.

<!-- END AUTO-GENERATED -->

<!-- AUTO-GENERATED: environment -->

## Environment

Two variables, both read in `astro.config.mjs`, one of them also in
`scripts/verify.mjs`. There is no `.env.example` because there are no secrets —
these only select which of two deployment shapes to build.

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `SITE_BASE` | No | `/successiv-website` | Path the site is served under. `/` for a custom domain at the root. Everything internal routes through `withBase()` in `src/base.ts` |
| `SITE_URL` | No | `https://0atlas-repo.github.io` | Origin used for the sitemap and canonical URLs |

The two shapes:

```
project page    SITE_BASE=/successiv-website   SITE_URL=https://0atlas-repo.github.io
custom domain   SITE_BASE=/                    SITE_URL=https://successiv.com
```

`.github/workflows/deploy.yml` sets both to the custom-domain shape on the build
job. A local `npm run build` with neither set still builds the project-page
shape; set both to reproduce what CI ships.

<!-- END AUTO-GENERATED -->

## Deploying

Pushing to `main` is the deploy. `.github/workflows/deploy.yml` runs on
`push: [main]` and on `workflow_dispatch`, with `concurrency: pages` and
`cancel-in-progress: false`, so an in-flight deploy finishes rather than being
killed by the next push.

Two jobs: `build` runs `withastro/action@v6`, then `deploy` runs
`actions/deploy-pages@v4`.

The workflow deliberately does **not** use `actions/configure-pages` with
`static_site_generator`. That action injects a base path derived from the Pages
URL, which is wrong for a custom domain served at the root. `astro.config.mjs`
sets `site` and `base` explicitly instead.

Watch a deploy and confirm it landed:

```bash
gh run list --branch main --limit 1
gh run watch <run-id> --exit-status
curl -s -o /dev/null -w '%{http_code}\n' https://successiv.com/
```

## What the build checks before it will ship

`scripts/verify.mjs` runs on every `npm run build` and exits non-zero on any
failure. Ten groups:

| # | Group | Why it exists |
|---|---|---|
| 1 | Client safety | Greps `dist/` for real client names and internal repo slugs, hashed rather than listed in the clear. One hit fails the build |
| 2 | Routes | Every route in the sitemap must exist on disk |
| 3 | Products | Six fields required on every product, per `docs/BRIEF.md` |
| 4 | Mocks | Illustrations only. No raster image may appear in page content |
| 5 | Themes | Both light and dark must be present in the stylesheet |
| 6 | Deploy | `.nojekyll` present, no `CNAME`, and every root-relative reference carries the base path |
| 7 | SEO | Every page has its own title and meta description, all unique |
| 8 | Accessibility | Skip link, `lang`, labelled theme toggle, viewport meta |
| 9 | Mock animation | Every `.mock-step`/`.mock-before` rule is gated by `.is-visible`, `.mock-before` starts hidden, reduced motion turns both off, each screen's steps are numbered 0..n with no gaps or repeats against a per-page step count (`expectedSteps`, keyed by page path), any `--swap: N` must name a step that exists, and every screen's steps must start in the order they're numbered, with each `--swap` timed to land on its own step |
| 10 | Retired claims | Per page path, listed manually in `retiredClaims` (today all 4 products and all 8 work pages): greps the built page for claims that don't match the shipped app (e.g. Accounting's "reversal", "bank lines unmatched") and checks the step count matches `expectedSteps` with the old Screens gallery gone |

Group 3 also asserts the two hidden products stay hidden: `/products/leave/` and
`/products/1line-ai/` must not be built. Unhiding one by accident fails the
build.

Group 10 runs per page — today that's all 4 products and all 8 work pages,
each with its own retired-claims list and its own expected step count. See
`CLAUDE.md`'s "Animated mock screens" section for how to add a step.

## Rolling back

There is no separate artifact store — the deploy builds from `main`. A rollback
is therefore a commit:

```bash
git revert <bad-sha>        # or: git revert <oldest-bad>..<newest-bad>
npm run build               # confirm the revert still passes verify
git push origin main        # this redeploys
```

Do not force-push `main` to roll back. The push is what triggers the deploy, and
a force-push that moves `main` backwards can leave the Pages artifact and the
branch disagreeing about what is live.

## Health checks

No runtime, no database, no API — it is static output on a CDN. The useful
checks are about content, not uptime:

```bash
# every route answers
for r in / /products/ /work/ /contact/; do
  curl -s -o /dev/null -w "$r %{http_code}\n" "https://successiv.com$r"
done

# /about/ and /capabilities/ are redirect stubs (200, meta refresh to /contact/#who and /)

# the two hidden products are still gone — both must be 404
for p in leave 1line-ai; do
  curl -s -o /dev/null -w "/products/$p/ %{http_code}\n" \
    "https://successiv.com/products/$p/"
done
```

## DNS

`successiv.com` is registered at Namecheap and uses Namecheap's own nameservers
(`dns1/dns2.registrar-servers.com`) since 2026-10-24. The website records:

```
A      @    185.199.108.153  185.199.109.153  185.199.110.153  185.199.111.153
AAAA   @    2606:50c0:8000::153  2606:50c0:8001::153  2606:50c0:8002::153  2606:50c0:8003::153
CNAME  www  0atlas-repo.github.io.
```

`www` redirects to the apex. Mail is separate: until a mail service is set up for
the domain, `TXT @ v=spf1 -all` stays in place so nobody can send as successiv.com.

Check what the domain resolves to:

```bash
dig +short successiv.com A
dig +short www.successiv.com CNAME
gh api repos/0atlas-repo/successiv-website/pages --jq '{cname, https_enforced}'
```
