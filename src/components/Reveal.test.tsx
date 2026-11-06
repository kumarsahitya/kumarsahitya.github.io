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
