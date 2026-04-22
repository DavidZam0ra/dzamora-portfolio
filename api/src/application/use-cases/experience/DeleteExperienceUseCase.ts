import { IExperienceRepository } from '../../../domain/ports/repositories/IExperienceRepository';

export class DeleteExperienceUseCase {
  constructor(private readonly repo: IExperienceRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
