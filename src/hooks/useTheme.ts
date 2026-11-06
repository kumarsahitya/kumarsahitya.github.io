import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

function readInitialTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (isTheme(attr)) return attr;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // storage unavailable, fall through to OS preference
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.theme !== theme) root.dataset.theme = theme;
  }, [theme]);

  // Keep every useTheme() instance in sync with the attribute.
  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      const attr = root.dataset.theme;
      if (isTheme(attr)) setTheme(attr);
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Follow OS theme changes until the user has made an explicit choice.
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (!mql || typeof mql.addEventListener !== 'function') return;
    const onChange = (event: { matches: boolean }) => {
      try {
        if (localStorage.getItem(STORAGE_KEY) !== null) return;
      } catch {
        // storage unavailable, treat as no stored choice
      }
      setTheme(event.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable, theme still applies for this session
    }
  }, [theme]);

  return { theme, toggle };
}
