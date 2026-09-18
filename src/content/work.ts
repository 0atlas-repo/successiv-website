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
// `detail` is what the engagement actually was, read out of the source. Three
// paragraphs minimum, enforced by scripts/verify.mjs. Claims here must be
// traceable to something that exists — if the code does not do it, it does not
// go in. Three entries were rewritten in 2026-09 for exactly that reason, and a
// fourth was removed outright because nothing supported it.

export type WorkMock =
  | 'scoring'
  | 'timeline'
  | 'bundle-redaction'
  | 'incident-cases'
  | 'tender-checklist'
  | 'tender-ranking'
  | 'contract-registry'
  | 'contract-clause'
  | 'bundle-builder'
  | 'incident-chat'
  | 'incident-actions'
  | 'cms-editor'
  | 'cms-publish'
  | 'cms-news'
  | 'sp-permissions'
  | 'sp-access'
  | 'sp-links'
  | 'awards-nomination'
  | 'awards-shortlist'
  | 'sched-marketplace'
  | 'sched-slots'
  | 'sched-calendar';

export interface WorkItem {
  slug: string;
  title: string;
  angle: string;
  featured: boolean;
  problem: string;
  approach: string;
  outcome: string;
  /** The long form, for /work/<slug>. Three paragraphs minimum. */
  detail: string[];
  /** Mocked screens, sized to what the system actually has. Never a screenshot. */
  screens: WorkMock[];
}

