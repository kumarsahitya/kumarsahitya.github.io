import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

vi.mock('motion/react', async (orig) => ({ ...(await orig<typeof import('motion/react')>()), useReducedMotion: () => false }));
vi.mock('./Particles', () => {
  throw new Error('chunk failed');
});

test('keeps the hero rendered when the Particles chunk fails to load', async () => {
  render(<Hero />);
  expect(await screen.findByRole('heading', { level: 1, name: /Kumar Sahitya/ })).toBeInTheDocument();
  // Give the rejected dynamic import time to surface; without the catch the root unmounts.
  await new Promise((r) => setTimeout(r, 300));
  expect(screen.getByRole('heading', { level: 1, name: /Kumar Sahitya/ })).toBeInTheDocument();
});
