import { Profile } from '../../entities/Profile';

export interface IProfileRepository {
  findOne(): Promise<Profile | null>;
  upsert(data: Partial<Profile>): Promise<Profile>;
}
