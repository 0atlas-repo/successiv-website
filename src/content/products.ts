// Own products only.
//
// Every product carries all the fields below — the type makes a missing one a
// build error, not a review note. `detail` is the long form for the product
// page: three paragraphs minimum, enforced by scripts/verify.mjs, and every
// claim in it traceable to something the product actually does.
//
// Two entries are hidden and one is qualified, all founder decisions, recorded in
// local_pm/projects/capability-depth/specs/capability-depth.md:
//
//   1line.ai and Leave are hidden (2026-09-17). `hidden` keeps the entry here but
//   takes it off the grid and stops its page being built, so nothing about either
//   product ships. The copy is kept rather than deleted because both are real:
//   1line.ai is a working LLM gateway the founder has not cleared for publication,
//   and Leave's copy was grounded only in a one-shot importer, so it claims
//   nothing about screens or balances. Unhiding is one line; do not do it without
//   asking. `needsCopy` on 1line.ai still exempts it from the three-paragraph rule
//   if it ever comes back.
//
//   Accounting is pre-release. It is described as what it is, with `preRelease`
//   set so the page says so plainly. No launch date is claimed, because none
//   has been given.

export type ProductMock =
  | 'creator'
  | 'creator-proof'
  | 'creator-insights'
  | 'chat'
  | 'shop-knowledge'
  | 'shop-tickets'
  | 'identity'
  | 'kyc-share'
  | 'kyc-review'
  | 'calendar'
  | 'acct-extract'
  | 'acct-journal'
  | 'acct-close'
  | 'generic';

export interface Product {
  slug: string;
  name: string;
  /** 1. one-liner */
  oneLiner: string;
  /** 2. the problem it exists to solve */
  problem: string;
  /** 3. how it works, 3–5 steps */
  steps: { title: string; body: string }[];
  /** 4. the long form. Three paragraphs minimum unless needsCopy is set. */
  detail: string[];
  /** 5. which mocked screens to render (never a real screenshot) */
  screens: ProductMock[];
  /** 6. call to action */
  cta: string;
  /** 7. where it sits, for the index page */
  category: string;
  /** Set when the copy is a placeholder awaiting a decision to publish. */
  needsCopy?: boolean;
  /** Set when the product is real but not yet released. */
  preRelease?: boolean;
  /** Set to take the product off the site entirely — no card, no page, no sitemap entry. */
  hidden?: boolean;
  /** The product's own site, when it has one. */
  url?: string;
}

