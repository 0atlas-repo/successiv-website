# Mock rollout — the Accounting pattern on every other page

Status: **batch A approved (2026-09-24); batch B structure undecided.** Founder
answers: Q2 scope as listed, Q3 two batches, Q4 draft positioning from research.
Q1 answer arrived cut off ("i want to see what "), so work pages wait until the
founder has seen batch A's research and re-answers.

## What and why

The Accounting page now reads problem → "Our solution" → five steps, each step
carrying its own animated mock screen whose every label traces to the shipped
app's code (merged to main at 735f2bb). The founder asked for the same treatment
on every other product and on the work pages.

## Scope

| Entry | In scope | Why |
|---|---|---|
| Creators Sphere, Shopmgr, KYC | yes | the three visible products |
| Leave | no | hidden; no product repo exists, so screens would be invention |
| 1line.ai | no | hidden by founder decision (2026-09-17) |
| second creator marketplace | no | unpublished until the founder places it |
| 8 work pages | yes, pending Q1 | tender, contract, bundling, incident, CMS, SharePoint, awards, scheduling |

## The pattern, per entry

1. **Research the shipped system first**, with a Sonnet subagent, read-only, one
   entry each. Output mirrors `research/2026-09-24-accounting-ui-walkthrough.md`:
   the real flow, screen by screen, with page titles, labels, states and what the
   system does versus what a person does.
2. **Copy proposal**: problem (≤2 sentences), solution (1–2 sentences, ≤45 words),
   3–5 steps, one screen per step. Founder approves before building.
3. **Build** one mock per step with `.mock-step` / `.mock-before` sequences.
4. **Verify**: the build checks, plus a browser pass on timing and reduced motion.

## Hard constraints

- **Trace to code, not to copy.** The existing `detail` paragraphs are not a
  source. Accounting's copy had been "confirmed" by the 2026-09-17 recon and was
  still wrong (`learning/lessons.md`).
- **Anonymisation.** Work entries must not name a client, sector noun or repo
  slug anywhere committed. Each research subagent writes two outputs: a
  sanitised walkthrough for `local_pm/research/`, and the repo mapping plus any
  raw notes in the session scratchpad only. Shallow clones go to the scratchpad,
  never into the tree.
- **Repo mapping is re-derived, not guessed.** The 2026-09-17 mapping lived in a
  scratchpad that is gone. Subagents get the org's repo list and check it against
  the repo counts in `capability-depth` (e.g. KYC "4, two generations").
- **Shared mocks.** The home hero draws `ChatMock`; product cards use
  `cardScreen ?? screens[0]`; work cards use `screens[0]`. Any mock that is
  replaced must leave those three places working, and cards animate too.
- **Phone chrome** only where the copy names a phone app.
- **verify.mjs**: `expectedSteps` and `frameCount` gain one entry per page; the
  "Our solution" rule (3b) and the retired-claims check (10) extend per page.

## Open questions for the founder

1. **Work pages: same structure, or animate in place?** Work pages have no steps
   today (problem / approach / outcome / long text, plus a gallery). The full
   pattern means adding `solution` and `steps[].screen` to `work.ts` and
   rebuilding `work/[slug].astro` like the product page. Step-level narrative
   says more about a client system than a gallery does, which pulls against
   anonymisation. The cheaper option keeps the pages as they are and animates
   the existing screens. **Recommended: the full pattern, with the anonymisation
   rule above applied to every step.**
2. **Scope as in the table above**: 3 products + 8 work pages, with Leave,
   1line.ai and the second marketplace left out?
3. **Two batches**: products first on this branch, merged once approved; work
   pages second. Agreed?
4. **Positioning per product.** Accounting's line was "AI does most of it, a
   person does the last part". Is there a line like that for Creators Sphere,
   Shopmgr and KYC? If not, the copy proposal will offer one drawn from the
   research.

Still open from the pilot, not blocking: do Accounting beta users have the phone
app?

## Verification

- `npm run build`: every check passes, with the new per-page step counts.
- `npm run check`: 0 errors.
- Pages not in the current batch build byte-identical to main.
- Browser pass per page: steps play in order once, reduced motion shows the final
  frame immediately, cards animate.
- `dist/` grep for client names and repo slugs: no hits (the existing hash check).