export const work: WorkItem[] = [
  {
    slug: 'tender-rfp-management',
    title: 'Tender / RFP management',
    angle: 'Intake, scoring, award',
    featured: true,
    problem:
      'Bids arrive by email. Each evaluator keeps a private spreadsheet. By award time, nobody can reconstruct how the decision was reached.',
    approach:
      'One intake queue, the same scoring model for every evaluator, and a summary that freezes the record at award.',
    outcome:
      'Scoring lives in one place, with a trail of who scored what, when, and against which criterion.',
    detail: [
      'Competitive procurement fails quietly. Each evaluator keeps their own spreadsheet, scores drift as the process runs, and a bidder who asks why they lost gets an answer assembled after the fact from memory and mailboxes. The buyer we built this for was running large, contested awards on exactly that footing. The risk was not that the wrong supplier would win — it was that nobody could show why the right one had.',
      'The system holds one process from first download to final ranking. A bidder reads the instructions, attests a declaration of interest before anything else is accepted, then works a submission checklist that will not let them submit while a mandatory document is missing. Evaluators raise written clarification questions against specific submissions, and the answers attach to the bid rather than living in a thread. Scoring runs against fixed criteria with per-criterion weightings applied by the system, not by whoever is holding the spreadsheet. Consortium bids are modelled properly, as one bidder with named members, because treating them as a single anonymous entity is where accountability goes missing.',
      'Two details matter more than they sound. Amendments issued mid-process are tracked with acknowledgement, so it is provable which version of the requirements each bidder was answering. And the registers that usually arrive as unread appendices — proposed sub-contractors, committed staffing — are extracted and indexed, so an evaluator can compare across bids instead of taking each submission at face value. Draft scores can be generated from the submission text to give evaluators a starting point, but nothing is recorded until a person signs it off.',
      'The system stops at award. It does not raise a purchase order or track what happens next, because loading a buying process with everything downstream of it is how these tools become the thing nobody wants to open. What it produces is a record that stands up when the decision is questioned months later.',
    ],
    screens: ['tender-checklist', 'scoring', 'tender-ranking'],
  },
  {
    slug: 'contract-lifecycle',
    title: 'Capital / works contract management',
    angle: 'Lifecycle after award',
    featured: true,
    problem:
      'Major contracts run for years across variations, claims, and certificates. The live state sits in whichever file someone opened last.',
    approach:
      'Treat the contract as a register of typed, versioned submissions so a variation or claim attaches to the contract instead of floating in a folder.',
    outcome:
      'The state of a contract is a page, not a hunt across shared drives.',
    detail: [
      'A contract signed today is administered for years by people who were not in the room when it was negotiated. The questions that come up are always the same shape — does this variation need approval, what does the contract say about this claim, which revision is current — and answering them traditionally means finding the right document, then finding the right clause inside it, then trusting that the copy you opened is the live one.',
      'We modelled the contract as a register rather than a folder. Every submission has a type — variation, claim, payment certificate, milestone — and each type drives its own form and its own validation, because a claim and a milestone do not need the same things. Re-uploading does not overwrite: it creates a new version, and the previous one stays readable, so revision history is a property of the system rather than a filename convention. Status changes are deliberate and manual, because a contract does not expire on a schedule and pretending it does produces wrong data.',
      'The part that earns its keep is the mapping layer. Documents are indexed on upload through a pipeline with its own visible states, and an administrator maps document fields to the clauses that govern them. That mapping is what lets the assistant answer a question with the clause behind it, rather than a plausible paraphrase. Users rate the answers, the ratings are reviewable, and the glossary the assistant leans on is edited by an administrator rather than redeployed by a developer.',
      'Everything is written to an audit log that records before and after values, not merely that something changed. The system deliberately does not negotiate terms or re-open what was agreed — administering an agreement is a different job from striking one. It also does not chase anyone: there are no escalation timers, because the people doing this work do not need software to tell them a deadline exists.',
    ],
    screens: ['contract-registry', 'timeline', 'contract-clause'],
  },
  {
    slug: 'document-bundling-redaction',
    title: 'Document bundling & redaction',
    angle: 'Assemble, redact, release',
    featured: true,
    problem:
      'A release pack means gathering four formats, blacking out what must not leave, and doing it by hand every time.',
    approach:
      'A service that merges mixed formats into one ordered PDF, fills template values, masks regions by coordinate, and locks the result.',
    outcome:
      'Assembly is a repeatable job with the same output each time — not an afternoon in a PDF editor.',
    detail: [
      'Releasing a file to someone outside the organisation is a small, dangerous, repetitive job. The material is in whatever format it arrived in, some of it must be blacked out before it goes anywhere, and the person doing it is working by hand under time pressure. Hand redaction is where mistakes happen, and a redaction mistake is not recoverable once the file has been sent.',
      'We built this as a service rather than a screen, because it runs inside a larger case system rather than being somewhere a person visits. It accepts documents in mixed formats — word processor files, PDFs, several image types, plain text — converts each to PDF, and merges them in a caller-defined order into one file. Placeholder values in the source documents are substituted on the way through, so a bundle assembled for a specific matter comes out already populated. A watermark can be applied across the merged result.',
      'Masking is done properly rather than cosmetically. The caller supplies regions in either pixels or inches, per page; the page is rasterised, the regions are painted out, and the raster is re-embedded in place of the original page. That matters, because drawing a black rectangle over a PDF text layer hides nothing — the text is still there for anyone who selects it. Rendering the page to an image first is what makes the redaction real. The finished file can then be password-protected before release.',
      'Two supporting behaviours came with it: uploads are passed to a virus scanner with retries before anything is processed, and text can be converted between Traditional and Simplified Chinese so one source document serves both audiences. To be precise about what this is not — it applies no cryptographic signature and issues no certificate. It prepares and protects documents; it does not execute them.',
    ],
    screens: ['bundle-builder', 'bundle-redaction'],
  },
  {
    slug: 'ops-incident-support',
    title: 'Ops incident support',
    angle: 'During the incident, and after',
    featured: true,
    problem:
      'The answer usually exists in a handbook or procedure, but nobody has time to find it. The write-up afterwards is rebuilt from memory.',
    approach:
      'An assistant that reads the incident conversation, answers from the indexed procedure library with sources, and drafts the action list and the review.',
    outcome:
      'The procedure is available while the incident is live, and the record afterwards is drafted from what actually happened.',
    detail: [
      'Operational incidents are handled by people under time pressure who already know their job. What they do not have, mid-incident, is the ability to stop and search a policy library. So procedures get applied from memory, and the write-up afterwards is assembled days later from a group conversation and recollection. We were brought in for part of a larger system, and this is the part we built.',
      'The assistant sits on the incident itself. Messages from the incident conversation are ingested and analysed as they arrive. An operator can ask a question in plain language and get an answer drawn from an indexed library of handbooks, notices, and standing procedures, with the source document behind it — confidentiality-classified, so restricted material does not surface to someone who should not see it. The assistant also proposes follow-up questions, which sounds cosmetic and is not: the useful thing during an incident is often knowing what you have not asked yet.',
      'From the same conversation it drafts an action checklist, marking which items it suggested and what in the conversation prompted each one. An operator confirms, edits, or discards them, and completion is timestamped as the incident unfolds. Audio can be uploaded and transcribed, and the post-incident write-up is pre-filled from the transcript and the conversation rather than typed from memory. A case moves through explicit states from first contact to closed, so the review is a stage rather than an afterthought.',
      'Every answer can be rated, and the ratings roll into a view that shows where the assistant is weak — which is how the prompt templates and the glossary get improved, by an administrator, without a release. What it does not do is judge severity or decide who owns the incident. Those stay human calls; the system records them, it does not make them.',
    ],
    screens: ['incident-cases', 'incident-chat', 'incident-actions'],
  },
  {
    slug: 'content-cms-platforms',
    title: 'Content / CMS platforms',
    angle: 'Multilingual publishing, static front end',
    featured: false,
    problem:
      'A site in three languages turns every content change into a developer ticket, and the editor cannot see what is about to go live.',
    approach:
      'One editor record holds all language versions, with a preview step, and publishing that regenerates static pages.',
    outcome:
      'Editors publish in three languages without a deploy. The public site stays static and fast.',
    detail: [
      'A site that must exist in three languages has a structural problem: the three versions drift. Someone updates one, the other two lag, and because each language is a separate set of pages, nobody notices until a customer does. Add a marketing team that cannot publish without a developer and the site slowly stops reflecting the business.',
      'We built the editor around the record rather than the page. One content item holds all three language versions together — every section, in each language, edited side by side — so publishing incomplete translations is a visible choice rather than an accident. Editors work on short news items and longer feature stories, upload their own media, and preview the result before anything goes live. Publishing is a status change, not a deployment.',
      'Underneath, publishing regenerates static HTML on disk rather than serving pages from a query at request time. That decision is why the public site is fast, cheap to serve, and has almost nothing to attack: there is no database behind the pages a visitor sees. The trade is that publishing does real work, which is fine for a site that changes daily rather than continuously. Before any overwrite the system writes a timestamped copy of the previous state, so a bad edit is recoverable by an operator without going to infrastructure backups.',
      'The public side carries an enquiry form behind a challenge check, forwarding qualified enquiries into the CRM the sales team already lives in rather than creating another inbox to monitor. The system stays deliberately small: no approval chains, no per-section editor roles, no comment threads. For a team of a few editors, workflow software is overhead, and the backup trail does the job an approval gate would have been bought for.',
    ],
    screens: ['cms-editor', 'cms-publish', 'cms-news'],
  },
  {
    slug: 'sharepoint-extensions',
    title: 'Enterprise SharePoint extensions',
    angle: 'Governance and audit inside Microsoft 365',
    featured: false,
    problem:
      'A large tenant accumulates documents faster than anyone can govern them. Who can see what, what is stale, and what broke last week are hard to answer.',
    approach:
      'Reporting and governance tooling in the tenant itself — permission audits, usage and growth reports, time-limited access, link monitoring.',
    outcome:
      'Tenant questions get answered from a report instead of an administrator guessing.',
    detail: [
      'Microsoft 365 is excellent at letting people store and share things, and poor at telling you what happened afterwards. In a tenant of any size the practical questions are unanswerable from the interface: who actually has access to this library, which documents have not been touched in three years, what is our version bloat costing, who has left files checked out, and which links broke when somebody reorganised a folder. Administrators end up guessing, or writing one-off scripts nobody maintains.',
      'We delivered this over several phases as tooling inside the tenant rather than another portal to log into. The reporting side walks the item hierarchy and produces permission audits down to individual items, growth and version-impact reports, usage and access reports, and stale-content reports — driven by a job queue, so a large scan runs unattended and emails the requester a spreadsheet when it finishes. Activity data is pulled nightly into a database, because the platform keeps only a short window and the questions people ask are historical.',
      'The governance side is where behaviour changes. Access can be granted from a right-click, time-limited, against a pre-defined bundle rather than by hand-editing permissions — with expiry cleaned up on a schedule instead of relying on someone to remember. Documents can be flagged for link monitoring, and when a referenced item is moved or deleted the author is emailed rather than finding out from a colleague. Bulk metadata operations cover the tagging work that otherwise happens one item at a time.',
      'A later phase added retrieval for correspondence-heavy libraries: structured search across the metadata that actually identifies a document — reference, date, type, stage, who sent it, who received it, inbound or outbound — rather than text search over filenames. Alongside it, per-item audit lookup opens from the document itself, so "who changed this and when" is answered where the question is asked. All of it stays inside the platform\'s own permissions model; none of it invents a second access system to keep in sync.',
    ],
    screens: ['sp-permissions', 'sp-access', 'sp-links'],
  },
  {
    slug: 'awards-portals',
    title: 'Awards / recognition portals',
    angle: 'Nominate, shortlist, vote on a deadline',
    featured: false,
    problem:
      'An annual recognition programme runs on forms, a spreadsheet, and a deadline — and the result has to feel fair to everyone who entered.',
    approach:
      'A campaign site with a nomination window, a curated shortlist, per-category voting with enforced rules, and a results reveal.',
    outcome:
      'The programme runs on the dates it was given. Voting rules are enforced, not hoped for.',
    detail: [
      'An internal recognition programme is a small system with a hard constraint: it runs once a year, on fixed dates, in front of the whole organisation, and if it feels arbitrary it does more damage than not running it at all. The work is not complicated — collect nominations, shortlist them, let people vote, announce winners — but every part of it is deadline-bound and publicly visible.',
      'The portal moves through phases rather than being a single site. During the nomination window it presents the categories and takes submissions through a forms product, with a confirmation step that prompts the nominator to consider another category while they are still engaged. Administrators then assess and shortlist, and publishing the shortlist flips the same site into its next phase: a gallery indexed by category, with a profile page for each shortlisted individual or team. When voting closes and winners are marked, it flips again to the announcement.',
      'The voting rules are enforced, not assumed. One vote per category per candidate type, with individual and team treated as separate things. Votes are rejected outside the configured window, rejected for already-decided categories, and rejected on a second attempt by the same voter. No running tallies are shown to anyone while voting is open, which removes both the bandwagon effect and the argument afterwards about whether a visible leaderboard shaped the result. The panel reviewing each category is displayed alongside it, so the people making the judgement are visible.',
      'Deliberately absent: editing a nomination after submission, and any live count. Both were decisions about fairness rather than gaps in the build. Setup is a one-time provisioning run that creates the lists, fields, and category structure, so the following year is a configuration change rather than a rebuild.',
    ],
    screens: ['awards-nomination', 'awards-shortlist'],
  },
  {
    slug: 'scheduling-systems',
    title: 'Scheduling systems',
    angle: 'Two-sided booking with payment and delivery',
    featured: false,
    problem:
      'Most booking tools assume one calendar and one kind of appointment. Real providers have different service lengths, turnaround between them, and money attached.',
    approach:
      'A two-sided marketplace where providers model their own availability and services, and a booking carries payment and delivery through to completion.',
    outcome:
      'A booking is the full transaction — reserved, paid, delivered, settled — not just a slot on a calendar.',
    detail: [
      'Most scheduling tools model a calendar with slots in it. That breaks as soon as a provider offers services of genuinely different shapes: a thirty-minute consultation and a two-hour session are not interchangeable, and the gap a provider needs after each one differs too. Bolt payment onto that and it breaks again, because the money and the appointment end up in separate systems that disagree.',
      'Providers here model their own world. They define services with both a duration and a cooldown, bundle services into packages, and configure locations with working hours per day of the week, a timezone, and a country whose public holidays block the calendar automatically. The conflict check spans the service plus its cooldown rather than just the appointment, which is what prevents the back-to-back bookings that look fine in a calendar and are impossible in practice. Auto-confirmation is a per-service setting, because some appointments need a person to accept them and some do not.',
      'A booking carries the full transaction. The customer pays at checkout, and an unpaid booking is released automatically rather than holding a slot indefinitely. A video room is provisioned for the booking and opens in its window, so remote delivery is part of the flow rather than a link pasted into an email. Attendance is marked afterwards, and that mark is what releases the payout to the provider — money moves on delivery, not on booking. Customer and provider can message inside the booking, and a dispute can be raised against it.',
      'Timezones are handled where the errors normally live: working hours are stored and edited in the provider\'s local time, and everything is normalised on the way into a query. Known gaps, stated honestly — no external calendar synchronisation, no recurring bookings, and a location maps to one provider, so a booking cannot be reassigned to a colleague.',
    ],
    screens: ['sched-marketplace', 'sched-slots', 'sched-calendar'],
  },
];

export const featuredWork = work.filter((w) => w.featured);
export const listedWork = work.filter((w) => !w.featured);
export const getWork = (slug: string) => work.find((w) => w.slug === slug);
