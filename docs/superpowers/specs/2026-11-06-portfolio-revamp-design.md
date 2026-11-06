# Portfolio revamp: design

Date: 2026-11-06
Site: https://kumarsahitya.github.io/ (repo `kumarsahitya/kumarsahitya.github.io`, branch `main`)

## Intent

Replace the current BootstrapMade "Personal" template site with a modern single-page portfolio in the visual spirit of https://soumyajit.vercel.app/ (deep purple, space-like, playful), with two things that site lacks: a light/dark theme switch and scroll-reveal animation. The site is Kumar Sahitya's public profile as a Senior Software Engineer. There are no real projects to showcase, so the experience timeline is the centerpiece.

Why now: the current site looks dated, has no dark mode, carries template leftovers (placeholder portfolio cards, fake "232 Happy Clients" counters, testimonial stubs), and its contact form posts to PHP, which GitHub Pages cannot run.

## Goals

- A site a hiring manager or peer can skim in under a minute and come away with: who Kumar is, what he works with, where he has worked, how to reach him.
- Dark theme as the default look, modelled on the Soumyajit palette. A genuinely designed light theme, not an inverted afterthought. A visible toggle in the header; respects the OS preference on first visit; remembers the choice.
- Scroll-reveal animation: sections and cards fade and slide in as they enter the viewport, staggered for grids and timelines. Comparable to the AOS effects on the current site and to https://v4.brittanychiang.com/.
- Hero with a typing effect cycling through roles and an illustration (not a photo) beside the name.
- Keep the URL and repo. Publish from `main` via GitHub Actions to GitHub Pages.
- Fast and accessible: Lighthouse performance, accessibility and best-practices each 90 or above on mobile; honours `prefers-reduced-motion`.

## Non-goals

- No blog, no CMS, no multi-page routing.
- No Projects section (nothing real to show yet).
- No contact form. Contact is a mail link plus social icons.
- No analytics, no cookie banner.
- No pixel-for-pixel copy of Soumyajit's site; it is a reference for mood and palette, not a template to fork.

## Anti-goals (would make this a failure even if it works)

- Fabricated numbers or claims (the current "Facts" counters). Nothing on the page that is not true.
- Template residue: placeholder text, lorem ipsum, "App 1" cards, stock testimonials.
- Light mode that is unreadable or clearly an afterthought.
- Animation that is distracting or that hides content when JavaScript or motion is disabled. Content must be visible without JS once the page is built (the build is static HTML; reveal animation only adds motion, it must not start sections at opacity 0 for users with reduced motion).
- Heavy page: the current `assets/` folder is 14 MB. The new site's shipped bundle (HTML, CSS, JS, images, fonts) should stay under 1.5 MB, ideally well under.

## Constraints

