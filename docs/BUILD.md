# Build notes (for Claude Code)

## Suggested stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Static-friendly marketing site; contact via mailto or Formspree placeholder
- Deploy later to Vercel (or preferred host) on `successiv.com`

## Implementation checklist

- [ ] Scaffold Next.js app in repo root (or `apps/web`)
- [ ] Global layout: nav (Products, Work, Capabilities, About, Contact) + footer
- [ ] Home with hero, product grid (4), how-we-work, selected work, CTA
- [ ] `/products` + 4 product pages with mocked UI components
- [ ] `/work` with ≥4 anonymized cards + mocks
- [ ] `/capabilities`, `/about`, `/contact`
- [ ] SEO: title/description, Open Graph placeholders
- [ ] `npm run build` passes
- [ ] Grep for forbidden client names ([redacted-client], [redacted-client], [redacted-client], etc.) — must be zero

## Mocked UI guidance

- Use abstract layouts: lists, kanban, chat bubbles, form steps, calendar chips
- Neutral labels (“Store A”, “Vendor”, “Applicant”)
- No logos of real brands; no photos of real UIs

## Definition of Done

Site is deployable, product-led, client-safe, and readable on mobile.