const allProducts: Product[] = [
  {
    // Content below is taken from the product's own site, creatorsphere.sg, and
    // from the product itself. Note the product brands itself "Creators Sphere"
    // (plural), not "Creator Sphere" as docs/BRIEF.md has it. The live product wins.
    slug: 'creators-sphere',
    name: 'Creators Sphere',
    oneLiner: 'Paid brand campaigns for creators — find the work, post it, get paid.',
    problem:
      'Creator work runs on DMs and agency email threads. A creator rarely learns what a job pays until late in the conversation, and a brand has no dependable way to see who actually delivered.',
    steps: [
      { title: 'Discover gigs', body: 'Browse live brand campaigns, filtered to the niches you actually create in.' },
      { title: 'Apply in seconds', body: 'Tap apply on an open campaign, or accept an invite-only one sent straight to you.' },
      { title: 'Create and post', body: 'Make the content in your own voice and publish it to your linked account.' },
      { title: 'Submit proof, get paid', body: 'Drop the post link, the system checks it against the brief, and the reward moves to your balance.' },
    ],
    detail: [
      'Influencer marketing runs on trust in both directions and evidence in neither. A creator negotiates in direct messages without knowing the budget, delivers, and then waits. A brand books a creator on follower count, hopes the brief is followed, and finds out weeks later whether it was. Both sides manage the relationship by hand, which is why agencies exist and why the fee is what it is.',
      'Creators Sphere makes the campaign the unit of work. A brand publishes a campaign holding the actual brief — the dos and don\'ts, required hashtags and mentions, the mood board — and breaks it into missions a creator can accept. Campaigns run open to applications or invite-only, so a brand can approach specific creators or broadcast to a filtered audience by tier, audience profile, or topic. Where a brand wants sight of the work first, an optional approval gate holds the creator\'s draft for sign-off before anything is published.',
      'Proof is the part that is usually manual, and here it is not. A creator links their account once, and when they submit a post the system pulls it directly and checks it against the brief — that the required hashtags and mentions are actually present — rather than trusting a screenshot. Engagement figures are collected on a schedule afterwards, so a brand sees delivery rather than promises. A creator\'s balance splits into pending and available, which makes the wait visible instead of leaving them wondering.',
      'Campaign slots are managed rather than abandoned: if an accepted creator goes quiet past the deadline, the slot is released and offered to the next creator in the queue, so a campaign does not stall on one unresponsive person. Two things are deliberately absent. There is no direct creator-to-brand messaging, which keeps terms in the campaign where they can be enforced rather than in a thread where they cannot. And settlement itself sits outside the product for now — the platform tracks what is owed and when it clears, and says so honestly.',
    ],
    screens: ['creator', 'creator-proof', 'creator-insights'],
    cta: 'Book a demo',
    category: 'Creator marketplace',
    url: 'https://creatorsphere.sg',
  },
  {
    slug: 'shopmgr',
    name: 'Shopmgr',
    oneLiner: 'AI assistant for online stores that actually helps close.',
    problem:
      'Storefront chat answers the easy questions and stalls on the ones that decide a sale — stock, variants, delivery, returns. Shoppers leave; staff never see that the conversation happened.',
    steps: [
      { title: 'Connect the store', body: 'Install on your store and point the assistant at your catalogue and policies.' },
      { title: 'Ground the answers', body: 'Replies come from your real products and rules, retrieved per question, not from the model’s guesswork.' },
      { title: 'Act, don’t just answer', body: 'The assistant can look up an order, check a policy, or raise a ticket rather than apologising.' },
      { title: 'Watch it from the portal', body: 'Staff review conversations, rate answers, and fix what the assistant should have known.' },
    ],
    detail: [
      'Storefront chat has a credibility problem. Generic bots answer the questions a shopper could have answered from the page, and fail on the ones that actually decide a purchase: is this in stock in my size, when will it arrive, what happens if I return it. A wrong answer is worse than no answer, because a confident invention about delivery or returns becomes a complaint.',
      'Shopmgr grounds every reply in the merchant\'s own data. The catalogue is indexed for semantic search, so a shopper asking in their own words is matched to real products rather than keyword hits, and the merchant adds their own knowledge — policies, FAQs, product detail — as a second source. The assistant also sees what the shopper has been browsing, so a question about "the second one" resolves to a product instead of a clarifying question. Where a merchant publishes on social channels, that content is indexed too, so the assistant knows what the brand has actually said in public.',
      'The difference between a chatbot and an assistant is whether it can act. This one calls tools: searching products, checking current discounts, looking up the status of a customer\'s order, querying a shop policy, and — when it cannot resolve something — raising a support ticket typed by what the customer needs, whether refund, return, cancellation, or general. That last one matters most. The assistant is built to escalate rather than improvise, so the failure mode is a ticket a human picks up, not a confident wrong answer the merchant hears about later.',
      'Operators get a portal rather than a black box: conversations are reviewable, every answer can be rated, and the knowledge base is editable, so a gap found on Monday is closed by Tuesday without a release. Model selection follows the plan tier, which keeps the economics sane for smaller stores. Scope is deliberately bounded — it reads orders but never modifies them, and it does not touch inventory, payments, or fulfilment. It is a front-of-house assistant, not a back-office system.',
    ],
    screens: ['chat', 'shop-knowledge', 'shop-tickets'],
    cta: 'Book a demo',
    category: 'Commerce',
  },
  {
    slug: 'kyc',
    name: 'KYC',
    oneLiner: 'Identity documents held once, shared deliberately, verified by a person.',
    problem:
      'The same identity documents get emailed to a dozen counterparties, each keeping a copy forever, and nobody can show who verified what or when.',
    steps: [
      { title: 'Register documents once', body: 'A holder registers their documents — passport, ID card, proof of address, contact details — in one place.' },
      { title: 'Verify contact details directly', body: 'Phone and email are confirmed by one-time code, without anyone having to check them.' },
      { title: 'A reviewer checks the rest', body: 'A service provider verifies a document, and their name and the date are stamped onto the record.' },
      { title: 'Share on purpose', body: 'A counterparty asks for what they need, or the holder pushes it across — either way it is scoped and it expires.' },
    ],
    detail: [
      'Onboarding a customer normally means asking them to email their identity documents, then storing those documents forever in whatever system received them. Every counterparty repeats the exercise, every one keeps a copy, and none of them can tell you who checked the document or when. The risk sits in the copies, and the copies exist because there was no better way to move the information.',
      'This product treats identity documents as something a person holds and lends, rather than something every counterparty collects. A holder registers their documents once — passport, identity card, proof of address, phone, email. Contact details verify themselves by one-time code. The rest are verified by a person at a service provider, and that verification is stamped onto the record with the reviewer\'s name and the date, so the provenance of a check travels with the document instead of living in the verifier\'s inbox.',
      'Sharing runs in both directions, which is the part that makes it work in practice. A counterparty can raise a request for specific documents with conditions attached — verified or not, issued within a period, not expiring before a date — and the holder fills it. Or the holder can push documents out to a provider who never asked. The two have deliberately different lifetimes: a request stands for months because onboarding takes time, while a share link lasts minutes because it is handed over in person, often as a scanned code. Every action lands in an event log.',
      'We are precise about what this is not, because the category invites exaggeration. There is no liveness check, no facial matching, no document text recognition, and no connection to a government or bureau database. Decisions are made by people; the system\'s job is to make sure they are made against the right document, recorded when made, and not left scattered across a dozen mailboxes afterwards. Everything available in the interface is available over the API, so onboarding elsewhere can continue automatically once a decision exists.',
    ],
    screens: ['identity', 'kyc-share', 'kyc-review'],
    cta: 'Talk to us',
    category: 'Identity',
  },
  {
    slug: 'leave',
    name: 'Leave',
    oneLiner: 'Leave management that lives where your team already works.',
    problem:
      'Leave is requested in chat, approved in email, and tracked in a spreadsheet nobody trusts. Balances drift, and "who is out next week" takes a person to work out.',
    steps: [
      { title: 'Request in place', body: 'Staff book leave inside Microsoft 365 — no separate system to remember.' },
      { title: 'Route for approval', body: 'A request reaches its approver, and a second approver where the policy needs one.' },
      { title: 'Keep one record', body: 'Approved leave lands in the shared record the rest of the organisation already reads.' },
    ],
    detail: [
      'Leave is the smallest process in an organisation that still manages to go wrong constantly. It is requested wherever the employee happens to be — chat, email, in person — approved somewhere else, and recorded in a spreadsheet that one person maintains. The cost is not the administration; it is that nobody can answer "who is out next week" without asking, and that balances quietly drift until someone disputes one.',
      'This runs inside Microsoft 365 rather than beside it, which is the whole design decision. Staff book leave in the environment they already have open, approvals route to the right people without a second login, and the approved record lives in the shared workspace the rest of the organisation already reads. Nobody is asked to adopt a new habit, which is the usual reason small internal systems fail.',
      'The model is more careful than most: leave is tracked to half-day granularity with a morning or afternoon distinction rather than whole days only, a request can carry a second approver where policy requires one rather than assuming a single manager, and each record is attributed to the requester\'s department so reporting reflects the organisation\'s actual shape. Records carry both the dates taken and the date applied, which is what makes retrospective questions answerable.',
      'Because the system sits on the platform rather than replacing it, migration mattered as much as the application. Historical leave was imported from spreadsheets with validation on the way in — every applicant and approver resolved to a real person, every record attributed to a department — so the system launched with history behind it rather than starting from an empty first day.',
    ],
    screens: ['calendar'],
    cta: 'Talk to us',
    category: 'Microsoft 365',
    hidden: true,
  },
  {
    slug: 'accounting',
    name: 'Accounting',
    oneLiner: 'Bookkeeping where the machine reads the document and a person answers the hard question.',
    problem:
      'Bookkeeping automation either posts confidently to the wrong account or hands everything back for review. Neither saves the bookkeeper any real work.',
    steps: [
      { title: 'Send the document', body: 'A bill, receipt, or statement arrives — uploaded by the bookkeeper or by the client on their phone.' },
      { title: 'Extraction and classification', body: 'Fields are read from the document, and the nature of the transaction is identified.' },
      { title: 'It asks what it cannot know', body: 'Where the answer is a judgement, it asks a specific question instead of guessing.' },
      { title: 'Posted double-entry', body: 'Once answered, the entry is booked against the chart of accounts, balanced and in the right currency.' },
      { title: 'Reconcile and close', body: 'Bank lines are matched to entries, and a closed period locks.' },
    ],
    detail: [
      'Automated bookkeeping tends to fail in one of two ways. Either it posts with confidence to the wrong account, which costs more to unpick than manual entry would have cost in the first place, or it flags everything for review, which is manual entry with extra steps. The difference between the two is not model quality. It is whether the system knows which decisions it is not entitled to make.',
      'This one is built around that line. A document arrives and its fields are extracted; its nature is classified — an invoice, an expense receipt, a payment — and the underlying event identified. Where posting requires a judgement the document cannot settle, the system asks a specific question and waits: which account this belongs to, which currency was actually transacted, what the terms are. The answers come from the bookkeeper, or from the client through a companion phone app that shows them a short queue of questions rather than an accounting interface they never wanted to learn.',
      'The posting itself is strict. Entries are double-entry, and a validator rejects a line carrying both a debit and a credit, or neither, so an unbalanced entry cannot reach the ledger. Amounts are held both in the currency on the document and in the entity\'s booking currency, with the rate applied at posting and revaluation at period end, rather than flattening everything on the way in and losing the original. Account pairings come from the chart of accounts and a rulebook rather than being hardcoded, and a rule not yet validated by a qualified accountant is marked as such instead of being silently trusted.',
      'Around the ledger sit the things that make it a product rather than an engine: bank statement lines matched against entries, supporting documents linked across cases so an invoice and the payment settling it are connected, reports drawn on demand, and a period close that locks and permits only reversals afterwards. It is in closed beta — real business logic, a substantial migration history, and a test corpus of real documents behind it, but not released. We would rather say that than imply otherwise.',
    ],
    screens: ['acct-extract', 'acct-journal', 'acct-close'],
    cta: 'Talk to us',
    category: 'Finance',
    preRelease: true,
  },
  {
    slug: '1line-ai',
    name: '1line.ai',
    oneLiner: 'An in-house product we have not published details of yet.',
    problem:
      'Placeholder. 1line.ai is on the site at the founder’s request, but we have not published a description of it. Rather than invent one, this page says so.',
    steps: [
      { title: 'Detail pending', body: 'Replace this with the real problem it solves.' },
      { title: 'Detail pending', body: 'Replace this with how it works.' },
      { title: 'Detail pending', body: 'Replace this with what the user ends up with.' },
    ],
    detail: [],
    screens: ['generic'],
    cta: 'Talk to us',
    category: 'In development',
    needsCopy: true,
    hidden: true,
  },
];

// Everything downstream — the grid, the routes, the sitemap — reads this, so a
// hidden product disappears from the site by being filtered once, here.
export const products: Product[] = allProducts.filter((p) => !p.hidden);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
