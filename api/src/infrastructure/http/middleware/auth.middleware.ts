import { Request, Response, NextFunction } from 'express';
import { JwtBcryptAuthService } from '../../services/JwtBcryptAuthService';

export interface AuthRequest extends Request {
  userId?: string;
}

const authService = new JwtBcryptAuthService();

export function verifyJWT(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = authService.verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
