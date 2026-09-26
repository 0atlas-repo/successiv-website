# Claude Code — Successiv website

Read `docs/BRIEF.md`, `docs/COPY.md`, and `docs/BUILD.md` before coding.
Design and build decisions are recorded in `local_pm/projects/product-led-site/specs/`.

## Mission

Build the Successiv marketing site from those docs. Product-led. No real client names. No real screenshots — mocked UI only.

## Products on the homepage product grid

Creators Sphere, Shopmgr, KYC, Accounting.

Accounting was added 2026-09-17. It is a real product in closed beta, shipped
with `preRelease: true` so the page says so. No launch date is claimed because
none has been given.

The product brands itself "Creators Sphere" (plural) on its own site at
creatorsphere.sg. `docs/BRIEF.md` said "Creator Sphere" until 2026-09-26, when
it was corrected; the live product wins. `docs/COPY.md`,
`docs/hiring/DESIGNER_BRIEF.md` and `docs/references/DESIGN_REFERENCES.md`
still use the singular.

## Hidden products (2026-09-17)

**1line.ai and Leave are hidden at the founder's instruction.** Both carry
`hidden: true` in `src/content/products.ts`. The entries stay in the file; the
`products` export filters them, so there is no card, no `/products/<slug>/` page,
and no sitemap entry. `scripts/verify.mjs` asserts both pages are absent, so
unhiding one by accident fails the build.

Neither is a content gap. 1line.ai is a working LLM gateway with metering and
billing that has not been cleared for publication — the `needsCopy` placeholder
and the depth exemption in `scripts/verify.mjs` still apply if it returns. Leave
is real but its copy was grounded only in a one-shot importer, so it claimed
nothing about screens or balances. Do not unhide either without asking.

Two previously live URLs now 404: `/products/leave/` and `/products/1line-ai/`.

## Claims must trace to code (2026-09-17)

Every product and work entry was rewritten against its source repository. Four
claims on the site turned out to have nothing behind them and were corrected:

- **KYC** claimed a selfie and document matching. There is no liveness check, no
  face match, no text recognition, and no bureau lookup. Review is manual. The
  copy now says so.
- **Document signing** did not exist. The entry is now "Document bundling &
  redaction", and capability 04 was retitled from "Contracts signed where the
  work is". **Nothing on this site may claim e-signature.**
- **Ops incident reporting** claimed rule-based severity and routing to a named
  owner. Neither exists. It is an assistant that answers from an indexed
  procedure library and drafts an action checklist a person confirms.
- **Retail / mall commerce ops** had no supporting repository at all. The entry
  was removed. Do not reinstate it without one.

If you add a claim, you must be able to point at the code that does it.

## Animated mock screens (2026-09-24)

Mocked screens can arrive in steps as their `.reveal` wrapper scrolls into
view. The mechanics (`--step`, `.mock-before`, the timing vars, reduced
motion) are documented where they live: the `/* Mock steps … */` comment in
`src/styles/global.css` — read that before adding a step.

What isn't in that comment:

- `scripts/verify.mjs` pins the exact step count per screen, in page order
  (hero, then one step per stage) — `expectedSteps` in section 9, keyed by
  page path (`products/<slug>`, `work/<slug>`), and a `frameCount` check in
  section 10. Add, remove or reorder a step on any product or work page and
  you must update that page's entry or the build fails. Section 9 also checks
  that every screen's steps arrive in that order and that each `--swap` fires
  on the step it names — a longer `--mock-lead-in` on a middle step would
  otherwise let a later step land first. Convention for a slow, background
  result: put the same `--mock-lead-in` on the `--swap` and the `--step` it
  swaps to, and on every later step in that screen.
- Every label a mock shows must trace to the shipped app's code, not to
  marketing copy — cite the research doc in a comment at the top of the mock
  file. A product cites `local_pm/research/2026-09-24-<product>-ui-walkthrough.md`,
  which ships in this repo; a work entry's walkthrough is kept out of this
  public repo, so its mock files cite it by name only. Section 10 of
  `scripts/verify.mjs` greps every page listed in its `retiredClaims` table —
  a literal list, keyed by page path — for claims that must never come back.
  Adding a page there is manual: it also needs an entry in section 9's
  `expectedSteps` (section 10 reads `expectedSteps[slug].length`), or the
  build throws instead of failing cleanly.
