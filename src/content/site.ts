// Single source of truth for site-wide values.
// Everything a non-developer might want to change lives here.

export const site = {
  name: 'Successiv',
  domain: 'successiv.com',
  url: 'https://successiv.com',

  // Product-led positioning, locked with the founder in docs/BRIEF.md.
  tagline: 'Products that run the work. Delivery depth behind them.',
  // Carried over from the previous site at the founder's request.
  legacyTagline: 'Intelligence, applied successively.',

  description:
    'Successiv builds AI software products for operators — commerce, identity, leave, and creator workflows — backed by years of complex delivery.',

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

  // Decorative only (aria-hidden). "Hong Kong" deliberately dropped.
  marquee: ['OWN PRODUCTS', 'APPLIED AI', 'DEEP TECH', 'DELIVERY DEPTH'],

  team: [
    { name: 'Ryder Lee', role: 'Founder', email: 'ryderlee@successiv.com' },
    { name: 'John Chau', role: 'Tech Lead', email: 'johnchau@successiv.com' },
  ],

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
