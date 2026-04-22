import { Experience } from '../../../../domain/entities/Experience';
import { IExperienceRepository } from '../../../../domain/ports/repositories/IExperienceRepository';
import { ExperienceModel } from '../schemas/ExperienceSchema';

export class MongoExperienceRepository implements IExperienceRepository {
  async findAll(): Promise<Experience[]> {
    const docs = await ExperienceModel.find().sort({ order: 1 }).lean();
    return docs.map(this.toEntity);
  }

  async findById(id: string): Promise<Experience | null> {
    const doc = await ExperienceModel.findById(id).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<Experience> {
    const doc = await ExperienceModel.create(data);
    return this.toEntity(doc.toObject() as unknown as Record<string, unknown>);
  }

  async update(id: string, data: Partial<Experience>): Promise<Experience | null> {
    const doc = await ExperienceModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ExperienceModel.findByIdAndDelete(id);
    return result !== null;
  }

  private toEntity(doc: Record<string, unknown>): Experience {
    const { _id, __v, ...rest } = doc;
    return { id: String(_id), ...rest } as Experience;
  }
}
