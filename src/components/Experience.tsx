import { experience } from '../data/experience';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="relative border-l-2 border-border ml-3 space-y-10">
        {experience.map((entry, i) => {
          const details = [entry.location, entry.mode].filter(Boolean).join(' · ');
          return (
            <Reveal as="li" key={`${entry.company}-${entry.title}-${entry.start}`} delay={i * 0.08} className="relative pl-8">
              <span aria-hidden="true" className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-accent" />
              <h3 className="text-xl font-semibold">{entry.title}</h3>
              <p className="text-muted">
                <span>{entry.company}</span>
                {details && ` · ${details}`}
              </p>
              <p className="text-sm text-muted">
                {entry.start} - {entry.end}
              </p>
              {entry.bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-1 mt-3">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
