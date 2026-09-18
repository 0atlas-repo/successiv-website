# Plan — mock realism, rollout

**Spec:** [mock-realism](../specs/mock-realism.md)
**Pilot:** [pilot.md](pilot.md) — approved, `f003231` + `a892917`
**Branch:** `mock-realism`
**Date:** 2026-09-18

## Count

39 files under `src/components/mocks/`. Not 39 screens:

- 3 are not screens — `MockFrame` (the shell) and the `ProductMock` / `WorkMock`
  dispatchers.
- 2 are unreachable — `CalendarMock` belongs to Leave and `GenericMock` to
  1line.ai, both hidden since 2026-09-17. Neither renders anywhere. `GenericMock`
  is also a recorded decision to stay sparse, so it would be left alone even if
  it were reachable.
- 2 are done — `ChatMock` and `CreatorMock` in the pilot.

**32 screens to do.**

## Groups

One agent per product or engagement, so each agent holds the copy its screens
must agree with and keeps a consistent visual language across its own set.

| # | Group | Screens |
|---|---|---|
| 1 | Creators Sphere | creator-proof, creator-insights |
| 2 | Shopmgr | shop-knowledge, shop-tickets |
| 3 | KYC | identity, kyc-share, kyc-review |
| 4 | Accounting | acct-extract, acct-journal, acct-close |
| 5 | Tender / RFP | tender-checklist, scoring, tender-ranking |
| 6 | Contract lifecycle | contract-registry, timeline, contract-clause |
| 7 | Bundling & redaction | bundle-builder, bundle-redaction |
| 8 | Ops incidents | incident-cases, incident-chat, incident-actions |
| 9 | CMS platforms | cms-editor, cms-publish, cms-news |
| 10 | SharePoint | sp-permissions, sp-access, sp-links |
| 11 | Awards portals | awards-nomination, awards-shortlist |
| 12 | Scheduling | sched-marketplace, sched-slots, sched-calendar |

## The pass each screen gets

Set by the pilot, which is the reference. `ChatMock.astro` and
`CreatorMock.astro` are the two worked examples.

- Type up: `[9px]` → `[9.5px]` for uppercase labels, `[10px]` → `[10.5px]` for
  meta, `[10.5px]`/`[11px]` → `[12px]` for body. Stop there; the shell supplies
  the rest of the scale.
- One selected row per list screen: `border-action/35 bg-surface-2`.
- Status words become pills on `bg-ok-soft` / `bg-warn-soft` / `bg-danger-soft`
  with the matching `text-*`. Grey text for a status is the wireframe tell.
- `tabular-nums` on every figure, date and identifier.
- Initials or a glyph where a person or a file is implied — never an empty grey
  box.
- Row surfaces move from `bg-bg/40` to `bg-surface`, because the content pane is
  now `bg-bg` and a 40% wash of the same colour is invisible against it.
- Five or six rows where the screen is a list, so it runs off the bottom edge.

## Hard limits

From the spec, repeated here because this is the step that would break them:

- **KYC**: no face match, no liveness, no bureau lookup, no text recognition.
  Review is manual.
- **Bundling**: no Sign button anywhere, on any screen.
- **Incidents**: no severity badge, no routed owner. It answers from an indexed
  procedure library and drafts a checklist a person confirms.
- **No KPI tiles** on any screen.
- Neutral labels only. No client name, no real brand.
- No raw hex. No new dependency.

## Verification

Same gates as the pilot, plus a sweep wide enough to cover 32 screens:

| What | How | Expected |
|---|---|---|
| Build | `npm run build` | Exit 0, `verify.mjs` passes |
| Types | `npm run check` | 0 errors |
| No raw hex | `grep -rnE '#[0-9a-fA-F]{3,8}' src/components/` | No match |
| Forbidden claims | grep the built `dist/` for sign, signature, liveness, severity | No match |
| Hidden products | `ls dist/products/` | No `leave/`, no `1line-ai/` |
| Every route | browser, both themes | No console error, no overflow |
| Every screen | screenshot each product and work detail page | Reads as software |

## Then

Merge to `main`, push, watch the Pages deploy, verify live. Run `ecc:doc-updater`.
Delete the worktree.
