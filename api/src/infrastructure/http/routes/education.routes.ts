import { Router } from 'express';
import {
  getEducationHandler,
  createEducationHandler,
  updateEducationHandler,
  deleteEducationHandler,
} from '../controllers/education.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getEducationHandler);
router.post('/', verifyJWT, createEducationHandler);
router.put('/:id', verifyJWT, updateEducationHandler);
router.delete('/:id', verifyJWT, deleteEducationHandler);

export default router;
