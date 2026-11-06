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
