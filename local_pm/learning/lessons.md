# Lessons

One entry per correction. The mistake, then the rule that prevents the repeat.

## 2026-09-18 — A claim can outlive the evidence that was withdrawn

**Mistake.** On 2026-09-17 the retail / mall commerce ops *work* entry was
removed for having no repository behind it. The matching *capability* line,
"Retail operations that scale", was never touched and stayed live for a day.
The same thing had already happened with e-signature: the work entry was
retitled, the capability survived under a different name.

**Rule.** Claims live in more than one file. When a claim is withdrawn, grep
the whole `src/content/` tree for the idea, not the sentence — the capability
list, the product copy, the work entry, and the page meta descriptions each
carry their own wording of it.

## 2026-09-18 — Tightening someone else's copy cannot catch a false claim

**Mistake.** An outside reviewer rewrote the Capabilities page and explicitly
kept every capability "as-is on substance". Their prose was better and their
count fix was right, but the one line with nothing behind it survived intact,
and their new opening would have extended "shipped in production" to cover it.

**Rule.** A copy review answers "is this well written". It does not answer "is
this true". Run the second question separately, against the repository, every
time — including on copy that has already shipped.

## 2026-09-18 — I did it myself, in the same commit

**Mistake.** While correcting capability 06 I replaced "operations portals"
with "recognition portals" and wrote in the code comment that recognition
portals carry states, named owners, and an audit trail. I had not read the
awards entry. They have phases and a visible judging panel, and no audit log.

**Rule.** A noun added to a claim is a new claim. Read its source before the
commit, not after — the rule applies to the fix as much as to what it fixes.

## 2026-09-18 — I sent twelve agents to do a find-and-replace

**Mistake.** The mock pass had two halves: a mechanical one (`bg-bg/40` →
`bg-surface`, three type sizes stepped up) and a judgement one (which row is
selected, whether a state is warn or danger, whether a control has anything
behind it). I handed both to twelve subagents. The founder asked "why don't you
use a global replacement?!" and was right. A script did the mechanical half in
one command: 176 substitutions, exact counts, reviewable as a table in the
commit message. Twelve models doing the same sweep by hand would have been
slower, more expensive, and would have missed some.

**Rule.** Split a task by *kind of work* before choosing who does it. Anything a
substitution can express, a substitution does — and the count it reports is the
proof it was complete. Give the model only what needs a decision.

## 2026-09-18 — A reviewer running `git status` in a shared worktree

**Mistake.** Twelve agents edited disjoint files in one worktree. I gave the
review stage an `edited_out_of_scope` field and told it to run
`git status --short`. Every reviewer saw the other eleven groups' files, listed
20–29 of them as scope violations, and set `ok: false`. My fix stage then told
its agent "files edited out of scope, revert these" — and they did. Nineteen
files of finished work were reverted by sibling agents. Nothing committed was
lost, but the run had to be redone.

**Rule.** A check is only valid if its input is scoped to the agent that runs
it. `git status` is global, so in a shared worktree it reports other people's
work as your own violation. Either give the checker an explicit file list and
nothing wider, or drop the check. And never put a destructive verb —
revert, checkout, restore, reset, clean — in a prompt that runs concurrently
with other writers.

## 2026-09-24 — I traced the animation to the copy, and the copy was wrong

**Mistake.** Revision 1 of the mock animation spec had an invariant, "every frame
is a claim", and traced each step to a line of `products.ts`. That felt rigorous.
But the Accounting copy had been written against the wrong codebase: an unshipped
R&D engine, not the shipped app. So I animated a question the app never asks, a
rule marker it does not have, and a period list that does not exist. The
founder's "use a subagent to really understand how it works... don't guess"
caught it.

**Rule.** A claim traces to **code**, never to other copy. Before drawing or
animating a screen, get the real UI's labels, states and order from the app's
source, and record them in `local_pm/research/`. When more than one codebase
could be "the product", ask which one ships before tracing to any of them.

## 2026-09-24 — local_pm is public here

**Mistake:** research notes with a product's security findings were committed to
`local_pm/` in a public repo. Caught before push. Naming which anonymised entries
share a client was the same mistake in another form.
**Rule:** before committing research, check `gh repo view --json visibility`. In a
public repo, security findings and client-identifying detail go to the founder
directly or the scratchpad, never to `local_pm/`. If they were committed on an
unpushed branch, squash at merge.

## 2026-09-24 — a clipped layout hides from "no horizontal scroll"

**Mistake:** the phone check was `scrollWidth > innerWidth`, and later `scrollX`
after scrolling. A wrapper clips overflow, so the page never scrolls — while a
wide mock silently pushes the step text past the screen edge. It was already
live on Accounting.
**Rule:** at 390px, measure what is cut: every `h1,h2,h3,p` outside a mock and
every `.mock-frame` must end at or before the viewport's right edge. Grids that
hold mocks use `grid-cols-1` below their breakpoint; an `mx-auto` wrapper around
a mock also needs `w-full`.

## 2026-09-25 — An either/or on a visual is two screenshots, not a pick

**Mistake:** asked for "a real phone dimension, or if it is half size, don't add
the menu", I built the first option, shipped it, and the founder came back the
same day: too tall for such short copy. The second option was what fit.
**Rule:** when the founder offers two visual options, render both and show the
screenshots side by side before committing to either. Content height decides a
frame's shape: a device frame much taller than what is in it reads as empty.
