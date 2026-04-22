import { Project } from '../../../domain/entities/Project';
import { IProjectRepository } from '../../../domain/ports/repositories/IProjectRepository';

type CreateInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

export class CreateProjectUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(data: CreateInput): Promise<Project> {
    return this.repo.create(data);
  }
}
