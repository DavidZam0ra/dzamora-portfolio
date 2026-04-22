import { IEducationRepository } from '../../../domain/ports/repositories/IEducationRepository';

export class DeleteEducationUseCase {
  constructor(private readonly repo: IEducationRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
