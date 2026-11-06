# Portfolio Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the BootstrapMade static site at the repo root with a Vite + React single-page portfolio that has a light/dark toggle, scroll-reveal animation and a GitHub Actions deploy to GitHub Pages.

**Architecture:** One Vite app at the repo root. Content lives in typed data files under `src/data/`; presentational components under `src/components/` read them. Theme is a `data-theme` attribute on `<html>` driven by a `useTheme` hook and set before first paint by an inline script. Motion is centralised in a `Reveal` wrapper and a `useMotionAllowed` hook so reduced-motion handling lives in one place. The old site is moved to `legacy/` during the build as the content source of truth and deleted in the last task.

**Tech Stack:** Vite (create-vite `react-ts` template), React 19, TypeScript, Tailwind CSS v4 via `@tailwindcss/vite`, `motion` (`motion/react`), `@tsparticles/react` + `@tsparticles/slim`, `react-icons`, `@fontsource/poppins`, Vitest + Testing Library + jsdom, GitHub Actions Pages deploy.

**Spec:** `docs/superpowers/specs/2026-11-06-portfolio-revamp-design.md`

## Global Constraints

- All work on branch `revamp`; nothing is pushed to `main`. Final deliverable is a pull request. Kumar switches Pages to "GitHub Actions" (repo currently reports `build_type: legacy`, branch `main`, path `/`) before merging.
- Commit messages: conventional prefix, no AI attribution lines, no local machine paths anywhere in the repo.
- Node 24 / npm 11 locally; the workflow uses `node-version: 24`.
- Content: every sentence on the page comes from `legacy/index.html` or from the spec; headings and UI labels excepted. No counters, no testimonials, no portfolio cards, no Instagram, no Blogger.
- Social links: exactly LinkedIn `https://in.linkedin.com/in/kumar-sahitya`, GitHub `https://github.com/kumarsahitya`, Email `mailto:ksahitya27@gmail.com`.
- Typing roles, in order: "Senior Software Engineer", "Full-Stack Developer", "Freelancer".
- Shipped `dist/` total under 1.5 MB. Fonts self-hosted; no runtime font or script CDN.
- Lighthouse mobile: performance, accessibility, best practices each >= 90.
- `prefers-reduced-motion: reduce`: no translate, no particles, no tilt, no typing (first role shown statically); content never left at opacity 0.
- Tailwind dark variant keyed to `[data-theme="dark"]`, not the OS media query, so the toggle wins.
- External links: `target="_blank" rel="noopener noreferrer"`.

## Review Focus

1. `localStorage` throws (private mode, blocked storage): the theme must still resolve from the OS preference and the toggle must still work for the session. Test in Task 3.
2. Reduced motion: every section must be visible on load without scrolling tricks, and the particles component must not mount. Tests in Task 4 and Task 5.
3. Data entries with optional fields missing (the internship entry has no bullets in a `<ul>` and one role has no location line): the timeline must render without "undefined" or empty bullets. Test in Task 7.
4. Deep link on load (`/#experience`): the section heading must land below the fixed header, not under it. Covered by `scroll-margin-top` in Task 6 and the manual check in Task 11.
5. 360 px viewport with the longest skill label ("AI-Assisted Dev") and the longest employer line: no horizontal scroll. Manual check in Task 11.

---

### Task 1: Branch, move legacy site, scaffold Vite

**Files:**
- Move: `index.html`, `portfolio-details.html`, `assets/`, `forms/` into `legacy/`
- Create: Vite `react-ts` scaffold at repo root (`index.html`, `package.json`, `vite.config.ts`, `tsconfig*.json`, `src/`, `public/`, `.gitignore`)
- Modify: `vite.config.ts`, `package.json`

**Interfaces:**
- Produces: `npm run dev`, `npm run build` (runs `tsc -b && vite build`), `npm test` (Vitest, run once), `npm run preview`.

- [ ] **Step 1: Create branch and move the old site**

```bash
git checkout -b revamp
mkdir legacy && git mv index.html portfolio-details.html assets forms legacy/
git commit -m "chore: move legacy site into legacy/ for porting"
```

- [ ] **Step 2: Scaffold in a sibling folder and move into root**

```bash
npm create vite@latest scaffold-tmp -- --template react-ts
rsync -a scaffold-tmp/ ./ && rm -rf scaffold-tmp
```
Accept the template's dependency versions. If `tsc -b` later fails because the template pulled TypeScript 7, pin `"typescript": "~5.9.0"`.

