# Shopmgr — what the real UI shows, step by step

**Date:** 2026-09-24
**Why:** The founder asked that the mocked screens, their animation and the
copy come from how Shopmgr actually works, not from guesses. This is the
source for the Shopmgr pilot of `projects/mock-animation/`.
**Method:** A read-only subagent (Sonnet) shallow-cloned every candidate
codebase and cited file:line for every claim. In this record they are
"**the widget**" (the storefront chat panel plus its store-platform
connector app), "**the backend**" (the REST API and background jobs the
widget and portal both call), "**the portal**" (the separate staff web app,
`portal.shopmgr.ai`), and "**the WooCommerce plugin**" (an older,
disconnected artifact — see below). Read at: the widget (commit
`a524460`, 2025-04-22), the backend (`c4125f7`, 2025-05-14), the portal
(`b038bc3`, 2025-05-07), the WooCommerce plugin (`1af56b4`, 2024-08-21).

## Which codebases, which generation

An earlier audit counted "4 repos, one product." That headcount doesn't
survive a code-level check. There are two generations:

- **An older generation (2024)**, three codebases, under an earlier company
  brand: a generic web/social search prototype, a static-HTML chat pilot,
  and a first working Shopify chatbot backend. All superseded.
- **The current generation (2025)**, brand "shopmgr.ai": the widget, the
  backend, and the portal — three codebases, not four, that are genuinely
  wired together end to end (confirmed by tracing the install handoff, the
  chat payload shape, and the product/order data contract between them).

The fourth "current-generation" candidate turns out to be two different
things depending which one you mean:

- **A generic, pip-installable RAG framework**, dated right before the
  current backend, with its own README, samples and config system. Nothing
  in the backend imports it; the backend does its own catalogue search
  directly. This looks like a parallel research exploration of the same
  problem, not a generation of Shopmgr. Not one of "the four."
- **The WooCommerce plugin**, which is dated to the *older* generation
  (2024-08), not the current one. Its own bundled copy of the chat widget
  hardcodes the address of the old, retired backend. Its own data-fetching
  methods (shop data, product data, order data — all present in the code)
  are never registered as callable API routes anywhere in the plugin — dead
  code on arrival. It has no path that hands a merchant off to the current
  portal, unlike the current widget, which does. **It was never carried
  into the current generation.**

So the honest count is **three current, live codebases**, plus one
plausible-looking but disconnected leftover, plus one unrelated research
artifact. Countervailing signal: the portal's own pages *do* have live,
non-cosmetic branching for a WooCommerce-sourced shop (five different
pages set a "WooCommerce" platform label from a stored value), and the
backend's data model is genuinely platform-agnostic by design — a merchant's
account just stores two generic callback URLs (one for product data, one
for order data) that any connector could implement. So WooCommerce was
clearly *designed for*. It just isn't *delivered*: no current codebase
implements those callback URLs for WooCommerce.

## Headline

