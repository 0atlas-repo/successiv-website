// Own products only. docs/BRIEF.md requires every product to carry all six
// fields below — the type makes a missing one a build error, not a review note.
//
// 1line.ai is included on the founder's explicit sign-off (BRIEF.md asked for
// confirmation before featuring it). Its copy is honest placeholder: we do not
// describe capabilities we cannot verify.

export interface Product {
  slug: string;
  name: string;
  /** 1. one-liner */
  oneLiner: string;
  /** 2. the problem it exists to solve */
  problem: string;
  /** 3. how it works, 3–5 steps */
  steps: { title: string; body: string }[];
  /** 4. which mocked UI to render (never a real screenshot) */
  mock: 'creator' | 'chat' | 'identity' | 'calendar' | 'generic';
  /** 5. call to action */
  cta: string;
  /** 6. where it sits, for the index page */
  category: string;
  /** Set when the copy is a placeholder awaiting founder detail. */
  needsCopy?: boolean;
  /** The product's own site, when it has one. */
  url?: string;
}

export const products: Product[] = [
  {
    // Content below is taken from the product's own site, creatorsphere.sg.
    // Note the product brands itself "Creators Sphere" (plural), not "Creator
    // Sphere" as docs/BRIEF.md has it. The live product wins.
    slug: 'creators-sphere',
    name: 'Creators Sphere',
    oneLiner: 'Paid brand campaigns for creators — find the work, post it, get paid.',
    problem:
      'Creator work runs on DMs and agency email threads. A creator rarely learns what a job pays until late in the conversation, and a brand has no dependable way to see who actually delivered.',
    steps: [
      { title: 'Discover gigs', body: 'Browse live brand campaigns, filtered to the niches you actually create in.' },
      { title: 'Apply in seconds', body: 'Tap apply on an open campaign, or accept an invite-only one sent straight to you.' },
      { title: 'Create and post', body: 'Make the content in your own voice and publish it to your linked Instagram account.' },
      { title: 'Submit proof, get paid', body: 'Drop the post link, the brand verifies it, and the reward is confirmed in the app.' },
    ],
    mock: 'creator',
    cta: 'Book a demo',
    category: 'Creator marketplace',
    url: 'https://creatorsphere.sg',
  },
  {
    slug: 'shopmgr',
    name: 'Shopmgr',
    oneLiner: 'AI assistant for Shopify stores that actually helps close.',
    problem:
      'Storefront chat usually answers the easy questions and stalls on the ones that decide a sale — stock, variants, delivery, returns. Shoppers leave; staff never see that the conversation happened.',
    steps: [
      { title: 'Connect the store', body: 'Install on Shopify and point the assistant at your catalogue and policies.' },
      { title: 'Ground the answers', body: 'Replies come from your real products and rules, not from the model’s guesswork.' },
      { title: 'Escalate honestly', body: 'When the assistant is not sure, it hands off instead of inventing an answer.' },
      { title: 'Watch it from the portal', body: 'Staff review conversations, spot gaps, and correct what the assistant should have known.' },
    ],
    mock: 'chat',
    cta: 'Book a demo',
    category: 'Commerce',
  },
  {
    slug: 'kyc',
    name: 'KYC',
    oneLiner: 'Identity checks with a clear web + API path.',
    problem:
      'Identity verification arrives either as a closed widget you cannot adapt or as a compliance process run over email and spreadsheets. Neither leaves you with a record you can audit.',
    steps: [
      { title: 'Applicant submits', body: 'A guided web flow collects documents and a selfie, on desktop or phone.' },
      { title: 'Checks run', body: 'Documents are validated and matched, and the result is attached to the case.' },
      { title: 'A human decides the edge cases', body: 'Reviewers see exactly what was captured and record a decision against it.' },
      { title: 'Your system reads the outcome', body: 'The same case is available over the API, so onboarding can continue automatically.' },
    ],
    mock: 'identity',
    cta: 'Talk to us',
    category: 'Identity',
  },
  {
    slug: 'leave',
    name: 'Leave',
    oneLiner: 'Leave management that lives where your team already works.',
    problem:
      'Leave is requested in chat, approved in email, and tracked in a spreadsheet nobody trusts. Balances drift, and the answer to "who is out next week" takes a person to work out.',
    steps: [
      { title: 'Request in place', body: 'Staff book leave inside Microsoft 365 — no separate system to remember.' },
      { title: 'Route for approval', body: 'Requests reach the right approver with the balance already calculated.' },
      { title: 'Keep one record', body: 'Approved leave updates balances and the shared calendar in the same step.' },
    ],
    mock: 'calendar',
    cta: 'Talk to us',
    category: 'Microsoft 365',
  },
  {
    slug: '1line-ai',
    name: '1line.ai',
    oneLiner: 'An in-house experiment we are still shaping.',
    problem:
      'Placeholder. 1line.ai is on the site at the founder’s request, but we have not written a public description of it yet. Rather than invent one, this page says so.',
    steps: [
      { title: 'Detail pending', body: 'Replace this with the real problem it solves.' },
      { title: 'Detail pending', body: 'Replace this with how it works.' },
      { title: 'Detail pending', body: 'Replace this with what the user ends up with.' },
    ],
    mock: 'generic',
    cta: 'Talk to us',
    category: 'In development',
    needsCopy: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
