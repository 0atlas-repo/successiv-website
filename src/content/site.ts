// Single source of truth for site-wide values.
// Everything a non-developer might want to change lives here.

export const site = {
  name: 'Successiv',
  domain: 'successiv.com',
  url: 'https://successiv.com',

  // Product-led positioning, locked with the founder in docs/BRIEF.md.
  tagline: 'Products that run the work. Delivery depth behind them.',
  // Carried over from the previous site, then widened by the founder to name
  // the business half as well as the AI half.
  legacyTagline: 'Business and intelligence, applied successively.',

  description:
    'Successiv builds AI products and connects them to the systems a business already runs — commerce, identity, people, and content operations.',

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
  marquee: ['AI PRODUCTS', 'BUSINESS INTEGRATION', 'SHIPPED, NOT PILOTED', 'FEWER MANUAL STEPS'],

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
    'Behind them is a small team of AI developers who build and ship everything on this site. You deal with the people writing the code.',

  // Carried over from the previous site at the founder's request.
  principles: [
    {
      num: '01',
      title: 'Applied, not academic',
      body: 'Every model, agent, and pipeline is built against a real workflow — measured by what it changes in production, not benchmark scores.',
    },
    {
      num: '02',
      title: 'Built to compound',
      body: 'We architect for the next iteration from day one, so each release makes the following one faster and cheaper, not harder.',
    },
    {
      num: '03',
      title: 'Small team, direct line',
      body: 'You work with the people actually building the system — no account layers between you and the engineers who ship your code.',
    },
  ],
} as const;
