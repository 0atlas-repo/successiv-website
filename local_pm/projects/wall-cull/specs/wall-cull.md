# Wall culling — cards added and removed one by one

Date: 2026-10-05 · Branch: `wall-cull` · Status: approved by the founder ("go ahead on new branch")

## What

The home wall (`src/components/MockWall.astro`) keeps every card live today: 48 cards
(24 tiles rendered twice for the seamless loop), 3,874 elements, about 26 cards on
screen at 1440. A theme switch restyles all of them in one 50-67ms frame.

1. **Park cards out of view.** A parked card keeps its exact layout size (its measured
   width and height set as `contain-intrinsic-size` before parking) and gets
   `content-visibility: hidden`, so the browser skips its style, layout and paint. The
   column height, and so the loop seam, never changes.
2. **Know what is in view without 3D maths per frame.** Calibrate each column's visible
   stretch in column space (layout `offsetTop` plus the drift's current `translateY`,
   read from its computed transform) from the cards that intersect the viewport; redo
   on resize. Each tick, a card is wanted live if it is inside that stretch, plus a
   lead margin on the side cards enter from and a small trail on the side they leave.
3. **One change at a time.** A queue applies at most one park or wake per tick
   (~100ms), entering cards first. Never a batch, including on resize and load.
4. **Entrance.** A card is woken while still outside the visible stretch, waits at
   opacity 0, and fades and rises in (~500ms) as it crosses into view.
5. **Exit.** A card about to leave fades out (~400ms) and is parked once invisible.
6. **Existing scripts.** The first-show reveal (`is-visible`, which starts a screen's
   steps) moves into this script and fires on entrance. The step replay picks only
   live, on-screen cards.

## Why

Founder, 2026-10-05: free screens once they leave the visible area, have them ready
early at the entry end, add and remove them one by one with an animation. The theme
switch's remaining cost is restyling the whole wall; the browser's own
`content-visibility: auto` skipped 0 of 48 cards in the tilted runway (measured), so
the script decides instead.

## Constraints

- No visible pop, no seam jump, no change to the runway's look when idle.
- Reduced motion: the wall does not drift; cards out of view are parked once, no
  entrance or exit animation.
- Phone layout (340px tiles) calibrates the same way.
- Tab hidden: ticking stops.
- Build checks (`scripts/verify.mjs` wall sections) read the HTML and must keep passing.

## Verification

- GPU benchmark (headed Chrome, M4), interleaved with an instant switch as noise floor:
  theme-switch heavy frame clearly lower than today (50-67ms); 10s idle drift no worse
  than without culling; log of park/wake events shows at most one per tick.
- Live-card count about half of 48 at 1440.
- Slow-motion screenshots at the entry end, exit end and loop wrap: no pop, no jump.
- Light and dark, 1440 and 390, reduced motion. `npm run check` 0 errors; build passes.
