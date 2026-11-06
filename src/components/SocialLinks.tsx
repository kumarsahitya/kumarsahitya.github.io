import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { LuMail } from 'react-icons/lu';
import { profile, type Social } from '../data/profile';

const icons: Record<Social['icon'], IconType> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  email: LuMail,
};

const sizes = {
  md: { link: 'h-10 w-10', icon: 'h-5 w-5' },
  lg: { link: 'h-12 w-12', icon: 'h-6 w-6' },
};

export function SocialLinks({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const s = sizes[size];
  return (
    <ul className="flex items-center gap-3">
      {profile.socials.map(({ label, href, icon }) => {
        const Icon = icons[icon];
        const external = href.startsWith('http');
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`${s.link} inline-flex items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
            >
              <Icon className={s.icon} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
