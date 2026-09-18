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
  title: "What we're actually good at.",
  // No number, and no "more than once": some of these trace to a single
  // shipped system. An entry can be added or withdrawn without the lede lying.
  lede: 'Each of these has shipped into production. If your problem sits in one of them, we have likely met it before.',
} as const;

export const capabilities: Capability[] = [
  {
    num: '01',
    title: 'AI assistants that help close',
    body: 'Chat that answers from your own catalogue and policies, and hands off to a person when it is not sure — on Shopify or in your own stack.',
  },
  {
    num: '02',
    title: 'Systems that talk to each other',
    body: 'We connect new tools to the software you already run, so there is no rip-and-replace and no second set of records to keep in sync.',
  },
  {
    num: '03',
    title: 'Customers onboarded without the paper chase',
    body: 'Identity documents held once and shared deliberately, as a guided flow or behind an API, with a named reviewer and a date behind every decision.',
  },
  {
    // Was "Contracts signed where the work is" until 2026-09. We do not build
    // e-signature, and nothing on this site may imply that we do.
    num: '04',
    title: 'Documents assembled and released safely',
    body: 'Merge a file from whatever formats it arrived in, black out what must not leave, and lock it — inside the system that already owns the process.',
  },
  {
    num: '05',
    title: 'Tools inside software you own',
    body: 'Line-of-business apps that live in Microsoft 365 and SharePoint, so the team does not need another login or another habit.',
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
    body: 'Tender and contract portals with real states, named owners, and an audit trail that survives turnover.',
  },
  {
    // Claimed "an owner anyone can see" until 2026-09-18. The CMS has states and
    // a backup trail, but no per-section editor roles and no approval chain.
    num: '07',
    title: 'Content work visible in one place',
    body: 'One record holds every language version of a piece, with a preview before it goes live and publishing that is a status change, not a developer ticket.',
  },
];

// Withdrawn 2026-09-18: "Retail operations that scale — storefront and
// back-of-house tooling for teams running more than one location or channel."
// Nothing supports it. The retail work entry was dropped the day before for
// having no repository, and the one commerce product we ship says the opposite
// of this in its own copy: front-of-house only, never touching inventory,
// payments, or fulfilment. Do not reinstate without a repository behind it.
