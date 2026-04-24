export const personalInfo = {
  name: "Usama Ben Mahmud",
  title: "Mathematics Major | Web Developer | Management Trainee",
  address: "Savar, Dhaka",
  phone: "01620485218",
  email: "usamabenmahmud@gmail.com",
  github: "https://github.com/UsamaBenMahmud",
  linkedin: "https://www.linkedin.com/in/usama-ben-mahmud/",
  facebook: "https://www.facebook.com/usamabenmahmud5",
  summary:
    "Analytical Mathematics major with hands-on experience in web development. Proficient in building and styling applications using Python, JavaScript, HTML, and CSS. Highly communicative, with proven teamwork skills from active leadership in programming and math clubs. Seeking to leverage a unique blend of mathematical reasoning and practical coding skills to contribute to a high-performing development team.",
};

export const education = [
  {
    degree: "Bachelor of Mathematics",
    institution: "Jashore University of Science and Technology",
    period: "Jan 2023 – Jan 2027",
    description: "Pursuing a degree in Mathematics with focus on analytical reasoning and problem-solving.",
  },
  {
    degree: "Higher Secondary School Certificate (Science)",
    institution: "Milestone College",
    period: "May 2018 – Aug 2020",
    description: "Science background with strong foundation in mathematics and physics.",
  },
];

export const skills = {
  programming: ["Python", "JavaScript", "C"],
  webDev: ["HTML5", "CSS3", "JavaScript (ES6+)", "React"],
  databases: ["SQL", "PostgreSQL", "MySQL"],
  tools: ["Git", "GitHub", "VS Code", "Chrome DevTools"],
  academic: ["MATLAB", "LaTeX", "Microsoft Office Suite"],
};

export const experience = [
  {
    role: "Management Trainee",
    org: "YSSE (Youth School for Social Entrepreneurs)",
    period: "Mar 2026 – Present",
    points: [
      "Stepped beyond comfort zone as a Mathematics student and web developer, growing in communication, teamwork, and confidence.",
      "Participated in the YSSE Self-Branding Competition 2026, building and presenting a personal portfolio.",
      "Supporting organizational operations and learning practical management skills in a supportive environment.",
    ],
  },
  {
    role: "Secretary",
    org: "Rotaract Club of JUST",
    period: "Mar 2025 – Present",
    points: [
      "Managing official documentation, communications, and event coordination for the club.",
      "Leading organizational initiatives and fostering community engagement among members.",
    ],
  },
  {
    role: "Co-Founder",
    org: "Assaraab (E-commerce Platform)",
    period: "2024 – Present",
    points: [
      "Co-founded an e-commerce platform, handling strategy, development, and business operations.",
      "Building a digital marketplace with focus on user experience and scalability.",
    ],
  },
  {
    role: "Assistant General Secretary",
    org: "Math Club, Jashore University",
    period: "May 2024 – Mar 2026",
    points: [
      "Assisted in managing official documentation, including meeting minutes, member databases, and event reports.",
      "Coordinated internal club communications, responsible for meeting agendas, event announcements, and newsletters.",
    ],
  },
  {
    role: "Assistant Treasurer",
    org: "Rotaract Club",
    period: "Dec 2024 – Oct 2025",
    points: [
      "Assisted in managing club finances, including collection of member dues and project funds.",
      "Maintained accurate financial records, preparing reports on income, expenses, and budget adherence.",
    ],
  },
  {
    role: "ICT Instructor",
    org: "Idea Coaching Center",
    period: "Feb 2023 – Dec 2024",
    points: [
      "Delivered engaging lectures covering the complete HSC ICT syllabus, including Number Systems, Digital Devices, HTML, C Programming, and Database Management.",
      "Simplified complex logical concepts such as Boolean algebra, logic gates, and adders/registers for students.",
    ],
  },
];

export const achievements = [
  {
    title: "Best Speaker — Debate Competition 2026",
    icon: "🏆",
    org: "YSSE",
  },
  {
    title: "Centre of Attention — YSSE Events (Dec 2025 & Feb 2026)",
    icon: "⭐",
    org: "YSSE",
  },
  {
    title: "Champion, Badminton (Intra-Department)",
    icon: "🥇",
    org: "JUST",
    year: "2024",
  },
  {
    title: "Silver Medalist, Intra University 100m Sprint",
    icon: "🥈",
    org: "JUST",
    year: "2023 & 2024",
  },
  {
    title: "Active Participant, 1st National Conference",
    icon: "📋",
    org: "Department of Mathematics",
  },
];

export const certificates = [
  {
    title: "Centre of Attention — YSSE Events",
    issuer: "YSSE",
    date: "December 2025",
    description: "Recognized for outstanding engagement and participation at YSSE events.",
  },
  {
    title: "Centre of Attention — YSSE Events",
    issuer: "YSSE",
    date: "February 2026",
    description: "Recognized for outstanding engagement and participation at YSSE events.",
  },
  {
    title: "Futurenation Volunteer",
    issuer: "Futurenation",
    date: "2024",
    description: "Volunteered for community development and youth empowerment programs.",
  },
  {
    title: "Digital Marketing",
    issuer: "Futurenation",
    date: "2024",
    description: "Completed Digital Marketing certification program.",
  },
  {
    title: "Office Application",
    issuer: "TTC-Dhaka",
    date: "2024",
    description: "Professional certification in Office Applications.",
  },
  {
    title: "Yes Member",
    issuer: "Transparency International Bangladesh",
    date: "2024",
    description: "Active YES member promoting integrity and anti-corruption values.",
  },
];

export const ysseJourney = {
  title: "My Journey with YSSE",
  role: "Operations Intern → Management Trainee",
  org: "Youth School for Social Entrepreneurs (YSSE)",
  content: `This journey has been one of the most transformative experiences of my student life. At YSSE, I stepped beyond my comfort zone as a Mathematics student and web developer, growing in communication, teamwork, and confidence. The supportive environment and practical learning sessions helped me evolve both personally and professionally.

I also participated in the YSSE Self-Branding Competition 2026, where I built and presented my personal portfolio—learning how to express my vision and value with clarity.`,
  achievements: [
    "Best Speaker — Debate Competition 2026",
    "Centre of Attention — YSSE Events (Dec 2025 & Feb 2026)",
  ],
};

export const languages = [
  { name: "Bangla", level: "Native" },
  { name: "English", level: "Proficient" },
];

export interface GitHubProject {
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
}
