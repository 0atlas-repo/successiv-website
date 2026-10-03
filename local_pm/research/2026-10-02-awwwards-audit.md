# Awwwards-bar design audit — live site

Date: 2026-10-02
Target: https://0atlas-repo.github.io/successiv-website/
Bar: Awwwards / FWA / Webby site-of-the-day.

## Method

- gstack `browse` only. Viewports 1440x900 and 390x844. Light (default) and dark (`data-theme=dark`).
- Pages: home, /products/, /products/accounting/, /work/, /work/tender-rfp-management/ (first link on /work/), /capabilities/, /about/, /contact/.
- Whole page scrolled in 400px steps first so `.reveal` fired, then viewport screenshots stepped down the page.
- Dark captured at 1440 for home, accounting and work, and at 390 for home only. The other dark pages were not captured.
- Mobile overflow checked as `scrollWidth > innerWidth` on all 8 pages at 390. Console errors checked on all pages.
- Hover: the headless `hover` did not reliably fire `:hover` computed styles, so hover reactions are taken from the source classes (Btn, Header, ProductCard, Principles, ProofStrip). Evidence: one dark /products/ screenshot caught a card in hover state (lifted about 4px, cyan border, mock straightened).
- Press (`:active`) and keyboard focus were not exercised. Only the global focus ring was read from CSS.
- Limits: no real Awwwards winners were compared side by side. Scores are judgement against remembered winners, not measured.

## Score table (1-5)

| Axis | Score | One-line verdict |
|---|---|---|
| Structure | 3 | Clear and honest, but every page is the same hero then kicker/H2/lede then card grid |
| Spacing / rhythm | 3 | Consistent 100px bands; too even, with dead zones and one broken cell |
| Layering / depth | 3 | Wall, wash and soft shadows are good; below the fold it is flat cards |
| Colour | 3 | Restrained and coherent in both themes; single blue accent, no tonal drama |
| Animation / motion | 3 | Mock-step reveals and the drifting wall are distinctive; everything else is one fade-up |
| Detail / craft | 3 | Mock UIs are very high craft; page furniture has visible slips |
| Action and reaction | 2 | Lift-only hovers, no press state, no cursor or magnetic feedback, nav links change colour only |
| Uniqueness | 3 | Mocked-UI wall is ownable; layout around it is a template |

Overall: roughly 3 out of 5, a polished B2B template with one strong idea (the wall of mocked screens). It is not yet at site-of-the-day level.

## Evidence

### Structure (3)
- Home 1440: after the hero there are three consecutive sections with the same pattern, "kicker + H2 + lede + card grid": Products, Approach (01-03), Selected work.
- Every inner page (/products/, /work/, /capabilities/, /contact/, plus /products/accounting/ at the top) opens with the same gradient hero: blue kicker, 54px H1, grey lede, hairline. No page has its own entry moment.
- /capabilities/ 1440: a plain ruled list in the left 60% of the width. The right 40% is empty on all 7 rows, so it reads as unfinished.
- /contact/ 1440: the whole page is 946px tall. Hero, a mailto button and two names, then the footer. Honest, but there is nothing to remember it by.

### Spacing / rhythm (3)
- Home 1440: all content sections use `py-[100px]` with a 1px top rule. Vertical rhythm is metronomic, with no big-small variation.
- Home 1440, ProofStrip: the 7th cell spans 2 columns and sits on the wrong side of the grid. It has no right border and is visibly wider than its six siblings (known issue).
- Home 1440, Approach: Principles card 02's H3 wraps to two lines while 01 and 03 stay on one, so the body copy starts 21px lower and the baselines stop lining up (known issue).
- Home 1440, below the product grid: about 100px of white, then a hairline, then another section. The "See all work" ghost button floats alone under the work cards.

### Layering / depth (3)
- Home 1440: the hero wall (40 mock screens, columns drifting up and down) gives real depth and parallax. It is the best moment on the site.
- Home 1440 and 390: the hero headline sits over the faded bottom of the wall. The caption "Ops incident support" is a ghost behind the H1 at about 8% opacity, which reads as a rendering bug rather than layering.
- Product and work cards: a single `surface-card` plus a soft wash, same at every level. No z-variation, overlap or break-out of the grid.
- /products/accounting/ 1440: the hero mock is tilted with perspective and a blue glow. This is good, and it is the only perspective use outside the wall.

