// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Two deployment shapes, selected by env so neither needs a code edit:
//
//   project page   SITE_BASE=/successiv-website  SITE_URL=https://0atlas-repo.github.io
//   custom domain  SITE_BASE=/                   SITE_URL=https://successiv.com
//
// A custom domain serves at the domain root, so the base is "/" there. The
// project page is the default because that is what is deployed today.
// Everything internal routes through withBase() in src/base.ts.
const SITE_BASE = process.env.SITE_BASE ?? '/successiv-website';
const SITE_URL = process.env.SITE_URL ?? 'https://0atlas-repo.github.io';

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
