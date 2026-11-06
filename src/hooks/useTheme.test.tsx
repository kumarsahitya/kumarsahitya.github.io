import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function stubSystemTheme(matches: boolean) {
  const addEventListener = vi.fn();
  const removeEventListener = vi.fn();
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches, addEventListener, removeEventListener }));
  const handler = () => addEventListener.mock.calls.find(([type]) => type === 'change')?.[1] as (e: { matches: boolean }) => void;
  return { addEventListener, removeEventListener, handler };
}

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

test('follows a system theme change when no choice is stored', () => {
  const system = stubSystemTheme(false);
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('light');
  act(() => system.handler()({ matches: true }));
  expect(result.current.theme).toBe('dark');
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem('theme')).toBeNull();
});

test('ignores a system theme change once a choice is stored', () => {
  localStorage.setItem('theme', 'light');
  document.documentElement.dataset.theme = 'light';
  const system = stubSystemTheme(false);
  const { result } = renderHook(() => useTheme());
  act(() => system.handler()({ matches: true }));
  expect(result.current.theme).toBe('light');
  expect(document.documentElement.dataset.theme).toBe('light');
});

test('removes the system listener on unmount', () => {
  const system = stubSystemTheme(false);
  const { unmount } = renderHook(() => useTheme());
  const handler = system.handler();
  expect(handler).toBeTypeOf('function');
  unmount();
  expect(system.removeEventListener).toHaveBeenCalledWith('change', handler);
});
