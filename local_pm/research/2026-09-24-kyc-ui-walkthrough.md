# KYC — what the real UI shows, step by step

**Date:** 2026-09-24
**Why:** Same reason as the Accounting pass — the mocked screens, their
animation and the copy should come from how the product actually works, not
from guesses. This is the source for the KYC pilot of `projects/mock-animation/`.
**Method:** A read-only subagent (Sonnet) shallow-cloned four candidate
repositories, read them without modifying anything, and cites file:line for
every claim below (paths are relative to each codebase's own root). In this
record they are called by role, not by name:
"the phone app" (Flutter, holder-facing, commit `b648c89c`),
"the phone app's API" (plain PHP, commit `67ac82eb`),
and "the web app" (plain PHP, counterparty/requester-facing plus a fallback
page for people without the app, commit `b55d54ce`).
A fourth, much older codebase — "the 2022 prototype" — is a different
generation entirely and is described separately below (commit `7a686a5e`);
it shares no code, schema or deployment with the other three.

**An important caveat on the API claims below:** the phone app's API is a
single-commit shallow snapshot. The phone app calls three endpoints
(fetch an incoming request, respond to it, update its status) that do not
exist anywhere in that repository's file tree, and the one document-upload
endpoint that does exist doesn't read the field the app actually sends. This
may mean the live server has code this repository never got, or it may mean
this part of the flow has never worked end-to-end — the repo alone can't
settle which. Every claim below about what the API does or doesn't do is a
claim about **this repository as committed**, not about whatever may be
running in production.

## Which generation is current

Confirmed: **4 repositories, 2 generations.**

- **The 2022 prototype** (oldest commit read) is a Flutter client plus a
  browser-based login library plus an AWS Lambda/DynamoDB backend — a
  completely different stack. It has a single flat commit with its
  dependencies checked into git, and nothing in the current generation
  references it. Abandoned.
- **The current generation** (the phone app + its API + the web app) shares
  one MySQL database and one deployment domain, and has the most recent
  commits of the four repos. This is "current" both by recency and by being
  the only actively developed generation — but it was never shipped as a
  product. The version number is still the Flutter template default, the
  Android package id is still the Flutter template default
  (`com.example.<projectname>`), the login provider points at a vendor
  "dev" tenant, the one counterparty account is a hardcoded placeholder ID
  used everywhere the concept of "a counterparty" appears, and
  the welcome screen's own copy says "Try a verification flow" (the phone
  app, `lib/pages/home.dart:38`).

Oddly, **the abandoned 2022 prototype's design is the one that matches the
marketing copy**, not the current generation. Its data-structure notes
(the 2022 prototype, `doc/data_structure.txt:66-78`) describe a request
object with an expiry date, and its Lambda backend implements a per-document
verification record carrying who verified it and when
(`doctable.js:269-273`), plus a distinct "self-verify"
event for phone/email/existence versus a person-verified document
(`doctable.js:304,308-321`). None of that shipped. See "Open decisions" below.

## Headline

