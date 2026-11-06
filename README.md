# Kumar Sahitya - Portfolio

A single-page portfolio site built with React, TypeScript, Vite and Tailwind CSS. It covers profile, skills, experience, education and services, and supports a light and dark theme. Sections animate into view as you scroll, and the site is published to GitHub Pages from the root of `kumarsahitya.github.io`.

## Local development

```bash
npm install
npm run dev     # start the Vite dev server
npm test        # run the Vitest suite once
npm run build   # type-check and build into dist/
```

## Editing content

Almost all of the text on the site lives in `src/data/`:

- `profile.ts`: name, roles, about text, quick facts, email and social links.
- `skills.ts`: the skill list with icons, and the intro text above it.
- `experience.ts`: work history, with title, company, location, dates and bullet points.
- `education.ts`: degrees, institutions, dates and optional notes.
- `services.ts`: the services offered, and the intro text above them.

## Deployment

Deployment runs through `.github/workflows/deploy.yml`. Follow these steps in order:

1. In the repository, open Settings, then Pages, and set Source to "GitHub Actions".
2. Merge the `revamp` pull request.
3. From then on, every push to `main` runs the workflow, which tests, builds and publishes the site.

## Notes

Without JavaScript the page shows a minimal noscript fallback; the full site is client-rendered.

## Credits

The hero illustration is based on the "Typing Code" illustration from [unDraw](https://undraw.co), used under the unDraw licence. Attribution is not required, but it is credited here as a courtesy.
