import { Request, Response, NextFunction } from 'express';
import { LoginUseCase } from '../../../application/use-cases/auth/LoginUseCase';
import { GetMeUseCase } from '../../../application/use-cases/auth/GetMeUseCase';
import { LoginWithGoogleUseCase } from '../../../application/use-cases/auth/LoginWithGoogleUseCase';
import { MongoUserRepository } from '../../db/mongoose/repositories/MongoUserRepository';
import { JwtBcryptAuthService } from '../../services/JwtBcryptAuthService';
import { AuthRequest } from '../middleware/auth.middleware';

const userRepo    = new MongoUserRepository();
const authService = new JwtBcryptAuthService();

const loginUseCase  = new LoginUseCase(userRepo, authService);
const getMeUseCase  = new GetMeUseCase(userRepo);
const adminEmail = process.env.ADMIN_EMAIL;
if (!adminEmail) throw new Error('ADMIN_EMAIL must be set in environment');

const loginWithGoogle = new LoginWithGoogleUseCase(
  userRepo,
  authService,
  adminEmail
);

// ── Local email/password ──────────────────────────────────────────────────────

export async function loginHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      res.status(400).json({ error: 'email and password required' });
      return;
    }
    const result = await loginUseCase.execute({ email, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getMeHandler(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await getMeUseCase.execute(req.userId!);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

// ── Google OAuth ──────────────────────────────────────────────────────────────

export function googleAuthHandler(_req: Request, res: Response) {
  const clientId    = process.env.GOOGLE_CLIENT_ID;
  const callbackUrl = process.env.GOOGLE_CALLBACK_URL ?? 'http://localhost:3001/api/auth/google/callback';

  if (!clientId) {
    res.status(500).json({ error: 'Google OAuth not configured' });
    return;
  }

  const params = new URLSearchParams({
    client_id:     clientId,
    redirect_uri:  callbackUrl,
    response_type: 'code',
    scope:         'openid email profile',
    access_type:   'offline',
    prompt:        'select_account',
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}

export async function googleCallbackHandler(req: Request, res: Response) {
  const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
  const code        = req.query.code as string | undefined;
  const error       = req.query.error as string | undefined;

  if (error || !code) {
    res.redirect(`${frontendUrl}/admin/login?error=${error ?? 'oauth_cancelled'}`);
    return;
  }

  try {
    const clientId     = process.env.GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const callbackUrl  = process.env.GOOGLE_CALLBACK_URL ?? 'http://localhost:3001/api/auth/google/callback';

    // 1. Exchange code → tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id:     clientId,
        client_secret: clientSecret,
        redirect_uri:  callbackUrl,
        grant_type:    'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json() as { access_token?: string; error?: string };
    if (!tokenData.access_token) {
      throw new Error(tokenData.error ?? 'Failed to obtain access token');
    }

    // 2. Get Google user info
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userInfo = await userInfoRes.json() as {
      id: string;
      email: string;
      name: string;
      verified_email: boolean;
    };

    if (!userInfo.verified_email) {
      res.redirect(`${frontendUrl}/admin/login?error=email_not_verified`);
      return;
    }

    // 3. Use case: find/create user + sign JWT
    const { token } = await loginWithGoogle.execute({
      googleId:    userInfo.id,
      email:       userInfo.email,
      displayName: userInfo.name,
    });

    res.redirect(`${frontendUrl}/admin/dashboard?token=${token}`);
  } catch (err) {
    const message = err instanceof Error ? encodeURIComponent(err.message) : 'oauth_error';
    res.redirect(`${frontendUrl}/admin/login?error=${message}`);
  }
}
