import { Education } from '../../../domain/entities/Education';
import { IEducationRepository } from '../../../domain/ports/repositories/IEducationRepository';

type CreateInput = Omit<Education, 'id' | 'createdAt' | 'updatedAt'>;

export class CreateEducationUseCase {
  constructor(private readonly repo: IEducationRepository) {}

  async execute(data: CreateInput): Promise<Education> {
    return this.repo.create(data);
  }
}
