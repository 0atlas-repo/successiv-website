# Design references — Successiv

Reference sites the founder chose for inspiration (not to clone):

| Site | URL | Why it matters for Successiv |
|------|-----|------------------------------|
| **Scale AI** | https://scale.com | Enterprise AI credibility, product suite IA, case-study density, serious typography |
| **Pryzm** | https://pryzm.design | Visual craft, studio energy, “ship as code” product clarity, light tooling marketing |
| **Attio** | https://attio.com | Product-led SaaS storytelling, in-page product demos, agentic UI narrative, crisp CTAs |

Screenshots: `docs/references/screenshots/` (see `*-capture-log.txt` per site).

### Verified nav (from Sep 2026 captures)

**Scale** — Products · Solutions · Research · Resources · Log In · Get Started (`/demo`). Sampled: `/data-engine`, `/about`, `/customers/time`.

**Pryzm** — Inspiration (`/gallery`) · Lab (`/lab`) · Pricing (`/#pricing`) · Open studio (`/studio`) · Sign in. Sampled: `/gallery`, `/lab`, `/about`.

**Attio** — Platform · Resources · Customers · Pricing · Sign in · Start for free. Sampled: `/platform/workflows`, `/pricing`, `/customers`.

Capture pack: **25 PNGs** + 3 `*-capture-log.txt` files under `docs/references/screenshots/`.


---

## 1. Scale.com — what to steal (ethically)

### Positioning & voice
- Big, declarative hero: **mission + stakes** (“critical decisions”, “reliable AI”).
- Proof early: logos, “frontier” credibility, numbered years/stats.
- Products framed as a **platform suite** (Data Engine, GenAI Platform, Donovan, etc.), not a feature list dump.

### Landing pattern (typical enterprise AI)
1. Hero (headline + sub + dual CTA)
2. Applications / use-case mosaic
3. Platform / product pillars
4. Proof (customers, leaderboards, research)
5. News / Labs
6. Footer mega-nav

### Observed IA (high level)
- **Products / Platform:** GenAI Platform, Data Engine, Donovan (public sector), Nucleus (dataset/eval)
- **Solutions / Industries:** enterprise + public sector narratives
- **Resources:** docs, research, events, blog
- **Company:** about, careers, news
- **CTA:** Contact / Talk to sales / Get started

### Visual system cues
- Dark, dense, high-contrast; lots of **product chrome** and data visualization metaphors
- Large type, restrained accent color
- Sections feel like **chapters**, not cards only

### Apply to Successiv
- Use Scale’s **gravity** for About / Capabilities (we build serious systems)
- Do **not** copy “frontier AI for the world” tone — Successiv is a product studio, smaller and sharper
- Borrow: proof strip, suite-style product nav, case-study cards without naming clients

---

## 2. Pryzm.design — what to steal

### Positioning & voice
- Craft-first: **visual studio for designers**
- Product clarity: explore free → export needs account → Pro unlocks resolution
- “Ship it as code, not a video” — one memorable product idea

### Landing pattern (product/studio)
1. Immersive visual hero / gallery of looks
2. Named presets (Ink Facet, Undergrowth, …) — each with a short poetic description
3. Developer export story (React / Framer / HTML snippet)
4. Pricing / free vs Pro explained in FAQ-friendly language
5. Trust: privacy (browser rendering), commercial use rights

### Observed IA
- Studio (app)
- Lab / Pro Lab (presets & experiments)
- Pricing / Pro
- Docs / FAQ in-page
- Share / remix flows (product feature, not marketing page)

### Visual system cues
- Atmospheric backgrounds, grain, glass, soft blooms
- Gallery grid of **named looks**
- Minimal chrome; the visual *is* the product

### Apply to Successiv
- Borrow: **named product cards with short evocative blurbs** (Creator Sphere, Shopmgr, KYC, Leave)
- Borrow: “ship as real software” tone for mocked UI sections
- Do **not** make Successiv look like a wallpaper studio — keep B2B readability
- Use Pryzm as the **craft ceiling** for motion/background moments on Home only

---

## 3. Attio.com — what to steal

### Positioning & voice
- Crystal product category: **“The CRM for agentic revenue”**
- Shows the product **working on the page** (transcripts, agent threads, pipeline UI)
- Customer quotes + hard metrics (API calls, agents, emails synced)

### Landing pattern (modern product-led SaaS)
1. Hero with category line + live/demo product surface
2. Narrative chapters (“Your team, amplified”, “Speed to lead”, “For people who own the number”)
3. Embedded UI / agent chat / pipeline mockups
4. Platform pillars (Context, Agents, Ecosystem, Signals)
5. Integrations / SDK / API / MCP
6. Social proof + customer stories
7. CTA: Start / Book demo

### Observed IA (high level)
- Product (core CRM + agents)
- Platform / Integrations / Developers (SDK, API, MCP)
- Customers / Stories
- Pricing
- Resources / Blog
- Company

### Visual system cues
- Clean light UI, strong product screenshots/mocks in browser chrome
- Short section headlines; body that sells a **workflow**, not a feature
- Purple/brand accent used sparingly
- Agent transcripts as a storytelling device

### Apply to Successiv
- Borrow: **in-page mocked product demos** for Shopmgr chat, KYC flow, Leave calendar
- Borrow: chaptered homepage with workflow headlines
- Borrow: dual CTA (Explore products / Talk to us)
- Keep anonymized Work cards Attio-story shaped: problem → motion → outcome

---

## Sitemap recommendation for Successiv (informed by refs)

```
/                     Home (Attio chaptering + Scale proof strip + Pryzm craft moments)
/products             Index of own products
/products/creator-sphere
/products/shopmgr
/products/kyc
/products/leave
/work                 Anonymized case studies (Scale-style cards, no client names)
/capabilities         AI · Shopify · SharePoint/M365 · Documents · Identity
/about                Successiv by 0atlas
/contact              Talk to us
```

Optional later (Attio/Scale pattern): `/pricing` if products go self-serve; `/customers` only if you can publish named logos.

---

## Synthesis — Successiv design principles

1. **Product-led hero** (Attio) — name the category and show a mock in the first screen.
2. **Four product pillars** (Scale suite + Pryzm named looks) — Creator Sphere, Shopmgr, KYC, Leave.
3. **Craft without fluff** (Pryzm) — one memorable visual system; readable type sizes for B2B.
4. **Proof without clients** (Scale) — capability chips, anonymized outcomes, delivery depth.
5. **Chaptered scroll** (Attio) — each section sells a workflow: commerce assist, identity, leave, creator ops.
6. **Honest CTAs** — Talk to us / Book a demo; no fake “Start free” unless you ship it.

### Anti-patterns (do not)
- Clone Scale’s “world’s most important decisions” megaphone
- Wallpaper-only site with weak product explanation
- Fake customer logos or invented metrics
- Real client names or real screenshots

---

## File checklist for Claude Code / designer

- [ ] Read this file + `docs/BRIEF.md`
- [ ] Review screenshots in `docs/references/screenshots/`
- [ ] Implement Home using Attio chaptering + Scale proof + Pryzm accent craft
- [ ] Mocked UIs only; grep for forbidden client names before ship
