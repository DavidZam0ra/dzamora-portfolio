import { Skill } from '../../../domain/entities/Skill';
import { ISkillRepository } from '../../../domain/ports/repositories/ISkillRepository';

export class UpdateSkillUseCase {
  constructor(private readonly repo: ISkillRepository) {}

  async execute(id: string, data: Partial<Skill>): Promise<Skill | null> {
    return this.repo.update(id, data);
  }
}
