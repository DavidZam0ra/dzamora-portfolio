import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/ports/repositories/IUserRepository';

export class GetMeUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.userRepo.findById(userId);
    if (!user) return null;
    const { passwordHash: _omit, ...safeUser } = user;
    return safeUser;
  }
}
