import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

vi.mock('motion/react', async (orig) => ({ ...(await orig<typeof import('motion/react')>()), useReducedMotion: () => true }));

test('has a mail button and no form', () => {
  const { container } = render(<Contact />);
  const mail = screen.getByRole('link', { name: /email me/i });
  expect(mail).toHaveAttribute('href', 'mailto:ksahitya27@gmail.com');
  expect(mail.className).toContain('text-bg');
  expect(mail.className).not.toContain('text-white');
  expect(container.querySelector('form')).toBeNull();
  expect(container.querySelector('input')).toBeNull();
});