| Live claim (copy or mock) | Finding |
|---|---|
| A reviewer checks the rest; service provider verifies; reviewer name and date stamped on record | **FALSE**, in the current generation. No reviewer role, screen, login or "reviewed by" field exists anywhere (grepped `reviewer`/`reviewed_by`/`verified_by`/`verified_at` across the phone app, its API, and the web app — zero hits). The per-document Verified/Pending flag is hardcoded to "not verified" at creation (the phone app, `lib/view_models/model_viewmodel.dart/document_information_viewmodel.dart:80`) and no `UPDATE`/`INSERT` in either PHP codebase ever sets it again — every document stays "Not Verified" forever. Separately, unprompted, the phone app flips the holder's whole-profile flag to "verified" right after any single document is saved (`document_information_viewmodel.dart:208-209`), based on nothing. |
| Verify contact details directly (phone/email by one-time code) | **FALSE.** No one-time-code/OTP/"verification code" logic anywhere (grepped across the phone app and its API — zero hits). Phone number is a plain text field saved as typed (the phone app, `lib/pages/insert_document_page.dart:245-256`). Email's entry screen is `Icon(Icons.warning, ...)` with no input field at all (`insert_document_page.dart:104-105`). |
| Register documents once (passport, ID card, proof of address, contact details) | **PARTLY.** Four working types: Passport, ID card, Address, Phone Number (`insert_document_page.dart:97-111`). Address is two free-text fields, country and city, with no document photo or upload (`insert_document_page.dart:113-161`). Email is modeled in the data layer (`lib/models/document_information.dart:200-218`) but has no working entry screen. |
| Share on purpose: counterparty requests, or holder pushes it; scoped and expires | **PARTLY.** The request side works as described below. "Holder pushes it" does not exist — no path in the phone app initiates a share without an inbound request first. Nothing expires: no expiry field or timestamp exists anywhere in the web app's request-creation code (`backend/submitDoc.php`) or its schema usage. |
| Requests carry conditions (verified or not, issued within a period, not expiring before a date) | **PARTLY.** One condition exists: a per-document-type "must be Verified" checkbox on the request form (the web app, `page/requestForm.php:47-49` and similar, toggle logic at `:101-125`). No issued-within-a-period or not-expiring-before-a-date condition exists anywhere. |
| Request lifetime in months vs. share-link minutes, often via a scanned code | **Scanned code: TRUE. Durations: FALSE.** The mechanism is a QR code (`backend/submitDoc.php:117-123`), but it encodes nothing except a bare numeric request ID (`base64` of the application id) — no expiry of any kind, in months, minutes, or otherwise. |
| Every action in an event log | **FALSE**, in the current generation (grepped for a log/audit/event table across all three current-generation codebases — zero hits). The 2022 prototype had a general event table; it wasn't carried forward. |
| No liveness, face match, OCR, or government/bureau lookup | **TRUE.** Document capture is `ImagePicker().pickImage(...)` (the phone app, `insert_document_page.dart:930-932`) — camera or gallery, no processing afterward. Grepped for liveness/selfie/face/OCR/bureau/government across all repos — zero hits (the one "Selfie Video" string is a decorative timeline label, see below). |
| Everything in the UI is available over an API | **PARTLY.** Every screen in both the phone app and the web app is backed by a server call. |

## Per step — the real UI

### 1. Register a document (holder, phone app)
- **Entry:** a first-run screen headed "Welcome to KYC!" with the button
  "Verify Me" (`lib/pages/home.dart:29-38,74`), then vendor login (`lib/pages/login_page2.dart:65-105`),
  then a screen titled "Identity
  Verification" showing "Verify your identity" over a four-step timeline —
  Document, **Selfie Video**, Proof of address, and a final blank checkmark
  step (`lib/pages/start_verification.dart:14,33,51,59,66,73`). Only the first step is real: the button below it, "Start
  Verification", opens the document form for a passport (`start_verification.dart:83,95`). **"Selfie Video" is
  decorative** — no screen, camera flow, or capture logic exists behind it
  anywhere in the app.
- **The document form** (its own screen title is literally left as "Insert
  Document Page" in every case, never customized per document type,
  `lib/pages/insert_document_page.dart:74`) branches
  on type (`insert_document_page.dart:97-111`):
  - **Passport / ID card:** Name, a number field (placeholder format shown as
    a long digit string), and two tap targets, "Upload Front Passport" /
    "Upload Back Passport" (`:329-365,426,480`), each opening the camera or the photo gallery
    (`:930-982`).
  - **Address:** two plain text fields, Country and City (`:119-161`). No photo, no
    upload, no document at all.
  - **Phone Number:** one plain text field (`:236-256`). No code is sent or checked.
  - **Email:** the screen is a bare warning icon (`:104-105`). There is no input. This
    document type cannot actually be added.
