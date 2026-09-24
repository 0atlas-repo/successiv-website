# Creators Sphere — what the real UI shows, step by step

**Date:** 2026-09-24
**Why:** The founder asked that the mocked screens, their animation and the copy
come from how the product actually works, not from guesses. This is the source for
the Creators Sphere mocks, matching the Accounting pilot's method.
**Method:** A read-only subagent (Sonnet) went through three codebases, citing
file:line for every claim. In this record they are "the app" (the creator-facing
mobile app), "the API" (the backend), and "the admin portal" (the brand/ops web
tool). An earlier audit counted 3 repos for this product; that count is confirmed —
a fourth candidate found along the way is a deployment-only "super-repo" whose two
subfolders are just git submodules pointing at the API and the admin portal, with no
independent code of its own, so it isn't counted. Commits read: the app
`9cfed6f` (2026-06-04, a feature branch — the app's own `main` branch predates the
current screens entirely and has none of this code, see "Open decisions"); the API
`cff9c72` (2026-07-30, its newest); the admin portal `abe9e855` (2026-07-30, its
newest). A separate, unpublished backend was found in the same organization whose
name and file layout suggest it is the Instagram-post-verification marketplace the
brief describes as a different product — it was not opened, and nothing in this
record draws on it.

## Headline

| Live claim (copy or mock) | Finding |
|---|---|
| Discover gigs, browse live campaigns filtered to your niches | PARTLY. Browsing is real. The filter chips are a global, manually-picked category list (Beauty, Food & Drink, …), not automatic personalization to the creator's own niche. A per-creator "niche score" does exist, but it's used only on the brand side, to rank creators worth inviting — never to shape the creator's own feed. |
| Apply in seconds (or accept invite-only) | PARTLY. The tap is instant, but for an open campaign the application then sits as "Pending approval" until a human on the brand/ops side approves it and sets the post window — it is not accepted on the spot. Accepting an invitation is closer to instant, since the human step already happened when the invite was sent. |
| Create and post to your linked account | TRUE, with a caveat: Instagram-only in practice. URL validation, the verification jobs, and the metrics pull are all Instagram-specific; other platforms are declared in an enum but have no working path through the flow. |
| Submit proof: drop post link, system checks it against the brief | PARTLY. "Drop the link" is real. The check itself branches: if the campaign required a pre-approved draft, the system instead confirms the live post matches *that draft* (exact caption match, plus a video-frame similarity check) — not a fresh read of the brief. Only when no draft approval was required does an AI actually judge the live post against the brief, the required tags and the mission requirement. |
| Reward moves to balance | FALSE. No balance, wallet or payout code exists anywhere in the backend. The one "balance" widget in the app is hardcoded to a zero amount and is never even used on any live screen. The real settings row reads "Coming soon." |
| Missions per campaign | TRUE. A campaign holds one or more missions, each with its own requirement, reward and post window. |
| Optional brand approval gate on drafts | TRUE. Set per campaign by a single flag. When on, a human on the brand/ops side must approve the creator's caption-and-media draft before the creator is allowed to submit a live-post proof. |
| Hashtag/mention check on the submitted post | FALSE, as stated. There is no hashtag or @mention pattern-match anywhere in the code. What actually runs is either an exact-caption-plus-image/video-similarity check against the creator's own approved draft, or a holistic AI judgment of the whole post (image and caption) against the brief — not a mechanical tag search. |
| Scheduled engagement collection | TRUE. A daily background job pulls real per-post numbers (views, reach, likes, comments, saves, shares) straight from Instagram's own API, fully unattended. |
| Pending vs available balance | FALSE. There's no balance concept at all — not even a "pending" ledger entry. |
| Slot released to next creator on deadline | FALSE. Nothing compares the campaign's creator cap to a live count, and nothing reassigns a spot. The nearest real behavior is a reminder notification near the post-window deadline — a nudge, not a release. |
| No creator-brand messaging | TRUE. No chat or DM feature exists. The one message-shaped code path (a dead OAuth integration with a different social platform) is entirely commented out. |
| Settlement outside the product | TRUE, but by absence rather than by design — the product doesn't track *any* part of payment, including what's owed, so whatever happens next necessarily happens somewhere else. |
| A drawn "insights" screen for the creator | FALSE for the creator. The creator's own mission screen has a two-word status pill — "Submission Verified" or "Awaiting Verification" — never a number. A real numbers-and-charts insights screen exists, but only inside the brand/ops tool. |

## What the AI/system does automatically vs. what a person does

