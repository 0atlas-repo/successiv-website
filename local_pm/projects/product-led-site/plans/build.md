# Plan — build the product-led site

Spec: `../specs/product-led-site.md`

## Order of work

**Phase 1 — foundation (sequential, everything depends on it)**

1. Dual-theme token layer in `src/styles/global.css`. Dark stays as-is; add a light
   set under `:root[data-theme="light"]` and `@media (prefers-color-scheme: light)`
   guarded so an explicit choice always wins. Semantic names only
   (`--color-bg`, `--color-fg`, `--color-surface`, `--color-action`) so components
   never reference a raw hex.
2. Theme toggle: inline no-flash script in `<head>` reading `localStorage` before
   paint, plus a header button. Wrapped in try/catch — private mode throws.
3. Content layer, `src/content/*.ts`: products, work, capabilities, site config.
   Site config holds the contact email and nav so they are one-line edits.
4. Logo swap per theme (white wordmark on dark, `#231f20` wordmark on light).
5. `Base.astro`: real per-page title/description/OG. It currently hardcodes
   "Applied AI Solutions" — wrong on every page.
6. Mock UI primitives — the shared kit every mock is built from (window chrome,
   rows, chips, bars, chat bubbles, step rails).

**Phase 2 — mocks (independent; the parallel batch)**

Nine distinct mocked screens, each a component built only from Phase-1 primitives:
5 product mocks + 4 work-card mocks. No real screenshots, neutral labels.

**Phase 3 — pages (thin, data-driven)**

Home · /products · /products/[slug] · /work · /capabilities · /about · /contact.

**Phase 4 — deploy**

`astro.config.mjs` gets `site: 'https://successiv.com'`, no `base`.
`public/CNAME` + `public/.nojekyll`. GitHub Actions workflow using
`withastro/action` + `actions/deploy-pages`.

## Verification

| What | How | Expected |
|---|---|---|
| Build | `npm run build` | exit 0 |
| Client safety | `grep -riE '[redacted-client]\|[redacted-client]\|[redacted-client]\|[redacted-client]\|[redacted-client]\|[redacted-client]\|[redacted-client]\|aa-cw' dist/` | zero hits |
| Routes | check `dist/**/index.html` for all 7 | all present |
| Product completeness | assert 6 required fields per product | all pass |
| Contrast | check fg/bg pairs in both themes | ≥4.5:1 body, ≥3:1 large |
| Mobile | render at 375px | no horizontal scroll |

Verification is a script, `scripts/verify.mjs`, so it reruns on demand.
