// Own products only.
//
// Every product carries all the fields below — the type makes a missing one a
// build error, not a review note. `detail` is the long form for the product
// page: three paragraphs minimum, enforced by scripts/verify.mjs, unless the
// product has a `solution` (then it is empty), and every claim in it traceable to something the product actually does.
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
//   has been given. Since 2026-09-24 it describes the shipped app only, traced in
//   local_pm/research/2026-09-24-accounting-ui-walkthrough.md: a short `solution`
//   replaces `detail`, and each step carries its own animated screen.

export type ProductMock =
  | 'cs-explore'
  | 'cs-apply'
  | 'cs-submit'
  | 'cs-check'
  | 'cs-track'
  | 'shop-connect'
  | 'shop-answer'
  | 'shop-escalate'
  | 'shop-ticket'
  | 'shop-knowledge-add'
  | 'kyc-home'
  | 'kyc-add'
  | 'kyc-request'
  | 'kyc-consent'
  | 'kyc-portal'
  | 'calendar'
  | 'acct-upload'
  | 'acct-reading'
  | 'acct-draft'
  | 'acct-question'
  | 'acct-bank'
  | 'generic';

export interface Product {
  slug: string;
  name: string;
  /** 1. one-liner */
  oneLiner: string;
  /** 2. the problem it exists to solve */
  problem: string;
  /** 3. how it works, 3–5 steps. A step with `screen` draws it beside its text. */
  steps: { title: string; body: string; screen?: ProductMock }[];
  /**
   * 4. the long form. Three paragraphs minimum unless needsCopy or `solution` is
   * set. A product with `solution` leaves this empty.
   */
  detail: string[];
  /** The short answer to `problem`: one to two sentences, rendered as "Our solution". */
  solution?: string;
  /** 5. which mocked screens to render (never a real screenshot) */
  screens: ProductMock[];
  /**
   * Which screen the product grid card shows — the home page and /products/
   * both render that grid — when screens[0] is better kept for the product's
   * own page. Only Shopmgr needs it: its lead screen is the chat thread, which
   * the home hero also draws, so the card would repeat it one scroll down.
   */
  cardScreen?: ProductMock;
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
    oneLiner: 'Paid brand campaigns for creators: find the work, post it, prove it.',
    problem:
      'Creator deals still run on DMs and agency threads. A brand can’t easily tell whether the post that went up is the one it paid for.',
    // 2026-09-24: rebuilt from the shipped app, not from the old copy. See
    // local_pm/research/2026-09-24-creators-sphere-ui-walkthrough.md. There is
    // no balance or payout (the "Paid" status is never written), no slot
    // release and no hashtag check, and creators see no insights, so none of
    // that is claimed. The founder chose S$ for the mocks' currency.
    solution:
      'Brands post campaigns with the real brief and decide only who takes each gig. Creators apply, publish and submit the live post, and the AI checks it against the brief.',
    steps: [
      { title: 'Find a campaign', body: 'Browse live campaigns by category, each with its pay, deadline and brief.', screen: 'cs-explore' },
      { title: 'Apply, and the brand picks', body: 'Apply with one tap. The brand approves who takes each slot.', screen: 'cs-apply' },
      { title: 'Post it, then submit it', body: 'Publish on your own Instagram, then pick the post in the app.', screen: 'cs-submit' },
      { title: 'The AI checks the post', body: 'It reads the image and caption against the brief, or against the approved draft, and marks the proof within minutes.', screen: 'cs-check' },
      { title: 'Track every gig', body: 'One list shows what needs you next.', screen: 'cs-track' },
    ],
    detail: [],
    screens: ['cs-check'],
    cta: 'Book a demo',
    category: 'Creator marketplace',
    url: 'https://creatorsphere.sg',
  },
  {
    slug: 'shopmgr',
    name: 'Shopmgr',
    oneLiner: 'Store chat that answers from your catalogue and policies — and escalates when it should.',
    problem:
      'Storefront chat handles the easy questions and stalls on the ones that decide a sale: stock, variants, delivery, returns. Shoppers leave; staff never see the thread.',
    // 2026-09-24: rebuilt from the shipped product, not from the old copy. See
    // local_pm/research/2026-09-24-shopmgr-ui-walkthrough.md. Staff do not
    // review or rate conversations (shoppers rate answers), and only Shopify
    // is wired end to end, so neither claim is made.
    solution:
      'The assistant answers shoppers from your real catalogue and policies, and raises a ticket when it can’t. Your staff handle the tickets and fill the gaps.',
    steps: [
      { title: 'Switch it on in Shopify', body: 'Turn on the app embed in your theme. The catalogue syncs by itself.', screen: 'shop-connect' },
      { title: 'It answers from your catalogue', body: 'Each reply comes from your products and policies, found by meaning, not keywords.', screen: 'shop-answer' },
      { title: 'It raises a ticket instead of guessing', body: 'A refund, return or cancellation, or anything it can’t answer, becomes a ticket.', screen: 'shop-escalate' },
      { title: 'Human in the loop', body: 'Staff pick up the ticket in the portal, add a remark and close it.', screen: 'shop-ticket' },
      { title: 'Close the gap', body: 'Add the missing guide or policy, and the assistant uses it once indexed.', screen: 'shop-knowledge-add' },
    ],
    detail: [],
    // The hero and the card show the human step, as on Accounting.
    screens: ['shop-ticket'],
    cta: 'Book a demo',
    category: 'Commerce',
  },
  {
    slug: 'kyc',
    name: 'KYC',
    // 2026-09-24: rebuilt from the shipped generation. See
    // local_pm/research/2026-09-24-kyc-ui-walkthrough.md. It has no reviewer,
    // no one-time code, no expiry and no event log, and it sets its "verified"
    // flag without a check, so the page makes no verification claim at all.
    oneLiner: 'Hold identity documents once, and share them only when asked.',
    problem:
      'The same passport and proof of address get emailed to a dozen counterparties, and every one of them keeps a copy.',
    solution:
      'A holder keeps their documents in one app. A counterparty asks for exactly what it needs with a QR code, and nothing is shared until the holder accepts.',
    steps: [
      { title: 'Keep your documents in one place', body: 'Passport, ID card, address and phone number, kept by the holder in the phone app.', screen: 'kyc-home' },
      { title: 'Add a document', body: 'Type in the details and photograph the front and back.', screen: 'kyc-add' },
      { title: 'A counterparty asks', body: 'On the web it ticks exactly the documents it needs, and gets a QR code for the holder to scan.', screen: 'kyc-request' },
      { title: 'Human in the loop', body: 'The holder sees the request and accepts or declines it. Nothing is shared until they accept.', screen: 'kyc-consent' },
      { title: 'The counterparty sees the answer', body: 'The shared details appear in its portal, request by request.', screen: 'kyc-portal' },
    ],
    detail: [],
    screens: ['kyc-consent'],
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
    oneLiner: 'The system reads the document; a person still answers the awkward question.',
    problem:
      'Keying bills into the books by hand is slow. Automation that posts without a check only moves the work to fixing mistakes.',
    solution:
      'The AI reads each bill, drafts the double entry, checks its own work, and redoes it when the check fails. You answer the odd unclear figure and approve the result.',
    steps: [
      { title: 'Upload the bills', body: 'Files, photos or scans, from the web or the phone app. Related pages are grouped so that they post as one transaction.', screen: 'acct-upload' },
      { title: 'The AI reads them', body: 'The fields on each document are read, and the currency is detected.', screen: 'acct-reading' },
      { title: 'The AI drafts and checks the entry', body: "A balanced double entry against your chart of accounts, in the document's currency and your books' currency. A second check reviews it, and a draft that fails is redone automatically.", screen: 'acct-draft' },
      { title: 'Human in the loop', body: 'An unreadable figure, or a missing payment in a series, becomes one specific question. Then a single tap approves the entry.', screen: 'acct-question' },
      { title: 'The AI checks the bank, and you close the period', body: 'Every statement line is checked against the books with a suggested action. You confirm, and ending a period makes everything up to that date read-only.', screen: 'acct-bank' },
    ],
    detail: [],
    // The hero and the product card lead with the question: the exception the
    // product hands to a person. Every draft still needs a person's approval too
    // (research, pass 3); the copy says so in `solution` and step 4.
    screens: ['acct-question'],
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