- **Discovery:** all automatic — the creator browses and filters a live feed themselves; no AI ranking of the feed shown to them.
- **Getting in:** a person, every time, on the open-campaign path — a brand/ops human approves each application by hand and sets the post window. Invite-only skips this at apply-time because a human already chose the creator earlier, when the invite was sent.
- **Draft review (optional, per campaign):** a person. When a campaign requires it, a brand/ops human reads the creator's caption and media and approves or rejects it. Nothing here is automatic.
- **Proof verification (after the post goes live):** the AI, almost entirely automatic. Either it checks the live post is a faithful re-post of the already-approved draft (exact caption match, plus a similarity check for video frames), or — for campaigns with no draft step — it judges the live post against the brief itself with a vision-and-text model. A brand/ops human can still hand-override the result through the same endpoint the AI writes to, but nothing requires them to.
- **Engagement numbers:** the AI/system, fully automatic, once a day, straight from Instagram's own API — no person, no creator action. (A second, creator-driven path — upload a screenshot of Instagram's own insights panel, let AI read the 17 numbers off it — is designed and present in the backend, but the app currently has no working screen to do the upload; more below.)
- **Closing the loop:** a person. Nothing in the code marks a campaign "done" automatically; a brand/ops human does it by hand, and the one application status the UI reads as "Paid" is, by the app's own code comment, never actually written by the backend today.

A fair positioning line, the honest equivalent of the Accounting product's: **people
decide who's in, and — optionally — whether a draft is postable; the AI checks what
actually went live.** Unlike Accounting, there is no "last mile" a person closes on
the money side, because there is no money side yet in the product.

## Platforms

- **Creator side:** the app only (built for iOS and Android from one codebase). There
  is no separate creator web app.
- **Brand/ops side:** the admin portal only (a web tool). There is no separate "brand
  app."
- **Is the phone app actually shipped?** No. The app is functional and installable,
  but nothing indicates a store release: the version is still `1.0.0+1` (a first-build
  number), there's no store/CI/release config in the app's own repo, and the admin
  portal's own "Get the App" download page has its Google Play and App Store links
  wired through a small script that still carries a literal placeholder Apple App
  Store ID and a `// TODO: replace with real ... ID` comment — the page instead tries
  to open the app itself first (a private link scheme) and only falls back to those
  placeholder store links if that fails.

## Per step — the real UI (creator side)

### 1. Discover — the "Explore" screen
- **Header:** "Explore", with today's date above it and a notification bell.
- **Filter chips:** "All" plus a row of category chips (e.g. Beauty, Food & Drink) —
  a global list fetched from the API, not derived from the creator's own profile.
- **Feed:** an eyebrow reading "N gigs live now", a featured campaign card, then a
  2-column grid. Each card shows: brand name, campaign title, a pay figure, and a
  deadline ("Due —— " or a real date). The featured card's button reads "View gig".
- **Empty/error states:** "No [category] gigs\nright now." / "No open gigs\nright
  now." / "Couldn't load\nthe catalog."
- **Gate banner:** a persistent Instagram-connection banner sits above the feed at
  all times — nothing downstream (applying, drafts, proof) works without it.
- **Do not show:** any sense that the chips reflect the creator's own interests —
  they're a manual pick, same list for everyone.

### 2. Apply, or accept an invite — the campaign details screen
- **Header block:** brand name, campaign title, a pay block labelled "YOU GET PAID"
  with the amount, and a "CAMPAIGN" label with the date range.
- **Fact pills:** e.g. "12 days left", "2 deliverables", and the campaign's required
  hashtag as a tag pill.
- **Sections:** "The brief" (a plain-text paragraph, HTML-stripped from the brand's
  own description), then "What you'll do" — a 3-step numbered checklist, one row per
  mission when the campaign has real missions, otherwise a generic fallback:
  1. Capture your content (before post start)
  2. Submit for vetting (after capture)
  3. Post & submit proof (by campaign end date)
- **CTA button**, one line, state-driven:
  - Open campaign → **"Apply now"**
  - Invited → **"Accept invitation"**
  - Applied, awaiting a human → **"Pending approval"** (disabled)
  - Approved (open path) → **"Submit your post"**
  - Accepted (invite path) → **"Submit your proof"**
  - Rejected / declined / campaign complete → disabled terminal labels
  - The whole button is disabled, regardless of state, until an Instagram account is
    linked.
- **Do not show:** an application being accepted the instant it's submitted, for an
  open (non-invited) campaign — it goes to "Pending approval" and stays there until a
  human on the brand side acts.

### 3. Draft approval (optional, per campaign) — "Submit drafts for review"
- **Header:** "Submit drafts for review."
- **Copy:** "We check your drafts against the brief before they go live. Usually
  approved within 24 hours."
- **Fields:** "Planned caption", and a draft-media picker under "Add your draft
  content".
