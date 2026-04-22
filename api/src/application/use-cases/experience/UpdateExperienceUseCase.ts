import { Experience } from '../../../domain/entities/Experience';
import { IExperienceRepository } from '../../../domain/ports/repositories/IExperienceRepository';

export class UpdateExperienceUseCase {
  constructor(private readonly repo: IExperienceRepository) {}

  async execute(id: string, data: Partial<Experience>): Promise<Experience | null> {
    return this.repo.update(id, data);
  }
}
