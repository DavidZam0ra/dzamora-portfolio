import { Profile } from '../../../domain/entities/Profile';
import { IProfileRepository } from '../../../domain/ports/repositories/IProfileRepository';

export class GetProfileUseCase {
  constructor(private readonly repo: IProfileRepository) {}

  async execute(): Promise<Profile | null> {
    return this.repo.findOne();
  }
}
