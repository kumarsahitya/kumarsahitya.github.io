import { act, renderHook } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';

const ids = ['hero', 'about', 'contact'];

beforeEach(() => {
  for (const id of ids) {
    const el = document.createElement('section');
    el.id = id;
    document.body.appendChild(el);
  }
});

afterEach(() => {
  document.body.innerHTML = '';
  delete (document.documentElement as { scrollHeight?: number }).scrollHeight;
});

function setViewport(innerHeight: number, scrollY: number, scrollHeight: number) {
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: innerHeight });
  Object.defineProperty(window, 'scrollY', { configurable: true, value: scrollY });
  Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: scrollHeight });
}

test('activates the last id once the page is scrolled to the bottom', () => {
  const { result } = renderHook(() => useActiveSection(ids));
  expect(result.current).toBeNull();

  setViewport(800, 100, 2000);
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
  expect(result.current).toBeNull();

  setViewport(800, 1200, 2000);
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
  expect(result.current).toBe('contact');
});

test('removes the scroll listener on unmount', () => {
  const remove = vi.spyOn(window, 'removeEventListener');
  const { unmount } = renderHook(() => useActiveSection(ids));
  unmount();
  expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
  remove.mockRestore();
});
