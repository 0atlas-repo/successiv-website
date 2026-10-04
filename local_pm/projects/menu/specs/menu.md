# Menu — Products · Work · Contact

Date: 2026-10-05 · Branch: `menu` · Status: approved by the founder ("do it", 2026-10-05)

Chosen from version A ("Quiet line") on the round-2 board:
https://claude.ai/artifact/24LAHAxg62vSuuMXHpHjuj

## What

1. **Three items.** The nav is Products · Work · Contact (`site.nav`), in the header, the
   phone menu and the footer. Capabilities and About leave the nav.
2. **No Talk to us pill.** Contact is the last item, full colour, with an arrow that
   slides on hover. The phone menu shows the address under the links instead.
3. **Hover and current page.** Hover draws a 2px cyan line under the item, left to
   right. The current page shows a small cyan dot under it.
4. **Theme switch.** The boxed button becomes a bare icon after a hairline divider.
   Switching washes the new theme out from the icon in a circle (View Transitions;
   instant when unsupported or under reduced motion). The footer and the phone menu
   get Light · Dark · Auto. Auto clears the saved choice, so the site follows the
   system again (today a saved choice can never be cleared).
5. **Phone menu.** The two-line button opens a full-height deep-navy panel, the same in
   both themes, revealed as a circle from the button. Big numbered links, the address,
   the theme choice. Escape and a link tap close it; focus moves into the panel on
   open and back to the button on close; the page behind does not scroll.
6. **About folds into Contact.** `/contact/` runs: the ask and the address, then the
   team (the `Team` component, with bios), then "Who we are" (the About copy, `id="who"`),
   then the principles. The separate "Who you will hear from" list goes, since `Team`
   now says the same.
7. **Old URLs keep working.** `/about/` redirects to `/contact/#who`, `/capabilities/`
   to `/`. The two page files are deleted. The proof strip's cells stop linking to
   `/capabilities/` and become plain cells.

## Why

The Deep signal sample the founder picked on 2026-10-03 had a three-item menu with no
pill; the hero shipped but the header kept the old five items, a pill and a boxed
switch. The audit scored action and reaction at 2; nav links changed colour only.
Contact was the thinnest page (946px) and repeated About's team list.

## Constraints

- Semantic tokens and the brand constants only; both themes; reduced motion.
- Header over the home hero stays see-through, as today.
- `scripts/verify.mjs` route list changes with the pages: it must fail if `/about/` or
  `/capabilities/` stops redirecting, or if a nav item or the pill comes back.
- No new claims. Copy is moved, not written, except the phone menu's ask line, which
  reuses the CTA's "Email us what you are trying to fix."

## Out of scope

Body sections (Receipts, Assembly, and the rest) — next spec. `docs/DEPLOYMENT.md`'s
smoke-test URL list is updated to the new routes, nothing else in it.

## Verification

- `npm run check` 0 errors; `npm run build` passes all verify checks.
- Built `dist/about/index.html` and `dist/capabilities/index.html` are redirects to the
  right targets under the base path.
- Browser, both themes, 1440 and 390: header shows three items, no pill; current-page
  dot on /products/ and /work/; hover line; theme icon flips and persists; Auto clears
  `localStorage` and follows the OS; phone menu opens, Escape closes and returns focus;
  no sideways scroll on any page; no console errors.
- Home: header still see-through over the hero, frosted after it.
