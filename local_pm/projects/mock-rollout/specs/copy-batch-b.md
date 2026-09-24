# Batch B copy proposals — the eight work pages

Status: **approved 2026-09-24** (all eight; drop "marketplace", drop "works", no awards comments step). Drafted from eight research passes
(Sonnet, one per page) that read each delivered system's code. The research
itself stays in the session scratchpad, uncommitted: this repo is public, and
the notes name clients. Only this site-safe copy is committed.

Same pattern as the products: problem, "Our solution" (≤2 sentences, ≤45 words),
then steps with one animated screen each. With a solution set, a work page drops
the long form, the problem/approach/outcome row and the gallery.

Anonymisation: every page was checked against every other for shared
distinctive nouns.

---

## Tender / RFP management — angle "Intake, checklist, scoring"

The live page describes a bidder portal. There is none: it is a staff tool used
after bids arrive by email. No ranking, no award, and no score lock exist, so
"award" leaves the angle and the ranking screen goes.

- **Problem:** Bids arrive by email and get evaluated off separate spreadsheets.
  When the result is questioned later, nobody can show what was missing, what was
  asked, or how the scores were reached.
- **Our solution:** One shared record per bid: a checklist of what each bidder
  still owes, clarification questions logged against that bidder, and every
  evaluator's scores collected in one place.

| # | Title | Body |
|---|---|---|
| 1 | Track every bid in one list | Each round shows its bidders and where each one stands. |
| 2 | Check off what's missing | Each requirement is marked met, incomplete or missing per bidder, including group bids tracked by member. |
| 3 | Raise a clarification | A missing or unclear item becomes a written question to that bidder, and the answer is filed against the bid. |
| 4 | A first read of the detail | Long supporting sections get a drafted summary, which a reviewer confirms or edits. |
| 5 | Bring the scores together | Each evaluator's scores are collected into one consolidated view. |

## Contract lifecycle — angle "Lifecycle after award"

The live page claims per-type forms, a before/after audit log and a contract
timeline; none exist. It omits the strongest real feature: each filed revision is
checked automatically against the contract sections it relates to.

- **Problem:** Large contracts run for years, and everything filed after signing
  has to be logged, checked against the contract and tracked to a decision. In
  email and shared drives, nobody knows a contract's current state.
- **Our solution:** Every contract keeps a register of filed entries, each checked
  automatically against the sections it relates to, so a reviewer sees what was
  filed, whether it holds up, and the clause behind the answer.

| # | Title | Body |
|---|---|---|
| 1 | Register the contract | Add it once, by code and title, and assign who handles it. |
| 2 | File an entry against it | A variation, a claim or a certificate, classified by type and versioned so nothing filed is lost. |
| 3 | The system checks it | Each entry is compared with the contract sections it relates to, and flagged where it doesn't line up. |
| 4 | Ask, and get the clause | A reviewer asks a plain question and gets an answer with its source attached. |

## Document bundling & redaction — angle "Assemble, redact, release"

Accurate except that the virus scan is not enforced "before anything is
processed", and the steps are separate calls, not one automatic pipeline. It is a
library inside a larger system, with no screens of its own, so every screen here
is our drawing of its inputs and outputs.

- **Problem:** Putting a document pack together means gathering files in several
  formats, blacking out what can't go, and doing it by hand every time.
- **Our solution:** A service that merges mixed formats into one ordered file,
  fills in placeholder values, masks set regions, and can lock the result with a
  password before it leaves.

| # | Title | Body |
|---|---|---|
| 1 | Assemble | Files in different formats are put in order and combined; if one can't be converted, the rest still go through. |
| 2 | Fill the template | Placeholder values are swapped for real ones on the way through. |
| 3 | Mask | A region is flattened to an image and painted over, so the original content is gone, not hidden. |
| 4 | Lock | The finished file can be password-protected before it is sent on. |

## Ops incident support — angle unchanged

Audio transcription and the drafted post-incident write-up are empty stubs; the
case states reach "resolved", not "closed"; follow-up questions are built but not
shown; prompts are not editable without a release. All dropped.

- **Problem:** During an incident the right procedure usually exists, in a
  handbook or a policy library, but nobody has time to search for it while the
  incident is live.
- **Our solution:** An assistant that reads the incident conversation as it
  happens, answers from the procedure library with the source cited, and keeps a
  shared action list that timestamps what's done.

