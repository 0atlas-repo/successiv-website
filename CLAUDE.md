# Claude Code — Successiv website

Read `docs/BRIEF.md`, `docs/COPY.md`, and `docs/BUILD.md` before coding.
Design and build decisions are recorded in `local_pm/projects/product-led-site/specs/`.

## Mission

Build the Successiv marketing site from those docs. Product-led. No real client names. No real screenshots — mocked UI only.

## Products on the homepage product grid

Creators Sphere, Shopmgr, KYC, Accounting.

Accounting was added 2026-09-17. It is a real product in closed beta, shipped
with `preRelease: true` so the page says so. No launch date is claimed because
none has been given.

The product brands itself "Creators Sphere" (plural) on its own site at
creatorsphere.sg. `docs/BRIEF.md` calls it "Creator Sphere"; the live product wins.

## Hidden products (2026-09-17)

**1line.ai and Leave are hidden at the founder's instruction.** Both carry
`hidden: true` in `src/content/products.ts`. The entries stay in the file; the
`products` export filters them, so there is no card, no `/products/<slug>/` page,
and no sitemap entry. `scripts/verify.mjs` asserts both pages are absent, so
unhiding one by accident fails the build.

Neither is a content gap. 1line.ai is a working LLM gateway with metering and
billing that has not been cleared for publication — the `needsCopy` placeholder
and the depth exemption in `scripts/verify.mjs` still apply if it returns. Leave
is real but its copy was grounded only in a one-shot importer, so it claimed
nothing about screens or balances. Do not unhide either without asking.

Two previously live URLs now 404: `/products/leave/` and `/products/1line-ai/`.

## Claims must trace to code (2026-09-17)

Every product and work entry was rewritten against its source repository. Four
claims on the site turned out to have nothing behind them and were corrected:

- **KYC** claimed a selfie and document matching. There is no liveness check, no
  face match, no text recognition, and no bureau lookup. Review is manual. The
  copy now says so.
- **Document signing** did not exist. The entry is now "Document bundling &
  redaction", and capability 04 was retitled from "Contracts signed where the
  work is". **Nothing on this site may claim e-signature.**
- **Ops incident reporting** claimed rule-based severity and routing to a named
  owner. Neither exists. It is an assistant that answers from an indexed
  procedure library and drafts an action checklist a person confirms.
- **Retail / mall commerce ops** had no supporting repository at all. The entry
  was removed. Do not reinstate it without one.

If you add a claim, you must be able to point at the code that does it.

## Do not

- Mention [redacted-client], [redacted-client], [redacted-client], or any other real client
- Copy proprietary screenshots from internal repos
- Invent fake revenue/user metrics

`npm run build` runs `scripts/verify.mjs`, which greps the built `dist/` for
client names and internal repo slugs. It fails the build on a hit.

## Stack

Astro + Tailwind v4 + TypeScript, static output, deployed to GitHub Pages.

Live today at `https://0atlas-repo.github.io/successiv-website/`, the project
page. **Not** `successiv.com` — that is the intent, not the state, and
`scripts/verify.mjs` fails the build if a `CNAME` reaches `dist/`, because a
CNAME would override the project-page URL. Deployment, the two env shapes, the
rollback procedure and the open hosting blocker are in `docs/DEPLOYMENT.md`.

`docs/BUILD.md` suggests Next.js; Astro was chosen instead because the existing
work at `successiv.com/rebuild/` was already Astro with the brand tokens in
place, and static output is a cleaner fit for Pages.

## Conventions

- Components read from `src/content/*.ts`. Copy, nav, email, and product data
  are data, not markup — change them there, not in a page.
- Components use semantic colour tokens only (`bg-bg`, `text-fg`, `bg-action`,
  and the status set `bg-ok-soft`/`text-ok`, `bg-warn-soft`/`text-warn`,
  `bg-danger-soft`/`text-danger` for status pills on the mocked screens). Never
  a raw hex, or the light theme breaks.
- The mocked screens' title-bar dots use `bg-win-close`/`bg-win-min`/`bg-win-max`
  instead — constants, not semantic tokens, because a real title bar shows the
  same three colours on a light desktop and a dark one. Kept separate from the
  status tokens on purpose, so a window button is never read as a status.
- Two themes ship. Light is the default surface, per
  `docs/hiring/DESIGNER_BRIEF.md`; dark is the alternate, applied on explicit
  choice or when the OS asks for it. Check both before calling a change done.

## Prefer

- Accessible components
- Honest placeholder copy where details are thin