- **What the system does automatically:** the instant any one of these is
  saved — passport, ID card, address, or phone number, it doesn't matter
  which — the app itself calls the "mark my profile verified" endpoint with a
  hardcoded "yes" (`lib/view_models/model_viewmodel.dart/document_information_viewmodel.dart:208-209`). No content check, no threshold, no person, no comparison
  against what was actually entered.
- **What a person does:** types the fields, taps a photo (or types nothing,
  for a first pass, and the profile still gets marked verified).
- **Do not show:** a selfie/liveness step, an OCR "reading your document"
  state, an email entry screen, or a reviewer of any kind.

### 2. "Verify contact details" — does not exist as its own step
There is no dedicated contact-verification screen, code path, or state.
Phone number is just one more free-text field from step 1; email cannot be
entered at all. If the mock keeps a phone/email "verified by code" screen, it
is drawing a feature that isn't in the current generation.

### 3. "A reviewer checks the rest" — does not exist
No screen, no role, no login, no queue. The closest thing to a status is the
document list's Verified/Not Verified pill (`lib/pages/main_homepage2.dart:270-284`) — and because nothing ever writes
the "verified" value after a document is created (`document_information_viewmodel.dart:80`), that pill reads "Not
Verified" for every real document, permanently, regardless of the profile-level
auto-verify from step 1. **Do not draw a reviewer screen, a reviewer's name,
or a review date stamp** — none of it is backed by anything in the current
generation.

### 4. Share on purpose
- **Counterparty side (web app):** a form headed "Multiple Document" with
  checkboxes for Passport / ID card / Address / Phone Number, each with a
  second, initially-disabled checkbox labeled "Verified" that becomes
  available once its document is selected (the one real "condition" in the
  system) — plus a free-text "Application Description," and "Submit"
  (`page/requestForm.php:40,44-85`).
  Submitting shows "Your Application ID is : {N}" and a QR code image (`backend/submitDoc.php:100-101`). The QR
  encodes a link containing nothing but that numeric ID (`submitDoc.php:117-123`) — no expiry, no
  scope beyond the ID itself.
- **Holder side (phone app):** scanning the QR (a standard OS deep link, not
  an in-app scanner — no QR-scanning code exists in the app; the deep link is
  read at `lib/pages/main_homepage2.dart:28-56`) opens a screen
  titled "Information Request" listing the requested item(s) (`lib/pages/receive_information_request.dart:33,58-73`), each showing
  who requested it and its status. Tapping one opens a dialog, "Accept
  Information Sharing" — "You have a pending request for sharing information.
  Do you accept?" — with Cancel / Decline / Accept (`receive_information_request.dart:117-119,127,164,202`). Declining and "still
  pending" render identically ("Pending", `:66`); there is no visible Declined
  state.
- **If the phone app isn't installed,** the same link shows a plain page:
  "Sorry, You Haven't Downloaded the App Yet! Please download the app and
  scan the QR code again to complete your request." (the web app, `page/noapp.html:11-12`).
- **Counterparty's own view (web app):** a page headed "API Portal" grouping
  requests by application ID, with a sub-table — Request At / Name / Email /
  Document Type / Actions — where each row reads "Info not shared" until the
  holder accepts, then becomes a "View Detail" link (`page/requestedDataTable.php:18,60,79-87,112-116`). The detail screen shows
  "Is Document Verified?" (Document Verified / Pending / Not Verified) and
  then the raw field values for whatever was shared, including the stored
  document photos (`page/requestedSingleData.php:40,44-53,61-201`).
- **What the system does automatically:** generates the QR/link, stores the
  request, and — once accepted — will actually withhold the record from the
  counterparty until acceptance (this scoping check is real: `backend/retriveData.php:74-85` requires `status = 1` before returning anything). It does not
  expire anything.
- **What a person does:** the counterparty fills out and submits the request
  form and later opens "View Detail"; the holder taps Accept or Decline per
  item. That's the entire human involvement in sharing.
