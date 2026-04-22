import { Skill } from '../../../domain/entities/Skill';
import { ISkillRepository } from '../../../domain/ports/repositories/ISkillRepository';

type CreateInput = Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>;

export class CreateSkillUseCase {
  constructor(private readonly repo: ISkillRepository) {}

  async execute(data: CreateInput): Promise<Skill> {
    return this.repo.create(data);
  }
}
