import { ISkillRepository } from '../../../domain/ports/repositories/ISkillRepository';

export class DeleteSkillUseCase {
  constructor(private readonly repo: ISkillRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
