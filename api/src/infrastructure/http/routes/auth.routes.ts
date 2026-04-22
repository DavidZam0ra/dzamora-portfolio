import { Router } from 'express';
import {
  loginHandler,
  getMeHandler,
  googleAuthHandler,
  googleCallbackHandler,
} from '../controllers/auth.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router.post('/login',           loginHandler);
router.get('/me',               verifyJWT, getMeHandler);
router.get('/google',           googleAuthHandler);
router.get('/google/callback',  googleCallbackHandler);

export default router;
