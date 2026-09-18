// Single source of truth for site-wide values.
// Everything a non-developer might want to change lives here.

export const site = {
  name: 'Successiv',
  domain: 'successiv.com',
  url: 'https://successiv.com',

  // Product-led positioning, locked with the founder in docs/BRIEF.md.
  tagline: 'Software that runs the work — and delivery when you need it built.',
  // Carried over from the previous site, then widened by the founder to name
  // the business half as well as the AI half.
  legacyTagline: 'Business and intelligence, applied successively.',

  description:
    'Successiv builds AI software for commerce, identity, finance, and operations. We also connect that software to the systems you already use, because an assistant that cannot see stock or a check that never reaches the CRM does not help anyone.',

  parent: { name: '0atlas', url: 'https://0atlas.com' },

  // Real address, taken from the live site. Contact is mailto-only by choice.
  email: 'ryderlee@successiv.com',

  nav: [
    { href: '/products/', label: 'Products' },
    { href: '/work/', label: 'Work' },
    { href: '/capabilities/', label: 'Capabilities' },
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' },
  ],

  // Decorative only (aria-hidden). Says what a buyer gets, not what we use:
  // "deep tech" and "applied AI" told the reader nothing they could act on.
  marquee: ['PRODUCTS IN PRODUCTION', 'WIRED TO YOUR SYSTEMS', 'SHIP EARLY, ITERATE', 'PEOPLE ON THE HARD CALLS'],

  // The founder's background is here as a risk signal for a buyer — "this will
  // actually get delivered" — not as a CV. Former employers are described, not
  // named, pending the founder's decision on which may be named.
  team: [
    {
      name: 'Ryder Lee',
      role: 'Founder',
      email: 'ryderlee@successiv.com',
      bio: 'Twenty years building and running software teams, including VP engineering roles at a global investment bank and a Fortune 100 insurer.',
    },
    { name: 'John Chau', role: 'Tech Lead', email: 'johnchau@successiv.com', bio: '' },
  ],

  teamNote:
    'A small team of AI developers builds and ships what you see on this site. You talk to the people writing the code.',

  // Carried over from the previous site at the founder's request.
  principles: [
    {
      num: '01',
      title: 'Built against a real workflow',
      body: 'Every model, agent, and pipeline is measured by what it changes after go-live — not by a benchmark score.',
    },
    {
      num: '02',
      title: 'Each release should make the next one easier',
      body: 'We design for the next iteration from day one, so later releases get faster and cheaper, not harder.',
    },
    {
      num: '03',
      title: 'You talk to the builders',
      body: 'No account layer between you and the engineers who ship your code.',
    },
  ],
} as const;
