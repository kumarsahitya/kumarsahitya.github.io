export type Social = {
  label: string;
  href: string;
  icon: 'linkedin' | 'github' | 'email';
};

export const profile: {
  name: string;
  greeting: string;
  roles: string[];
  about: { heading: string; paragraphs: string[] };
  facts: { label: string; value: string }[];
  email: string;
  socials: Social[];
  contactLine: string;
} = {
  name: 'Kumar Sahitya',
  greeting: 'Hi there',
  roles: ['Senior Software Engineer', 'Full-Stack Developer', 'Freelancer'],
  about: {
    heading: 'Software Engineer.',
    paragraphs: [
      "Hi I'm Kumar Sahitya. I derive the greatest satisfaction from coding, especially when surrounded by a pleasant environment.",
      'Innovative Software Engineer with expertise in full-stack development. Dedicated to crafting efficient and scalable solutions. Proven ability to collaborate effectively within teams, meeting project objectives with precision and creativity.',
      'In addition to my professional pursuits, I have a keen interest in watching movies, exploring web series, and following cricket matches.',
    ],
  },
  facts: [
    { label: 'City', value: 'Ahmedabad, Gujarat, India' },
    { label: 'Degree', value: 'Master' },
    { label: 'Email', value: 'ksahitya27@gmail.com' },
    { label: 'Freelance', value: 'Available' },
  ],
  email: 'ksahitya27@gmail.com',
  socials: [
    { label: 'LinkedIn', href: 'https://in.linkedin.com/in/kumar-sahitya', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/kumarsahitya', icon: 'github' },
    { label: 'Email', href: 'mailto:ksahitya27@gmail.com', icon: 'email' },
  ],
  contactLine: 'Have a project or an idea in mind? I would be glad to hear about it.',
};