| Live claim (copy or mock) | Finding |
|---|---|
| Connect the store (install, point at catalogue and policies) | TRUE for Shopify, but simpler than "point at" implies: install is a single theme-embed toggle plus a one-click SSO hop to the portal. There's no manual catalogue/policy pointing step — the catalogue syncs automatically once installed; only the merchant's written policies/FAQs are manually entered, in the portal. |
| Semantic catalogue search | TRUE. Product lookup and product Q&A are vector searches (score-thresholded) over an indexed catalogue, not keyword matching. |
| Merchant knowledge base (policies, FAQs) | TRUE, but narrower than "the knowledge base": only two categories are manually editable in the portal (a shipping/returns-style guide, and policies). Product and promotion entries come from automatic catalogue sync and background indexing, not manual entry. |
| Assistant sees browsing context ("the second one") | PARTLY. The mechanism is real: a shopper viewing a product page gets that product handle silently folded into the same conversation history sent with every chat message, and the backend turns it into a system note like "Customer is looking at X" / "Customer looked at X for N minutes." But a *second*, purpose-built "tell me what you're viewing right now" endpoint that the widget also calls is server-side disabled (returns "finished" and does nothing) — so the live path works, a parallel path meant for the same job is dead code. |
| Social channel content indexed | TRUE. Facebook and Instagram post indexing exist as background jobs, and product-search/promotion/policy tools all also search that indexed social content as a fallback. |
| Tools = product search, current discounts, order status, shop policy, raise ticket | TRUE, and the raise-ticket type set is exactly refund / return / cancel / generic (source code spells it "cancel," not "cancellation"). There are actually two distinct product tools (search-by-keyword, and ask-a-question-about-a-specific-product), not one. |
| Escalates rather than improvises | TRUE, and directly quotable: the system prompt says "Do not answer if you do not know," and for complaints, "Do not handle complain by yourself. Use ticket tool," and for policy questions with no matching knowledge, "tell customers you don't have a valid answer." |
| Conversations reviewable and ratable (staff review, staff rate) | FALSE as framed, and more one-sidedly than it first looks. The shopper rates answers (thumbs up/down, inside the live chat) — merchant staff never see or rate a conversation anywhere: **there is no conversation/transcript screen in the portal**, and the one email that carries thumbs-up/down data and attached chat-log files is addressed as an internal admin report (its own subject line is tagged "[admin]"), built from every tenant's feedback in one run, not sent to each merchant separately. Staff can test-drive the bot themselves in a sandboxed "Playground" screen, but that copy of the widget has the rating control stripped out. |
| Knowledge base editable | TRUE for the two manual categories (guide, policy); product/promotion/social entries are not manually edited there. |
| Model selection by plan tier | TRUE. The customer-facing chat model is looked up per the merchant's plan tier at request time. (The extraction/indexing/moderation models are fixed regardless of tier — only the visible chat model varies by plan.) |
| Reads orders but never modifies | TRUE. The Shopify connector only ever requests read access to orders; a refund-creation call exists in the code but only in an unused test route, hardcodes a fixed refund amount, and would fail anyway since write access to orders was never granted. |
| No inventory/payments/fulfilment | TRUE. No tool or route anywhere writes inventory, processes a payment, or touches fulfilment. |
| Store platforms: Shopify, WooCommerce | PARTLY → practically FALSE today. Shopify is real and fully wired end to end. WooCommerce support was designed into the backend and the portal (both are platform-agnostic / have a WooCommerce display path) but the only WooCommerce connector that exists is an old, disconnected plugin pointing at a retired backend, with no working path to the current portal. |

## Per step — the real UI

### 1. Connect the store — the widget's admin screen
- The merchant installs the app; the only screen they land on says
  **"Welcome to shopmgr.ai"**.
- A "Portal" card: *"If this is your first time using our app, please read
  the Get Started guide before entering the portal. You Can Access the
  Portal by clicking the button below"* → button **"Go to Portal"**
  (single-sign-on hop to the separate staff app).
- A "Get Started" card walks through **one** manual step: *"How To Activate
  Your Assistant?"* → *"You can access the Theme Editor by clicking
  HERE"* → a screenshot of the storefront theme editor → *"In the App
  embeds panel, Enable the shopmgr.ai Chatbot."* → a second screenshot →
  *"Congratulations! Your assistant has been successfully activated."*
- **Do not show:** a step for pointing the assistant at "your catalogue" or
  "your policies" — nothing like that exists as a discrete install step.
  Catalogue sync is automatic once installed; policies/FAQs are added
  later, in the portal's Knowledge screen (step 5 below), not during
  install.

### 2. A shopper asks, the assistant answers from the real catalogue — the widget
- Header shows the assistant's configured name and title (the shipped
  default, before a merchant customizes it, is literally "Harold" /
  "Shopify Assistant"), an icon, a refresh (reset conversation) button, and
  a close button.
- Input is a rich-text box, not a plain text field, at the bottom of the
  panel.
- **The assistant speaks first.** The opening turn is a greeting and a
  short self-introduction, not a shopper question — a real conversation
  starts with the bot, not with "Do you have this in a size 8?"
