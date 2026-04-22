import { Experience } from '../../../domain/entities/Experience';
import { IExperienceRepository } from '../../../domain/ports/repositories/IExperienceRepository';

export class GetExperienceUseCase {
  constructor(private readonly repo: IExperienceRepository) {}

  async execute(): Promise<Experience[]> {
    return this.repo.findAll();
  }
}
