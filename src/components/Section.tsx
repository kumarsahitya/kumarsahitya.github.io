import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`.trim()}>
      <div className="max-w-5xl mx-auto px-4">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-semibold mb-10">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
