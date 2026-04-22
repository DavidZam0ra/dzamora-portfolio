import { Project } from '../../../domain/entities/Project';
import { IProjectRepository } from '../../../domain/ports/repositories/IProjectRepository';

export class GetProjectsUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.repo.findAll();
  }
}