- The same two switches work on both halves of the site: `src/content/products.ts`
  (rendered by `src/pages/products/[slug].astro`) and `src/content/work.ts`
  (rendered by `src/pages/work/[slug].astro`). Setting `solution` (1–2
  sentences, ≤45 words) swaps the long-form section for "Our solution", never
  both — on a work entry this also drops the Problem/Approach/Outcome row.
  Separately, giving every entry in `steps[]` a `screen` renders each step
  with that screen beside it and drops the separate Screens gallery — on a
  product, if only some steps have a screen the gallery still shows every
  screen after the first; a work entry's `steps[].screen` is required once
  `steps` is set at all, so a work page with steps never shows the gallery.

- The home hero is `src/components/MockWall.astro` (2026-09-26): 25 screens
  pulled from `products.ts` and `work.ts` step screens, round-robin across
  entries, each captioned with its entry and step title and linked to its
  page. It adds nothing to either data file, so a new step or entry shows up
  on the wall by itself. Its badge counts screens and entries from the data;
  never hard-code either number.

Full spec: `local_pm/projects/mock-animation/specs/mock-animation.md` (the
Accounting pilot) and `local_pm/projects/mock-rollout/specs/mock-rollout.md`
(2026-09-24: the same pattern on Creators Sphere, Shopmgr, KYC and the eight
work pages).

## Do not

- Mention [redacted-client], [redacted-client], [redacted-client], or any other real client
- Copy proprietary screenshots from internal repos
- Invent fake revenue/user metrics

`npm run build` runs `scripts/verify.mjs`, which greps the built `dist/` for
client names and internal repo slugs. It fails the build on a hit. It does
not type-check — run `npm run check` (`astro check`) as well before trusting
a change.

## Stack

Astro + Tailwind v4 + TypeScript, static output, deployed to GitHub Pages.

Live today at `https://0atlas-repo.github.io/successiv-website/`, the project
page. **Not** `successiv.com` — that is the intent, not the state, and
`scripts/verify.mjs` fails the build if a `CNAME` reaches `dist/`, because a
CNAME would override the project-page URL. Deployment, the two env shapes, the
rollback procedure and the open hosting blocker are in `docs/DEPLOYMENT.md`.

`docs/BUILD.md` suggests Next.js; Astro was chosen instead because the existing
work at `successiv.com/rebuild/` was already Astro with the brand tokens in
place, and static output is a cleaner fit for Pages.

## Conventions

- Components read from `src/content/*.ts`. Copy, nav, email, and product data
  are data, not markup — change them there, not in a page.
- Components use semantic colour tokens only (`bg-bg`, `text-fg`, `bg-action`,
  and the status set `bg-ok-soft`/`text-ok`, `bg-warn-soft`/`text-warn`,
  `bg-danger-soft`/`text-danger` for status pills on the mocked screens). Never
  a raw hex, or the light theme breaks.
- `MockFrame` takes a `chrome` prop: `window` (the default, and the only one
  with the title-bar dots), `sidebar`, `tabs`, `panel` and `phone`. A screen
  opts in with one attribute; the shell is never edited per screen. **`phone` is
  a claim** — a device frame says the product ships to a phone, so it is only
  used where the product's own copy says so. As of 2026-09-24 that covers
  every Creators Sphere step, three of KYC's screens, and Accounting's upload
  step (`acct-upload`) — each backed by copy that names a phone app.
  Chrome words stay generic app furniture (Overview, Records, Search, Filter);
  never name a capability in chrome, and never `Sign`.
- Page grids that hold a mock stay `grid-cols-1` below their breakpoint, and
  the mock's auto-margined wrapper stays `w-full` — so a wide mock can't push
  its step text off a narrow phone screen (2026-09-24).
- Product grid cards — on the home page and on `/products/` — show `cardScreen`
  when a product sets it, otherwise `screens[0]`. No product sets it today.
  The product's own page still leads with `screens[0]`.
- The mocked screens' title-bar dots use `bg-win-close`/`bg-win-min`/`bg-win-max`
  instead — constants, not semantic tokens, because a real title bar shows the
  same three colours on a light desktop and a dark one. Kept separate from the
  status tokens on purpose, so a window button is never read as a status.
- Two themes ship. Light is the default surface, per
  `docs/hiring/DESIGNER_BRIEF.md`; dark is the alternate, applied on explicit
  choice or when the OS asks for it. Check both before calling a change done.

## Prefer

- Accessible components
- Honest placeholder copy where details are thin
