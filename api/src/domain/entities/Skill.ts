export type SkillCategory = 'Backend' | 'Frontend' | 'Database' | 'DevOps' | 'AI' | 'Testing';
export type SkillLevel = 'expert' | 'advanced' | 'intermediate';

export interface Skill {
  id?: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}
