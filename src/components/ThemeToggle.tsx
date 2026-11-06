import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text hover:text-accent"
    >
      {isDark ? <LuSun aria-hidden="true" size={20} /> : <LuMoon aria-hidden="true" size={20} />}
    </button>
  );
}
