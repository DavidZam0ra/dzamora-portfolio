import { Router } from 'express';
import {
  getSkillsHandler,
  createSkillHandler,
  updateSkillHandler,
  deleteSkillHandler,
} from '../controllers/skills.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getSkillsHandler);
router.post('/', verifyJWT, createSkillHandler);
router.put('/:id', verifyJWT, updateSkillHandler);
router.delete('/:id', verifyJWT, deleteSkillHandler);

export default router;
