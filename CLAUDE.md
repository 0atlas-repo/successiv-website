# Claude Code — Successiv website

Read `docs/BRIEF.md`, `docs/COPY.md`, and `docs/BUILD.md` before coding.
Design and build decisions are recorded in `local_pm/projects/product-led-site/specs/`.

## Mission

Build the Successiv marketing site from those docs. Product-led. No real client names. No real screenshots — mocked UI only.

## Products on the homepage product grid

Creators Sphere, Shopmgr, KYC, Leave, 1line.ai.

The product brands itself "Creators Sphere" (plural) on its own site at
creatorsphere.sg. `docs/BRIEF.md` calls it "Creator Sphere"; the live product wins.

1line.ai was added on the founder's explicit sign-off (2026-09-17), which is the
confirmation `docs/BRIEF.md` asked for. Its copy is honest placeholder and is
flagged with `needsCopy: true` in `src/content/products.ts` until real copy lands.

## Do not

- Mention [redacted-client], [redacted-client], [redacted-client], or any other real client
- Copy proprietary screenshots from internal repos
- Invent fake revenue/user metrics

`npm run build` runs `scripts/verify.mjs`, which greps the built `dist/` for
client names and internal repo slugs. It fails the build on a hit.

## Stack

Astro + Tailwind v4 + TypeScript, static output, deployed to GitHub Pages on the
custom domain `successiv.com`.

`docs/BUILD.md` suggests Next.js; Astro was chosen instead because the existing
work at `successiv.com/rebuild/` was already Astro with the brand tokens in
place, and static output is a cleaner fit for Pages.

## Conventions

- Components read from `src/content/*.ts`. Copy, nav, email, and product data
  are data, not markup — change them there, not in a page.
- Components use semantic colour tokens only (`bg-bg`, `text-fg`, `bg-action`).
  Never a raw hex, or the light theme breaks.
- Two themes ship. Dark is the brand; light is derived. Check both before
  calling a change done.

## Prefer

- Accessible components
- Honest placeholder copy where details are thin