- [ ] **Step 3: Add dependencies**

```bash
npm install
npm install tailwindcss @tailwindcss/vite motion @tsparticles/react @tsparticles/slim @tsparticles/engine react-icons @fontsource/poppins
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @types/node
```

- [ ] **Step 4: Configure Vite and test runner**

`vite.config.ts`: add `tailwindcss()` plugin, `base: '/'`, and a `test` block: `environment: 'jsdom'`, `globals: true`, `setupFiles: ['./src/test/setup.ts']`. Use `/// <reference types="vitest/config" />` at the top.
Create `src/test/setup.ts` importing `@testing-library/jest-dom/vitest`.
`package.json` scripts: add `"test": "vitest run"`, `"test:watch": "vitest"`.
Add `"include": ["src", "vite.config.ts"]` plus `"types": ["vitest/globals"]` to `tsconfig.app.json` compilerOptions if the template does not already type Vitest globals.

- [ ] **Step 5: Delete template demo content**

Remove `src/App.css`, `src/assets/react.svg`, `public/vite.svg`. Replace `src/App.tsx` with a component returning `<main>Hello</main>`. Replace `src/index.css` with `@import "tailwindcss";`.

- [ ] **Step 6: Verify build and test runner**

Run: `npm run build && npm test`
Expected: build writes `dist/`; Vitest reports "No test files found" without a non-zero exit (add `passWithNoTests: true` to the test block if it exits 1).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite React TypeScript app with Tailwind and Vitest"
```

---

### Task 2: Content data files ported from legacy

**Files:**
- Create: `src/data/profile.ts`, `src/data/skills.ts`, `src/data/experience.ts`, `src/data/education.ts`, `src/data/services.ts`
- Test: `src/data/data.test.ts`
- Read: `legacy/index.html` (sections `#hero`, `#about`, `#skills`, `#resume`, `#services`)

**Interfaces:**
- Produces, in `src/data/profile.ts`:
  ```ts
  export const profile: {
    name: string;                 // "Kumar Sahitya"
    greeting: string;             // "Hi there"
    roles: string[];              // the three typing roles, in spec order
    about: { heading: string; paragraphs: string[] };
    facts: { label: string; value: string }[];   // City, Degree, Email, Freelance
    email: string;                // "ksahitya27@gmail.com"
    socials: { label: string; href: string; icon: 'linkedin' | 'github' | 'email' }[];
    contactLine: string;          // one inviting sentence; may be new copy, keep under 20 words
  }
  ```
- `src/data/skills.ts`: `export type Skill = { name: string; icon: IconType }` (from `react-icons`), `export const skills: Skill[]` in the legacy order: React, TypeScript, Angular, PHP8, Symfony, JavaScript, HTML5, CSS, Tailwind CSS, Storybook, Design Systems, Docker, AI-Assisted Dev, Agile, JQuery, Laravel, CakePHP, CodeIgniter. Use `react-icons/si` brand icons where one exists; `react-icons/lu` or `react-icons/bi` generic icons for Design Systems, AI-Assisted Dev, Agile.
- `src/data/experience.ts`: `export type ExperienceEntry = { title: string; company: string; location?: string; mode?: 'Remote' | 'On-site'; start: string; end: string; bullets: string[] }`, `export const experience: ExperienceEntry[]` newest first, six entries, bullets verbatim from legacy.
- `src/data/education.ts`: `export type EducationEntry = { degree: string; institution: string; start: string; end: string; note?: string }`, four entries.
- `src/data/services.ts`: `export type Service = { title: string; description: string; icon: IconType }`, six entries: Web App Development, Solution, Database, Component Libraries, APIs and Microservices, Legacy Migration. Descriptions verbatim from legacy, including the three that are commented out there.

- [ ] **Step 1: Write the failing tests**

