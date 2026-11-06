import type { IconType } from 'react-icons';
import {
  SiAngular,
  SiCakephp,
  SiCodeigniter,
  SiCss,
  SiDocker,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiLaravel,
  SiPhp,
  SiReact,
  SiStorybook,
  SiSymfony,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { LuBot, LuPalette, LuRefreshCw } from 'react-icons/lu';

export type Skill = { name: string; icon: IconType };

export const skills: Skill[] = [
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Angular', icon: SiAngular },
  { name: 'PHP8', icon: SiPhp },
  { name: 'Symfony', icon: SiSymfony },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'HTML5', icon: SiHtml5 },
  { name: 'CSS', icon: SiCss },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Storybook', icon: SiStorybook },
  { name: 'Design Systems', icon: LuPalette },
  { name: 'Docker', icon: SiDocker },
  { name: 'AI-Assisted Dev', icon: LuBot },
  { name: 'Agile', icon: LuRefreshCw },
  { name: 'JQuery', icon: SiJquery },
  { name: 'Laravel', icon: SiLaravel },
  { name: 'CakePHP', icon: SiCakephp },
  { name: 'CodeIgniter', icon: SiCodeigniter },
];

export const skillsIntro =
  'I work across the full stack, from React and Angular component libraries to PHP and Symfony services. These are the technologies I use most today, along with the ones I worked with earlier in my career.';
