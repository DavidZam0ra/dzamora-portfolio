import { Router } from 'express';
import {
  getProjectsHandler,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
} from '../controllers/projects.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getProjectsHandler);
router.post('/', verifyJWT, createProjectHandler);
router.put('/:id', verifyJWT, updateProjectHandler);
router.delete('/:id', verifyJWT, deleteProjectHandler);

export default router;