```ts
// src/data/data.test.ts
import { profile } from './profile';
import { skills } from './skills';
import { experience } from './experience';
import { education } from './education';
import { services } from './services';

test('profile has exactly the three approved socials and three roles', () => {
  expect(profile.roles).toEqual(['Senior Software Engineer', 'Full-Stack Developer', 'Freelancer']);
  expect(profile.socials.map(s => s.href).sort()).toEqual([
    'https://github.com/kumarsahitya',
    'https://in.linkedin.com/in/kumar-sahitya',
    'mailto:ksahitya27@gmail.com',
  ].sort());
});

test('no dropped links or template residue anywhere in the data', () => {
  const blob = JSON.stringify({ profile, experience, education, services, skills: skills.map(s => s.name) });
  for (const banned of ['instagram', 'blogspot', 'Happy Clients', 'Lorem', 'App 1', 'Ceo & Founder']) {
    expect(blob).not.toContain(banned);
  }
});

test('experience has six entries newest first with the correct employers', () => {
  expect(experience).toHaveLength(6);
  expect(experience.map(e => e.company)).toEqual([
    'Acquia', 'Blackhawk Network', 'BiztechCS', 'BiztechCS', 'Hyperlink Infosystem', 'AS Services',
  ]);
  expect(experience[0].end).toBe('Present');
});

test('education has four entries and services six, skills eighteen', () => {
  expect(education).toHaveLength(4);
  expect(services).toHaveLength(6);
  expect(skills).toHaveLength(18);
  expect(skills[0].name).toBe('React');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL, modules not found.

- [ ] **Step 3: Write the five data files**

Port text from `legacy/index.html`. Strip HTML, keep sentences intact. For the internship entry, `bullets` holds its single sentence. Where the legacy entry has no location line, omit `location` and `mode`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/data
git commit -m "feat: port site content into typed data files"
```

---

### Task 3: Theme tokens, pre-paint script and useTheme

**Files:**
- Modify: `src/index.css`, `index.html`
- Create: `src/hooks/useTheme.ts`, `src/components/ThemeToggle.tsx`
- Test: `src/hooks/useTheme.test.tsx`

**Interfaces:**
- Produces: `export type Theme = 'light' | 'dark'`; `export function useTheme(): { theme: Theme; toggle: () => void }`; `export function ThemeToggle(): JSX.Element` (a `<button aria-label="Switch to light theme" | "Switch to dark theme">` with sun/moon icon from `react-icons/lu`).
- Produces CSS custom properties consumed by every later component through Tailwind utilities: `--color-bg`, `--color-surface`, `--color-border`, `--color-text`, `--color-muted`, `--color-accent`, `--color-accent-soft`.

- [ ] **Step 1: Tokens and dark variant in `src/index.css`**

```css
@import "tailwindcss";
@import "@fontsource/poppins/400.css";
@import "@fontsource/poppins/500.css";
@import "@fontsource/poppins/600.css";
@import "@fontsource/poppins/700.css";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme inline {
  --font-sans: "Poppins", ui-sans-serif, system-ui, sans-serif;
  --color-bg: var(--c-bg);
  --color-surface: var(--c-surface);
  --color-border: var(--c-border);
  --color-text: var(--c-text);
  --color-muted: var(--c-muted);
  --color-accent: var(--c-accent);
  --color-accent-soft: var(--c-accent-soft);
}

:root, [data-theme="light"] {
  --c-bg: #faf8ff; --c-surface: #ffffff; --c-border: #e6e0f5;
  --c-text: #17122b; --c-muted: #5b5674; --c-accent: #6d28d9; --c-accent-soft: #ede9fe;
}
[data-theme="dark"] {
  --c-bg: #0c0513; --c-surface: #160b26; --c-border: #2a1a44;
  --c-text: #f3effc; --c-muted: #b8aed2; --c-accent: #c770f0; --c-accent-soft: #2b1540;
}
html { scroll-behavior: smooth; }
body { background: var(--c-bg); color: var(--c-text); transition: background-color 200ms, color 200ms; }
section[id] { scroll-margin-top: 5rem; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```
Light accent `#6d28d9` on `#faf8ff` and dark accent `#c770f0` on `#0c0513` both clear WCAG AA for normal text; keep them unless a contrast check in Task 11 says otherwise.

- [ ] **Step 2: Pre-paint theme script in `index.html` `<head>`**

Inline script, before any stylesheet link: read `localStorage.getItem('theme')` inside try/catch; if not `'light'`/`'dark'`, use `matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`; set `document.documentElement.dataset.theme`. Also set `<html lang="en">` and `<meta name="color-scheme" content="dark light">`.

- [ ] **Step 3: Write the failing hook tests**

