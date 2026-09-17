// Base-path helper.
//
// The site is served two ways and the only difference is one env var:
//
//   project page   0atlas-repo.github.io/successiv-website/   SITE_BASE=/successiv-website
//   custom domain  successiv.com/                             SITE_BASE=/
//
// A custom domain serves at the DOMAIN ROOT — the repo name disappears from the
// URL — so the base must be "/" in that mode. Astro exposes the configured base
// as import.meta.env.BASE_URL, always with a trailing slash.
//
// Every internal href and asset src must go through withBase(), or the
// project-page build ships links and stylesheets that 404.

const BASE = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  // Leave absolute URLs, mailto:, and bare fragments alone.
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;
  const prefix = BASE.replace(/\/+$/, '');
  const rest = path.replace(/^\/+/, '');
  return rest ? `${prefix}/${rest}` : `${prefix}/`;
}
