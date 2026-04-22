import { Education } from '../../../domain/entities/Education';
import { IEducationRepository } from '../../../domain/ports/repositories/IEducationRepository';

export class UpdateEducationUseCase {
  constructor(private readonly repo: IEducationRepository) {}

  async execute(id: string, data: Partial<Education>): Promise<Education | null> {
    return this.repo.update(id, data);
  }
}
