import { Project, SkillItem, Experience, Education, Certification, LanguageFluency } from '../types';

export const personalInfo = {
  name: 'KAILASH R',
  shortName: 'Kailash',
  title: 'Aspiring Data Analyst & Software Developer',
  tagline: 'Transforming complex data into actionable business intelligence, predictive models, and high-impact digital systems.',
  location: 'Tamil Nadu, India',
  phone: '+91 93443 64462',
  email: 'kailashrangasamy7@gmail.com',
  linkedin: 'https://linkedin.com/in/kailash-r',
  linkedinDisplay: 'linkedin.com/in/kailash-r',
  github: 'https://github.com/kailashr',
  githubDisplay: 'github.com/kailashr',
  summary: `Excited to become a Data Analyst with a solid background in Excel, SQL, Python and data visualization. Experienced with data cleaning, data analysis, reporting, and problem solving, with foundational knowledge of business intelligence and data-driven decision making. Skilled in working with structured data, uncovering trends, spotting patterns, and crafting reports and dashboards. Actively practicing skills in practical data analytics projects and continually enhancing technical and analytical capabilities to deliver measurable value.`,
  availability: 'Open to Data Analyst & Software Developer Opportunities',
};

export const educationList: Education[] = [
  {
    institution: 'Nandha College of Technology',
    degree: 'Bachelor of Technology in Information Technology',
    location: 'Erode, Tamil Nadu',
    period: '2023 – 2027',
    score: 'CGPA: 7.33 / 10',
    highlights: [
      'Focus on Data Structures & Algorithms, DBMS, Operating Systems, and Object-Oriented Programming',
      'Actively leading peer coding sessions and data analytics workshop groups',
    ],
  },
  {
    institution: 'Higher Secondary Certificate (HSC)',
    degree: 'Class XII (Science / Math stream)',
    location: 'Dharmapuri, Tamil Nadu',
    period: 'Completed May 2023',
    score: 'Score: 79.5%',
    highlights: [
      'Strong academic foundation in Mathematics, Physics, and Computer Science',
    ],
  },
];

export const experienceList: Experience[] = [
  {
    role: 'Java Intern',
    company: 'Creascent Infotech',
    location: 'Erode, Tamil Nadu',
    period: 'June 2025',
    type: 'Internship',
    bullets: [
      'Learned Core Java programming and fundamental Object-Oriented Programming (OOP) concepts in an industrial software setting.',
      'Architected and developed modular Java console-based applications implementing business logic and CRUD operations.',
      'Practiced rigorous debugging techniques, code refactoring, and structured algorithmic problem solving.',
    ],
    skillsGained: ['Java Core', 'OOP Design Patterns', 'Debugging & Profiling', 'Console Architectures', 'Clean Code'],
  },
];

export const technicalSkills: SkillItem[] = [
  // Programming & Analytics
  { name: 'Python', level: 90, category: 'languages', iconName: 'Terminal', description: 'Pandas, NumPy, data manipulation, NLP pipelines, and scripting' },
  { name: 'SQL', level: 88, category: 'languages', iconName: 'Database', description: 'Complex joins, aggregate queries, schema design, and relational queries' },
  { name: 'Java', level: 85, category: 'languages', iconName: 'Coffee', description: 'Core Java, OOP principles, console applications, algorithmic problem solving' },
  { name: 'Microsoft Excel', level: 92, category: 'languages', iconName: 'Sheet', description: 'Advanced formulas, pivot tables, VLOOKUP/XLOOKUP, data cleaning & modeling' },
  { name: 'PowerBI', level: 86, category: 'languages', iconName: 'BarChart2', description: 'Interactive dashboard creation, KPI cards, DAX queries & business reporting' },
  
  // Core Subjects
  { name: 'Data Structures & Algorithms', level: 84, category: 'core', iconName: 'Cpu', description: 'Arrays, linked lists, trees, graphs, sorting, and algorithmic efficiency' },
  { name: 'Object-Oriented Programming', level: 88, category: 'core', iconName: 'Layers', description: 'Encapsulation, inheritance, polymorphism, and clean modular class design' },
  { name: 'DBMS', level: 86, category: 'core', iconName: 'Server', description: 'Relational data modeling, ACID transactions, normalization, and indexing' },
  { name: 'Operating Systems', level: 80, category: 'core', iconName: 'HardDrive', description: 'Process scheduling, memory management, file systems, and concurrency' },

  // Testing & Quality Assurance
  { name: 'Selenium (Basic)', level: 75, category: 'testing', iconName: 'CheckSquare', description: 'Automated browser testing, DOM element locators, and test scripts' },
  { name: 'Automation Testing', level: 78, category: 'testing', iconName: 'ShieldCheck', description: 'Test scenario modeling, regression testing, and verification suites' },

  // Tools & Platforms
  { name: 'Git & GitHub', level: 88, category: 'tools', iconName: 'GitBranch', description: 'Version control, branch management, pull requests, and collaborative coding' },
  { name: 'VS Code', level: 92, category: 'tools', iconName: 'Code', description: 'Primary development environment with custom linting and extensions' },
  { name: 'Eclipse & IntelliJ IDEA', level: 85, category: 'tools', iconName: 'Box', description: 'Enterprise Java development, debugging, and project structuring' },
  { name: 'Figma', level: 82, category: 'tools', iconName: 'Figma', description: 'UI/UX wireframing, interactive prototyping, and user-centric interface design' },
];