- **Button:** "Submit for Vetting". A prior rejection shows "Previous vetting was
  rejected."
- **What happens next:** a human on the brand/ops side approves or rejects the draft
  — this step has no AI or automatic path at all.
- **Do not show:** this step for every campaign — it's optional, gated by a
  per-campaign flag, and many campaigns skip straight to step 4.

### 4. Post & submit proof — "Submit your live post"
- **Header:** "Submit your live post."
- **Copy:** "Paste the link to your published post. We auto-verify it in minutes —
  then your payout is released."
- **Fields:** "Select Instagram Post" (a picker of the creator's own recent posts, or
  a manual-entry fallback), "Ad Code" (hint: "Enter the ad code from your post" — this
  value is stored but never actually checked by anything downstream), "Live post URL"
  (hint: "https://www.instagram.com/p/...").
- **Standing banner:** "Reels and video posts are not currently supported for
  automated verification. Use a static image post." — shown on every visit to this
  screen, even though the verification code underneath does have a video-comparison
  path; the mismatch is real and unresolved, not something to fix in the mock.
- **Button:** "Submit proof."
- **What happens next (branches):**
  - If a draft was already approved: the system checks the live caption matches the
    approved draft exactly (case-insensitive), plus — for video — a frame-by-frame
    similarity score.
  - If no draft step applied: an AI reads the live post's image(s) and caption and
    judges them against the campaign description, the required tags, and the
    mission's own requirement text.
  - Either way the check is queued, not run inline: both are `@is_background_job`
    functions, whose wrapper only enqueues a job for a separate poller (the API,
    `services/bg_jobs.py:156-165`, `bg_jobs/verify_post_against_vetting.py:90`,
    `bg_jobs/content_verification.py:152`; commit `cff9c72`). The app's own copy
    says it will "auto-verify it in minutes". Corrected by hand after the agent paused.
- **Resulting states:** "Proof under review" → "Proof verified" (success), or "Proof
  rejected — resubmit", or, on a hard failure (timeout, bad file, etc.), "Awaiting
  review" (a dead end — no resubmit, needs a human to look at it).
- **Do not show:** a literal hashtag or @mention scan — that's not what happens.

### 5. Track — "Track your work."
- **Header:** "Track your," "work." with filter chips: "Action needed", "In review",
  "Invited", "Paid".
- **Per-card status/action label, by application state:**
  - Approved → status "Submit your proof", chip "Do it"
  - Accepted (invite) → status "Ready to start", chip "Open"
  - Applied → status "In review", chip "Waiting"
  - Invited → status "Invitation pending", chip "Accept"
  - Completed → status "Paid", chip "Paid" — **this state is, by the app's own code
    comment, never actually set by the backend today.** It's a real, shipped string;
    it's just presently unreachable with live data.
- **Mission detail screen sections** (all caps section labels): STATUS, REWARDS,
  INSTRUCTIONS, REQUIREMENT, POST WINDOW (a start–end date range), **POST INSIGHT**,
  POST VETTINGS.
- **The POST INSIGHT card is not a metrics screen.** It renders exactly one of two
  strings — "Submission Verified" or "Awaiting Verification" — and nothing else.
  There is no view anywhere in the app that shows a view count, a like count, or any
  other number back to the creator.

### The engagement-numbers story, in full (why the "insights screen" claim is false for the creator)

Two separate mechanisms feed engagement data, and neither one shows a number to the
creator:

1. **Fully automatic today:** a daily background job pulls real per-post metrics
   (views, reach, likes, comments, saves, shares) directly from Instagram's own API.
   No person, no creator action.
2. **Designed, but not currently reachable from the app:** a second path exists in
   the backend where a creator would upload a screenshot of Instagram's own,
   creator-only insights panel, and an AI would read 17 named metrics off that
   image (rejecting the upload if any are missing), with a push-notification reminder
   ("Don't forget to screenshot your post insights… and submit") to prompt it. But
   the one status-check call the app makes for this carries its own code comment
   admitting the backend removed the endpoint it depends on, and there is no upload
   button or screen anywhere in the app's current code for this screenshot. This half
   of the loop is backend-only and effectively dead today.

Either way, the numbers only ever surface on the brand side: a "Post Insights" screen
in the admin portal, with stat cards (Total Posts, Total Reach, Total Views, Total
Engagement), a metric-filter chart (Reach / Views / Likes / Comments / Shares /
Saves), "Top 5" creator leaderboards by views and by likes, and a details table
(Creator, Mission, Post, Status, Reach, Views, Likes, Comments, Shares, Saves,
Engagement, Submitted). The admin portal even says outright, in an info banner on
that screen: "Uploaded metrics are submitted by creators. Today metrics are current
data automatically gathered from social media platforms" — an admission that path 2
above isn't the one actually running.

