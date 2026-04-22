import { Experience } from '../../entities/Experience';

export interface IExperienceRepository {
  findAll(): Promise<Experience[]>;
  findById(id: string): Promise<Experience | null>;
  create(data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<Experience>;
  update(id: string, data: Partial<Experience>): Promise<Experience | null>;
  delete(id: string): Promise<boolean>;
}
