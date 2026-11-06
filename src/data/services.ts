import type { IconType } from 'react-icons';
import { LuArrowRightLeft, LuBlocks, LuDatabase, LuGlobe, LuLightbulb, LuServer } from 'react-icons/lu';

export type Service = { title: string; description: string; icon: IconType };

export const services: Service[] = [
  {
    title: 'Web App Development',
    description: 'Planned, developed, and deployed a web application.',
    icon: LuGlobe,
  },
  {
    title: 'Solution',
    description: 'Provided guidance, recommended solutions, and resolved project issues.',
    icon: LuLightbulb,
  },
  {
    title: 'Database',
    description: 'Developed the database structure for a small to mid-scale project.',
    icon: LuDatabase,
  },
  {
    title: 'Component Libraries',
    description: 'Built reusable, accessible React and Angular components with consistent theming.',
    icon: LuBlocks,
  },
  {
    title: 'APIs and Microservices',
    description: 'Designed REST APIs and event-driven services with PHP and Symfony.',
    icon: LuServer,
  },
  {
    title: 'Legacy Migration',
    description: 'Moved legacy systems and data to modern services with safe migration tooling.',
    icon: LuArrowRightLeft,
  },
];
