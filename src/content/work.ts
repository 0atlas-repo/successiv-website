// Anonymised delivery work.
//
// HARD RULE: every entry is titled by capability. No client name, sector
// identifier, or internal repo slug appears in this file or anywhere it is
// rendered. scripts/verify.mjs greps dist/ to prove it.
//
// Sector words are part of that rule, not an exception to it. Several entries
// below trace back to the same commercial relationship, so a shared distinctive
// noun across two entries would let a reader join them together. Keep the
// vocabulary of each entry its own.
//
// Outcomes are qualitative on purpose. We have no published metrics for this
// work, and CLAUDE.md forbids inventing them.
//
// Since 2026-09-24 every entry tells its story as `solution` plus `steps`, one
// screen each, read out of the delivered system's code; `detail` is empty and
// the long-form rule (three paragraphs, scripts/verify.mjs) applies only to an
// entry without a `solution`. Claims here must be traceable to something that exists — if the code does not do it, it does not
// go in. Three entries were rewritten in 2026-09 for exactly that reason, and a
// fourth was removed outright because nothing supported it.

export type WorkMock =
  | 'awards-announce'
  | 'awards-vote'
  | 'awards-nominate'
  | 'sched-settle'
  | 'sched-confirm'
  | 'sched-book'
  | 'sched-service'
  | 'sp-history'
  | 'sp-checked-out'
  | 'sp-link-check'
  | 'sp-share'
  | 'sp-audit'
  | 'cms-quick'
  | 'cms-release'
  | 'cms-preview'
  | 'cms-draft'
  | 'incident-action-list'
  | 'incident-ask'
  | 'incident-case'
  | 'bundle-lock'
  | 'bundle-mask'
  | 'bundle-fill'
  | 'bundle-assemble'
  | 'contract-ask'
  | 'contract-check'
  | 'contract-file'
  | 'contract-register'
  | 'tender-scores'
  | 'tender-summary'
  | 'tender-query'
  | 'tender-check'
  | 'tender-list';

export interface WorkItem {
  slug: string;
  title: string;
  angle: string;
  featured: boolean;
  problem: string;
  approach: string;
  outcome: string;
  /** The long form, for /work/<slug>. Three paragraphs minimum when there is no `solution`. */
  detail: string[];
  /** Mocked screens, sized to what the system actually has. Never a screenshot. */
  screens: WorkMock[];
  /**
   * The short answer to `problem`, in place of the long form (2026-09-24, same
   * rule as products). With it set, the page drops the long form and the
   * problem/approach/outcome row. One or two sentences, 45 words at most.
   */
  solution?: string;
  /** How it works, one animated screen per step. With these set, the gallery goes. */
  steps?: { title: string; body: string; screen: WorkMock }[];
}