export const projectsList: Project[] = [
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis Using Text',
    category: 'NLP & Data Analytics',
    tags: ['Python', 'NLP', 'Data Preprocessing', 'Tokenization', 'Classification'],
    description: 'Developed an end-to-end NLP-based sentiment analysis model to classify unstructured text into Positive, Negative, and Neutral categories with high statistical accuracy.',
    highlights: [
      'Engineered text preprocessing pipelines including lowercasing, regex cleaning, punctuation removal, and stop-word filtering.',
      'Implemented tokenization and vocabulary vectorization to calculate sentiment polarity scores.',
      'Designed visual sentiment distribution charts displaying polarity confidence across dataset inputs.',
    ],
    techStack: ['Python', 'NLTK / RegEx', 'Pandas', 'Data Cleaning', 'Data Visualization'],
    metrics: '94% Classification Precision across test batches',
    githubUrl: 'https://github.com/kailashr',
    hasInteractiveDemo: true,
    demoType: 'nlp',
    imageUrl: '/project_nlp.jpg',
  },
  {
    id: 'smart-visitor-alert',
    title: 'Smart Visitor Alert System',
    category: 'IoT & Computer Vision',
    tags: ['ESP32-CAM', 'IoT', 'Embedded Systems', 'Real-time Alerts', 'Hardware Integration'],
    description: 'Engineered an intelligent IoT-based visitor surveillance and alert system that detects presence, captures high-resolution visitor snapshots, and broadcasts instant security alerts.',
    highlights: [
      'Programmed ESP32-CAM micro-controller with optimized frame buffering for low-latency image capture.',
      'Configured automated push notifications over Wi-Fi / webhook protocols for instant incident logging.',
      'Implemented low-power idle sleep modes to preserve continuous operational uptime.',
    ],
    techStack: ['ESP32-CAM', 'Embedded C/C++', 'IoT Protocols', 'Wi-Fi / Webhooks', 'Hardware'],
    metrics: '< 1.8s Snapshot-to-Notification latency',
    githubUrl: 'https://github.com/kailashr',
    hasInteractiveDemo: true,
    demoType: 'iot',
    imageUrl: '/smart_visitor_alert.jpg',
  },
  {
    id: 'smart-education-bpl',
    title: 'Smart Education for BPL Communities',
    category: 'AI & Social Impact UI/UX',
    tags: ['AI Assisted', 'UI/UX Design', 'Offline Accessibility', 'Bilingual', 'Figma'],
    description: 'Designed an AI-assisted bilingual learning platform with offline accessibility to democratize quality educational resources for rural and economically disadvantaged students.',
    highlights: [
      'Constructed dual-language architecture supporting seamless real-time switching between Tamil and English.',
      'Formulated an offline-first caching mechanism enabling access to curriculum modules in zero-internet zones.',
      'Created intuitive, high-contrast, low-cognitive-load UI prototypes tested for first-generation learners.',
    ],
    techStack: ['AI Assistance', 'Figma', 'UI/UX Research', 'Offline Storage', 'Tamil & English Support'],
    metrics: 'Optimized for 2G / Zero-Bandwidth Rural Environments',
    githubUrl: 'https://github.com/kailashr',
    hasInteractiveDemo: true,
    demoType: 'edu',
    imageUrl: '/smart_education_bpl.jpg',
  },
];

export const certificationsList: Certification[] = [
  {
    title: 'Programming in Java',
    issuer: 'NPTEL (IIT Kharagpur)',
    highlight: 'Elite + Gold Certification',
    type: 'elite',
  },
  {
    title: 'Machine Learning Workshop',
    issuer: 'Indian Institute of Technology (IIT) Madras',
    highlight: 'Hands-on ML & Statistical Modeling',
    type: 'workshop',
  },
  {
    title: 'Ignite Bootcamp',
    issuer: 'Ignite Tech Academy',
    highlight: 'Accelerated Problem Solving & Software Dev',
    type: 'bootcamp',
  },
];

export const languagesList: LanguageFluency[] = [
  { language: 'Tamil', proficiency: 'Native / Mother Tongue', percentage: 100 },
  { language: 'English', proficiency: 'Professional Working Proficiency', percentage: 90 },
  { language: 'Kannada', proficiency: 'Conversational Proficiency', percentage: 70 },
  { language: 'Telugu', proficiency: 'Conversational Proficiency', percentage: 70 },
];
