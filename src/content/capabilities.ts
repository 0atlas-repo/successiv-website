// Capability list, straight from docs/BRIEF.md.
// Rendered as editorial rows — the direction chosen in the previews/ exercise.

export interface Capability {
  num: string;
  title: string;
  body: string;
}

export const capabilities: Capability[] = [
  {
    num: '01',
    title: 'AI product & chatbot delivery',
    body: 'Assistants that answer from your own data and hand off when they are unsure — on Shopify or in your own stack.',
  },
  {
    num: '02',
    title: 'Identity / KYC flows',
    body: 'Document capture, checks, and reviewer decisions, available as a hosted flow or behind an API.',
  },
  {
    num: '03',
    title: 'Document & signature workflows',
    body: 'Prepare, route, and execute documents inside the system that already owns the process.',
  },
  {
    num: '04',
    title: 'Microsoft 365 / SharePoint apps',
    body: 'Line-of-business tools that live where the team already works, rather than adding another login.',
  },
  {
    num: '05',
    title: 'Tender, contract, and ops portals',
    body: 'Long-running processes with real states, owners, and an audit trail that survives staff turnover.',
  },
  {
    num: '06',
    title: 'E-commerce / retail ops',
    body: 'Storefront and back-of-house tooling for teams running more than one location or channel.',
  },
];
