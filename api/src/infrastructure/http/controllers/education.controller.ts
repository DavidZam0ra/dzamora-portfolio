import { Request, Response, NextFunction } from 'express';
import { GetEducationUseCase } from '../../../application/use-cases/education/GetEducationUseCase';
import { CreateEducationUseCase } from '../../../application/use-cases/education/CreateEducationUseCase';
import { UpdateEducationUseCase } from '../../../application/use-cases/education/UpdateEducationUseCase';
import { DeleteEducationUseCase } from '../../../application/use-cases/education/DeleteEducationUseCase';
import { MongoEducationRepository } from '../../db/mongoose/repositories/MongoEducationRepository';

const repo = new MongoEducationRepository();
const getAll = new GetEducationUseCase(repo);
const create = new CreateEducationUseCase(repo);
const update = new UpdateEducationUseCase(repo);
const remove = new DeleteEducationUseCase(repo);

export async function getEducationHandler(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await getAll.execute());
  } catch (err) {
    next(err);
  }
}

export async function createEducationHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await create.execute(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateEducationHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await update.execute(req.params.id, req.body);
    if (!item) {
      res.status(404).json({ error: 'Education not found' });
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteEducationHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await remove.execute(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Education not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
