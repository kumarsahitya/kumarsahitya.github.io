import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

beforeEach(() => {
  document.documentElement.dataset.theme = 'dark';
  localStorage.clear();
});

test('button names the theme it switches to and flips on click', async () => {
  render(<ThemeToggle />);
  const button = screen.getByRole('button', { name: 'Switch to light theme' });
  await userEvent.click(button);
  expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument();
  expect(document.documentElement.dataset.theme).toBe('light');
});
