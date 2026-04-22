import { IUserRepository } from '../../../domain/ports/repositories/IUserRepository';
import { IAuthService } from '../../../domain/ports/services/IAuthService';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  token: string;
  expiresIn: string;
}

export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly authService: IAuthService,
  ) {}

  async execute({ email, password }: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });

    const valid = await this.authService.comparePassword(password, user.passwordHash);
    if (!valid) throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });

    const token = this.authService.signToken({ userId: user.id! });
    return { token, expiresIn: '7d' };
  }
}
