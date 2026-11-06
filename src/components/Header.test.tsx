import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header, navItems } from './Header';

beforeEach(() => {
  document.documentElement.dataset.theme = 'dark';
  localStorage.clear();
});

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

test('clears the active nav link when the hero is the current section', () => {
  let callback: IntersectionObserverCallback = () => {};
  const observed = new Set<string>();
  class CapturingObserver {
    constructor(cb: IntersectionObserverCallback) {
      callback = cb;
    }
    observe(el: Element) {
      observed.add(el.id);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal('IntersectionObserver', CapturingObserver);
  for (const id of ['hero', ...navItems.map((item) => item.id)]) {
    const el = document.createElement('section');
    el.id = id;
    document.body.appendChild(el);
  }

  render(<Header />);
  const about = screen.getByRole('link', { name: 'About' });
  expect(observed.has('hero')).toBe(true);
  const entry = (id: string) =>
    [{ isIntersecting: true, target: document.getElementById(id) }] as unknown as IntersectionObserverEntry[];

  act(() => callback(entry('about'), {} as IntersectionObserver));
  expect(about).toHaveAttribute('aria-current', 'true');

  act(() => callback(entry('hero'), {} as IntersectionObserver));
  expect(about).not.toHaveAttribute('aria-current');

  document.querySelectorAll('section[id]').forEach((el) => el.remove());
});
