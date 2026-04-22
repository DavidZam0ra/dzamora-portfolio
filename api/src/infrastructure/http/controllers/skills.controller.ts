import { Request, Response, NextFunction } from 'express';
import { GetSkillsUseCase } from '../../../application/use-cases/skills/GetSkillsUseCase';
import { CreateSkillUseCase } from '../../../application/use-cases/skills/CreateSkillUseCase';
import { UpdateSkillUseCase } from '../../../application/use-cases/skills/UpdateSkillUseCase';
import { DeleteSkillUseCase } from '../../../application/use-cases/skills/DeleteSkillUseCase';
import { MongoSkillRepository } from '../../db/mongoose/repositories/MongoSkillRepository';

const repo = new MongoSkillRepository();
const getAll = new GetSkillsUseCase(repo);
const create = new CreateSkillUseCase(repo);
const update = new UpdateSkillUseCase(repo);
const remove = new DeleteSkillUseCase(repo);

export async function getSkillsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await getAll.execute());
  } catch (err) {
    next(err);
  }
}

export async function createSkillHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await create.execute(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateSkillHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await update.execute(req.params.id, req.body);
    if (!item) {
      res.status(404).json({ error: 'Skill not found' });
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteSkillHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await remove.execute(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Skill not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