export const work: WorkItem[] = [
  {
    slug: 'tender-rfp-management',
    title: 'Tender / RFP management',
    angle: 'Intake, checklist, scoring',
    featured: true,
    problem:
      'Bids arrive by email and get evaluated off separate spreadsheets. When the result is questioned later, nobody can show what was missing, what was asked, or how the scores were reached.',
    approach:
      'One shared record per bid: what each bidder still owes, questions logged against that bidder, and every evaluator’s scores in one place.',
    outcome:
      'Scoring lives in one place, with each evaluator’s scores kept against the bid they belong to.',
    // 2026-09-24: rebuilt from the delivered system's code (research kept out of
    // this public repo). The long form it replaces made claims the code does not
    // support, so it is gone rather than hidden.
    solution:
      'One shared record per bid: a checklist of what each bidder still owes, clarification questions logged against that bidder, and every evaluator’s scores collected in one place.',
    steps: [
      { title: 'Track every bid in one list', body: 'Each round shows its bidders and where each one stands.', screen: 'tender-list' },
      { title: 'Check off what’s missing', body: 'Each requirement is marked met, incomplete or missing per bidder, including group bids tracked by member.', screen: 'tender-check' },
      { title: 'Raise a clarification', body: 'A missing or unclear item becomes a written question to that bidder, and the answer is filed against the bid.', screen: 'tender-query' },
      { title: 'A first read of the detail', body: 'Long supporting sections get a drafted summary, which a reviewer confirms or edits.', screen: 'tender-summary' },
      { title: 'Bring the scores together', body: 'Each evaluator’s scores are collected into one consolidated view.', screen: 'tender-scores' },
    ],
    detail: [],
    screens: ['tender-check'],
  },
  {
    slug: 'contract-lifecycle',
    title: 'Contract lifecycle management',
    angle: 'Lifecycle after award',
    featured: true,
    problem:
      'Large contracts run for years, and everything filed after signing has to be logged, checked against the contract and tracked to a decision. In email and shared drives, nobody knows a contract’s current state.',
    approach:
      'Treat the contract as a register of typed, versioned entries, each checked against the sections it relates to, so nothing floats in a folder.',
    outcome:
      'The state of a contract is a page, not a hunt across shared drives.',
    // 2026-09-24: rebuilt from the delivered system's code (research kept out of
    // this public repo). The long form it replaces made claims the code does not
    // support, so it is gone rather than hidden.
    solution:
      'Every contract keeps a register of filed entries, each checked automatically against the sections it relates to, so a reviewer sees what was filed, whether it holds up, and the clause behind the answer.',
    steps: [
      { title: 'Register the contract', body: 'Add it once, by code and title, and assign who handles it.', screen: 'contract-register' },
      { title: 'File an entry against it', body: 'A variation, a claim or a certificate, classified by type and versioned so nothing filed is lost.', screen: 'contract-file' },
      { title: 'The system checks it', body: 'Each entry is compared with the contract sections it relates to, and flagged where it doesn’t line up.', screen: 'contract-check' },
      { title: 'Ask, and get the clause', body: 'A reviewer asks a plain question and gets an answer with its source attached.', screen: 'contract-ask' },
    ],
    detail: [],
    screens: ['contract-check'],
  },
  {
    slug: 'document-bundling-redaction',
    title: 'Document bundling & redaction',
    angle: 'Assemble, redact, release',
    featured: true,
    problem:
      'Putting a document pack together means gathering files in several formats, blacking out what can’t go, and doing it by hand every time.',
    approach:
      'A service that merges mixed formats into one ordered PDF, fills template values, masks regions by coordinate, and can lock the result.',
    outcome:
      'Assembly is a repeatable job with the same output each time — not an afternoon in a PDF editor.',
    // 2026-09-24: rebuilt from the delivered system's code (research kept out of
    // this public repo). The long form it replaces made claims the code does not
    // support, so it is gone rather than hidden.
    solution:
      'A service that merges mixed formats into one ordered file, fills in placeholder values, masks set regions, and can lock the result with a password before it leaves.',
    steps: [
      { title: 'Assemble', body: 'Files in different formats are put in order and combined; if one can’t be converted, the rest still go through.', screen: 'bundle-assemble' },
      { title: 'Fill the template', body: 'Placeholder values are swapped for real ones on the way through.', screen: 'bundle-fill' },
      { title: 'Mask', body: 'A region is flattened to an image and painted over, so the original content is gone, not hidden.', screen: 'bundle-mask' },
      { title: 'Lock', body: 'The finished file can be password-protected before it is sent on.', screen: 'bundle-lock' },
    ],
    detail: [],
    screens: ['bundle-mask'],
  },
  {
    slug: 'ops-incident-support',
    title: 'Ops incident support',
    angle: 'During the incident, and after',
    featured: true,
    problem:
      'During an incident the right procedure usually exists, in a handbook or a policy library, but nobody has time to search for it while the incident is live.',
    approach:
      'An assistant that reads the incident conversation, answers from the indexed procedure library with sources, and proposes the action list.',
    outcome:
      'The procedure is available while the incident is live, and each action taken is timestamped.',
    // 2026-09-24: rebuilt from the delivered system's code (research kept out of
    // this public repo). The long form it replaces made claims the code does not
    // support, so it is gone rather than hidden.
    solution:
      'An assistant that reads the incident conversation as it happens, answers from the procedure library with the source cited, and keeps a shared action list that timestamps what’s done.',
    steps: [
      { title: 'Every incident, one case', body: 'Each incident becomes a case with its own ID and status.', screen: 'incident-case' },
      { title: 'Ask, and see the source', body: 'A plain-language question gets an answer from the procedure library, with the page cited.', screen: 'incident-ask' },
      { title: 'One shared action list', body: 'The assistant proposes actions from the conversation and says why; a person confirms them, and the time is recorded.', screen: 'incident-action-list' },
    ],
    detail: [],
    screens: ['incident-action-list'],
  },
  {
    slug: 'content-cms-platforms',
    title: 'Content / CMS platforms',
    angle: 'Multilingual publishing, static front end',
    featured: false,
    problem:
      'A site in several languages turns every content change into a developer ticket, and an editor can’t see what’s about to go live until it is.',
    approach:
      'One record holds every language version, with a preview step, and publishing writes the page without a deploy.',
    outcome:
      'Editors publish in three languages without a deploy. The public site stays static and fast.',
    // 2026-09-24: rebuilt from the delivered system's code (research kept out of
    // this public repo). The long form it replaces made claims the code does not
    // support, so it is gone rather than hidden.
    solution:
      'Each piece of content holds every language together, with a switch per language, and publishing writes the page straight to the site, with no deploy and no database behind it.',
    steps: [
      { title: 'Draft in every language', body: 'A language becomes required only once it is switched on for that piece.', screen: 'cms-draft' },
      { title: 'Preview it', body: 'The real page renders at a temporary address before it is published.', screen: 'cms-preview' },
      { title: 'Publish without a deploy', body: 'A timestamped copy of the old version is kept, then the new page is written to the live site.', screen: 'cms-release' },
      { title: 'Quick updates', body: 'Short, frequent items use a simpler list per language, with the same draft-and-publish rhythm.', screen: 'cms-quick' },
    ],
    detail: [],
    screens: ['cms-release'],
  },
  {
    slug: 'sharepoint-extensions',
    title: 'Enterprise SharePoint extensions',
    angle: 'Governance and audit inside Microsoft 365',
    featured: false,
    problem:
      'A large Microsoft 365 tenant gathers documents faster than anyone can govern them. Who can see a folder, what’s stale and what just broke get answered by guessing.',
    approach:
      'Reporting and governance tooling around the tenant — permission audits, usage and growth reports, time-limited sharing, link monitoring.',
    outcome:
      'Tenant questions get answered from a report instead of an administrator guessing.',
    // 2026-09-24: rebuilt from the delivered system's code (research kept out of
    // this public repo). The long form it replaces made claims the code does not
    // support, so it is gone rather than hidden.
    solution:
      'Reporting and governance tools around the tenant: permission audits down to single files, sharing that expires by itself, link checks, and a per-file history, answered from a screen instead of a script.',
    steps: [
      { title: 'Who has access, and why', body: 'A report walks every folder and file, and flags grants made to a person instead of a group.', screen: 'sp-audit' },
      { title: 'Share for a limited time', body: 'Pick files, a recipient and a window; a copy goes out and is removed when the window closes.', screen: 'sp-share' },
      { title: 'Catch a broken link first', body: 'Flagged documents are checked daily, and the watcher gets an email when one stops resolving.', screen: 'sp-link-check' },
      { title: 'See who’s holding a file', body: 'A report lists every checked-out file, who has it, and since when.', screen: 'sp-checked-out' },
      { title: 'Answer “who changed this”', body: 'From the file, open its history: every access and change, already filtered to it.', screen: 'sp-history' },
    ],
    detail: [],
    screens: ['sp-audit'],
  },
  {
    slug: 'awards-portals',
    title: 'Awards / recognition portals',
    angle: 'Nominate, shortlist, vote on a deadline',
    featured: false,
    problem:
      'A recognition programme runs on a fixed deadline in front of the whole organisation, and a process that feels arbitrary does more harm than none.',
    approach:
      'A campaign site with a nomination window, a curated shortlist, per-category voting with enforced rules, and a results reveal.',
    outcome:
      'The programme runs on the dates it was given. Voting rules are enforced, not hoped for.',
    // 2026-09-24: rebuilt from the delivered system's code (research kept out of
    // this public repo). The long form it replaces made claims the code does not
    // support, so it is gone rather than hidden.
    solution:
      'A campaign site that opens for nominations, runs voting by category with one vote each, and then reveals the winners, with no running tally while voting is open.',
    steps: [
      { title: 'Nominate', body: 'Anyone can nominate a colleague or a team, in the category that fits, before the window closes.', screen: 'awards-nominate' },
      { title: 'Vote', body: 'Each person gets one vote per category, individuals and teams counted separately, cast on the candidate’s own page.', screen: 'awards-vote' },
      { title: 'Announce', body: 'When voting closes, winners appear by category, individuals and teams side by side.', screen: 'awards-announce' },
    ],
    detail: [],
    screens: ['awards-vote'],
  },
  {
    slug: 'scheduling-systems',
    title: 'Scheduling systems',
    angle: 'Booking with payment and delivery',
    featured: false,
    problem:
      'Most booking tools assume one calendar and one kind of appointment. Real services vary in length, need a gap after each one, and have money riding on whether they happen.',
    approach:
      'A booking page per provider, who models their own availability and services, and a booking that carries payment and delivery through to completion.',
    outcome:
      'A booking is the full transaction — reserved, paid, delivered, settled — not just a slot on a calendar.',
    // 2026-09-24: rebuilt from the delivered system's code (research kept out of
    // this public repo). The long form it replaces made claims the code does not
    // support, so it is gone rather than hidden.
    solution:
      'Each provider runs their own booking page. Services carry a length and a gap, hours and holidays are built in, and every booking is tracked from reserved to paid, delivered and settled.',
    steps: [
      { title: 'Set the shape of a service', body: 'A length, a gap after it, and whether it confirms itself or waits for the provider.', screen: 'sched-service' },
      { title: 'Book inside what’s open', body: 'The calendar already leaves out holidays, closed hours and each booking’s gap.', screen: 'sched-book' },
      { title: 'Confirm before it’s due', body: 'Self-confirming services confirm on booking; the rest wait for the provider.', screen: 'sched-confirm' },
      { title: 'Follow it to settlement', body: 'Payment is due before the slot, attendance is detected from the call, and payout follows.', screen: 'sched-settle' },
    ],
    detail: [],
    screens: ['sched-settle'],
  },
];

export const featuredWork = work.filter((w) => w.featured);
export const listedWork = work.filter((w) => !w.featured);
export const getWork = (slug: string) => work.find((w) => w.slug === slug);
