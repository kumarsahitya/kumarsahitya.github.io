import { skills, skillsIntro } from '../data/skills';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { TiltCard } from './TiltCard';

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <Reveal>
        <p className="text-muted max-w-2xl mb-10">{skillsIntro}</p>
      </Reveal>
      <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {skills.map(({ name, icon: Icon }, i) => (
          <Reveal as="li" key={name} delay={i * 0.05}>
            <TiltCard className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center gap-2 h-full">
              <Icon className="text-3xl text-accent" aria-hidden="true" />
              <span className="text-sm text-center">{name}</span>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
