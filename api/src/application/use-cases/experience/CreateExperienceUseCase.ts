import { Experience } from '../../../domain/entities/Experience';
import { IExperienceRepository } from '../../../domain/ports/repositories/IExperienceRepository';

type CreateInput = Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>;

export class CreateExperienceUseCase {
  constructor(private readonly repo: IExperienceRepository) {}

  async execute(data: CreateInput): Promise<Experience> {
    return this.repo.create(data);
  }
}
