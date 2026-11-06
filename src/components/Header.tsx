import { useEffect, useRef, useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import { useActiveSection } from '../hooks/useActiveSection';
import { ThemeToggle } from './ThemeToggle';

export const navItems: { id: string; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const navIds = navItems.map((item) => item.id);

export function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navIds);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const linkClass = (id: string) =>
    active === id ? 'text-accent' : 'text-muted hover:text-text';

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <a
          href="#hero"
          aria-label="Kumar Sahitya, back to top"
          className="text-lg font-bold text-text hover:text-accent"
        >
          KS
        </a>
        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`text-sm font-medium transition-colors ${linkClass(item.id)}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text hover:text-accent md:hidden"
          >
            {open ? <LuX aria-hidden="true" size={22} /> : <LuMenu aria-hidden="true" size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-bg md:hidden"
        >
          <ul className="mx-auto flex max-w-5xl flex-col px-4 py-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-base font-medium transition-colors ${linkClass(item.id)}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
