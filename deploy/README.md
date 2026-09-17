# deploy/

`CNAME` lives here, not in `public/`, on purpose.

Anything in `public/` is copied into the build. A `CNAME` file in the published
output tells GitHub Pages to serve the site on that custom domain at the domain
root — which breaks the project-page URL
(`0atlas-repo.github.io/successiv-website/`) that is live today.

When `successiv.com` is ready:

1. Copy this file into `public/`.
2. Build with `SITE_BASE=/ SITE_URL=https://successiv.com npm run build`
   (or set those two env vars in `.github/workflows/deploy.yml`).
3. Set the custom domain in Settings → Pages.

The base path must be `/` in that mode, because a custom domain serves at the
domain root and the repo name disappears from the URL.