```tsx
// src/hooks/useTheme.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});

test('initial theme comes from data-theme set by the pre-paint script', () => {
  document.documentElement.dataset.theme = 'light';
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('light');
});

test('falls back to OS preference when no attribute and no storage', () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('dark');
  expect(document.documentElement.dataset.theme).toBe('dark');
});

test('toggle flips the attribute and persists', () => {
  document.documentElement.dataset.theme = 'dark';
  const { result } = renderHook(() => useTheme());
  act(() => result.current.toggle());
  expect(document.documentElement.dataset.theme).toBe('light');
  expect(localStorage.getItem('theme')).toBe('light');
});

test('still toggles when localStorage throws', () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
  const { result } = renderHook(() => useTheme());
  act(() => result.current.toggle());
  expect(document.documentElement.dataset.theme).toBe('light');
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `npm test -- src/hooks/useTheme.test.tsx`
Expected: FAIL, module not found.

- [ ] **Step 5: Implement `useTheme` and `ThemeToggle`**

`useTheme`: `useState<Theme>` initialised from `document.documentElement.dataset.theme`, else storage (try/catch), else `matchMedia`. `useEffect` writes `dataset.theme` and tries `localStorage.setItem('theme', theme)` in try/catch. `toggle` flips.
`ThemeToggle`: button using `useTheme`, `aria-label` names the theme it switches to, icon `LuSun` in dark mode and `LuMoon` in light mode.

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS, all tests.

- [ ] **Step 7: Commit**

```bash
git add index.html src/index.css src/hooks/useTheme.ts src/hooks/useTheme.test.tsx src/components/ThemeToggle.tsx
git commit -m "feat: add theme tokens, pre-paint theme script and toggle"
```

---

### Task 4: Motion primitives: useMotionAllowed and Reveal

**Files:**
- Create: `src/hooks/useMotionAllowed.ts`, `src/components/Reveal.tsx`
- Test: `src/components/Reveal.test.tsx`

**Interfaces:**
- Produces: `export function useMotionAllowed(): boolean` (false when `prefers-reduced-motion: reduce`, via `useReducedMotion` from `motion/react`).
- Produces: `export function Reveal({ children, delay = 0, className, as = 'div' }: { children: React.ReactNode; delay?: number; className?: string; as?: 'div' | 'section' | 'li' | 'article' }): JSX.Element`. With motion allowed: `motion[as]` with `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.2 }}`, `transition={{ duration: 0.5, ease: 'easeOut', delay }}`. With motion disallowed: plain element, no inline opacity.
- Stagger convention for lists: parent maps items to `<Reveal as="li" delay={index * 0.08}>`.

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/Reveal.test.tsx
import { render, screen } from '@testing-library/react';
import { Reveal } from './Reveal';

const mockReduced = vi.fn(() => false);
vi.mock('motion/react', async (orig) => {
  const actual = await orig<typeof import('motion/react')>();
  return { ...actual, useReducedMotion: () => mockReduced() };
});

test('renders children fully visible when reduced motion is requested', () => {
  mockReduced.mockReturnValue(true);
  render(<Reveal><p>Hello</p></Reveal>);
  const wrapper = screen.getByText('Hello').parentElement!;
  expect(wrapper.getAttribute('style') ?? '').not.toMatch(/opacity:\s*0/);
});

test('starts hidden when motion is allowed', () => {
  mockReduced.mockReturnValue(false);
  render(<Reveal><p>Hello</p></Reveal>);
  const wrapper = screen.getByText('Hello').parentElement!;
  expect(wrapper.getAttribute('style') ?? '').toMatch(/opacity:\s*0/);
});

test('renders the requested element type', () => {
  mockReduced.mockReturnValue(true);
  render(<ul><Reveal as="li">Item</Reveal></ul>);
  expect(screen.getByText('Item').tagName).toBe('LI');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/Reveal.test.tsx`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement the hook and component**

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useMotionAllowed.ts src/components/Reveal.tsx src/components/Reveal.test.tsx
git commit -m "feat: add reduced-motion aware Reveal wrapper"
```

---

### Task 5: Hero with typing effect, particles and illustration

**Files:**
- Create: `src/hooks/useTyping.ts`, `src/components/Particles.tsx`, `src/components/HeroIllustration.tsx`, `src/components/SocialLinks.tsx`, `src/components/Hero.tsx`
- Test: `src/hooks/useTyping.test.ts`, `src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: `profile` (Task 2), `useMotionAllowed` (Task 4), `Reveal` (Task 4).
- Produces: `export function useTyping(words: string[], opts?: { typeMs?: number; deleteMs?: number; holdMs?: number }): string` (defaults 80 / 40 / 1500). `export function Particles(): JSX.Element | null` (default export too, so it can be `React.lazy`-loaded). `export function HeroIllustration({ className }: { className?: string }): JSX.Element`. `export function SocialLinks({ size = 'md' }: { size?: 'md' | 'lg' }): JSX.Element` rendering `profile.socials` as icon links with `aria-label`, external ones with `target="_blank" rel="noopener noreferrer"`. `export function Hero(): JSX.Element` rendering `<section id="hero">`.

