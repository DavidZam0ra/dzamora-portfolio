import { Request, Response, NextFunction } from 'express';
import { GetProfileUseCase } from '../../../application/use-cases/profile/GetProfileUseCase';
import { UpdateProfileUseCase } from '../../../application/use-cases/profile/UpdateProfileUseCase';
import { MongoProfileRepository } from '../../db/mongoose/repositories/MongoProfileRepository';

const repo = new MongoProfileRepository();
const getProfile = new GetProfileUseCase(repo);
const updateProfile = new UpdateProfileUseCase(repo);

export async function getProfileHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await getProfile.execute();
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function updateProfileHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await updateProfile.execute(req.body);
    res.json(profile);
  } catch (err) {
    next(err);
  }
}
