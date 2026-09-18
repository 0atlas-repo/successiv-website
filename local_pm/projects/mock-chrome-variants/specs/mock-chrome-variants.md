# Spec — chrome variants for the mocked screens

Raised 2026-09-18 by the founder: "the mock screens, especially on the front
page, look the same, same menu bar, etc."

## The problem, measured

`MockFrame.astro` ends its header comment with the cause:

> No per-screen props: all 39 screens get the same shell from one file.

That was the right call during the mock-realism rollout — one edit reached 39
screens, which is what made the rollout affordable. It is the wrong call now
that the screens are finished, because the shell is the first thing a visitor
sees and it is identical everywhere:

- the same three window dots and the same avatar in the title bar
- the same 38px rail, the same four icons, the first one always active
- the same Search + Filter toolbar

`ProductCard.astro` makes it worst on the home page. The card crops the frame
at `h-[268px]` anchored `items-start`, so roughly the top 70px of every card —
title bar plus toolbar — is byte-identical before a single pixel of the screen's
own content appears. Four cards side by side read as four copies of one thing.

The screen bodies are not the problem. A chat thread, a gig feed with a balance
strip, a document field panel and a reviewer queue are already visibly
different. Only the shell repeats.

## A second, separate defect

`ChatMock` renders twice on the home page: once in the hero (`Hero.astro`) and
once as the Shopmgr card, because Shopmgr's `screens[0]` is `chat`. The same
drawing appears twice, one scroll apart. This is a bug independent of the shell
question and is fixed here.

## What we are building

A `chrome` prop on `MockFrame`, defaulting to the current shell, with five
values. Screens opt in by passing one attribute; no screen body is rewritten.

| chrome | shell |
|---|---|
| `window` | today's shell — dots, rail, Search/Filter. The default. |
| `sidebar` | labelled left nav, no dots, breadcrumb + search top bar |
| `tabs` | top tab strip, no rail, segmented control instead of Filter |
| `panel` | no title bar — a section header, meta pill and overflow control |
| `phone` | narrow device frame, status bar, bottom tab bar |

## What chrome may and may not say

Chrome is decorative and generic. A nav rail, a tab strip and a search field
claim nothing about what a product does, which is why they were safe in the
first place and stay safe now. Three rules hold:

1. **`phone` is a claim.** A device frame says the product ships to a phone.
   It is only used where the product's own copy says so. `creator` gets it
   because Creators Sphere's steps say "Tap apply on an open campaign" and the
   gig feed is the creator's own view. Accounting's copy does name "a companion
   phone app", but it describes a client question queue that has no mock, so
   Accounting does **not** get a phone frame — the screens we actually drew are
   the bookkeeper's.
2. **No chrome control is named for a feature.** No `Export`, no `Approve`,
   and never `Sign` — e-signature is banned site-wide by CLAUDE.md.
3. **Never a bare title bar.** The `MockFrame` comment records why: three dots
   and a title "reads as a diagram of a list rather than software". Every
   variant keeps at least one navigation affordance and one toolbar affordance.
   `panel`, which has no title bar at all, carries a section header instead.

Unchanged: `role="img"` with an `aria-label` on the outer frame, every added
chrome element `aria-hidden`, semantic colour tokens only, and `bg-win-*` dots
confined to `window` — they are window buttons, not statuses and not tab dots.

## Assignment

Only `phone` needs product evidence. The rest is composition: one shell per
product surface, so a product's screens agree with each other, and so the four
home cards differ from each other and from the hero.

| screen | chrome | why |
|---|---|---|
| `creator` | `phone` | creator's own view; "Tap apply on an open campaign" |
| `creator-proof`, `creator-insights` | `sidebar` | the brand's campaign side |
| `chat` | `window` | a conversation seen from the portal staff review |
| `shop-knowledge`, `shop-tickets` | `sidebar` | "Operators get a portal" |
| `identity`, `kyc-share` | `tabs` | the holder's own document set |
| `kyc-review` | `window` | the reviewer's desk |
| `acct-extract`, `acct-journal`, `acct-close` | `panel` | document-first work |
| work screens | spread by family | see the plan; each engagement internally consistent |

Home page after the change: hero `window`, then `phone`, `sidebar`, `tabs`,
`panel` across the four cards. Five shells, no repeats.

## The duplicate hero screen

Shopmgr's `screens[0]` stays `chat`: it is the product's lead and belongs at
the top of `/products/shopmgr/`. A new optional `cardScreen` on `Product`
lets the home grid show a different screen for that product only —
`shop-tickets`. The hero keeps the chat thread it was built for.

## Verification

- `npm run build` passes, including `scripts/verify.mjs`.
- Home page shows five distinct shells and no screen twice.
- Every variant renders in both themes.
- Every variant survives the 268px card crop and the product-page hero size.
- No `phone` frame on a product whose copy does not put it on a phone.
