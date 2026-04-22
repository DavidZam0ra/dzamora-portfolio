export type SkillCategory = 'Backend' | 'Frontend' | 'Database' | 'DevOps' | 'AI' | 'Testing';
export type SkillLevel = 'expert' | 'advanced' | 'intermediate';

export interface Skill {
  id?: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  order: number;
}

export interface Profile {
  id?: string;
  name: string;
  role: string;
  focus: string;
  location: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  avatarUrl?: string;
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
  order: number;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
  order: number;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}
