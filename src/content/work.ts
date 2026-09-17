// Anonymised delivery work.
//
// HARD RULE: every entry is titled by capability. No client name, sector
// identifier, or internal repo slug appears in this file or anywhere it is
// rendered. The mapping from these titles to real engagements lives only in
// docs/BRIEF.md and never reaches the built site — scripts/verify.mjs greps
// dist/ to prove it.
//
// Outcomes are qualitative on purpose. We have no published metrics for this
// work, and CLAUDE.md forbids inventing them.

export interface WorkItem {
  slug: string;
  title: string;
  angle: string;
  featured: boolean;
  problem?: string;
  approach?: string;
  outcome?: string;
  mock?: 'scoring' | 'timeline' | 'signature' | 'incidents';
}

export const work: WorkItem[] = [
  {
    slug: 'tender-rfp-management',
    title: 'Tender / RFP management',
    angle: 'Intake → evaluate → award',
    featured: true,
    problem:
      'Submissions arrive by email and get scored in spreadsheets that each evaluator keeps privately. By award time nobody can reconstruct how the decision was reached.',
    approach:
      'One intake queue, a fixed scoring model every evaluator fills in against the same criteria, and an award step that freezes the record.',
    outcome:
      'Evaluation happens in one place and leaves a trail — who scored what, when, and against which criterion.',
    mock: 'scoring',
  },
  {
    slug: 'contract-lifecycle',
    title: 'Capital / works contract management',
    angle: 'Contract lifecycle for capital projects',
    featured: true,
    problem:
      'Capital works run for years across variations, claims, and certificates. The current state of a contract lives in whichever document someone opened last.',
    approach:
      'Model the contract as a lifecycle with dated events, so variations and claims attach to a milestone instead of floating in a folder.',
    outcome:
      'The state of any contract is a page, not an archaeology exercise across shared drives.',
    mock: 'timeline',
  },
  {
    slug: 'document-signature-workflow',
    title: 'Document signature workflow',
    angle: 'PDF sign module embedded in a larger system',
    featured: true,
    problem:
      'Signing steps get outsourced to a separate tool, so the signed copy lives outside the system that needed it and has to be filed back by hand.',
    approach:
      'A signing module that runs inside the host application — prepare fields, route to signers, and write the executed document straight back to the case.',
    outcome:
      'The signed document lands where the process already was, with no re-upload step.',
    mock: 'signature',
  },
  {
    slug: 'ops-incident-reporting',
    title: 'Ops incident reporting',
    angle: 'Incident capture & routing',
    featured: true,
    problem:
      'Front-line staff report incidents through whoever is nearest. Severity is judged inconsistently and follow-up depends on someone remembering.',
    approach:
      'Structured capture on mobile, severity applied by rule rather than by mood, and routing that puts each incident in front of a named owner.',
    outcome:
      'Every incident has a recorded owner and a status, instead of a verbal handover.',
    mock: 'incidents',
  },
  {
    slug: 'retail-commerce-ops',
    title: 'Retail / mall commerce ops',
    angle: 'Storefront and mall operations tooling',
    featured: false,
  },
  {
    slug: 'content-cms-platforms',
    title: 'Content / CMS platforms',
    angle: 'Editorial CMS',
    featured: false,
  },
  {
    slug: 'sharepoint-extensions',
    title: 'Enterprise SharePoint extensions',
    angle: 'Microsoft 365 / SharePoint line-of-business toolkit',
    featured: false,
  },
  {
    slug: 'awards-portals',
    title: 'Awards / recognition portals',
    angle: 'Campaign and nomination portals',
    featured: false,
  },
  {
    slug: 'scheduling-systems',
    title: 'Scheduling systems',
    angle: 'Resource and appointment scheduling',
    featured: false,
  },
];

export const featuredWork = work.filter((w) => w.featured);
export const listedWork = work.filter((w) => !w.featured);
