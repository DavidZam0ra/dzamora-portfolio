import { Request, Response, NextFunction } from 'express';
import { GetProjectsUseCase } from '../../../application/use-cases/projects/GetProjectsUseCase';
import { CreateProjectUseCase } from '../../../application/use-cases/projects/CreateProjectUseCase';
import { UpdateProjectUseCase } from '../../../application/use-cases/projects/UpdateProjectUseCase';
import { DeleteProjectUseCase } from '../../../application/use-cases/projects/DeleteProjectUseCase';
import { MongoProjectRepository } from '../../db/mongoose/repositories/MongoProjectRepository';

const repo = new MongoProjectRepository();
const getAll = new GetProjectsUseCase(repo);
const create = new CreateProjectUseCase(repo);
const update = new UpdateProjectUseCase(repo);
const remove = new DeleteProjectUseCase(repo);

export async function getProjectsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await getAll.execute());
  } catch (err) {
    next(err);
  }
}

export async function createProjectHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await create.execute(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateProjectHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await update.execute(req.params.id, req.body);
    if (!item) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteProjectHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await remove.execute(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
