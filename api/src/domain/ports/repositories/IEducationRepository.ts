import { Education } from '../../entities/Education';

export interface IEducationRepository {
  findAll(): Promise<Education[]>;
  findById(id: string): Promise<Education | null>;
  create(data: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>): Promise<Education>;
  update(id: string, data: Partial<Education>): Promise<Education | null>;
  delete(id: string): Promise<boolean>;
}
