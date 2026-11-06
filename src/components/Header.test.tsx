import { render, screen } from '@testing-library/react';
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
