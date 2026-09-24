# Spec — animate the mocked screens as they scroll into view

**Status:** draft, awaiting founder approval
**Branch:** `mock-animation`
**Date:** 2026-09-24
**Pilot:** Accounting (`acct-extract`, `acct-journal`, `acct-close`)

## Why

The founder's words: *"there are a lot of mock screenshots on each product/project
pages, do you think we can add animations when we scroll to that, so to show how
the app works?"*

The 36 screens under `src/components/mocks/` are static. They show one frame of
an app. A short sequence as the screen arrives — the document's fields filling,
the entry's lines landing, the periods locking — tells the reader what the
product *does*, not only what it looks like.

Accounting is the pilot because its three screens are a pipeline
(extract → journal → close) and its copy already names each step
(`src/content/products.ts`, `steps[]`).

## What exists today

- Every screen renders inside a `.reveal` wrapper: the product-page hero
  (`src/pages/products/[slug].astro:66`), the "Screens" grid (`:125`) and the
  product cards (`src/components/ProductCard.astro:26`).
- `src/layouts/Layout.astro:97` adds `.is-visible` to a `.reveal` once it is 15%
  on screen, and then stops watching. So "play once, on scroll" is already
  signalled. No new JavaScript is needed.
- `src/styles/global.css:245` handles reduced motion by setting
  `animation-duration: 0.01ms !important`. It does **not** zero
  `animation-delay` (see Invariant 3).

## Design

One shared rule in `global.css`, next to `.reveal` and the marquee:

```css
.reveal.is-visible .mock-step {
  animation: mock-step-in <duration> var(--ease-brand) both;
  animation-delay: calc(<lead-in> + var(--step) * <interval>);
}
```

A screen opts in by adding `class="mock-step"` and `style="--step: N"` to the
elements that should arrive in order. `MockFrame` is not edited. Per-screen files
only gain attributes. The keyframe animates `opacity` and `transform` only.

The lead-in waits for the wrapper's own 700ms reveal to mostly finish, so the
frame arrives first and its content second. The durations are tuning values. They
live as custom properties in `global.css`, not as numbers scattered across files.

## Invariants

1. **The last frame is today's markup.** When the sequence ends, every screen
   renders exactly as it does on `main` now. No element is added, removed, reworded
   or re-coloured by the animation. Only opacity and transform move, on elements
   that already take up their space. So: no layout shift, and no `display` or
   `height` changes.
2. **Without the trigger, nothing is hidden.** The rule applies only under
   `.reveal.is-visible`. A screen outside any `.reveal`, or on a page with no
   JavaScript, shows its final state. It must never get stuck invisible.
3. **Reduced motion shows the final state immediately.** The reduced-motion
   block gains `animation: none` for `.mock-step`. Without it, `fill-mode: both`
   plus a surviving delay would leave rows hidden for up to a few seconds and then
   pop them in. The theme-independent check is the same as Invariant 1: with
   reduced motion forced on, a screenshot matches `main`.
4. **Every frame is a claim.** An in-between state says the product does that
   thing (lessons.md, 2026-09-18, "A noun added to a claim is a new claim"). Each
   step below traces to a line of `products.ts`. Nothing is shown resolving,
   posting or closing that the copy does not grant.
5. **Plays once.** No loop, no replay on scroll-back. The observer already stops
   watching once the screen is visible.

## The three pilot sequences

Each screen stands alone. Extract sits in the hero, while Journal and Close are
in the grid far below, so they are never on screen together. No cross-screen
choreography is promised.

### `acct-extract` — "Bookkeeping — Review"

| Step | What arrives | Traces to |
|---|---|---|
| 0 | Document thumbnail | `steps[0]` "Send the document" |
| 1–5 | Supplier, Date, Amount, Currency, Terms, one row at a time with its tick | `steps[1]` "Fields are read from the document" |
| 6 | Warn box "Open question — Which account does this belong to?" | `steps[2]` "asks a specific question instead of guessing" |

**Ends on the open question, which stays open.** No answer, no cursor, no
candidate accounts. The file's own comment forbids auto-resolution and a
shortlist.

### `acct-journal` — "Bookkeeping — Entry"

| Step | What arrives | Traces to |
|---|---|---|
| 0 | Column header | — (chrome) |
| 1–5 | The five lines, top to bottom | `steps[3]` "booked against the chart of accounts" |
| 6 | "Unreviewed rule" pill on 6100 | `detail[2]` "a rule not yet validated … is marked as such" |
| 7 | Total row, 104.00 / 104.00 | `detail[2]` "an unbalanced entry cannot reach the ledger" |
| 8 | Footer "Document SGD 104.00 · Booked USD 76.76" | `detail[2]` "held both in the currency on the document and in the entity's booking currency" |

**Does not show** the rule being reviewed, the pill clearing, or a "Posted" state.

### `acct-close` — "Bookkeeping — Period close"

| Step | What arrives | Traces to |
|---|---|---|
| 0–4 | Oct 2025 → Feb 2026, each with its Closed pill | `steps[4]` "a closed period locks" |
| 5 | Mar 2026, Open, "3 bank lines unmatched" | `steps[4]` "Bank lines are matched to entries" |
| 6 | Lock footnote "A closed period accepts reversals only." | `detail[3]` "permits only reversals afterwards" |

**Does not show** Mar 2026 closing, or its unmatched count going down. That would
claim that matching happened.

## Where it plays

Everywhere the component renders: the product-page hero, the "Screens" grid, and
the product cards on `/` and `/products/`. All three are already `.reveal`
wrappers, so this costs no extra code. Limiting it to product pages would need a
scoping class on the page wrappers.

The card shows a cropped view (`c3a86f8`). On the card, the steps below the crop
play off-screen, which is harmless.

## Out of scope

- The other 33 screens. They roll out after the pilot is signed off, as a
  separate plan.
- A synthetic cursor. It is the riskiest element for false claims, because a
  click implies a control exists. It is also the hardest to do in CSS alone.
  Revisit after the pilot if the sequences feel too passive.
- Counting numbers up (e.g. 0 → 104.00). That needs JavaScript and an in-between
  value that is never a real total.

## Open questions for approval

1. **Cards animate too?** Recommended: yes, as above. The alternative is
   product pages only.
2. **Pace.** Proposed: about 3 seconds end to end per screen (a 500ms lead-in,
   steps about 180ms apart, each lasting 400ms). This will be tuned by eye on the
   pilot.

## Verification

| What | How | Expected |
|---|---|---|
| Build and claim checks pass | `npm run build` (runs `scripts/verify.mjs`) | exit 0 |
| Sequence plays once, in order | `/browse` → `/products/accounting/`, scroll to each screen, screenshot at intervals | steps arrive in the table order; scrolling back does not replay |
| Final frame equals `main` | screenshot each screen after it settles, and the same on `main` | pixel-identical, in light and dark |
| Reduced motion | emulate `prefers-reduced-motion: reduce` | final state on first paint, with no delayed pop-in |
| No layout shift | Lighthouse CLS on `/products/accounting/` and `/` | CLS unchanged from `main` |
| Other screens untouched | `git diff main --stat` | only the three Acct files, `global.css`, `local_pm/` |
| Cards | `/` product grid, Accounting card | animates within the crop; the frame never jumps |
