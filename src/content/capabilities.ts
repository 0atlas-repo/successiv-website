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
    title: 'Customers onboarded faster',
    body: 'Identity and KYC checks as a guided flow or behind an API, leaving a reviewable record behind every decision.',
  },
  {
    num: '04',
    title: 'Contracts signed where the work is',
    body: 'Prepare, route, and execute documents inside the system that already owns the process, so nothing gets re-filed by hand.',
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