- [ ] **Step 1: Write the failing typing hook test**

```ts
// src/hooks/useTyping.test.ts
import { renderHook, act } from '@testing-library/react';
import { useTyping } from './useTyping';

test('types the first word character by character', () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useTyping(['Ab', 'Cd'], { typeMs: 10, deleteMs: 10, holdMs: 50 }));
  expect(result.current).toBe('');
  act(() => { vi.advanceTimersByTime(10); });
  expect(result.current).toBe('A');
  act(() => { vi.advanceTimersByTime(10); });
  expect(result.current).toBe('Ab');
  act(() => { vi.advanceTimersByTime(50 + 10 + 10 + 10); });  // hold, delete b, delete A, type C
  expect(result.current).toBe('C');
  vi.useRealTimers();
});

test('returns empty string for an empty list without throwing', () => {
  const { result } = renderHook(() => useTyping([]));
  expect(result.current).toBe('');
});
```

- [ ] **Step 2: Write the failing Hero tests**

```tsx
// src/components/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

const mockReduced = vi.fn(() => false);
vi.mock('motion/react', async (orig) => ({ ...(await orig<typeof import('motion/react')>()), useReducedMotion: () => mockReduced() }));
vi.mock('./Particles', () => ({ default: () => <div data-testid="particles" />, Particles: () => <div data-testid="particles" /> }));

test('shows name and the first role statically under reduced motion, with no particles', async () => {
  mockReduced.mockReturnValue(true);
  render(<Hero />);
  expect(screen.getByRole('heading', { level: 1, name: /Kumar Sahitya/ })).toBeInTheDocument();
  expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
  expect(screen.queryByTestId('particles')).toBeNull();
});

test('renders exactly three social links with correct rel on external ones', () => {
  mockReduced.mockReturnValue(true);
  render(<Hero />);
  const links = screen.getAllByRole('link').filter(a => /linkedin|github|mailto/.test(a.getAttribute('href') ?? ''));
  expect(links).toHaveLength(3);
  for (const a of links.filter(a => a.getAttribute('href')!.startsWith('http'))) {
    expect(a).toHaveAttribute('target', '_blank');
    expect(a).toHaveAttribute('rel', 'noopener noreferrer');
  }
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL on the two new files.

- [ ] **Step 4: Download and inline the illustration**

Open https://undraw.co/illustrations, search "programming" or "developer activity", set the accent colour to `#C770F0`, download the SVG. Create `HeroIllustration.tsx` returning the SVG as JSX: replace every `#C770F0` / `#c770f0` fill with `currentColor`, add `aria-hidden="true"`, keep `viewBox`, drop fixed width/height. Component root gets `className` plus `text-accent`. Licence note: unDraw allows use and modification without attribution; do not add other unDraw files beyond this one.

- [ ] **Step 5: Implement `useTyping`, `Particles`, `SocialLinks`, `Hero`**