- **Do not show:** an expiry countdown, a "scoped and expiring share link,"
  or a holder-initiated share with no inbound request.

## Platforms

- **Phone app** (a mobile app): the holder's only interface. This is the
  only platform built for the holder — document entry, the document list,
  and responding to requests all live here. Not shipped: the version number
  and app ID are both still the framework's out-of-the-box defaults, and
  login points at a non-production identity tenant.
- **Web app** (browser pages): used by the requesting counterparty to build
  a request, watch its inbox, and open shared records — and, separately, as
  the fallback page shown to someone who scans the QR without the app
  installed. There is no separate reviewer console; "the portal" is the
  requester's own inbox, not a back-office verification tool. It's built for
  exactly one counterparty account, hardcoded, not a multi-tenant product.

## System vs. person — the honest positioning line

There is no AI anywhere in this codebase, in either generation. Given the
Accounting line was "the AI does most of it; a person does the last part,"
the honest KYC equivalent, for what's actually shipped, is closer to: **the
holder enters everything once and takes two photos; the system stores it,
declares the profile verified without checking it, and later shows a
counterparty only what the holder agreed to share.** There is no automated
extraction, no automated check, and — in the current generation — no human
review either. If the marketing page wants to keep a "someone checks it"
claim, that claim currently describes a feature that would need to be built,
not one that exists.

## Recommended screen per step (five screens, one per step)

1. **Holder's document list (phone app "Home").** Profile card — "A. Holder",
   "a.holder@example.com" — a "+" button, and a list of document rows:
   Passport / ID card / Address / Phone Number, each with a status pill.
   Show at least one pill red ("Not Verified") to stay honest about what the
   real status logic does.
2. **Add a document (phone app document form).** The passport view: Name,
   Passport Number ("A1234567" or similar plausible format), two upload
   tiles for front/back, a Save button turning into a spinner.
3. **Request form (web app, counterparty).** "Multiple Document" heading,
   the four checkboxes each with its "Verified" condition toggle, an
   Application Description box, Submit → an application ID and a QR code.
4. **Respond to a request (phone app "Information Request").** The
   requested-item row, then the "Accept Information Sharing" dialog with
   Cancel / Decline / Accept.
5. **Counterparty's view (web app "API Portal" + detail).** The grouped
   request list with a "View Detail" action, opening into "Is Document
   Verified?" plus the shared field values.

**Suggested reveal order for animation:** 1 → 2 → 3 → 4 → 5 — the holder's
existing wallet, the holder adding a document, a counterparty asking for
something, the holder approving it, and the counterparty seeing the result.
This mirrors the real, working part of the product end to end and skips the
two steps (contact verification by code, reviewer check) that don't exist.

## Open decisions for the founder

1. **Which generation does the marketing page describe?** The reviewer
   stamp, the contact-verification-by-code step, the request/share expiry,
   and the event log are all things the abandoned 2022 prototype's design
   included and the current, shipped generation does not. This record can't
   settle which one the page should describe — that's a product call.
2. **Keep or cut the reviewer screen?** As things stand, drawing a reviewer
   screen depicts a feature with zero backing code in the current
   generation — no role, no field, no screen.
3. **Keep or cut the durations claim?** "Request lifetime in months, share
   link in minutes" has no basis in the current code at all — there is no
   expiry anywhere. This is either a claim about something to be built, or
   it should be dropped.
4. **The positioning line.** With no AI and, in the current generation, no
   human reviewer either, what should replace "the AI does most of it; a
   person does the last part"? See the suggested line above — it's honest
   but may read as less impressive than intended.
5. **The auto-verify behavior is a live discrepancy worth the founder's
   attention on its own**, separate from the marketing question: the app
   currently marks a holder's whole profile "verified" after a single saved
   document of any kind, with no check performed. Whether or not it affects
   the mocks, it's worth knowing before any copy calls the product a
   verification service.
