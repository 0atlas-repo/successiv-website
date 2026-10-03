# Deep signal — home hero (round 1)

Date: 2026-10-03 · Branch: `deep-signal` · Status: spec, awaiting approval

## What

Rebuild the home hero (`src/components/MockWall.astro`) in direction C, "Deep signal",
chosen by the founder on 2026-10-03 from the directions board
(https://claude.ai/artifact/4cWoLZUP1fvYmy46zxzy3w).

- The existing screen wall becomes a **tilted 3D runway**: the same 7 columns and 40
  screens, the same seamless loop (runway "loops forever"), set in perspective and
  sitting to the right of the headline.
- **Two themes** (founder: "use that as the light version and we should have a dark
  mode version"):
  - Light, the default: ice-white ground, cyan and indigo signal glows, faint grain.
  - Dark: deep-navy ground, cyan glow, grain — the board's sample C.
- Headline, lede and buttons stay as they are (copy unchanged).

## Why

The audit (`local_pm/research/2026-10-02-awwwards-audit.md`) scored the site 2.9/5;
the wall is its one ownable idea (uniqueness 3). Deep signal keeps that idea and adds
depth (layering) and atmosphere (colour), the two axes C projects at 5 and 4.

## Constraints

- Screens come only from `products.ts` / `work.ts` step screens, as today. No new
  screens, no new claims. Captions, links and the phone-pair rule are unchanged, so
  `scripts/verify.mjs` wall checks keep passing untouched.
- Semantic tokens and brand constants only — no raw hex in the component.
- Reduced motion: no drift (as today); tilt stays, it is static.
- Hover/focus pauses a column, as today. Links stay clickable through the tilt.
- Phone (≤767px): runway as a tilted band above the copy; no sideways scroll.
- Rest of the site unchanged this round.

## Out of scope (later rounds)

Carrying Deep signal through other sections and pages; the 390px overflow bug on
product/work pages (audit defect 3) — tracked separately.

## Verification

- `npm run check` and `npm run build` (runs `scripts/verify.mjs`) pass.
- Screenshots: home at 1440 and 390, light and dark; no console errors;
  `scrollWidth == innerWidth` at 390.
- Reduced-motion: wall static, copy readable.
- Re-score the hero against the audit's 8 axes; target ≥4 on each.
