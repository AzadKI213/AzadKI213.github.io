# Frost Journal

A calm, minimal Astro theme for personal blogging. Content lives in Markdown files, the design leans into pale blues and soft typography, and everything deploys easily to GitHub Pages.

## Features

- **Cold, minimalist aesthetic** built with native CSS variables.
- **Markdown-based writing** stored under `src/content/blog/`.
- **Draft-aware listing** — use `draft: true` in front matter to hide posts.
- **RSS & sitemap** generated automatically.
- **Ready for GitHub Pages** with dynamic `base` path handling.

## Getting started

```bash
npm install
npm run dev
# → http://localhost:4321
```

Update `astro.config.mjs` with your final domain if it differs from `https://azadki213.github.io/`.

## Publishing a new post

Use the helper script to scaffold front matter and filenames:

```bash
npm run new "Title of the Post" --tags="Notes,Build" --draft
```

- Files are created in `src/content/blog/`.
- Remove `--draft` (or edit the front matter) when the post is ready for the public archive.
- Run `npm run dev` to preview the article locally.

When you're happy with the changes:

```bash
npm run build
npm run preview  # optional smoke check
```

Commit the updates and push to `main`. GitHub Pages will build and publish automatically via the existing workflow.

## Customising the site

- Edit `src/pages/index.astro` to change the hero copy, contact links, or the “About” section.
- Modify `src/styles/global.css` for colour tweaks or spacing adjustments.
- Replace `public/favicon.svg` with your own monogram or icon.
- Add images to `public/` and reference them from post front matter using the `cover` field.

## Deployment notes

- The project assumes a user site at `https://<username>.github.io/`. If you deploy to a project site, set `BASE_PATH` in the GitHub Actions workflow so internal links resolve correctly.
- Absolute URLs in the RSS feed and sitemap pull from `astro.config.mjs`. Keep `SITE_URL` in sync with your production domain for accurate metadata.

Enjoy the quiet space and make it your own.
