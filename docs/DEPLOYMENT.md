# Deployment

Three places already point at this file — `CLAUDE.md`, `local_pm/board.md`, and
a log entry from 2026-09-17 saying the options were "written up in
`docs/DEPLOYMENT.md`". It did not exist. Everything below is read out of
`package.json`, `astro.config.mjs`, `.github/workflows/deploy.yml` and
`scripts/verify.mjs`, so it can be regenerated rather than remembered.

## Where the site actually is today

**`https://0atlas-repo.github.io/successiv-website/`** — the GitHub project
page, served under a base path.

Not `successiv.com`. The custom domain is the intent, not the state, and the
build enforces the current shape: `scripts/verify.mjs` **fails** if a `CNAME`
file reaches `dist/`, because a CNAME would override the project-page URL. See
the open blocker at the bottom.

<!-- AUTO-GENERATED: commands -->

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | `astro dev` — dev server with hot reload |
| `npm run build` | `astro build`, then `node scripts/verify.mjs`. Verify is part of the build, so a rule breach fails the build instead of shipping |
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

`.github/workflows/deploy.yml` sets neither, so CI builds with the defaults —
the project page. Moving to the custom domain is an env change in the workflow
plus a `CNAME`, not a code change.

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
curl -s -o /dev/null -w '%{http_code}\n' https://0atlas-repo.github.io/successiv-website/
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
| 9 | Mock animation | Every `.mock-step`/`.mock-before` rule is gated by `.is-visible`, `.mock-before` starts hidden, reduced motion turns both off, and each screen's steps are numbered 0..n with no gaps or repeats; any `--swap: N` must name a step that exists |
| 10 | Accounting claims | Greps the built Accounting page for retired claims (e.g. "reversal", "Unreviewed rule", "bank lines unmatched") and checks every step carries its own screen with the old Screens gallery gone |

Group 3 also asserts the two hidden products stay hidden: `/products/leave/` and
`/products/1line-ai/` must not be built. Unhiding one by accident fails the
build.

Group 10 is per-product — today only Accounting has retired claims and a
screen-per-step page to check. See `CLAUDE.md`'s "Animated mock screens"
section for how to add a step.

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
for r in / /products/ /work/ /capabilities/ /about/ /contact/; do
  curl -s -o /dev/null -w "$r %{http_code}\n" "https://0atlas-repo.github.io/successiv-website$r"
done

# the two hidden products are still gone — both must be 404
for p in leave 1line-ai; do
  curl -s -o /dev/null -w "/products/$p/ %{http_code}\n" \
    "https://0atlas-repo.github.io/successiv-website/products/$p/"
done
```

## Open blocker: hosting

Recorded on `local_pm/board.md`, unresolved, and the reason the custom domain is
not live:

**The organisation is on the free GitHub plan, so Pages will not serve a private
repository.** Until that is settled one way or the other, the site is served
from the project-page URL.

Two steps remain once it is:

1. Set the Pages source to "GitHub Actions" in repository settings.
2. Point `successiv.com` DNS at Pages, set `SITE_BASE=/` and
   `SITE_URL=https://successiv.com` in `deploy.yml`, and add a `CNAME` — which
   also means relaxing the `CNAME` assertion in `scripts/verify.mjs`, since it
   currently fails the build on exactly that file.
