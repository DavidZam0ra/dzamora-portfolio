import { Project } from '../../../domain/entities/Project';
import { IProjectRepository } from '../../../domain/ports/repositories/IProjectRepository';

export class UpdateProjectUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(id: string, data: Partial<Project>): Promise<Project | null> {
    return this.repo.update(id, data);
  }
}
