# Wall culling — plan

Spec: `../specs/wall-cull.md`. Solo build (one component), then benchmark.

1. Baseline numbers on GPU (theme-switch frames, 10s idle drift) from the current build.
2. CSS in MockWall: parked state (`content-visibility: hidden`), arrive and leave
   animations, reduced-motion overrides.
3. Script in MockWall: calibration, per-tick wanted set, one-change queue, entrance and
   exit, folded first-show reveal, replay limited to live cards, resize, tab hidden.
4. Debug hook: `window.__wallCull` exposing live count and an event log (removed or
   kept dev-only before merge).
5. Verify per spec; founder review on localhost; then merge.