| # | Title | Body |
|---|---|---|
| 1 | Every incident, one case | Each incident becomes a case with its own ID and status. |
| 2 | Ask, and see the source | A plain-language question gets an answer from the procedure library, with the page cited. |
| 3 | One shared action list | The assistant proposes actions from the conversation and says why; a person confirms them, and the time is recorded. |

## Content & CMS platforms — angle unchanged

Static regeneration is true only for the richer content type; short updates are
rendered in the visitor's browser. There is no restore button: a copy is kept.

- **Problem:** A site in several languages turns every content change into a
  developer ticket, and an editor can't see what's about to go live until it is.
- **Our solution:** Each piece of content holds every language together, with a
  switch per language, and publishing writes the page straight to the site, with
  no deploy and no database behind it.

| # | Title | Body |
|---|---|---|
| 1 | Draft in every language | A language becomes required only once it is switched on for that piece. |
| 2 | Preview it | The real page renders at a temporary address before it is published. |
| 3 | Publish without a deploy | A timestamped copy of the old version is kept, then the new page is written to the live site. |
| 4 | Quick updates | Short, frequent items use a simpler list per language, with the same draft-and-publish rhythm. |

## SharePoint extensions — angle unchanged

"Temporary access" does not grant platform permissions: it shares a copy through
an external file-sharing service and removes it on expiry. The per-file audit
lookup is a separate web app. The order of phases on the live page is reversed.

- **Problem:** A large Microsoft 365 tenant gathers documents faster than anyone
  can govern them. Who can see a folder, what's stale and what just broke get
  answered by guessing.
- **Our solution:** Reporting and governance tools around the tenant: permission
  audits down to single files, sharing that expires by itself, link checks, and a
  per-file history, answered from a screen instead of a script.

| # | Title | Body |
|---|---|---|
| 1 | Who has access, and why | A report walks every folder and file, and flags grants made to a person instead of a group. |
| 2 | Share for a limited time | Pick files, a recipient and a window; a copy goes out and is removed when the window closes. |
| 3 | Catch a broken link first | Flagged documents are checked daily, and the watcher gets an email when one stops resolving. |
| 4 | See who's holding a file | A report lists every checked-out file, who has it, and since when. |
| 5 | Answer "who changed this" | From the file, open its history: every access and change, already filtered to it. |

## Awards portals — angle unchanged

Voting does not close per category when a winner is picked; there is one voting
window. Shortlisting happens by hand, outside the system, so it gets no screen.
The live vote screen puts the button on the grid; it is on the candidate's page.

- **Problem:** A recognition programme runs on a fixed deadline in front of the
  whole organisation, and a process that feels arbitrary does more harm than none.
- **Our solution:** A campaign site that opens for nominations, runs voting by
  category with one vote each, and then reveals the winners, with no running tally
  while voting is open.

| # | Title | Body |
|---|---|---|
| 1 | Nominate | Anyone can nominate a colleague or a team, in the category that fits, before the window closes. |
| 2 | Vote | Each person gets one vote per category, individuals and teams counted separately, cast on the candidate's own page. |
| 3 | Announce | When voting closes, winners appear by category, individuals and teams side by side. |

## Scheduling systems — angle changes (no marketplace)

There is no marketplace: search returns "Not implemented" and nothing lists
providers. It is one provider's booking page, reached by link. Payment is due
before the slot, not at checkout; attendance is detected from the video call.
Every booking is a video call, so examples must be remote services.

- **Problem:** Most booking tools assume one calendar and one kind of appointment.
  Real services vary in length, need a gap after each one, and have money riding
  on whether they happen.
- **Our solution:** Each provider runs their own booking page. Services carry a
  length and a gap, hours and holidays are built in, and every booking is tracked
  from reserved to paid, delivered and settled.

| # | Title | Body |
|---|---|---|
| 1 | Set the shape of a service | A length, a gap after it, and whether it confirms itself or waits for the provider. |
| 2 | Book inside what's open | The calendar already leaves out holidays, closed hours and each booking's gap. |
| 3 | Confirm before it's due | Self-confirming services confirm on booking; the rest wait for the provider. |
| 4 | Follow it to settlement | Payment is due before the slot, attendance is detected from the call, and payout follows. |

---

## Decisions for the founder

1. Approve the eight as drafted, or name changes.
2. **Scheduling:** confirm dropping "marketplace" (a separate admin app was not read).
3. **Contract:** keep "works" in the title? It hints at the sector.
4. **Awards:** add the comments thread on each candidate's page as a fourth step?

## Build size

31 steps, so 31 new screens. None of the current 22 is reused as-is: several
draw things that don't exist. Screens are specified in each research note.
