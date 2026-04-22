import { Project } from '../../entities/Project';

export interface IProjectRepository {
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  create(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  update(id: string, data: Partial<Project>): Promise<Project | null>;
  delete(id: string): Promise<boolean>;
}
