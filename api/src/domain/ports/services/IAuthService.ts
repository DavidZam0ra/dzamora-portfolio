export interface TokenPayload {
  userId: string;
}

export interface IAuthService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  signToken(payload: TokenPayload): string;
  verifyToken(token: string): TokenPayload;
}
