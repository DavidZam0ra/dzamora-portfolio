import { Profile } from '../../../domain/entities/Profile';
import { IProfileRepository } from '../../../domain/ports/repositories/IProfileRepository';

export class UpdateProfileUseCase {
  constructor(private readonly repo: IProfileRepository) {}

  async execute(data: Partial<Profile>): Promise<Profile> {
    return this.repo.upsert(data);
  }
}
