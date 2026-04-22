import { Router } from 'express';
import {
  getExperienceHandler,
  createExperienceHandler,
  updateExperienceHandler,
  deleteExperienceHandler,
} from '../controllers/experience.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getExperienceHandler);
router.post('/', verifyJWT, createExperienceHandler);
router.put('/:id', verifyJWT, updateExperienceHandler);
router.delete('/:id', verifyJWT, deleteExperienceHandler);

export default router;
