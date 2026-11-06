import { render } from '@testing-library/react';
import { useInitialHashScroll } from './useInitialHashScroll';

function Probe() {
  useInitialHashScroll();
  return <section id="experience" />;
}

afterEach(() => {
  window.location.hash = '';
});

test('scrolls the hash target into view on mount', () => {
  const scrollIntoView = vi.fn();
  Element.prototype.scrollIntoView = scrollIntoView;
  window.location.hash = '#experience';
  render(<Probe />);
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant' });
});

test('does nothing when there is no hash or the target is missing', () => {
  const scrollIntoView = vi.fn();
  Element.prototype.scrollIntoView = scrollIntoView;
  render(<Probe />);
  window.location.hash = '#missing';
  render(<Probe />);
  expect(scrollIntoView).not.toHaveBeenCalled();
});
