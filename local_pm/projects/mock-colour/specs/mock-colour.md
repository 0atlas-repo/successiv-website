# Mock colour: make the mocked screens look like real apps

Status: draft, awaiting founder OK (2026-09-28)
Follows: [mock-realism](../../mock-realism/specs/mock-realism.md) (shipped
2026-09-18: shells, selected rows, status pills, initials, density). Its
"What must not change" list applies here unchanged.

## Why

Every mock draws in the site's own palette: white cards, grey lines, one
Successiv blue. On the home wall, 25 screens from 12 builds read as one app
drawn 25 times. The founder's direction (2026-09-28): Creators Sphere has its
own colour and should wear it; enterprise apps, which is most of them, do not
need fancy colour. They need to look real.

## What

### 1. Creators Sphere wears its own theme

Taken from the shipped mobile app's theme file (`AppColors`, the app's
"Vibrant Magazine" system), not from marketing. Its public site leads with the
same coral.

| Role | App name | Value |
|---|---|---|
| primary (buttons, active tab, links) | coral | #FF5226 |
| pressed / error | coralDeep | #E63E16 |
| secondary | orange | #FF9322 |
| highlight | gold | #FFC73E |
| text | ink / ink70 / ink50 / ink30 | #2A1712 / #5C4A40 / #8C7C71 / #C4B8AE |
| lines | hair | #ECE5DE |
| tinted surfaces | peach / sun | #FFF1EB / #FFF7EC |
| success | success | #1F9D5B |

The app ships a light theme only. For the site's dark theme the mock gets a
dark variant from the same hues (warm near-black surfaces, coral kept), so a
dark page does not show a white slab.

### 2. Every other app: real, not colourful

No new accent; they keep the current neutral palette. Mock-realism already
added shells, pills, selected rows and initials. What still gives them away:

- **One toolbar everywhere.** The shells put the same Search + Filter bar on
  nearly every screen. Keep it where the app has one; elsewhere show what the
  app's screen actually has there (a count, a date range, a breadcrumb, or
  nothing). Needs a per-screen opt-out on `MockFrame`, not a per-screen shell.
- **Grey everywhere people and files appear.** Initials sit on muted, varied
  fills instead of one grey; file rows get file-type marks in their usual
  colours (PDF red, Word blue, Excel green). Muted, never loud.
- **Page and card are the same white.** A faintly tinted canvas behind white
  cards, as real admin apps have, where a screen shows cards.

Every added label still traces to code, per the existing rule.

### 3. Desktop screens are desktop-shaped (founder, 2026-09-28)

Of 53 mocks, 25 are full desktop app windows (`sidebar` 11, `tabs` 5,
`window` 9). They are drawn about 440px wide at whatever height the content
needs, so most come out square or portrait, which reads as a cropped widget.
Real desktop screenshots are landscape.

- Full app windows move to a 16:10 canvas at a real desktop width (about
  760px), scaled down as a whole to fit their slot, as a shrunk screenshot is.
- The wider canvas is filled the way the app fills it (a list plus a detail
  pane, or more table columns), and only with what the app's walkthrough shows.
  Where the app has nothing more, the screen keeps the whitespace.
- `panel` (19) stays compact: a panel is part of a screen, not a window.
  `phone` (9) stays portrait.
- Product and work pages may need to give the mock a wider share of the row,
  since a 16:10 screen in the current column is only about 275px tall. Checked
  in the pilot.
- The home wall mixes landscape desktop cards with portrait phones.
- Shopmgr keeps its screens at their current size and shape (founder,
  2026-09-28). Section 2 still applies to it.
- Which screens this reaches (counted 2026-09-28): no product other than
  Shopmgr has a full-window screen. Creators Sphere is 5 phone; KYC is a phone
  app plus a web request portal, drawn as 3 phone and 2 panel; Accounting is
  4 panel and 1 phone. So section 3 is 21 screens across seven of the eight work pages (Document bundling is all panels):
  CMS (4), Contract lifecycle (4), Tender (5), Incident support (3), the audit
  and link-check work (3), Awards announce (1), Scheduling calendar (1).

### Rules kept

- Tokens only. The Creators Sphere palette becomes scoped tokens (`--app-*`)
  set on its mock frames, defined for light and dark. Avatar and file-type
  fills are tokens too. No raw hex in a component.
- Client builds never take a client's brand colour: a recognisable colour can
  identify the client.
- Status colours (ok / warn / danger) stay reserved for status.
- Text on coral meets 4.5:1 contrast in both themes. Measured: white on coral
  #FF5226 is 3.24:1 and white on coralDeep #E63E16 is 4.15:1, so neither passes
  for normal text; ink #2A1712 on coral is 5.28:1. The app itself puts white on
  coral. Coral as text on white is also 3.24:1, so coral links need coralDeep
  or bold large text. Decide per element in the pilot, and record it.
- No change to what any screen claims.

## Pilot, then rollout

1. Pilot: Creators Sphere (section 1, phone), Accounting (section 2; its
   screens are panels and one phone, so section 3 does not reach it), and
   Contract lifecycle management (section 3: four full-window screens,
   including a register list). Check both themes, the pages and the home
   wall.
2. Founder looks at the pilot.
3. Roll section 2 across Shopmgr, KYC and the other work pages, and section 3
   across the other work pages with full-window screens.

## Verification

- `npm run check` 0 errors; `npm run build` all checks passed (verify.mjs pins
  step counts and retired claims, so mock edits cannot silently drift).
- Grep: no raw hex in `src/components/mocks/`.
- Contrast: measured ratio for text on each new fill, both themes.
- Screenshots: pilot pages and home wall, light and dark, 1280 and 390 wide,
  side by side with the live screens.