### Brand side, briefly

- A brand's campaign is hand-approved by a person on the platform's own ops side
  before any creator ever sees it (draft → pending → approved/rejected), and
  hand-marked complete by a person at the end — nothing here is automatic.
- The brand/ops side also hand-approves or rejects each open-campaign application,
  and sets the creator's post window at that moment.
- Draft (vetting) approval and any manual override of a proof's AI-decided status
  both go through the same brand/ops person, via the admin portal.
- The "Post Insights" screen described above is the brand's dashboard; there's also
  a PDF "Generate Report" export and a saved-reports list per campaign.
- The brand side can also rank/recommend creators to invite into a campaign, scored
  by a mix of the creator's own audience demographics and a per-creator "tag score" —
  this is the automatic "niche matching" the live site's copy may be thinking of; it
  runs for the brand's benefit, not the creator's feed.

## Recommended screens (creator side), one per step, suggested reveal order

1. **Explore.** Title "Explore", eyebrow "6 gigs live now", chip row (All ·
   Beauty · Food & Drink · Fashion, "All" active), one featured card + a 2×2 grid.
   Example values: brand "Brand A", title "Glow Serum Launch", pay
   "500" in the app's currency, deadline "Due Oct 12". **Reveal:** chips appear first, then the grid
   populates card by card; a chip gets tapped and the grid re-filters down to fewer
   cards.
2. **Campaign details.** Pay block "YOU GET PAID / 500" (app currency), "CAMPAIGN / Oct 1–Oct
   12", pills "8 days left · 1 deliverable · #BrandAGlow", brief paragraph, 3-step
   checklist, CTA button. **Reveal:** button reads "Apply now" → tap → button
   morphs to the disabled "Pending approval" state — showing the real human gate
   rather than an instant accept.
3. **Submit drafts for review** *(only if the site wants to show the optional
   path)*. Sheet header, "Planned caption" field with placeholder text filled in,
   one draft image thumbnail, button "Submit for Vetting". **Reveal:** button tap →
   sheet closes → campaign details CTA now reads the disabled "Vetting in review".
4. **Submit your live post.** "Select Instagram Post" thumbnail strip with one
   selected, "Ad Code" field with a short example code typed in, "Live post URL"
   pre-filled with a plausible URL, button "Submit proof". **Reveal:** tap → the
   video-not-supported banner and fields fade → a spinner → CTA back on the
   previous screen shows "Proof under review"; the flip to "Proof verified" (green)
   comes minutes later from a queued job, so the animation must not imply it is instant.
5. **Track your work.** Filter chips with "Action needed" active, 2–3 cards showing
   a mix of "Do it" / "Waiting" / "Open" chips. **Reveal:** one card's chip flips
   from "Waiting" to "Paid" as the animation's final beat (but see open question 1: "Paid" has no backend writer, so it is unreachable today) — this is real, shipped
   copy, even though (per above) that exact transition doesn't currently happen on
   live data; see the open decision below before using it that way.

If the marketing site also wants a brand-facing beat (its "for brands" band), the
admin portal's "Post Insights" screen is the honest one to draw — stat cards, a
metric chart, and a creator leaderboard — not a creator-facing insights screen; the
creator app doesn't have one to draw.

## Open decisions for the founder

1. **Should the mock show "Paid" at all?** It's real, shipped copy — but the status
   it represents is, per the app's own code, never written by the backend today (no
   balance/payout system exists to write it). Drawing it implies a working payout
   loop that doesn't exist yet. An honest alternative closing beat is the "Proof
   verified" state from step 4, without implying money moved.
2. **Currency.** Every reward amount in the app is hardcoded in one local currency,
   while the product's own marketing domain is Singapore-branded. Pick
   one for the mock; this record can't settle which is the intended market.
3. **Which second product is truly excluded?** A candidate backend was identified by
   name and file layout only (not opened) as the likely Instagram-verification
   marketplace to exclude. Worth a one-line confirmation from the founder so a future
   pass doesn't need to re-derive it.
4. **The optional vetting step** — does the site want to depict it at all? It only
   applies to some campaigns, and skipping it shortens the story to 4 screens without
   losing anything true.
5. **The video-not-supported banner** on the proof screen is a real, current
   limitation the founder may or may not want surfaced in marketing material — it
   reads as an honest limitation, not a flourish, so it's flagged rather than assumed
   either way.

## Known gap

The agent was paused before adding file:line citations to the prose in this note.
The citations are gathered in the uncommitted raw notes. Before any claim here is
built into a mock, trace it to its line (the label review does this).
