import { lazy, Suspense } from 'react';
import { profile } from '../data/profile';
import { useMotionAllowed } from '../hooks/useMotionAllowed';
import { useTyping } from '../hooks/useTyping';
import { HeroIllustration } from './HeroIllustration';
import { Reveal } from './Reveal';
import { SocialLinks } from './SocialLinks';

const Particles = lazy(() => import('./Particles').catch(() => ({ default: () => null })));

export function Hero() {
  const motionAllowed = useMotionAllowed();
  const typed = useTyping(motionAllowed ? profile.roles : []);
  const role = motionAllowed ? typed : profile.roles[0];

  return (
    <section id="hero" className="relative isolate min-h-[90svh] flex items-center pt-16 overflow-hidden">
      {motionAllowed && (
        <div aria-hidden="true">
          <Suspense fallback={null}>
            <Particles />
          </Suspense>
        </div>
      )}
      <div className="max-w-5xl mx-auto px-4 w-full grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-lg text-muted">{profile.greeting}, I&apos;m</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            <span className="text-accent">{profile.name}</span>
          </h1>
          <p aria-live="off" className="mt-4 text-xl text-text sm:text-2xl">
            <span aria-hidden="true">{role}</span>
            <span className="sr-only">{profile.roles.join(', ')}</span>
            {motionAllowed && <span aria-hidden="true" className="ml-0.5 animate-pulse text-accent">|</span>}
          </p>
          <div className="mt-8">
            <SocialLinks size="lg" />
          </div>
        </Reveal>
        <Reveal delay={0.15} className="flex justify-center">
          <HeroIllustration className="w-full max-w-md" />
        </Reveal>
      </div>
    </section>
  );
}
