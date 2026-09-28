# Mock colour — pilot plan

Spec: [mock-colour](../specs/mock-colour.md). Branch `mock-colour`, worktree
`.worktrees/mock-colour`. One commit per part, so each part can be kept or
dropped on its own.

## Ground rules

- Every new `MockFrame` option is opt-in and defaults off: `app` unset,
  `toolbar` true, `desktop` false. A page with no pilot screen must build
  byte-identical to the baseline `dist/` taken at 905d027.
- No new `--step` anywhere: added columns and panels are static, so
  `expectedSteps` in `scripts/verify.mjs` does not change.
- The shared page templates (`products/[slug].astro`, `work/[slug].astro`)
  are not touched in the pilot.

## Tasks

1. **Baseline.** Build at 905d027 and keep a copy of `dist/` in the session
   scratchpad for the byte-diff.
2. **Part 1: Creators Sphere theme.** `MockFrame` gains `app?: 'creators-sphere'`,
   which sets a class. `global.css` scopes the app's palette onto the semantic
   tokens under that class, light and both dark blocks, including the `-soft`
   status tints. The five Creator mocks pass the attribute. Commit.
3. **Part 2: Accounting realism.** Read the Accounting walkthrough; drop the
   toolbar (`toolbar={false}`) only where the real screen has none. New tokens
   for initials fills and file-type marks (`--color-file-*`), both themes. Tint
   the page behind cards where a screen shows cards. Commit.
4. **Part 3: Contract landscape.** `MockFrame` gains `desktop`: a 760px canvas
   at 16:10, scaled to its slot with CSS `zoom` from one `ResizeObserver`
   script, with a CSS fallback. Map each Contract mock to its screen in the
   research note first; widen only with what that screen shows (Submissions
   grid columns, the chatbot's conversation list). Commit.
5. **Verify** (below) and show the founder.

## Verification

- `npm run check` 0 errors, 0 warnings; `npm run build` all checks passed.
- Byte-diff of `dist/` against the baseline: only the three pilot pages, the
  home page (wall) and `/products/` (cards) may differ. Anything else is a
  leak from a default that is not off.
- `grep` for raw hex in `src/components/mocks/`: none.
- Screenshots of the three pilot pages and the home wall, light and dark, at
  1280 and 390 wide, next to the same shots from the baseline build (not
  live: live lacks 7137a03, the label fix).