- A grounded reply reads as a short, plain-English answer built from the
  real per-variant price and stock lookup. The real formatting rule: an
  exact remaining count is only ever shown when it's below 3 units;
  anything from 3 up always shows the words **"in stock"**, never a number.
  Example matching that format: *"Recent price and stock infos for Trail
  Runner Backpack: - Charcoal Price: 89.00 Stock: in stock - Olive Price:
  89.00 Stock: 2"*.
- Below a product-bearing reply sits a small clickable line, not a product
  card: **"Highlight 2 considered products"** (or "recommended products"
  for ones actually suggested). Clicking it asks the storefront page
  *outside* the chat panel to highlight those products.
- Quick-reply chips are real: a reply can carry a short list of suggested
  follow-up questions, rendered as clickable buttons under the message.
- **Do not show:** an inline product card with an image, a stock-count
  number of 4+, or an "Add to cart" button inside the chat bubble — none of
  that exists in the shipped widget. The product data the chat UI itself
  ever holds is just an id, a title and a link.
- **Order lookup, done properly, is a small text card, not a toast.** If the
  shopper isn't logged in, the assistant first asks for an email or phone
  to verify ownership of the order — it won't look one up on an order
  number alone. Once verified, the real reply shape (from the connector's
  own formatting) is a short block like: *"# Order #1042 — Status: Shipped
  — Order Total: HKD 89.00 — Pay by [gateway name] — Items: Trail Runner
  Backpack x1"*, plus a shipment/tracking line when one exists. The order
  ID is always included, per the system prompt's own instruction. Status
  is one of exactly four words: **Await payment / Paid / Cancelled /
  Shipped**. A quick toast like *"Looking at your order #1042."* with the
  number as a link is also real and appears first, before the full card.

