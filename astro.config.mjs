// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Custom domain: served at the root, so no `base` path. If this ever moves to
// a project page (user.github.io/repo), set `base` here and nowhere else.
export default defineConfig({
  site: 'https://successiv.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: { plugins: [tailwindcss()] },
});
