export type ExperienceEntry = {
  title: string;
  company: string;
  location?: string;
  mode?: 'Remote' | 'On-site';
  start: string;
  end: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Acquia',
    location: 'Pune, Maharashtra, India',
    mode: 'Remote',
    start: 'Jan 2025',
    end: 'Present',
    bullets: [
      'Build and maintain a shared React component library used across multiple products, covering complex components such as data tables, trees, dialogs and date pickers, with consistent theming, accessibility and test coverage.',
      'Write component specs before the code, so the components stay consistent in API and behaviour.',
      'Design and build backend microservices on PHP and Symfony, including REST APIs, event-driven integrations, error tracking and CI/CD pipelines.',
      'Led the retirement of a legacy platform by moving its data and workflows to modern services, with migration commands and cleanup tooling.',
      'Improved CI quality with pre-commit checks and more reliable end-to-end tests, and reviewed code across several teams.',
      'Work daily with AI-assisted, spec-driven development.',
      'Skills/Framework: React, TypeScript, Angular, NX, Storybook, Design Systems, Accessibility, PHP, Symfony, REST APIs, Event-driven Architecture, Microservices, Legacy Migration, CI/CD, Test Automation, AI-assisted Development.',
    ],
  },
  {
    title: 'Software Engineer II',
    company: 'Blackhawk Network',
    location: 'Bengaluru, Karnataka, India',
    mode: 'Remote',
    start: 'Jan 2023',
    end: 'Jan 2025',
    bullets: [
      'Primary focus on the research, development, and implementation of features, user stories, and KTLO (Keep The Lights On) of Products.',
      'Engaged in the development of full-stack applications, overseeing multiple repositories to build and enhance two core products tailored to assist users in their daily activities.',
      'Skills/Framework: Zend, PHP, Angular, MySQL, Vanilla JavaScript, Agile, AWS, PHPUnit, Karma Test, Behat Test.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'BiztechCS',
    location: 'Ahmedabad, Gujarat, India',
    mode: 'On-site',
    start: 'Apr 2020',
    end: 'Dec 2022',
    bullets: [
      'Engaged in a large-scale project with a team comprising more than 15 members. Adhering to the Agile Software Development Process, including regular code review practices.',
      'Overseeing a team of three members, inclusive of myself, and providing guidance to interns.',
      'Played a key role as a backend developer in a water waste management project with a growing global reach.',
      'Authored unit test cases using PHPUnit from scratch and successfully covered over 50% of critical business features.',
      'Followed agile workflow for the project. Used AWS to host web apps and automate deployments using Jenkins CI-CD.',
      'Skills/Framework: CakePHP, PHP, MySQL, JQuery, Agile Methodologies, AWS, PHPUnit.',
    ],
  },
  {
    title: 'Software Engineer - PHP',
    company: 'BiztechCS',
    location: 'Ahmedabad, Gujarat, India',
    mode: 'On-site',
    start: 'Jan 2019',
    end: 'Apr 2020',
    bullets: [
      'Continuing my professional journey to acquire expertise in a new framework - CakePHP.',
      'Opportunity to learn and apply Agile Software Development processes.',
      'Developed and delivered crucial features for a water waste management project, incorporating effective solutions.',
      'Skills/Framework: CakePHP, PHP, MySQL, Git, JQuery.',
    ],
  },
  {
    title: 'PHP Developer',
    company: 'Hyperlink Infosystem',
    location: 'Ahmedabad, Gujarat, India',
    mode: 'On-site',
    start: 'Nov 2017',
    end: 'Oct 2018',
    bullets: [
      'Commenced my professional journey after completing an internship with PHP technology & CodeIgniter Framework.',
      'Developed an Admin Panel and REST APIs from the ground up for a Taxi App, a Book Language Translator, and a Point-Based Referral System.',
      'Conducted research and implemented solutions using Socket.io, gaining hands-on experience with Node.js for a brief period.',
      'Designed, developed, and successfully delivered more than six projects.',
      'Skills/Framework: CodeIgniter, PHP, MySQL, JQuery, HTML, CSS.',
    ],
  },
  {
    title: 'Android and PHP Developer - Internship',
    company: 'AS Services',
    location: 'Bhavnagar, Gujarat, India',
    mode: 'On-site',
    start: 'Dec 2016',
    end: 'Oct 2017',
    bullets: [
      'Started a journey as a trainee at AS Services.',
      'Throughout the training period, acquired proficiency in Advanced PHP and grasped MVC concepts.',
      'Developed a web application and Android app for shop owners, providing them with a tool to efficiently manage data related to job form applicants.',
      'Skills/Framework: PHP, MySQL, JavaScript, HTML, CSS, Android - Java.',
    ],
  },
];
