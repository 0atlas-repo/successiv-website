# Spec — Successiv product-led marketing site

Date: 2026-09-17
Status: approved-in-conversation (founder answered all open questions)

## Why

`successiv.com` today sells a service: "Applied AI Solutions", founder-led studio,
three principles, team, contact. No products anywhere.

`docs/BRIEF.md` records a newer, explicit decision:

> Locked with founder: "product — we have that experience but we want users to know our products."

So the site must lead with Successiv's own products; delivery experience becomes the
proof underneath, not the pitch. This spec covers that rebuild.

## Decisions (answered by founder, 2026-09-17)

| Question | Decision |
|---|---|
| Content positioning | Brief wins — product-led, 0atlas parent, products first |
| Brand (colour/type/logo) | Existing site wins — no rebrand |
| Theme | **Both** light and dark, toggle + `prefers-color-scheme` |
| Stack | Astro 7 + Tailwind v4, reusing `successiv.com/rebuild/` |
| Hosting | GitHub Pages on custom domain `successiv.com` |
| Contact | `mailto:` only, no form |
| 1line.ai | **Include** as a 5th product (this is the BRIEF.md founder sign-off) |
| Work cards | 4 built out, remaining 5 as a list |
| Carry over | Team section · "Intelligence, applied successively" · Three principles |
| Not carried over | "Hong Kong" location tag (founder left it unchecked) |

## Brand constants (extracted, not invented)

From `successiv.com/css/style.css` and the official logo SVGs in `reference/`:

- Cyan `#5acaed` — in both the CSS and the logo artwork
- Ink `#231f20` — the logo's true black; becomes light-mode foreground
- Logo blue `#384f9e` — used in `successiv-logo-h.svg` / `logo-mark.svg`
- Site blue `#0047bb` — declared "Deep Tech Blue" in the CSS header

**Conflict:** the logo's blue and the site's blue are different values. Resolution —
keep `#0047bb` for site gradients and glows (it has shipped), add `#384f9e` as
`--color-indigo` so the logo artwork harmonises rather than clashes. Flagged for
founder; either can be dropped later by editing one token.

Type: Space Grotesk (headings) + DM Sans (body), already vendored via `@fontsource`.

## Theme strategy

Dark is the brand default. Light is derived, and is **not** a simple inversion:
cyan `#5acaed` on white is ~1.9:1 and fails WCAG AA for text. Therefore in light mode
the primary action colour is navy `#0047bb` on white (~8.6:1) and cyan is demoted to
decoration, borders, and hover states only.

## Scope

Seven routes, per `docs/BRIEF.md`:

```
/                 Home
/products         Product index
/products/[slug]  creator-sphere, shopmgr, kyc, leave, 1line-ai
/work             Anonymised case studies
/capabilities     AI apps · Shopify · SharePoint/M365 · Documents · Identity
/about            Successiv by 0atlas
/contact          mailto
```

Each product page carries: name, one-liner, problem, 3–5 step "how it works",
a mocked UI, and a CTA — the list `docs/BRIEF.md` requires.

## Non-negotiable constraints

- No real client names. Never render: [redacted-client], [redacted-client], [redacted-client], [redacted-client], [redacted-client], [redacted-client], [redacted-client],
  and never the private repo slugs (`[redacted-slug]`, `[redacted-slug]`, `[redacted-slug]`).
  The mapping table in `BRIEF.md` is internal only.
- No real screenshots. All product/case UI is hand-built SVG/CSS with neutral
  labels ("Store A", "Vendor", "Applicant").
- No invented revenue or user metrics. This is why the existing `Cases.astro`
  stat-card design (`[N]×`, `[N]%`) is **not** reused — it is a shape that begs
  for a fabricated number. Work cards use Problem → Approach → Outcome instead.

## Success criteria

1. `npm run build` exits 0.
2. Grep of the built `dist/` for forbidden names and slugs returns zero hits.
3. All seven routes exist as `dist/**/index.html`.
4. Every product in the content file has all six required fields.
5. Both themes render; no text below WCAG AA contrast in either.
6. Readable at 375px with no horizontal scroll.
