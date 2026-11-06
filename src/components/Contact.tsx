import { LuMail } from 'react-icons/lu';
import { profile } from '../data/profile';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { SocialLinks } from './SocialLinks';

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <Reveal>
        <p className="text-lg text-muted max-w-xl">{profile.contactLine}</p>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-colors hover:opacity-90 mt-6"
        >
          <LuMail aria-hidden="true" />
          Email me
        </a>
        <div className="mt-8">
          <SocialLinks />
        </div>
      </Reveal>
    </Section>
  );
}
