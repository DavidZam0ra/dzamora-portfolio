import { Education } from '../../../../domain/entities/Education';
import { IEducationRepository } from '../../../../domain/ports/repositories/IEducationRepository';
import { EducationModel } from '../schemas/EducationSchema';

export class MongoEducationRepository implements IEducationRepository {
  async findAll(): Promise<Education[]> {
    const docs = await EducationModel.find().sort({ order: 1 }).lean();
    return docs.map(this.toEntity);
  }

  async findById(id: string): Promise<Education | null> {
    const doc = await EducationModel.findById(id).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>): Promise<Education> {
    const doc = await EducationModel.create(data);
    return this.toEntity(doc.toObject() as unknown as Record<string, unknown>);
  }

  async update(id: string, data: Partial<Education>): Promise<Education | null> {
    const doc = await EducationModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await EducationModel.findByIdAndDelete(id);
    return result !== null;
  }

  private toEntity(doc: Record<string, unknown>): Education {
    const { _id, __v, ...rest } = doc;
    return { id: String(_id), ...rest } as Education;
  }
}
