import { IProjectRepository } from '../../../domain/ports/repositories/IProjectRepository';

export class DeleteProjectUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
