# Successiv — website brief

**Domain:** successiv.com  
**Parent:** 0atlas.com (AI software house)  
**Positioning:** Product-led studio. We ship our own products; delivery experience proves we can build.

> Locked with founder: “product — we have that experience but we want users to know our products.”

> **Partly superseded, 2026-09-17.** Every product and engagement was read against
> its source repository. Four items in this brief turned out not to match what the
> code does, and the site no longer follows the brief on those points:
>
> - **Document signature workflow** → retitled *Document bundling & redaction*.
>   There is no signing anywhere in that system. Nothing on the site may claim
>   e-signature.
> - **Retail / mall commerce ops** → removed. No repository supports it; the one it
>   was mapped to is a SharePoint governance toolkit.
> - **KYC** → no selfie, no face match, no text recognition, no bureau lookup.
>   Review is manual.
> - **Ops incident reporting** → no severity rules, no routing to a named owner.
>
> A sixth product, **Accounting**, was added pre-release. Where this brief and
> `local_pm/projects/capability-depth/specs/capability-depth.md` disagree, the spec
> is newer and wins.
>
> **Later the same day, two products were hidden** at the founder's instruction:
> **Leave** and **1line.ai**. Both are listed as products below and neither is on
> the site — no card, no page, no sitemap entry. The copy is kept behind a
> `hidden: true` flag in `src/content/products.ts`. Do not reinstate either from
> this brief; see the `## Hidden products` section of `CLAUDE.md`. Four products
> ship: Creators Sphere, Shopmgr, KYC, Accounting.

---

## Brand voice

- Confident, clear, operator-friendly
- Second-tier outsource reality without sounding small — lead with products
- No fake metrics, no fake enterprise logos

---

## Own products (homepage heroes)

| Product | Description (public) | Internal refs (do not expose client names) |
|---------|----------------------|--------------------------------------------|
| **Creator Sphere** | Own product — creator/platform product | `0atlas-repo/[redacted-slug]` |
| **Shopmgr** | Shopify AI chatbot & store assistant | `0atlas-repo/[redacted-slug]`, `[redacted-slug]`, `[redacted-slug]` |
| **KYC** | KYC / identity verification (web + API) | `0atlas-repo/[redacted-slug]`, `[redacted-slug]`, `[redacted-slug]`, `[redacted-slug]` |
| **Leave** | Employee leave management (SharePoint) | `0atlas-repo/[redacted-slug]` |

Optional mention if space: **1line.ai** (`0atlas-repo/1line.ai`) — confirm with founder before featuring as own product.

Each product section/page needs:

1. Name + one-liner  
2. Problem  
3. How it works (3–5 steps)  
4. **Mocked UI** (not real screenshots)  
5. CTA: Contact / Book a demo  

---

## Anonymized Work (case studies)

Never use real client names. Title by capability.

| Public title | Inspired by (private) | Angle |
|--------------|----------------------|--------|
| Tender / RFP management | [redacted-client] (`[redacted-slug]`) | Intake → evaluate → award workflow |
| Capital / works contract management | [redacted-client] (`[redacted-slug]`) | Contract lifecycle for capital projects |
| Retail / mall commerce ops | [redacted-client] (`[redacted-slug]`) | Storefront / mall operations tooling |
| Document signature workflow | CC Signature | PDF sign module embedded in larger system |
| Content / CMS platforms | [redacted-client] | Editorial CMS |
| Ops incident reporting | [redacted-client] OCC (partial) | Incident capture & routing |
| Enterprise SharePoint extensions | [redacted-client] Phase 2/4/5 | Microsoft 365 / SharePoint ops toolkit |
| Awards / recognition portals | [redacted-client] CEO Award 2022 | Campaign / nomination portals |
| Scheduling systems | Scheduling App | Resource / appointment scheduling |

Card format: **Problem → Approach → Outcome** + one mocked screen.

---

## Site map

```
/                 Home
/products         Product index
/products/[slug]  Creator Sphere, Shopmgr, KYC, Leave
/work             Anonymized case studies
/capabilities     AI apps · Shopify · SharePoint/M365 · Documents · Identity
/about            Successiv by 0atlas
/contact          Form or mailto
```

---

## Capabilities (for /capabilities)

- AI product & chatbot delivery (Shopify + custom)
- Identity / KYC flows
- Document & signature workflows
- Microsoft 365 / SharePoint line-of-business apps
- Tender, contract, and ops portals
- E-commerce / retail ops

---

## CTA

Primary: **Talk to us** / **Book a demo**  
Secondary: Explore products