### 3. The assistant escalates instead of guessing — the widget, same conversation
- A question the assistant can't ground in real policy or catalogue data
  (a complaint, an out-of-policy request, anything the tools don't cover)
  is never improvised. The instruction it's given is explicit: don't
  answer if you don't know, and for complaints, use the ticket tool instead
  of answering directly.
- The visible result is a normal chat reply (the model paraphrases; there's
  no fixed on-screen ticket-confirmation string to quote) that a ticket has
  been raised, tagged as one of exactly four types: **Refund / Return /
  Cancel / Generic**.
- **Do not show:** the assistant attempting a second try at answering, or a
  visible "escalating…" spinner state — the escalation is a single tool
  call inside the same turn, not a separate visible phase.

### 4. Staff resolve the ticket — the portal's Support Ticket screen
- Filters: a "Status" dropdown (All / Open / Closed) and a "Type" dropdown
  whose real options are only **All / Generic / Refund / Return** — there
  is no "Cancel" choice in the filter, even though the assistant can raise
  a ticket of that exact type. A merchant can't filter their ticket list
  down to cancellations today.
- Table columns: **Title | Status | Ticket Type | Date Created | Date
  Modified** (order id, the full message, and a staff remark field exist
  but are hidden in the table and only shown when a row is opened).
- Opening a ticket shows a Status toggle (Open/Close) and a remarks field
  for the staff member's resolution note.
- Real ticket IDs are short opaque strings (roughly a dozen mixed-case
  letters/digits from a timestamp+random encoding), not sequential numbers
  — something like `a3B9xK2mZ7Qw`, not `#1042` or `T-1042`.
- Example row matching the real shape: *"Return request — order #1042" |
  Open | Return | 2026-09-18 | 2026-09-18*.
- **Do not show:** a "reviewed" or "rated" pill on the ticket — the product
  has no such state; a ticket is just open or closed.

### 5. Staff keep the knowledge current — the portal's Knowledge screen
- Two panels only: **"Shopping Guide"** (*"Add and manage knowledge about
  shipping, refunds, privacy, and more to enhance your AI's support
  capabilities."*) and a second panel for **"Shipping, refund, privacy,
  etc."** policy entries.
- An "Add New Knowledge" action opens a form: Input Type (Text / URL /
  Video URL / Youtube URL), Category (Guide / Policy), Title, and a Text
  box.
- Each entry is a small card: title, "Last updated:" timestamp, and a
  "Detail" button. Cards are color-coded by an **Indexing Status**: green
  **Success**, yellow **Pending**, red **Failed**.
- **Do not show:** products or promotions on this screen — those aren't
  manually added here; they come from the catalogue sync and from
  background social/promo indexing instead.

### Also real, not currently drawn, worth knowing about
- **Chatbot Health** — a portal screen that has nothing to do with reading
  conversations. It's a knowledge-*coverage* dashboard: a table of
  knowledge categories each marked Good / Fair / Bad, with copy like *"Your
  chat-bot has not enough knowledges to handle such inquiries. Please add
  more knowledges to your chat-bot."* This is the real "is my assistant
  ready" signal, closer to what a "watch it from the portal" claim would
  need than anything conversation-shaped.
- **Chatbot Playground** — lets staff test-drive their own bot inside the
  portal. Notably, this test copy of the chat panel has the shopper-facing
  rating control stripped out entirely.
- **Social Media** — a portal nav item, but it's gated to the two highest
  plan tiers; lower tiers never see it in the sidebar at all. Confirms
  tier-gating is real at the feature level, separately from the model
  tiering above.

## Recommended screens (5, in reveal order)

1. **Connect.** The admin "Welcome to shopmgr.ai" screen → click the theme
   editor link → the App-embed toggle flips on → "Congratulations! Your
   assistant has been successfully activated."
2. **Ask, get a grounded answer.** The widget opens → a shopper question →
   a typing state → a real-shaped stock/price answer → the "Highlight N
   considered products" line appears.
3. **Escalate.** A follow-up question outside policy → a brief pause → a
   reply confirming a ticket was raised, tagged with one of the four real
   ticket types.
4. **Staff close the loop on the ticket.** Cut to the portal's Support
   Ticket screen → the new ticket appears in the Open list → a staff
   member opens it, adds a remark, flips it to Closed.
5. **Staff fix the knowledge gap.** Cut to the portal's Knowledge screen →
   "Add New Knowledge" → a new Policy entry is typed in → it appears as a
   card with a Pending (indexing) badge, then flips to Success.

A defensible positioning line, given the evidence above, is closer to: **the
assistant answers on its own from the real catalogue and policies; a person
only shows up for the tickets it raises and the knowledge gaps behind wrong
answers** — not "staff review and rate every conversation," which isn't
what the product does.

## Open decisions for the founder

1. **Does the site keep claiming WooCommerce support?** The current,
   connected product is Shopify-only. WooCommerce is real in the sense that
   the backend and portal were built to support it, but no shipped
   connector exists today. Either drop the claim, soften it to "built for
   Shopify, designed to extend," or hold off until a real WooCommerce
   connector ships.
2. **Does "watch it from the portal" become a knowledge/tickets pairing, or
   do we add a third portal screen (Chatbot Health)?** There is no
   conversation-review screen to draw honestly. The two truthful portal
   screens are Knowledge and Support Ticket; Chatbot Health is a strong,
   real, currently-unused third option if a 6th screen is wanted instead of
   implying a review/rating workflow that doesn't exist.
3. **How to word the "sees browsing context" claim.** The mechanism is
   real but split: one code path that would proactively tell the assistant
   what a shopper is viewing is server-side disabled; the path that
   actually works today is a byproduct of how page-view events get merged
   into the same history sent with every chat message. Worth deciding
   whether the marketing claim should describe the working mechanism only,
   given the disabled twin sits right next to it in the code.
4. **Ticket type wording and the missing filter.** Source code and the
   ticket-raising tool use "cancel," not "cancellation." Minor on its own,
   but it compounds with a real product gap: the portal's own ticket filter
   has no "Cancel" option at all (only Generic/Refund/Return), so today a
   merchant can't even filter their ticket list down to the cancellations
   the assistant raises. If the site's copy says "cancellation," that's a
   deliberate friendlier rewording of the type name — fine — but worth
   knowing it's naming a ticket type the portal itself can't filter for yet.
   Also: real ticket IDs are opaque ~12-character strings, not sequential
   numbers — the tickets mock's "T-1042" style is a clean, readable
   invention, not a real ID shape; keep it as a deliberate simplification
   rather than presenting it as the literal format.
