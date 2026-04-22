import { Profile } from '../../../../domain/entities/Profile';
import { IProfileRepository } from '../../../../domain/ports/repositories/IProfileRepository';
import { ProfileModel } from '../schemas/ProfileSchema';

export class MongoProfileRepository implements IProfileRepository {
  async findOne(): Promise<Profile | null> {
    const doc = await ProfileModel.findOne().lean();
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async upsert(data: Partial<Profile>): Promise<Profile> {
    const doc = await ProfileModel.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true,
    }).lean();
    return this.toEntity(doc!);
  }

  private toEntity(doc: Record<string, unknown>): Profile {
    const { _id, __v, ...rest } = doc;
    return { id: String(_id), ...rest } as Profile;
  }
}
