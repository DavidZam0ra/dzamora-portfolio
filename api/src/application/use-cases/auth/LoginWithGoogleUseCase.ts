import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/ports/repositories/IUserRepository';
import { IAuthService } from '../../../domain/ports/services/IAuthService';

export interface GoogleUserInfo {
  googleId: string;
  email: string;
  displayName: string;
}

export interface GoogleLoginOutput {
  token: string;
  expiresIn: string;
  isNewUser: boolean;
}

export class LoginWithGoogleUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly authService: IAuthService,
    private readonly allowedEmail: string,
  ) {}

  async execute(info: GoogleUserInfo): Promise<GoogleLoginOutput> {
    if (info.email !== this.allowedEmail) {
      throw Object.assign(
        new Error(`Email ${info.email} not authorized for admin access`),
        { statusCode: 403 }
      );
    }

    let user: User | null;
    let isNewUser = false;

    // 1. Try to find by Google ID
    user = await this.userRepo.findByGoogleId(info.googleId);

    if (!user) {
      // 2. Try to find by email (pre-existing password user)
      user = await this.userRepo.findByEmail(info.email);

      if (user) {
        // Link Google ID to existing user
        await this.userRepo.linkGoogleId(user.id!, info.googleId, info.displayName);
      } else {
        // 3. Create new Google-only user
        user = await this.userRepo.create({
          email: info.email,
          passwordHash: '',
          googleId: info.googleId,
          displayName: info.displayName,
        });
        isNewUser = true;
      }
    }

    const token = this.authService.signToken({ userId: user.id! });
    return { token, expiresIn: '7d', isNewUser };
  }
}