`useTyping`: single `useEffect` state machine (typing → holding → deleting → next word) with `setTimeout`; return `''` and schedule nothing for an empty list.
`Particles`: `initParticlesEngine(loadSlim)` once, then `<Particles options=...>` from `@tsparticles/react` with: `fullScreen: false`, `fpsLimit: 60`, `particles.number.value: 60`, `color: 'var(--c-accent)'` is not supported, so read `getComputedStyle(document.documentElement).getPropertyValue('--c-accent')` at mount and re-init on theme change via a `MutationObserver` on `data-theme`; `opacity: { value: { min: 0.1, max: 0.5 } }`, `size: { value: { min: 1, max: 2.5 } }`, `move: { enable: true, speed: 0.3, direction: 'none', outModes: 'out' }`, no links, no interactivity. Positioned `absolute inset-0 -z-10` inside the hero.
`Hero`: `<section id="hero" class="relative min-h-[90svh] flex items-center overflow-hidden">`. Particles via `React.lazy(() => import('./Particles'))` inside `<Suspense fallback={null}>`, rendered only when `useMotionAllowed()`. Left column: greeting, `<h1>` with name (accent on the name), `<p aria-live="off">` typing line that shows `useTyping(profile.roles)` when motion allowed and `profile.roles[0]` otherwise, then `<SocialLinks size="lg" />`. Right column: `<HeroIllustration className="w-full max-w-md" />`. Two-column from `md:` up, stacked below.

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/hooks/useTyping.ts src/hooks/useTyping.test.ts src/components/Particles.tsx src/components/HeroIllustration.tsx src/components/SocialLinks.tsx src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "feat: add hero with typing effect, particles and illustration"
```

---

### Task 6: Header, nav and app shell

**Files:**
- Create: `src/components/Header.tsx`, `src/components/Section.tsx`, `src/components/Footer.tsx`
- Modify: `src/App.tsx`, `src/main.tsx`
- Test: `src/components/Header.test.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` (Task 3), `Reveal` (Task 4), `Hero` (Task 5).
- Produces: `export const navItems: { id: string; label: string }[]` in `Header.tsx` = About, Skills, Experience, Education, Services, Contact (ids lowercase). `export function Header(): JSX.Element`. `export function Section({ id, title, children, className }: { id: string; title: string; children: React.ReactNode; className?: string }): JSX.Element` rendering `<section id={id}>` with an `<h2>` inside a `<Reveal>` and a `max-w-5xl mx-auto px-4` container, `py-20 md:py-28` spacing. `export function Footer(): JSX.Element`.
- `App.tsx` composes: `Header`, `main` with `Hero` and placeholders for the five content sections (filled in Tasks 7 to 9), `Footer`.

- [ ] **Step 1: Write the failing Header test**

```tsx
// src/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header, navItems } from './Header';

test('renders every nav item as an anchor to its section and a theme toggle', () => {
  render(<Header />);
  for (const item of navItems) {
    expect(screen.getByRole('link', { name: item.label })).toHaveAttribute('href', `#${item.id}`);
  }
  expect(screen.getByRole('button', { name: /switch to (light|dark) theme/i })).toBeInTheDocument();
});

