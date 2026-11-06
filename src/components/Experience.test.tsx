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
