# Claude Code — Successiv website

Read `docs/BRIEF.md`, `docs/COPY.md`, and `docs/BUILD.md` before coding.
Design and build decisions are recorded in `local_pm/projects/product-led-site/specs/`.

## Mission

Build the Successiv marketing site from those docs. Product-led. No real client names. No real screenshots — mocked UI only.

## Products on the homepage product grid

Creators Sphere, Shopmgr, KYC, Leave, Accounting, 1line.ai.

Accounting was added 2026-09-17. It is a real product in closed beta, shipped
with `preRelease: true` so the page says so. No launch date is claimed because
none has been given.

The product brands itself "Creators Sphere" (plural) on its own site at
creatorsphere.sg. `docs/BRIEF.md` calls it "Creator Sphere"; the live product wins.

1line.ai was added on the founder's explicit sign-off (2026-09-17), which is the
confirmation `docs/BRIEF.md` asked for. Its copy is honest placeholder and is
flagged with `needsCopy: true` in `src/content/products.ts`.

**1line.ai is not a content gap.** It is a working product — an LLM gateway with
metering and billing — that the founder has not cleared for publication. The
placeholder is the decision, not an omission. Do not write copy for it without
asking. `scripts/verify.mjs` exempts it from the three-paragraph rule by name
and asserts it stays a noindexed placeholder.

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

Astro + Tailwind v4 + TypeScript, static output, deployed to GitHub Pages on the
custom domain `successiv.com`. Deployment, and the open hosting blocker, are in
`docs/DEPLOYMENT.md`.

`docs/BUILD.md` suggests Next.js; Astro was chosen instead because the existing
work at `successiv.com/rebuild/` was already Astro with the brand tokens in
place, and static output is a cleaner fit for Pages.

## Conventions

- Components read from `src/content/*.ts`. Copy, nav, email, and product data
  are data, not markup — change them there, not in a page.
- Components use semantic colour tokens only (`bg-bg`, `text-fg`, `bg-action`).
  Never a raw hex, or the light theme breaks.
- Two themes ship. Light is the default surface, per
  `docs/hiring/DESIGNER_BRIEF.md`; dark is the alternate, applied on explicit
  choice or when the OS asks for it. Check both before calling a change done.

## Prefer

- Accessible components
- Honest placeholder copy where details are thin