- Hosting: GitHub Pages for the user site `kumarsahitya.github.io`, served from the root. Static files only.
- Stack (decided by Claude, accepted by Kumar): Vite, React, TypeScript, Tailwind CSS. Framer Motion for the reveal and hero animations. A particles library (tsparticles via its React bindings, or a lightweight custom canvas) for the hero starfield. A typing-effect library or a small hand-written hook for the role cycling.
- Deployment: a GitHub Actions workflow on push to `main` that runs the build and deploys the output with the official `actions/deploy-pages` flow. Pages must be switched from "Deploy from a branch" to "GitHub Actions" in repo settings; the builder documents this step in the README, the user flips the setting.
- Node LTS. Package manager: npm.
- Git commits: no AI attribution lines.
- The old site must keep working until the new one is live; the swap happens in one deploy.
- Cutover order (Claude's call): the builder works on a branch and opens a pull request; nothing is pushed to `main`. Kumar switches Pages to "GitHub Actions" in repo settings, then merges. Pushing Vite source to `main` while Pages still deploys from the branch would serve a broken page, and running the workflow before the switch would fail. The README states this order.

## Content

Everything below is ported from the current `index.html` unless marked new. The builder reads the live file for exact wording; this list defines what stays, what goes, and what changes.

Header / nav
- Brand mark: initials "KS" or a short wordmark. Links: About, Skills, Experience, Education, Contact. Theme toggle (sun/moon). Mobile: collapsible menu.

Hero
- "Hi there" greeting, name "Kumar Sahitya", typing line cycling: "Senior Software Engineer", "Full-Stack Developer", "Freelancer". Source these from the existing `data-typed-items`.
- Illustration on the right (desktop) or below (mobile). Use an open-licence SVG illustration of a developer at a desk (unDraw or similar; licence must allow use without attribution; commit the SVG, do not hotlink). Builder recolours it to the accent colour per theme if the library supports it.
- Starfield / particles background confined to the hero. Low density, slow drift. Disabled under reduced motion.
- Social links: LinkedIn (https://in.linkedin.com/in/kumar-sahitya), GitHub (https://github.com/kumarsahitya), Email (mailto:ksahitya27@gmail.com). Only these three. The current site also links Instagram and a Blogger blog; Kumar chose to drop both.
- A "Resume" button is out of scope unless a PDF exists in the repo. None does today.

About
- Heading, the three existing paragraphs (intro, professional summary, interests), and a short facts list: City (Ahmedabad, Gujarat, India), Degree (Master), Email, Freelance (Available). Drop the photo (illustration-led site) or keep it small as an avatar; builder's call.

Skills
- Icon grid of technologies, each with a logo and label. Port the current list from the Skills section of `index.html` (React, TypeScript, Angular, PHP, Symfony and the rest; read the live list). Use an icon set that ships both colour and monochrome variants or recolour to theme so icons stay legible in both themes. Hover: slight lift and tilt (see Animation).

Experience
- Vertical timeline, newest first. Port all six entries with company, location, mode (Remote/On-site), dates, and bullet points exactly as they read today. The live `index.html` is the single source of truth for titles, employers, dates and bullets; the list below is an index, not a replacement:
  1. Senior Software Engineer, Acquia (Pune, Remote), Jan 2025 - Present
  2. Software Engineer II, Blackhawk Network (Bengaluru, Remote), Jan 2023 - Jan 2025
  3. Senior Software Engineer, BiztechCS (Ahmedabad, On-site), Apr 2020 - Dec 2022
  4. Software Engineer - PHP, BiztechCS (Ahmedabad, On-site), Jan 2019 - Apr 2020
  5. PHP Developer, Hyperlink Infosystem (Ahmedabad, On-site), Nov 2017 - Oct 2018
  6. Android and PHP Developer - Internship, AS Services, Dec 2016 - Oct 2017

Education
- Four entries as today (MCA 2015-2017, BCA 2012-2015, HSC 2010-2012, SSC 2009-2010) with institutions as written in the live file. Compact cards or a second, shorter timeline.

Services ("What I do")
- Keep the six real service cards (Web App Development, Solution, Database, Component Libraries, APIs and Microservices, Legacy Migration) with their existing descriptions. Drop the testimonial stubs (Ceo & Founder, Designer, Store Owner, Freelancer, Entrepreneur); they are template filler.

Contact
- Short invitation line, a prominent mail button (mailto:ksahitya27@gmail.com), and the three social icons again. No form.

Footer
- Name, year, "Built with React and Tailwind" style line optional. No template credit line is required.

Removed entirely
- Facts counters (fabricated), Portfolio section and `portfolio-details.html`, testimonials, `forms/` directory, all `assets/vendor/*`.

SEO and metadata
- Keep the existing `<title>`, description, keywords, Open Graph and Twitter tags. Update the OG image to a new static image generated for the new design (or keep `profile-img.jpg` if no new one is made). Add a real favicon (SVG with the initials, plus PNG fallbacks).

## Visual design

Theme tokens live in CSS custom properties and switch via a `data-theme` attribute on `<html>` (Tailwind `dark` class strategy mapped to it is fine).

Dark (default)
- Background: very dark indigo/purple (reference: Soumyajit uses roughly `#0c0513` to `#1a0b2e`). Surfaces slightly lighter with a subtle border.
- Accent: violet/purple (reference `#c770f0` family) used for the name highlight, links, timeline dots, toggle, button fills.
- Text: near-white primary, muted lavender-grey secondary.
- Starfield particles in the accent colour at low opacity.

Light
- Background: warm off-white with a faint lavender tint, not pure white. Surfaces white with a soft shadow.
- Accent: a deeper violet (around `#6d28d9`) for AA contrast on light backgrounds.
- Text: near-black primary, grey secondary.
- Particles: muted, lower opacity, or replaced by a soft radial gradient if they read poorly on light.

Typography
- One display/body pairing from Google Fonts, self-hosted via the build (no runtime font CDN). Builder's choice; a geometric sans (e.g. Poppins, which the current site already uses) is a safe default.

Layout
- Max content width around 1100 px, generous vertical rhythm between sections, 16 px side gutters on mobile, no horizontal scroll at 360 px.

## Animation

- Scroll reveal: each section's heading and content block fades in and translates up about 24 px over roughly 0.5 s with ease-out when it first enters the viewport (fire once, not on every scroll). Grid items and timeline entries stagger by about 80 ms.
- Hero: name and typing line fade in on load; illustration fades in slightly after; particles start immediately.
- Hover: skill tiles lift 4 px and tilt a few degrees; buttons and links get a short colour transition.
- Theme toggle: background and text colours transition over about 200 ms; icon swaps sun/moon.
- Reduced motion: when `prefers-reduced-motion: reduce`, no translation, no particles, no tilt, no typing (show the first role statically). Fades may remain or be removed; content must never be stuck invisible.

## Technical shape (left to the builder, with these fixed points)

- Single `index.html` entry, one page, anchor navigation with smooth scroll and an active-section indicator in the nav.
- Theme: initial value from `localStorage`, else `prefers-color-scheme`. Set before first paint (inline script in `<head>`) to avoid a flash.
- Content lives in typed data files (e.g. `src/data/experience.ts`), not inline in components, so edits do not touch JSX.
- Build output goes to `dist/`; the Actions workflow uploads `dist/` as the Pages artifact. `vite.config` base stays `/` because this is a user site at the domain root.
- Add a `.nojekyll`-equivalent is unnecessary with the Actions deploy, but harmless if included.
- Keep the repo root tidy: old `assets/`, `forms/`, `portfolio-details.html` are deleted in the same change that lands the new site, not left alongside it.
- README: how to run locally, how to deploy, the one-time Pages settings switch, and how to edit content.

## Acceptance checks

- `npm run build` succeeds with no TypeScript errors.
- Both themes verified visually at 360 px, 768 px and 1280 px widths; no horizontal overflow; all text passes WCAG AA contrast in both themes.
- Toggle persists across reload; first visit follows OS preference; no theme flash on load.
- With `prefers-reduced-motion: reduce` emulated, every section is visible without scrolling tricks and no particles render.
- Lighthouse (mobile, production build) performance, accessibility, best practices each at or above 90.
- The Actions workflow deploys on push to `main` and the live URL serves the new site.
- No text on the page that did not come from the current site or from Kumar, except headings and UI labels.

## Open questions resolved during brainstorming

- Template vs custom: custom build; themes shown (hugo-profile, Blowfish, Astro Cactus, al-folio) were judged too plain, Soumyajit's look was chosen as the reference.
- Animation meaning: scroll reveal, as on the current site and Brittany Chiang's.
- Projects: none; section dropped.
- Contact: no form.
- Hero visual: illustration, not photo.
