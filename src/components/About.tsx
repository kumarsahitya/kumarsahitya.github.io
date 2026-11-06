import { profile } from '../data/profile';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function About() {
  return (
    <Section id="about" title="About">
      <div className="md:grid md:grid-cols-5 gap-10">
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-2xl font-semibold">{profile.about.heading}</h3>
          {profile.about.paragraphs.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-muted leading-relaxed">{paragraph}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="md:col-span-2 mt-10 md:mt-0">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
            {profile.facts.map((fact) => (
              <div key={fact.label} className="contents">
                <dt className="font-semibold">{fact.label}</dt>
                <dd className="text-muted">
                  {fact.label === 'Email' ? (
                    <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
