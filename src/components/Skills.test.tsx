import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';
import { skills } from '../data/skills';

vi.mock('motion/react', async (orig) => ({ ...(await orig<typeof import('motion/react')>()), useReducedMotion: () => true }));

test('renders one tile per skill with its name and a decorative icon', () => {
  const { container } = render(<Skills />);
  for (const s of skills) expect(screen.getByText(s.name)).toBeInTheDocument();
  expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(skills.length);
});
