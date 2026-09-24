# Plan — mock animation, Accounting pilot

**Spec:** [mock-animation](../specs/mock-animation.md)
**Branch:** `mock-animation`
**Date:** 2026-09-24
**Scope:** one shared CSS rule and three Accounting screens. Approved by the
founder on 2026-09-24, with cards included.

## Steps

1. **Checks first (`scripts/verify.mjs`, new section 9).** They fail on `main`:
   - Every `.mock-step` animation in the built CSS is gated by `.is-visible`
     (Invariant 2: without the trigger, nothing is hidden).
   - The reduced-motion block sets `animation: none` on `.mock-step`
     (Invariant 3).
   - `/products/accounting/` carries three sequences, each numbered from 0 with
     no gaps, so the order is the one in the spec's tables.
2. **Shared rule in `src/styles/global.css`**, beside `.reveal`: keyframe
   `mock-step-in` (opacity plus an 8px rise), tuning custom properties, the
   `.is-visible` gate, and the reduced-motion override.
3. **`AcctExtractMock`** — steps 0–6 as in the spec table.
4. **`AcctJournalMock`** — steps 0–8.
5. **`AcctCloseMock`** — steps 0–6.
6. **Verify** (below), then show the founder.

Steps 3–5 are three small attribute edits, done solo. No workflow fan-out: there
is nothing to parallelise that is worth an agent (lessons.md, "twelve agents to
do a find-and-replace").

## Verification

As in the spec: `npm run build` exits 0 with section 9 green. `/browse` on
`/products/accounting/` and `/` in light and dark: the steps arrive in order, the
settled frame matches `main`, and with reduced motion on the final state shows at
once. `git diff main --stat` touches only the planned files.
