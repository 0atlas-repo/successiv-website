// Capabilities, written for buyers rather than engineers.
//
// The title is what the customer gets. The body is what it actually is, for the
// technical evaluator who reads further. Scanning the titles alone should tell
// someone whether we solve their problem — no stack names in that layer.
//
// Every line here must trace to a shipped repository, same rule as products and
// work. docs/BRIEF.md lists six capabilities; that list is superseded — it still
// carries e-signature and retail, both of which were withdrawn in 2026-09.
//
// The page copy lives here too, so the count in the lede cannot drift from the
// number of entries again. It said "six" while eight shipped.

export interface Capability {
  num: string;
  title: string;
  body: string;
}

export const capabilitiesPage = {
  kicker: 'Capabilities',
  title: 'Where we have shipped before.',
  // No number, and no "more than once": some of these trace to a single
  // shipped system. An entry can be added or withdrawn without the lede lying.
  lede: 'These are areas we have put into production. If your problem looks like one of them, we already know the usual failure modes.',
} as const;

export const capabilities: Capability[] = [
  {
    num: '01',
    title: 'AI assistants that help close',
    body: 'Catalogue- and policy-aware chat for Shopify or your own stack. When the answer sits outside policy, a person takes over.',
  },
  {
    num: '02',
    title: 'Systems that talk to each other',
    body: 'New tools wired into what you already run. One set of records. No rip-and-replace for its own sake.',
  },
  {
    num: '03',
    title: 'Customers onboarded without the paper chase',
    body: 'Identity documents collected once and shared on purpose — guided flow or API — with a named reviewer and a timestamp on every decision.',
  },
  {
    // Was "Contracts signed where the work is" until 2026-09. We do not build
    // e-signature, and nothing on this site may imply that we do.
    num: '04',
    title: 'Documents assembled and released safely',
    body: 'Merge mixed formats, redact what must not leave, lock the PDF, and keep the job inside the system that owns the process.',
  },
  {
    num: '05',
    title: 'Tools inside software you own',
    body: 'Line-of-business apps in Microsoft 365 and SharePoint, so staff are not asked for another login.',
  },
  {
    // Said "operations portals" until 2026-09-18. The ops work is an assistant
    // that answers from a procedure library; it is not a portal, and it
    // deliberately does not decide who owns an incident. Recognition portals
    // were tried here and dropped: they have phases and a visible panel, but
    // no audit log. Tender carries all three — who scored what, when, against
    // which criterion — and contract logs before and after values.
    num: '06',
    title: 'Processes that outlast staff changes',
    body: 'Tender and contract portals with states, owners, and an audit trail that survives turnover.',
  },
  {
    // Claimed "an owner anyone can see" until 2026-09-18. The CMS has states and
    // a backup trail, but no per-section editor roles and no approval chain.
    num: '07',
    title: 'Content work visible in one place',
    body: 'One record per piece across languages, preview before publish, and go-live as a status change — not a developer ticket.',
  },
];

// Withdrawn 2026-09-18: "Retail operations that scale — storefront and
// back-of-house tooling for teams running more than one location or channel."
// Nothing supports it. The retail work entry was dropped the day before for
// having no repository, and the one commerce product we ship says the opposite
// of this in its own copy: front-of-house only, never touching inventory,
// payments, or fulfilment. Do not reinstate without a repository behind it.
