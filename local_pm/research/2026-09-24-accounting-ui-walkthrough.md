# Accounting — what the real UI shows, step by step

**Date:** 2026-09-24
**Why:** The founder asked that the mocked screens, their animation and the
copy come from how the product actually works, not from guesses. This is the
source for the Accounting pilot of `projects/mock-animation/`.
**Method:** A read-only subagent (Sonnet) went through two codebases, citing
file:line for every claim. In this record they are "the shipped app" (web app,
phone app, API, schema) and "the engine" (a separate R&D journalling engine
with no UI, whose rulebook file is byte-identical to the shipped app's).
**Spot-checked by hand**, against a second checkout of the shipped app (commit
`f3a1639`, 2026-08-26; the agent read `2a11969`, 2026-09-24):
- The roles are employee / accountant / company_secretary / auditor, with no
  client role. The agent's list differed slightly, but the conclusion holds.
- The extraction prompt says to "use the closest available account and note the
  assumption", rather than asking.
- There is no ratification marker outside the rulebook YAML.
- "End Period" exists.
- "Reversal" appears only in the user help ("for a posted entry, make a reversal
  or adjustment") and in prompts. Nothing in the code enforces it.

## Headline

The live Accounting page describes several things only **the engine** does, or
that nothing does. Each must be decided before new mocks are drawn:

| Live claim (copy or mock) | Finding |
|---|---|
| The client uploads, or answers questions, on a companion phone app | The phone app is the same staff tool as the web app. There is no client role. |
| Fields extracted; nature classified (invoice / receipt / payment) | The shipped app extracts a dynamic key/value list and classifies only "bank statement or not". The nature taxonomy exists in the engine only. |
| Asks "Which account does this belong to?" | The shipped app picks the closest account and notes the assumption. The engine asks. The shipped app's real questions cover buyer or seller, an incomplete payment series, and OCR discrepancies ("A: '$30.0' or B: '$30.3' or Other?"). |
| "Once answered, the entry is booked" | A second approval ("Do you approve these draft transactions?") is always required. Status goes draft → confirmed, and becomes posted only at period close. |
| A rule not yet validated by an accountant is marked (the "Unreviewed rule" badge) | This is in the engine only, as a whole-journal banner. It is not per line, and it is not in the shipped app. |
| "Document SGD 104.00 · Booked USD 76.76" | The format is invented. The real form is the functional amount with the source amount in brackets. |
| A list of periods with Closed / Open pills | There is one global close date that only moves forward, set from "End Period". |
| "3 bank lines unmatched" | Close never checks bank lines, and bank lines are not stored. The close modal warns about **draft** transactions instead. |
| "A closed period accepts reversals only" | Posted means read-only. The only guidance is in the user help: correct it with a new entry. |
| Bank lines matched to entries | Confirmed. Exact hits go through a fast path, everything else is classified by the model, and **every line is shown to a person** with three choices (Create Transaction / Fix Existing / Ignore). Then there is a batch approval. |
| Dual currency, rate at posting, revaluation at period end, debit-XOR-credit validator | Confirmed, including a DB CHECK constraint. |
| Reports on demand | Confirmed, but only the Balance Sheet and Income Statement. |

## Per step — the real UI

### 1. Send the document
- **Web:** "Upload Bills". Modal tabs "Local Files" / "Camera". Files are grouped
  into "+ Create Group", with the note "Each group processes as one transaction.",
  then "Upload Groups".
- **Phone:** "Upload Bills", with the buttons "Files" / "Photos" / "Scan" (a
  multi-page scanner; there is no live viewfinder). Grouping uses "Group N", a
  note field "Add a note for this group…", then "Upload N Group(s)", then
  "N Group(s) Queued" / "Your bills are being processed."
- **State:** task `queued → running → …` (the file itself has no status).
- **Do not show:** a camera viewfinder, a document library list, a client login.

### 2. Extraction
- **Real stages:** bank-statement detection, currency detection, a narrative
  "document story", audit gates, a journal plan, extraction, senior audit, and
  final approval.
- **UI:** an "Extracted" badge, "N field(s) identified", and title-cased keys.
  The keys are dynamic.
- **Phone progress strip:** Upload → Processing / Pending / Review → Completed.
- **Do not show:** fixed Supplier / Date / Amount / Currency / Terms labels
  ("Terms" exists nowhere), or an invoice / receipt / payment badge.

### 3. Question
- **Pause:** a `request_user_clarification` pause sets the task to
  `pending_approval`.
- **Web:** "Question N of M", radio options, "Additional comments or explanation
  (optional)", "Remember my choice and do not ask similar questions again", and
  "Continue →".
- **Phone:** an amber box, radios, "Other answer (optional)", and "Continue".
- **Per-user setting:** `accounting_level` (novice / expert / dnd); dnd asks less.
- **Do not show:** an auto-answer, "which account" (in the shipped app), or a
  dedicated question queue.

### 4. Double entry
- **Final approval:** a modal with Date / Currency / Exchange Rate and a "Journal
  Entries" table (Account Code / Account Name / Debit / Credit). It shows an
  "Audit Confidence" High/Medium/Low/Critical badge, and the choices are Approve
  or Reject.
- **Card view:** a per-transaction "Total", with the source-currency total in
  brackets.
- **States:** `draft → confirmed`, then `posted` at close.
- **Do not show:** a per-line rule badge, a Code/Dr/Cr header, or booking
  straight after a question.

### 5. Reconcile and close
- **Bank-line review** sits in the task page. It shows "N matched" / "N need
  action", badges MATCH / MISSING / MISMATCH / ERROR, and three radio options
  per line with one pre-selected. Then a batch approval.
- **Close:** on the "Utility" page, "🔒 End Period", then "Period to close:",
  then "Are you sure…? … permanently posted and become read-only", then
  "Confirm Close". It warns: "This period contains N draft transaction(s)."
- **Phone:** none of this step exists on the phone.
- **Do not show:** a period list, a bank-line gate on close, or reversal language.

## Recommended screen per step (from the subagent)

1. **Upload Bills (phone).** Files selected → group created → uploading →
   "N Group(s) Queued".
2. **Task progress strip plus the Extracted card.** Upload ✓ → Processing →
   fields fill → "N field(s) identified".
3. **Question card.** Task pending → question plus radios → an option picked →
   Continue → processing.
4. **Approval modal.** Drafts proposed → confidence badge → Approve →
   draft → confirmed.
5. **Bank-line review, then End Period.** Lines classified → actions chosen →
   approve → End Period → confirm → posted, read-only.

## Open decision for the founder

Which codebase does the page describe: **the shipped app**, **the engine**, or
the shipped app with the engine named as "in progress"? This record cannot
settle that. It decides the copy and all five screens.

---

## Pass 2 — the exact screen content (shipped app, commit `2a11969`)

The founder chose "the shipped app only". This pass gathered the literal strings
for each screen.

### 1. Upload — phone `UploadBillsScreen`
- **Header:** AppBar "Upload Bills", with a close (×) button.
- **Pick buttons:** "Files" (folder_open) / "Photos" (photo_library) / "Scan"
  (document_scanner).
- **File count:** "N / 20 files". Thumbnails are 90×120, with the filename below
  and a × to remove. No size is shown. The empty state reads "No files selected".
- **Grouping:** "Group Files", hinted "Tap to select, then create a group".
  Selecting shows "N selected" with "Create Group" (+) and "Clear".
- **Groups section:** "Groups", then per group a chip "Group 1", the count
  "1 file" / "2 files", "Remove", and a note toggle ("Add a note for this group…").
- **Upload button:** "Upload 1 Group" / "Upload 2 Groups", pluralised properly.
  With no files it reads "Add files to upload" and is disabled.
- **Uploading:** a spinner, "Uploading…", and "Please wait, do not close this page."
- **Done:** a green check, "1 Group Queued", "Group 1: Task #N",
  "Your bills are being processed.", and "Done".
- **The web equivalent** is the "Upload Bills" modal: "Local Files" / "Camera",
  "+ Create Group", "Upload Groups".

### 2. Reading — there is **no extracted-fields screen**
- The "Extracted" card renders **empty for every normal bill task**, on both web
  and phone. Its data is the arguments of the tool that paused the task, and all
  of those are on the card's skip-list.
- So nothing in the UI shows the fields being read. What shows is the **progress
  strip**: "Upload" ✓ → "Processing" (queued / running) / "Pending" /
  "Resubmit" / "Review" / "Failed" → "Completed" (or "New Submission").
- The extraction result surfaces as the **drafted transaction group** (screen 3).

### 3. The draft entry — the transaction group (web modal and phone card)
- **Header:** "📋 Transaction Group #id".
- **"🔍 Audit Confidence":** shown as "{pct}% — {label}" with a bar. The bands
  are ≥90 High (green), ≥70 Medium (amber), ≥40 Low (orange), and below 40
  Critical (red). Concerns follow, each prefixed "⚠ ".
- **Disposition badge:** "Auto-confirmed" / "HITL-confirmed" / "Auto-rejected" /
  "HITL-rejected" (see the open question below).
- **Summary:** "• 1 Transaction", "• 2 Ledgers" (pluralised, and only counts that
  are not zero).
- **Transaction rows:** Date / Description / Currency / Exchange Rate / Status.
  Status is the raw enum: `draft`, `confirmed` or `posted`.
- **"Journal Entries":** Account Code | Debit | Credit, in the **document's
  currency** (source amounts).
- **Buttons:** "Approve" / "Reject". Phone has no Edit button.
- **Example:** Group #4821, 91% — High, "Auto-confirmed", 1 Transaction, 2 Ledgers.
  SGD, rate 0.76. The entries are 6100 Dr 104.00 and 2100 Cr 104.00.
- **Dual-currency total** (only on the ledger list card view): "Total" |
  **USD 76.76** with (SGD 104.00) on the line below, once per transaction.

### 4. Question — web task page / phone `ReviewRequestContent`
- **Header:** "Review Request", "Answer / approve agent request here".
- **"Request Rationale":** a box above the question.
- **The question:** text, then radio options, then "Additional comments or
  explanation (optional)". With several questions it adds "Question 1 of N" and
  "Please answer all N questions to continue:".
- **Other controls:** "Remember my choice and do not ask similar questions
  again", and "Continue →" (web) / "Continue" (phone). There is no Reject in
  this mode.
- **Real phrasing** (the prompt example the model imitates): *"This receipt has
  several hard-to-read fields. Please confirm the correct values: (1) Receipt
  date — A: '2021-07-16' or B: '2019-09-10' or Other? (2) Total amount — A:
  '$30.0' or B: '$30.3' or Other?"*
- **After Continue:** the strip goes "Pending" → "Processing".

### 5. Bank lines — web task page only
- **Summary:** "3 matched · 2 need action", with "Expand All".
- **Per line:** a badge MATCH / MISSING / MISMATCH / ERROR, then the date, the
  description, and the amount as "+$1,250.00 USD" / "−$1,250.00 USD".
- **Radios:** "Create Transaction" / "Fix Existing" / "Ignore (Matched/Manual)".
  The server pre-selects one: matched → Ignore, missing → Create,
  discrepancy → Fix Existing.
- **Expanded line:** "AI Rationale", "Matched Transactions" (#ids), "Ledger
  Amount", and a note field.
- **Submit:** through the task's "Approve".
- **End Period:** "End Accounting Period", then "Period to close:", then "Cancel" /
  "End Period". Next comes "Are you sure you want to end this period?" and
  "Confirm Close". It is guarded by "This period contains N draft transaction(s)…".

### Phone app status
- **Distribution:** no evidence of it. There is no store, TestFlight or CI
  release config, and the version is `1.0.0+1`. The bundle id is
  production-shaped, which shows intent to ship.
- **What it can draw:** screens 1–4 honestly. It has no bank-line or close screen.

### Open: does "Auto-confirmed" skip the human approval?
This pass's disposition badge suggests some groups confirm with no human click.
Pass 1 said final approval is always required. A third, targeted question is out
(pending).
