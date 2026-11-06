import { useEffect, useMemo, useState } from 'react';
import { Particles as TsParticles, ParticlesProvider } from '@tsparticles/react';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

// Must stay referentially stable: ParticlesProvider throws if the init callback changes.
const init = async (engine: Engine) => {
  await loadSlim(engine);
};

// tsparticles cannot resolve CSS variables, so read the resolved accent colour.
// (v4 moved the fill colour from particles.color to particles.paint.fill.color.)
function readAccent(): string {
  return getComputedStyle(document.documentElement).getPropertyValue('--c-accent').trim();
}

function readTheme(): string {
  return document.documentElement.dataset.theme ?? 'dark';
}

function useThemeStyle(): { color: string; theme: string } {
  const [style, setStyle] = useState(() => ({ color: readAccent(), theme: readTheme() }));

  useEffect(() => {
    const observer = new MutationObserver(() => setStyle({ color: readAccent(), theme: readTheme() }));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return style;
}

export function Particles() {
  const { color, theme } = useThemeStyle();

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: { value: 60 },
        paint: { fill: { enable: true, color: { value: color } } },
        opacity: { value: theme === 'light' ? { min: 0.08, max: 0.3 } : { min: 0.1, max: 0.5 } },
        size: { value: { min: 1, max: 2.5 } },
        move: { enable: true, speed: 0.3, direction: 'none', outModes: 'out' },
        links: { enable: false },
      },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
    }),
    [color, theme],
  );

  return (
    <ParticlesProvider init={init}>
      <TsParticles id="hero-particles" className="absolute inset-0 -z-10" options={options} />
    </ParticlesProvider>
  );
}

export default Particles;
