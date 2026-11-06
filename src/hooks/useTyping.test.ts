import { renderHook, act } from '@testing-library/react';
import { useTyping } from './useTyping';

test('types the first word character by character', () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useTyping(['Ab', 'Cd'], { typeMs: 10, deleteMs: 10, holdMs: 50 }));
  expect(result.current).toBe('');
  act(() => { vi.advanceTimersByTime(10); });
  expect(result.current).toBe('A');
  act(() => { vi.advanceTimersByTime(10); });
  expect(result.current).toBe('Ab');
  act(() => { vi.advanceTimersByTime(50 + 10 + 10 + 10); });  // hold, delete b, delete A, type C
  expect(result.current).toBe('C');
  vi.useRealTimers();
});

test('returns empty string for an empty list without throwing', () => {
  const { result } = renderHook(() => useTyping([]));
  expect(result.current).toBe('');
});
