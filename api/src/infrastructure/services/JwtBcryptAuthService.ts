import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IAuthService, TokenPayload } from '../../domain/ports/services/IAuthService';

const SALT_ROUNDS = 12;

export class JwtBcryptAuthService implements IAuthService {
  private readonly secret: string;

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not defined in environment');
    this.secret = secret;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  signToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: '7d' });
  }

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, this.secret) as TokenPayload;
  }
}
