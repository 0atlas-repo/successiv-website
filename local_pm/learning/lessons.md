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
