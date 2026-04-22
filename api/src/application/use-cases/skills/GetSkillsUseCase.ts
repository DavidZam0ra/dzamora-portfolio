import { Skill } from '../../../domain/entities/Skill';
import { ISkillRepository } from '../../../domain/ports/repositories/ISkillRepository';

export class GetSkillsUseCase {
  constructor(private readonly repo: ISkillRepository) {}

  async execute(): Promise<Skill[]> {
    return this.repo.findAll();
  }
}
