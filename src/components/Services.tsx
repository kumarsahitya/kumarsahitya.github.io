import { services, servicesIntro } from '../data/services';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { TiltCard } from './TiltCard';

export function Services() {
  return (
    <Section id="services" title="What I do">
      <Reveal>
        <p className="text-muted max-w-2xl mb-10">{servicesIntro}</p>
      </Reveal>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, icon: Icon }, i) => (
          <Reveal as="li" key={title} delay={i * 0.08}>
            <TiltCard className="bg-surface border border-border rounded-xl p-6 h-full">
              <Icon className="text-2xl text-accent" aria-hidden="true" />
              <h3 className="text-lg font-semibold mt-3">{title}</h3>
              <p className="text-muted mt-2">{description}</p>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
