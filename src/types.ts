export type ThemeMode = 'cyber-cyan' | 'deep-amethyst' | 'matrix-emerald' | 'solar-amber';

export type SceneMode = 'cyber-wave' | 'cosmic-vortex' | 'neural-globe' | 'warp-tunnel' | 'floating-crystals';

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  highlights: string[];
  techStack: string[];
  metrics?: string;
  githubUrl?: string;
  hasInteractiveDemo: boolean;
  demoType: 'nlp' | 'iot' | 'edu';
  imageUrl?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 1 to 100
  category: 'languages' | 'core' | 'testing' | 'tools';
  iconName: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
  skillsGained: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  score: string;
  highlights?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  highlight?: string;
  type: 'elite' | 'workshop' | 'bootcamp';
}

export interface LanguageFluency {
  language: string;
  proficiency: string;
  percentage: number;
}
