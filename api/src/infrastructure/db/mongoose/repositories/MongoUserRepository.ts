import { User } from '../../../../domain/entities/User';
import { IUserRepository } from '../../../../domain/ports/repositories/IUserRepository';
import { UserModel } from '../schemas/UserSchema';

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email: email.toLowerCase() }).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const doc = await UserModel.findOne({ googleId }).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const doc = await UserModel.create(data);
    return this.toEntity(doc.toObject() as unknown as Record<string, unknown>);
  }

  async linkGoogleId(id: string, googleId: string, displayName?: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { googleId, displayName });
  }

  private toEntity(doc: Record<string, unknown>): User {
    const { _id, __v, ...rest } = doc;
    return { id: String(_id), ...rest } as User;
  }
}
