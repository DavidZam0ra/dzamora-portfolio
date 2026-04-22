import { Education } from '../../../domain/entities/Education';
import { IEducationRepository } from '../../../domain/ports/repositories/IEducationRepository';

export class GetEducationUseCase {
  constructor(private readonly repo: IEducationRepository) {}

  async execute(): Promise<Education[]> {
    return this.repo.findAll();
  }
}
