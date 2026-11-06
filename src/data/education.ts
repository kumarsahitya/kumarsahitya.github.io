export type EducationEntry = {
  degree: string;
  institution: string;
  start: string;
  end: string;
  note?: string;
};

export const education: EducationEntry[] = [
  {
    degree: 'Master Degree of Computer Application',
    institution: 'M.K. Bhavnagar University',
    start: '2015',
    end: '2017',
    note: 'My expertise lies in the development of web applications, complemented by a solid foundation in database fundamentals and proficiency in JQuery.',
  },
  {
    degree: 'Bachelor Degree of Computer Application',
    institution: 'M.K. Bhavnagar University (SSCCS Gurukul)',
    start: '2012',
    end: '2015',
    note: 'My expertise lies in PHP, Java, and the application of Object-Oriented Programming (OOP) concepts.',
  },
  {
    degree: 'Higher Secondary School Education',
    institution: 'Shri Vishuddhananda Vidya mandir High school',
    start: '2010',
    end: '2012',
    note: 'The expertise area was in Commerce with Statistics as a key strength.',
  },
  {
    degree: 'Secondary School Education',
    institution: 'Shri Daxinamurti Gijubhai Vinay Mandir',
    start: '2009',
    end: '2010',
    note: 'Without any hopes or defined goals, I simply found solace in expressing my thoughts on mathematics, science, and technology subjects.',
  },
];
