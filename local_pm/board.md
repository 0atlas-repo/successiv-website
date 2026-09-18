# Board

One row per active plan. If it is not here, it does not exist.

| Plan | Status | Next action |
|---|---|---|
| [Product-led site build](projects/product-led-site/plans/build.md) | built, awaiting sign-off | Founder review, then enable Pages + DNS |
| [Capability depth](projects/capability-depth/specs/capability-depth.md) | shipped and live at cb92cd7 | Done. Two products hidden since, see loose tasks |

## Loose tasks

- HIDDEN 2026-09-17: 1line.ai and Leave both carry `hidden: true`, so no card, no
  page, no sitemap entry. The copy is kept in src/content/products.ts, not deleted.
  Unhiding is one line each — do not do it without asking.
  - 1line.ai: a working LLM gateway the founder has not cleared for publication.
    The placeholder is a DECISION, not a gap.
  - Leave: no product repo exists, only a one-shot importer, so its copy claimed
    nothing about screens or balances. Rewrite before unhiding.
- WITHDRAWN 2026-09-18: capability 07 "Retail operations that scale". No repository
  behind it, and Shopmgr's own copy says front-of-house only. Seven capabilities ship.
  Source of the bad claim was the `## Capabilities` list in docs/BRIEF.md, now flagged
  superseded there. Do not reinstate without a repository.
- Decide the Capabilities page title: "What we're actually good at." or the reviewer's
  "What we actually ship." Left as-is pending your call.
- Run a cross-entry noun diff across the entries that trace to one client relationship.
  The tender/contract pair was softened by hand; the rest was not systematically checked.
- Decide whether the second creator marketplace (unpublished) is an earlier incarnation
  of Creators Sphere, a separate build, or dead.
- Tell the owner of the public marketing site about the possible open-redirect: its
  contact form forwards to a CRM using a URL taken from the request. Not our repo.
- Fix docs/BRIEF.md: the product is "Creators Sphere", not "Creator Sphere".
- Tell the Creators Sphere owner: creatorssphere.sg (double s) does not resolve, so the hello@ address in their footer is dead.
- Decide whether the three principles get reframed toward buyer value.
- DECIDE: hosting. Org is on the free plan so private Pages will not serve. See docs/DEPLOYMENT.md.
- If the repo is ever made public, redact the client mapping table in docs/BRIEF.md first.
- Replace `public/img/og-placeholder.png` with real Open Graph artwork.
- Set GitHub Pages source to "GitHub Actions" and point successiv.com DNS at Pages.
