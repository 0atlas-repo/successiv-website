# Plan — chrome variants for the mocked screens

Spec: `../specs/mock-chrome-variants.md`. Branch `mock-chrome-variants`,
worktree `.worktrees/mock-chrome-variants`.

## Shape of the work

One file gains a prop; thirty-odd files gain one attribute each. No screen
body is rewritten — that was the founder's standing objection to the last
rollout and it holds here.

`MockFrame.astro` grows `chrome?: 'window' | 'sidebar' | 'tabs' | 'panel' |
'phone'`, defaulting to `window`. The default must render byte-identically to
today, so every screen that says nothing is untouched in the output.

## Step 1 — the prop and the four new shells

All five live in `MockFrame.astro`. Shared: the outer `surface-card` border,
`role="img"`, `aria-label`, and an `aria-hidden` content slot at `p-4`.

- **window** — unchanged: dots, title, meta, avatar, 38px icon rail,
  Search/Filter toolbar.
- **sidebar** — 84px labelled nav (mark + four generic entries, first active),
  no dots. Top bar: breadcrumb from `title`, `meta`, avatar, inline search.
- **tabs** — no rail. Top bar with mark, title, meta, avatar; below it three
  generic tabs (first active) and a two-segment control on the right.
- **panel** — no title bar. Section header: `title` at heading weight, `meta`
  as a pill, an overflow control; a thin toolbar under it so the frame still
  reads as software rather than a list.
- **phone** — 272px device frame, `rounded-[26px]`, status bar (time, signal,
  battery), a compact header with `title`/`meta`, content, bottom tab bar of
  four icons with the first active. Content padding drops to `p-3` because the
  screens were drawn for card width, not phone width.

## Step 2 — assignment

Product screens (10 attribute edits; the rest keep the default):

| chrome | screens |
|---|---|
| `phone` | `creator` |
| `sidebar` | `creator-proof`, `creator-insights`, `shop-knowledge`, `shop-tickets` |
| `tabs` | `identity`, `kyc-share` |
| `panel` | `acct-extract`, `acct-journal`, `acct-close` |
| `window` | `chat`, `kyc-review`, `calendar`, `generic` |

Work screens, one shell per engagement so each case study is internally
consistent, and no `phone` anywhere — no work entry's copy puts a screen on a
phone:

| engagement | chrome |
|---|---|
| Tender / RFP management | `sidebar` |
| Capital / works contract management | `window` |
| Document bundling & redaction | `panel` |
| Ops incident support | `tabs` |
| Content / CMS platforms | `sidebar` |
| Enterprise SharePoint extensions | `tabs` |
| Awards / recognition portals | `window` |
| Scheduling systems | `panel` |

## Step 3 — the duplicate home screen

`Product` gains optional `cardScreen`. `ProductCard` renders
`product.cardScreen ?? product.screens[0]`. Shopmgr sets `shop-tickets`, so the
hero keeps its chat thread and the card stops repeating it.

## Verification

1. `npm run build` — Astro build plus `scripts/verify.mjs`, 18 pages, no
   client names, no `CNAME`, both hidden products still absent.
2. `git diff` on the built output of one default screen proves `window` is
   unchanged.
3. Home page in both themes: five distinct shells, no screen drawn twice.
4. `/products/creators-sphere/` in both themes: the phone frame survives the
   rotated hero and the 268px card crop without the gig rows overflowing.
5. Grep the built `dist/` for `Sign`, `Export`, `Approve` in chrome — none may
   come from `MockFrame`.
6. Narrow viewport: the rail already hides under 380px; each new shell must
   degrade rather than overflow.
