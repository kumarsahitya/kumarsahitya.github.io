import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});

test('initial theme comes from data-theme set by the pre-paint script', () => {
  document.documentElement.dataset.theme = 'light';
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('light');
});

test('falls back to OS preference when no attribute and no storage', () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('dark');
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem('theme')).toBeNull();
});

test('toggle flips the attribute and persists', () => {
  document.documentElement.dataset.theme = 'dark';
  const { result } = renderHook(() => useTheme());
  act(() => result.current.toggle());
  expect(document.documentElement.dataset.theme).toBe('light');
  expect(localStorage.getItem('theme')).toBe('light');
});

test('still toggles when localStorage throws', () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
  const { result } = renderHook(() => useTheme());
  act(() => result.current.toggle());
  expect(document.documentElement.dataset.theme).toBe('light');
});
