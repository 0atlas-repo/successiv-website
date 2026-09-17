# Spec — capability depth for products and work

**Status:** revised after recon, awaiting founder approval
**Branch:** `deep-capability`
**Date:** 2026-09-17

## Why

The site states *what* each product and engagement is, in one line plus a
three-row Problem/Approach/Outcome summary. A buyer evaluating us cannot tell
from that whether we have built the thing or merely named it. The founder asked
for depth read out of the source repositories rather than written from the brief.

Recon has now read 28 repositories across 17 parallel reads. It found more than
a depth problem.

## The finding that changes this piece of work

**Four claims on the live site are not supported by any code we have.**

| Entry | What the site says | What the code does |
|---|---|---|
| KYC | "collects documents and a selfie", "documents are validated and matched" | No liveness, no face match, no OCR, no third-party checks. Review is fully manual. |
| Document signature workflow | "prepare fields, route to signers", executed doc written back | No signing of any kind. No signers, envelopes, routing, or status. |
| Ops incident reporting | "severity applied by rule", "routing to a named owner" | No severity field, no routing engine, no SLA or escalation, no mobile. |
| Retail / mall commerce ops | "storefront and mall operations tooling" | No repo in the org supports it. Checked every candidate. |

Capability 04, "Contracts signed where the work is", rests on the signature
claim and falls with it.

This is now a correction job with a depth job attached, not the reverse. Fixing
these outranks adding paragraphs. `docs/BRIEF.md` forbids fake metrics; a
fabricated capability is worse than a fabricated number.

## Scope — 15 entries, up from 14

Products (6): Creators Sphere, Shopmgr, KYC, Leave, 1line.ai, Accounting (new).
Work (9): tender, contract, signature, incident, retail, CMS, SharePoint,
awards, scheduling — subject to the disposition of signature and retail.

### Mapping, as settled by recon

| Entry | Repos | Status |
|---|---|---|
| Creators Sphere | 3 | confirmed |
| Shopmgr | 4, one product | confirmed |
| KYC | 4, two generations | confirmed; copy must be corrected |
| Leave | importer only | no product repo |
| 1line.ai | 2 | confirmed, and it is a real product |
| Accounting | 3 | confirmed, closed beta |
| Tender / RFP | quotation-side repo | settled by table names |
| Capital / works contract | contract-side repo | settled by page and scope evidence |
| Content / CMS | marketing-site group | corrected — was mapped to the wrong repos |
| Enterprise SharePoint | 4, incl. the one previously filed under retail | corrected |
| Document signature | 1 | no signing exists |
| Retail / mall commerce | none | no repo supports it |
| Awards, Scheduling, Incident | 1 each | confirmed |

