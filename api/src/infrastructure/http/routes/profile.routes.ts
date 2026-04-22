import { Router } from 'express';
import { getProfileHandler, updateProfileHandler } from '../controllers/profile.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getProfileHandler);
router.put('/', verifyJWT, updateProfileHandler);

export default router;
