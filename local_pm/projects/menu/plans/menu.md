# Menu — plan

Spec: `../specs/menu.md`. One sequence, solo (tasks depend on each other).

1. **Checks first.** `scripts/verify.mjs`: drop `capabilities` and `about` from the
   route list; add a redirect check (built `about/index.html` and
   `capabilities/index.html` are meta-refresh pages to `<base>/contact/#who` and
   `<base>/`); add a header check on every built page: primary nav is exactly
   Products, Work, Contact, and no "Talk to us". Run the build: the new checks fail.
2. **Nav data.** `site.nav` → Products, Work, Contact.
3. **Redirects + pages.** `astro.config.mjs` `redirects` (confirm the built target
   carries the base path; if Astro does not prefix it, build it from `SITE_BASE`).
   Delete `src/pages/about.astro` and `src/pages/capabilities.astro`. Fold About
   into `src/pages/contact.astro` (ask + address, `Team`, "Who we are" with
   `id="who"`, `Principles`). `ProofStrip` cells become plain cells.
4. **Header.** Desktop line (hover line, current dot, Contact arrow, hairline, bare
   theme icon, no pill); phone panel (navy, circle reveal, numbered links, address,
   Light · Dark · Auto, Escape, focus in/out, scroll lock).
5. **Theme.** `Layout.astro` script: any `[data-theme-toggle]` flips light/dark,
   any `[data-theme-set]` sets light/dark/auto (auto removes the key and the
   attribute), pressed state synced, circle wash from the clicked control via
   `document.startViewTransition` when supported and motion is allowed.
6. **Footer.** Light · Dark · Auto control.
7. **Docs.** `docs/DEPLOYMENT.md` smoke-test route list.
8. **Verify** per spec; screenshots light/dark at 1440 and 390.
