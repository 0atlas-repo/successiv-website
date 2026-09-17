// Capabilities, written for buyers rather than engineers.
//
// The title is what the customer gets. The body is what it actually is, for the
// technical evaluator who reads further. Scanning the titles alone should tell
// someone whether we solve their problem — no stack names in that layer.

export interface Capability {
  num: string;
  title: string;
  body: string;
}

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
    num: '06',
    title: 'Processes that outlast staff changes',
    body: 'Tender, contract, and operations portals with real states, named owners, and an audit trail that survives turnover.',
  },
  {
    num: '07',
    title: 'Retail operations that scale',
    body: 'Storefront and back-of-house tooling for teams running more than one location or channel.',
  },
  {
    num: '08',
    title: 'Content work visible in one place',
    body: 'Pipelines for teams producing on a schedule, where every piece has a state and an owner anyone can see.',
  },
];
