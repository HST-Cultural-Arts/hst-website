# HST Cultural Arts Website

The HST Cultural Arts website is a static site built with [Astro](https://astro.build/).
Content is stored in the repository and can be edited through [Pages CMS](https://pagescms.org/).

## Requirements

- Node.js 22.12 or newer
- npm

## Local development

Install dependencies:

```bash
npm install
```

Start the local astro development server:

```bash
npm run dev
```

Astro will print the local URL, usually `http://localhost:4321`.

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

```text
src/
  components/       Reusable Astro components
  content/pages/    Editable page markdown content
  data/              Shared header and footer configuration
  pages/             Astro page routes
  styles/            Global and component styles
public/
  assets/            Images, documents, and brand assets served as-is
.pages.yml          Pages CMS content and media configuration
```

Most site pages are Markdown files in `src/content/pages/`. Images and PDFs
uploaded through Pages CMS are stored under `public/assets/uploads/`.

## Editing content with Pages CMS

Pages CMS uses the repository's `.pages.yml` file to define editable pages,
components, and media folders.

The recommended workflow is:

1. Select the `content-edits` branch in Pages CMS.
2. Make and save several content changes.
4. Review the changes and merge a pull request from `content-edits` into `main` when ready, or wait for a website admin to merge it for you.

`main` is the production branch. Merging into it triggers the production
deployment. The `content-edits` branch can be used for accumulating changes
without deploying every individual edit to production.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the site for production |
| `npm run preview` | Preview the production build |
| `npm run astro` | Run the Astro CLI |