import { education } from '../data/education';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="grid gap-6 md:grid-cols-2">
        {education.map(({ degree, institution, start, end, note }, i) => (
          <Reveal as="li" key={`${degree}-${start}`} delay={i * 0.08}>
            <div className="bg-surface border border-border rounded-xl p-6 h-full">
              <h3 className="text-lg font-semibold">{degree}</h3>
              <p className="text-muted">{institution}</p>
              <p className="text-sm text-muted">
                {start} - {end}
              </p>
              {note && <p className="mt-3">{note}</p>}
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