### Colour (3)
- Light: white, grey-blue surfaces, one cobalt accent (#0047BB). Accessible, but the whole site is two tones. There is no second accent or tinted section.
- Dark home 1440: cyan accent on near-black is strong, and the CTA and "the work." gradient look better than light. Dark is the more striking theme.
- Home 1440 light: the "the work." gradient text goes from deep indigo to cobalt, a low-contrast shift that reads as muddy next to the dark theme's cyan.
- Section changes use `bg-surface` vs white only, with no colour block or inverted band to break up the page.

### Animation / motion (3)
- Product and work pages: step-by-step mock reveals tied to scroll (`--step`) are well beyond template level.
- Home: marquee, wall drift and reveal-on-scroll are all there. Every non-mock element uses the same fade-up (translateY 18px, 0.7s), so no section has its own motion.
- No scroll-linked hero transition, text-split reveal, page transition or section pin. No `ClientRouter` or view-transition use found in `src`.
- Header is sticky and translucent, but wall content bleeds through it with no blur at 1440 (see defect 7).

### Detail / craft (3)
- Mock screens carry real-looking labels, status pills, tilt and shadows. This is excellent.
- Card tilt (`rotate-[-0.45deg]`) is invisible at normal viewing and just costs sub-pixel text blur on the mock.
- /products/accounting/ 1440: step numbers (02, 03) and step copy sit far from the screen they describe, with large empty white wedges. It looks like alternating layout with no connection line.
- 390 /products/accounting/ and /work/tender-rfp-management/: `scrollWidth` is 406 against 390. The page scrolls sideways 16px. Cause: `.mock-wash` with `-inset-10` in the hero.
- Home card still says "Coming soon" while the page says closed beta. Consistent enough, but "Coming soon" is the weaker word for a product already running.

### Action and reaction (2)
- Primary button (`Btn.astro`, header CTA): hover is `-translate-y-0.5` only. No colour, shadow or arrow change. No `active:` state anywhere in `src`.
- Nav links (`Header.astro`): colour shift to `text-fg` over 200ms. No underline, indicator or current-page marker that I could see.
- Product card and Principles card: lift 4px plus border tint plus the mock un-tilting. This is the best hover on the site. The ProofStrip cell just changes background.
- The only focus style is a global `:focus-visible` 2px accent outline. It is correct, but not designed. No custom cursor, magnetic or tilt-on-pointer.

### Uniqueness (3)
- The wall of 40 mocked screens captioned by entry, with honest "client build" labelling, is ownable and sells the product-led idea.
- Typography is Space Grotesk for headings with a wide, sci-fi wordmark. Distinct, but body and kicker styles are the Tailwind default.
- Below the wall the site is interchangeable with any Astro marketing template: bordered cards, numbered circles, ruled lists.
- The brand's own wordmark and orbital logo never show up as a graphic device anywhere in the page.

## Ranked defects (top 12)

| # | Defect | Impact | Likely file |
|---|---|---|---|
| 1 | Hover/press feedback is thin: buttons only lift 2px, no `:active`, nav links colour-only, ProofStrip cells background-only. This is the lowest-scored axis. | High | `src/components/Btn.astro`, `src/components/Header.astro`, `src/styles/global.css` |
| 2 | Below-the-wall pages are one template: the same kicker, H2, lede, card grid on 3 consecutive home sections, and the same gradient hero on every inner page. No section has a distinct moment or inverted band. | High | `src/components/SectionHead.astro`, `src/components/PageHero.astro`, `src/pages/index.astro` |
| 3 | Horizontal overflow at 390 on every product and work detail page (`scrollWidth` 406 vs 390), caused by `.mock-wash` using `-inset-10`. Clip it or use `inset-0`. | High, a real bug | `src/pages/products/[slug].astro:69`, `src/pages/work/[slug].astro:56`, `src/styles/global.css:326` |
| 4 | ProofStrip: the 7th cell spans 2 columns, ends without a right border and is visibly off-grid. (Known.) | Medium | `src/components/ProofStrip.astro` (`last:col-span-2`) |
| 5 | Principles card 02 heading wraps while 01 and 03 do not, so bodies start at different heights. Shorten the title copy or give the H3 a `min-h` of two lines. (Known.) | Medium | `src/components/Principles.astro`, `src/content/site.ts` |
| 6 | Home hero on mobile: the wall is almost invisible above the fold at 390, so the strongest asset is lost where most visitors will land. The H1 is the first thing, over a faded ghost row. | High | `src/components/MockWall.astro` |
| 7 | Hero text overlaps wall captions: "Ops incident support" shows as a ghost behind the H1 at 1440, and wall content bleeds through the sticky header with no blur. | Medium | `src/components/MockWall.astro`, `src/components/Header.astro` |
| 8 | /capabilities/ list uses only the left 60% of the width. Seven identical rows leave 40% blank. | Medium | `src/pages/capabilities.astro` |
| 9 | Step numbers and copy on the product/work pages sit far from the mock they describe, with large empty wedges, and no connector or progress device. | Medium | `src/pages/products/[slug].astro`, `src/pages/work/[slug].astro` |
| 10 | Motion is one effect: every non-mock element uses the same 18px fade-up. No scroll-linked, split-text or pinned moment, and no page transition. | Medium | `src/styles/global.css`, `src/layouts/Layout.astro` |
| 11 | /contact/ and the closing CTA are thin: one mailto button, two names, nothing branded. The page ends in about 100px of nothing before the footer. | Low-Medium | `src/pages/contact.astro`, `src/components/CTA.astro` |
| 12 | Colour is two tones. Light theme is white and grey-blue with a single cobalt, and the "the work." gradient is low contrast (indigo to cobalt). Dark theme is stronger than light. | Low-Medium | `src/styles/global.css` (tokens), `src/pages/index.astro` |

Minor, not in the top 12:
- Root `/favicon.ico` returns 404 (the declared icons are under `/img/`). Browsers still request it, which shows as a console 404 on some loads. It did not reproduce on repeated page loads.
- Card tilt is too subtle to see but blurs mock text slightly. `src/components/ProductCard.astro`.
- Home card says "Coming soon" for a closed-beta product. `src/components/ProductCard.astro`.

## What not to change

The mock-step reveals, the wall concept, the honest "illustrations, not customer data" framing and the dark theme are the site's strongest assets. Fixes should add contrast around them, not replace them.
