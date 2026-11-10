// Single source of truth for site-wide values.
// Everything a non-developer might want to change lives here.

export const site = {
  name: 'Successiv',
  domain: 'successiv.com',
  url: 'https://successiv.com',

  // Product-led positioning, locked with the founder in docs/BRIEF.md.
  tagline: 'Software that runs the work — for finance and operations.',
  // Carried over from the previous site, then widened by the founder to name
  // the business half as well as the AI half.
  legacyTagline: 'Business and intelligence, applied successively.',

  description:
    'Successiv helps finance and operations businesses succeed. We do it through automation and transformation — we consult, we build, and we ship with our clients.',

  parent: { name: '0atlas', url: 'https://0atlas.com' },

  // Public contact address. Contact is mailto-only by choice.
  email: 'admin@successiv.com',

  nav: [
    { href: '/products/', label: 'Products' },
    { href: '/work/', label: 'Work' },
    { href: '/contact/', label: 'Contact' },
  ],

  // Decorative only (aria-hidden). Says what a buyer gets, not what we use:
  // "deep tech" and "applied AI" told the reader nothing they could act on.
  marquee: ['FINANCE AND OPERATIONS', 'TESTED IN THE ENTERPRISE', 'AUTOMATE THE WORK', 'PEOPLE ON THE HARD CALLS'],

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

  principlesLede:
    'We build software that has been tested in the enterprise, and is running there — not a chat wrapper, and not a demo that falls apart in production.',

  // Homepage / contact “How we work” items (Successiv Brand, 2026-11-10).
  principles: [
    {
      num: '01',
      title: 'Business success is the goal.',
      body: 'Automation and transformation are how we get there. We measure the work after go-live, not a model score.',
    },
    {
      num: '02',
      title: 'Build against a real pain point.',
      body: 'We start from the problem in the work, and we connect the software to the systems you already run. A process that never reaches the books does not help anyone.',
    },
    {
      num: '03',
      title: 'You talk to the people doing the work.',
    },
  ],
} as const;