One system has no home: a second creator marketplace (a mobile app plus an
Instagram post-verification engine that embeds a creator's posts and scores them
against a campaign's keywords). It overlaps Creators Sphere. It is not published
until the founder places it.

### Reversals from the first draft of this spec

1. **1line.ai is not a placeholder.** It is a working multi-provider LLM gateway
   with metering, credit balances, subscriptions, and 22 test suites. The first
   draft said it stays a placeholder unless recon found something. Recon found a
   product. The decision is now whether to make it public — the founder's call.
2. **Leave has no product repo.** Only a one-shot importer. Copy can be grounded
   in the data model the importer proves — dual approvers, half-day granularity,
   department routing — and nothing else. Screens would be invention.
3. **Accounting exists** and is a sixth product. `CLAUDE.md` pins the homepage
   grid to five, so adding it is a founder decision and a `CLAUDE.md` edit.

## Structural change

New route `src/pages/work/[slug].astro`, mirroring the product page. Every work
item gets a page, including the ones that are title-only today.

## Data model

`products.ts` and `work.ts` each gain `detail: string[]` (required, min 3) and
`screens: MockName[]` replacing the single `mock` field. A build check fails when
a non-placeholder entry has fewer than three paragraphs, matching how
`products.ts` already makes a missing field a build error rather than a review note.

## Mocks

About three screens per entry, sized to what each repo actually contains —
roughly 40 components, some 31 of them new. That is the largest single cost in
this plan and the founder should confirm the number before it is built.

Rules unchanged: hand-drawn, never a screenshot, semantic tokens only, neutral
in-screen labels, both themes checked.

## Safety — the part that got harder

Recon surfaced the identifying terms directly. They include client names, a
parent platform name, tenant and site names, an award name, a named individual,
a named end-customer brand, and two dozen real customer-story subjects in one repo.

Two controls, not one:

1. **Extend the hash gate.** `scripts/verify.mjs` matches a fixed salted-hash
   list. Add the terms recon surfaced — clients, parent platform, tenants, sites,
   the individual, the award, the named retail brand. Not vendor brands, which
   are legitimately mentionable. This makes the build catch regressions after
   this session ends.
2. **Cross-entry review.** Four site entries trace to one employer relationship
   and two more to a single end client. A reviewer must diff the distinctive
   nouns across those entries and reject any noun shared between them, because a
   shared noun is what lets a reader join them back together.

The CMS entry carries the highest risk: its repo holds two dozen named customer
stories, and one sector-specific detail would identify the client.

## Method

Recon is done. Findings live in the session scratchpad, deliberately uncommitted
because they hold the unredacted terms. Remaining:

1. Founder decisions — the open list below.
2. Copy drafted per entry. 15 independent entries, so Workflow orchestration per
   Rule 15 step 5, writers on Sonnet per Rule 16.
3. Opus review for leakage and cross-entry overlap.
4. Mocks built, both themes.
5. Build, verify, route check.

## Verification

1. `npm run build` passes including `scripts/verify.mjs`.
2. The min-three-paragraph check fails when an array is shortened. Proven, not asserted.
3. Every entry renders; every route returns 200 in preview.
4. Both themes checked on every new mock.
5. `dist/` grepped for the actual terms recon surfaced, beyond the hash gate.
6. Cross-entry noun diff across the entries sharing a client relationship.
7. Founder reads three entries spanning products and work before the rest is accepted.

## Decided by the founder, 2026-09-17

1. **Signature entry is retitled** to document bundling and redaction. Capability
   04 is rewritten away from signing. Nothing on the site claims e-signature.
2. **Retail entry is dropped.** Work goes from nine items to eight.
3. **1line.ai stays a placeholder.** It is a working product, but the founder did
   not clear it for publication. Its page keeps `needsCopy: true` and `noindex`,
   and gets no capability paragraphs. This is a deliberate exception to the
   three-paragraph rule and must not be "fixed" by a later pass.
4. **Accounting ships as coming-soon.** Sixth product, flagged pre-release.
   Requires the `CLAUDE.md` grid list to go from five products to six.
5. **The second creator marketplace stays unpublished.** Not cleared, and it
   overlaps Creators Sphere. No entry, no page.
6. **~31 new mocks confirmed**, sized per project rather than flat.

### Still assumed, not confirmed

**Leave** gets copy grounded only in what the importer proves — dual approvers,
half-day AM/PM granularity, department routing — with no claims about screens,
balances, or calendar behaviour, because no product repo exists to support them.
Proceeding on that basis. If the founder supplies real detail, this entry is
rewritten.

## Final scope

6 products: Creators Sphere, Shopmgr, KYC, Leave and Accounting take full depth;
1line.ai stays a placeholder.
8 work items: tender, contract, document bundling, incident, CMS, SharePoint,
awards, scheduling.
So 13 entries take new copy, not 15.

## Unrelated, reported under Rule 12

A recon agent flagged a possible open-redirect on a live public marketing site in
the CMS group: a contact form forwards to a CRM using a URL taken from the
request. Not verified, not this task, not our repo — but worth telling the owner.

---

## Addendum — 2026-09-17, after shipping

The founder then asked to hide two of the six products: **1line.ai** and
**Leave**. Both carry `hidden: true` in `src/content/products.ts`; the `products`
export filters them, so no card, page or sitemap entry is produced. The copy is
kept rather than deleted, because both products are real and the decision is
about publication, not accuracy.

This supersedes the counts in this spec. Four products ship: Creators Sphere,
Shopmgr, KYC, Accounting. The depth exemption for 1line.ai in `scripts/verify.mjs`
is retained for the case where it is unhidden. Detail is in the session entry in
`local_pm/logs/2026-09-17.md`.
