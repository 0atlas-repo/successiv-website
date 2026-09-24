# Mock rollout — plan

Spec: `../specs/mock-rollout.md`. Branch `mock-rollout`, worktree
`.worktrees/mock-rollout`.

## Batch A — products (Creators Sphere, Shopmgr, KYC)

1. Founder answers the spec's open questions.
2. Research, three Sonnet subagents in parallel, read-only, one product each.
   Sanitised walkthrough → `local_pm/research/2026-09-DD-<product>-ui-walkthrough.md`;
   mapping and raw notes → scratchpad only.
3. Copy proposal per product (problem, solution, steps, one screen each) → founder.
4. Build, one product at a time (each is a sequence: verify literals → mocks →
   entry): the verify.mjs literals first, so the new check fails; then the mocks;
   then the `products.ts` entry. The shared mocks (hero `ChatMock`, card screens)
   keep working.
5. Independent label review (Sonnet) of every mock against its walkthrough.
6. Browser pass, then founder review on the preview. Merge; batch A closes.

## Batch B — work pages (8), if Q1 says full pattern

1. `WorkItem` gains `solution` and `steps[].screen`; `work/[slug].astro` mirrors
   the product page; verify 3b extends to work.
2. Research: eight Sonnet subagents, one work item each, same two-output rule,
   with the anonymisation rule stated in the prompt.
3. Copy proposal → founder. Build, review, browser pass, founder review, merge.

The eight builds in batch B are independent, so Rule 15.5 points to the Workflow
tool. It runs only once the founder opts in; otherwise the builds run solo, one
after another.

## Verification

As in the spec: build and check clean, untouched pages byte-identical, browser
pass per page, anonymisation grep clean. The founder signs off each batch before
merge.

## Rev 2026-09-24 — the repo is public

`successiv-website` is a PUBLIC repo, so `local_pm/` is public too.
- Security findings, and which anonymised entries share a client, never go in
  committed notes. Earlier commits on this branch held such detail, so **merge
  this branch as a squash** so those commits never reach origin.
- Work-page research stays in the session scratchpad, uncommitted. Only the
  approved, site-safe copy proposals are committed.
