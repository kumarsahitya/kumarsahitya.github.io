import { profile } from './profile';
import { skills } from './skills';
import { experience } from './experience';
import { education } from './education';
import { services } from './services';

test('profile has exactly the three approved socials and three roles', () => {
  expect(profile.roles).toEqual(['Senior Software Engineer', 'Full-Stack Developer', 'Freelancer']);
  expect(profile.socials.map(s => s.href).sort()).toEqual([
    'https://github.com/kumarsahitya',
    'https://in.linkedin.com/in/kumar-sahitya',
    'mailto:ksahitya27@gmail.com',
  ].sort());
});

test('no dropped links or template residue anywhere in the data', () => {
  const blob = JSON.stringify({ profile, experience, education, services, skills: skills.map(s => s.name) });
  for (const banned of ['instagram', 'blogspot', 'Happy Clients', 'Lorem', 'App 1', 'Ceo & Founder']) {
    expect(blob).not.toContain(banned);
  }
});

test('experience has six entries newest first with the correct employers', () => {
  expect(experience).toHaveLength(6);
  expect(experience.map(e => e.company)).toEqual([
    'Acquia', 'Blackhawk Network', 'BiztechCS', 'BiztechCS', 'Hyperlink Infosystem', 'AS Services',
  ]);
  expect(experience[0].end).toBe('Present');
});

test('education has four entries and services six, skills eighteen', () => {
  expect(education).toHaveLength(4);
  expect(services).toHaveLength(6);
  expect(skills).toHaveLength(18);
  expect(skills[0].name).toBe('React');
});
