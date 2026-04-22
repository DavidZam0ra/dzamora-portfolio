import { Request, Response, NextFunction } from 'express';
import { GetExperienceUseCase } from '../../../application/use-cases/experience/GetExperienceUseCase';
import { CreateExperienceUseCase } from '../../../application/use-cases/experience/CreateExperienceUseCase';
import { UpdateExperienceUseCase } from '../../../application/use-cases/experience/UpdateExperienceUseCase';
import { DeleteExperienceUseCase } from '../../../application/use-cases/experience/DeleteExperienceUseCase';
import { MongoExperienceRepository } from '../../db/mongoose/repositories/MongoExperienceRepository';

const repo = new MongoExperienceRepository();
const getAll = new GetExperienceUseCase(repo);
const create = new CreateExperienceUseCase(repo);
const update = new UpdateExperienceUseCase(repo);
const remove = new DeleteExperienceUseCase(repo);

export async function getExperienceHandler(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await getAll.execute());
  } catch (err) {
    next(err);
  }
}

export async function createExperienceHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await create.execute(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateExperienceHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await update.execute(req.params.id, req.body);
    if (!item) {
      res.status(404).json({ error: 'Experience not found' });
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteExperienceHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await remove.execute(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Experience not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