test('mobile menu button toggles aria-expanded', async () => {
  render(<Header />);
  const btn = screen.getByRole('button', { name: /menu/i });
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  await userEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'true');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/Header.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement Header, Section, Footer, App shell**

`Header`: `fixed top-0 inset-x-0 z-50`, translucent `bg-bg/80 backdrop-blur border-b border-border`. Brand "KS" linking `#hero`. Desktop nav `hidden md:flex`. Mobile: `<button aria-label="Open menu" aria-expanded aria-controls="mobile-nav">` toggling a panel; closes on link click. Active section indicator: `IntersectionObserver` over `navItems` ids, `rootMargin: '-40% 0px -55% 0px'`, adds `text-accent` plus `aria-current="true"` to the active link.
`Footer`: name, current year, "Built with React and Tailwind CSS".
`main.tsx`: import `./index.css`, render `<App />` in StrictMode.

- [ ] **Step 4: Run tests and build**

Run: `npm test && npm run build`
Expected: PASS; build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/main.tsx src/components/Header.tsx src/components/Header.test.tsx src/components/Section.tsx src/components/Footer.tsx
git commit -m "feat: add fixed header with nav, theme toggle and app shell"
```

---

### Task 7: About and Experience sections

**Files:**
- Create: `src/components/About.tsx`, `src/components/Experience.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/Experience.test.tsx`

**Interfaces:**
- Consumes: `Section`, `Reveal`, `profile`, `experience`, `ExperienceEntry`.
- Produces: `export function About(): JSX.Element` (`Section id="about" title="About"`); `export function Experience(): JSX.Element` (`Section id="experience" title="Experience"`).

- [ ] **Step 1: Write the failing Experience tests**

```tsx
// src/components/Experience.test.tsx
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';
import { experience } from '../data/experience';

vi.mock('motion/react', async (orig) => ({ ...(await orig<typeof import('motion/react')>()), useReducedMotion: () => true }));

test('renders every entry title and company, newest first', () => {
  render(<Experience />);
  const headings = screen.getAllByRole('heading', { level: 3 }).map(h => h.textContent);
  expect(headings).toEqual(experience.map(e => e.title));
  expect(screen.getAllByText('Acquia')[0]).toBeInTheDocument();
});

test('entries without location or bullets render cleanly', () => {
  const { container } = render(<Experience />);
  expect(container.textContent).not.toContain('undefined');
  for (const li of container.querySelectorAll('li')) expect(li.textContent?.trim()).not.toBe('');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/Experience.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement About and Experience**

`About`: two-column from `md:`, paragraphs left, facts list right as a 2-col definition grid; email fact rendered as a `mailto:` link. No photo.
`Experience`: `<ol>` timeline, vertical `border-l-2 border-border` with an accent dot per entry; each entry `<Reveal as="li" delay={i * 0.08}>` containing `<h3>{title}</h3>`, a meta line `company · location · mode` (omit missing parts and their separators), a date line `start - end`, and a `<ul>` only when `bullets.length > 0`.
Wire both into `App.tsx` after `Hero`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/About.tsx src/components/Experience.tsx src/components/Experience.test.tsx src/App.tsx
git commit -m "feat: add About and Experience timeline sections"
```

---

### Task 8: Skills, Education and Services sections

**Files:**
- Create: `src/components/Skills.tsx`, `src/components/Education.tsx`, `src/components/Services.tsx`, `src/components/TiltCard.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/Skills.test.tsx`

**Interfaces:**
- Consumes: `Section`, `Reveal`, `useMotionAllowed`, data from Task 2.
- Produces: `export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }): JSX.Element`: with motion allowed, `motion.div` with `whileHover={{ y: -4, rotateX: 4, rotateY: -4 }}` and `transition={{ type: 'spring', stiffness: 300, damping: 20 }}`; otherwise a plain div. `Skills`, `Education`, `Services` each a `Section` with ids `skills`, `education`, `services` and titles "Skills", "Education", "What I do".

- [ ] **Step 1: Write the failing Skills test**

```tsx
// src/components/Skills.test.tsx
import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';
import { skills } from '../data/skills';

vi.mock('motion/react', async (orig) => ({ ...(await orig<typeof import('motion/react')>()), useReducedMotion: () => true }));

test('renders one tile per skill with its name and a decorative icon', () => {
  const { container } = render(<Skills />);
  for (const s of skills) expect(screen.getByText(s.name)).toBeInTheDocument();
  expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(skills.length);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/Skills.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement the four components**

`Skills`: `<ul class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">`; each item `<Reveal as="li" delay={i * 0.05}><TiltCard class="bg-surface border border-border rounded-xl p-4 flex flex-col items-center gap-2">` with the icon at `text-3xl text-accent` and `aria-hidden`, label `text-sm text-center`.
`Education`: four cards in a `md:grid-cols-2` grid, degree as `<h3>`, institution, dates, optional note.
`Services`: six cards `md:grid-cols-2 lg:grid-cols-3`, icon, `<h3>` title, description.
Wire into `App.tsx` in order: Hero, About, Skills, Experience, Education, Services.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills.tsx src/components/Skills.test.tsx src/components/Education.tsx src/components/Services.tsx src/components/TiltCard.tsx src/App.tsx
git commit -m "feat: add Skills, Education and Services sections"
```

---

### Task 9: Contact section, metadata, favicon

**Files:**
- Create: `src/components/Contact.tsx`, `public/favicon.svg`, `public/og-image.jpg` (moved from `legacy/assets/img/profile-img.jpg`), `public/robots.txt`
- Modify: `index.html`, `src/App.tsx`
- Test: `src/components/Contact.test.tsx`

**Interfaces:**
- Consumes: `Section`, `SocialLinks`, `profile`.
- Produces: `export function Contact(): JSX.Element` (`Section id="contact" title="Contact"`).

- [ ] **Step 1: Write the failing Contact test**

```tsx
// src/components/Contact.test.tsx
import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

vi.mock('motion/react', async (orig) => ({ ...(await orig<typeof import('motion/react')>()), useReducedMotion: () => true }));

test('has a mail button and no form', () => {
  const { container } = render(<Contact />);
  expect(screen.getByRole('link', { name: /email me/i })).toHaveAttribute('href', 'mailto:ksahitya27@gmail.com');
  expect(container.querySelector('form')).toBeNull();
  expect(container.querySelector('input')).toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/Contact.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement Contact and metadata**

`Contact`: `profile.contactLine`, a primary button-styled `<a href="mailto:...">Email me</a>` (`bg-accent text-white rounded-full px-6 py-3`), then `<SocialLinks />`. Wire into `App.tsx` after Services.
`index.html` head: copy title, description, keywords, author, Open Graph and Twitter tags from `legacy/index.html`, changing both image URLs to `https://kumarsahitya.github.io/og-image.jpg`; `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`; theme-color meta for both themes.
`public/favicon.svg`: rounded square filled `#c770f0`, white "KS" text, 64x64 viewBox.
`public/robots.txt`: allow all.
Move the image: `git mv legacy/assets/img/profile-img.jpg public/og-image.jpg`.

- [ ] **Step 4: Run tests and build**

Run: `npm test && npm run build`
Expected: PASS; build succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Contact section, metadata, favicon and OG image"
```

---

### Task 10: GitHub Actions deploy workflow and README

**Files:**
- Create: `.github/workflows/deploy.yml`, `README.md`

- [ ] **Step 1: Write the workflow**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

- [ ] **Step 2: Write README.md**

Sections: what the site is; local dev (`npm install`, `npm run dev`, `npm test`, `npm run build`); editing content (one line per file in `src/data/`); deploy, in this exact order: 1. in repo Settings → Pages set Source to "GitHub Actions"; 2. merge the `revamp` PR; 3. the workflow publishes on every push to `main`. Note that the illustration is from unDraw under its licence.

- [ ] **Step 3: Validate the workflow file**

Run: `npx --yes action-validator .github/workflows/deploy.yml || python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/deploy.yml')); print('yaml ok')"`
Expected: no errors (the fallback only checks YAML syntax).

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml README.md
git commit -m "ci: add GitHub Pages deploy workflow and README"
```

---

### Task 11: Visual verification, budgets, remove legacy, open PR

**Files:**
- Delete: `legacy/`
- Possibly modify: any component or `src/index.css` for fixes found here

- [ ] **Step 1: Verify both themes at three widths**

Run: `npm run build && npm run preview` then open `http://localhost:4173` in the browser pane. At 360, 768 and 1280 px: toggle theme each time; confirm no horizontal scroll (`document.documentElement.scrollWidth <= window.innerWidth`), every section's heading visible after scrolling, active nav item follows scroll, mobile menu opens and closes. Load `http://localhost:4173/#experience` directly and confirm the Experience heading sits below the header. Fix anything found and commit as `fix: ...`.

- [ ] **Step 2: Verify reduced motion**

In the browser pane, emulate `prefers-reduced-motion: reduce` (DevTools rendering panel, or run `matchMedia` override via the javascript tool before reload). Confirm: no particles canvas in the DOM, every section visible at load without scrolling animation, typing line shows "Senior Software Engineer" statically.

- [ ] **Step 3: Verify no theme flash and persistence**

Set theme to the opposite of the OS preference, reload: the first painted frame already has the chosen theme (check `document.documentElement.dataset.theme` immediately and watch visually). Clear storage, reload: follows OS.

- [ ] **Step 4: Bundle budget**

Run: `du -sk dist && find dist -type f -exec du -k {} + | sort -rn | head`
Expected: total under 1536 KB. If over, the usual culprits are the particles engine (ensure `@tsparticles/slim`, lazy-loaded) and font weights (drop 500 if needed).

- [ ] **Step 5: Lighthouse**

Run: `npx --yes lighthouse http://localhost:4173 --preset=perf --form-factor=mobile --screenEmulation.mobile --only-categories=performance,accessibility,best-practices --output=json --output-path=./lighthouse.json --chrome-flags="--headless=new" && node -e "const r=require('./lighthouse.json').categories; for (const k in r) console.log(k, Math.round(r[k].score*100))"`
Expected: each printed score >= 90. Fix and re-run if not. Do not commit `lighthouse.json`; add it to `.gitignore`.

- [ ] **Step 6: Contrast spot check**

With the preview open, read computed `--c-accent` and `--c-bg` in both themes and check the pair at https://webaim.org/resources/contrastchecker/ or compute locally. Expected: >= 4.5:1 for both pairs and for `--c-muted` on `--c-bg`.

- [ ] **Step 7: Remove the legacy site**

```bash
git rm -r legacy
npm test && npm run build
git commit -m "chore: remove legacy static site"
```
Expected: tests pass and build succeeds with `legacy/` gone (nothing may import from it).

- [ ] **Step 8: Push the branch and open the PR**

```bash
git push -u origin revamp
gh pr create --title "Revamp portfolio: React, Tailwind, light/dark theme, scroll animation" --body-file docs/superpowers/plans/pr-body.md
```
Write `docs/superpowers/plans/pr-body.md` first with: a summary, the merge order (switch Pages source to GitHub Actions, then merge), the Lighthouse scores, the `dist/` size, and a note that the design and plan live under `docs/superpowers/`. Do not enable auto-merge.
