# Plan — mock realism, pilot

**Spec:** [mock-realism](../specs/mock-realism.md)
**Branch:** `mock-realism`
**Date:** 2026-09-18
**Scope:** tokens + shell + two screens. The other 37 screens are explicitly
out of scope until the founder has seen these.

## Why a pilot and not the whole set

`MockFrame.astro` is imported by all 39 screens, so a change there is felt
everywhere at once. If the shell is wrong, it is wrong 39 times. Two screens are
enough to judge it, and both chosen screens are on the homepage, so the founder
can judge them at the size a visitor actually meets them.

## The two screens

| Screen | Where it renders | Why this one |
|---|---|---|
| `ChatMock` | homepage hero, floating and rotated | Largest, most-seen mock on the site. Conversation UI is the hardest thing to make look real, so it is the honest test. |
| `CreatorMock` | first card in the homepage product grid | Renders small and un-rotated. Proves the shell survives at card width, which the hero does not test. |

## Steps

1. **Status tokens.** Add `--color-ok`, `--color-warn`, `--color-danger` and a
   `-soft` companion for each to `@theme` in `src/styles/global.css`, then to
   both dark blocks (`@media (prefers-color-scheme: dark)` and
   `:root[data-theme="dark"]`). Contrast-check each against its own theme's
   `--color-bg` before use; record the ratios in the comment the way the
   existing token block does.

2. **Shell in `MockFrame.astro`.** Left icon rail plus a toolbar row wrapping
   the existing `<slot />`. Content pane on `bg-bg`, frame on `bg-surface`.
   New props are optional with defaults so all 39 existing call sites keep
   compiling unchanged — this is the constraint that decides the API.
   All new chrome decorative: `aria-hidden`, existing `role="img"` untouched.

3. **`ChatMock` contents.** Size bump, message density, one state cue.
   No invented capability: it answers from an indexed knowledge base, which is
   what Shopmgr's code does.

4. **`CreatorMock` contents.** Same treatment at card scale. Status pills get
   their first outing here.

5. **Verify.** Build, check, then browser at both themes and both widths.

## Verification

| What | How | Expected |
|---|---|---|
| Build | `npm run build` | Exit 0, `verify.mjs` passes |
| Types | `npm run check` | 0 errors |
| No raw hex | `grep -rnE '#[0-9a-fA-F]{3,8}' src/components/` | No match |
| Hidden products | `ls dist/products/` | No `leave/`, no `1line-ai/` |
| Light theme | browser, homepage, 1440px | Hero + first card read as software |
| Dark theme | browser, `data-theme="dark"` | Same, no washed-out pill |
| Card width | browser, product grid | Shell not crushed at small size |
| Other 37 | visual sweep of `/products/` and `/work/` | Shell defaults look right unstyled |

Last row matters: step 2 changes every screen whether or not its contents were
touched. The 37 untouched screens must not regress.
