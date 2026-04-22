import { Skill } from '../../entities/Skill';

export interface ISkillRepository {
  findAll(): Promise<Skill[]>;
  findById(id: string): Promise<Skill | null>;
  create(data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Skill>;
  update(id: string, data: Partial<Skill>): Promise<Skill | null>;
  delete(id: string): Promise<boolean>;
}
