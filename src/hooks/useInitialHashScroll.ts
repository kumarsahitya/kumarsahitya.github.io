import { useEffect } from 'react';

// The sections render client-side, so the browser's own fragment scroll can run
// before they exist. Scroll to the hash target once after the first mount.
export function useInitialHashScroll(): void {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);
}
