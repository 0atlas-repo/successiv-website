# Spec — make the mocked screens read as a real app

**Status:** approved by founder, pilot in progress
**Branch:** `mock-realism`
**Date:** 2026-09-18

## Why

The founder's words: *"at this point they look like wireframe."*

The 39 hand-built screens under `src/components/mocks/` are the hero element of
this site. Every page that sells a product or a piece of work leads with one.
If they read as a schematic, the site reads as a pitch deck for software that
does not exist yet — which is the opposite of what the last two days of copy
work was for.

## Where the wireframe look actually comes from

Read the files first. It is not the frame.

`.mock-frame` in `src/styles/global.css:216` already carries a two-layer drop
shadow per theme, and `.mock-wash` puts a cyan bloom behind a floating screen.
Depth at the outer edge is done. The problem is entirely inside the frame.

1. **Drawn at diagram scale, not UI scale.** Body copy in the mocks is
   `text-[9px]` to `text-[10.5px]`; column labels are `[9px]`. A real screenshot
   is 13–14px product UI optically reduced. These were authored tiny, so they
   carry none of the density cues of a shrunk screenshot.
2. **No application shell.** `MockFrame.astro` is three dots and a title. Real
   software has a left rail, a toolbar with search and a primary action, and a
   breadcrumb or tab row. Without those, a card is a diagram of a list.
3. **No interaction state.** Every row in every mock renders identically. Real
   software always shows a selected row, a hover row, a focus ring. Uniformity
   is the single strongest wireframe tell.
4. **Monochrome.** One `text-action` accent per screen. Status words like
   "Verified" and "Pending" are grey text, never tinted pills. `global.css` has
   no `ok` / `warn` / `danger` token, so nobody could have built a pill without
   a raw hex — which the light theme forbids.
5. **Too sparse.** Three rows, nothing overflowing the bottom edge, no avatars.
   Real screens are dense and cropped mid-content.

## What changes

**Layer A — the shell.** One edit to `MockFrame.astro` reaches all 39 screens.
A left icon rail and a toolbar row wrap the existing slot; the content pane sits
on `bg-bg` inside a `bg-surface` frame so there is an inner edge as well as an
outer one. All added chrome is decorative and stays behind `aria-hidden`, with
the frame's existing `role="img"` label unchanged.

**Layer B — the contents.** Per-screen, piloted on two before any rollout:
type sizes up (9 → 11, 10.5 → 12), one selected row on `bg-surface-2`, status
pills, five or six rows with the last masked off the bottom edge,
`tabular-nums` on every figure, initials circles where a person is implied.

**Tokens first.** `--color-ok`, `--color-warn`, `--color-danger` and a soft
variant of each, defined in `@theme` and overridden in both dark blocks. Pills
are impossible without them and raw hex breaks the light theme.

## What must not change

Richer mocks invite invented features. These are the lines, and they are the
reason this spec exists rather than a one-line task:

- **KYC gains no face match, liveness check or bureau lookup indicator.**
  Review is manual. Corrected once already on 2026-09-17; do not regress it.
- **The bundling screen gains no Sign button, and no mock anywhere gains one.**
  Nothing on this site may claim e-signature.
- **The incident screen gains no severity badge and no routed owner.** It
  answers from an indexed procedure library and drafts a checklist a person
  confirms. Nothing more.
- **No KPI tiles.** A row of big aggregate numbers is the first thing a
  "dashboard look" reaches for, and every one of them would be an invented
  metric. Per-record figures already on screen (`SGD 84.00`) are fine because
  they are illustrative line items, not business results.
- **Labels stay neutral** — "Store A", "Vendor", "Applicant". `scripts/verify.mjs`
  greps `dist/` for client names and fails the build on a hit.
- **`GenericMock` stays sparse.** Its emptiness is a recorded decision about
  1line.ai not being cleared for publication, not a screen nobody finished.
- **No new runtime dependency.** Static Astro site; no React, no chart library,
  no avatar service. Hand-built SVG and CSS only.

Every control added to a screen must point at code that does the thing. Same
rule as the copy.

## One flag, recorded and closed

The no-screenshot rule is the founder's own, and following it means hand-faking
what their own shipped products look like. Raised on 2026-09-18; the founder
said go. Rule stands. Not to be reopened by Claude.

## Verification

- `npm run build` green, including `scripts/verify.mjs`.
- `npm run check` clean.
- Both themes screenshotted, at product-card width and at product-detail width,
  since the same component renders at both.
- No `#` hex literal introduced in any component file.
- `/products/leave/` and `/products/1line-ai/` still absent from `dist/`.
- Founder reviews the pilot screens before the remaining 37 are touched.
