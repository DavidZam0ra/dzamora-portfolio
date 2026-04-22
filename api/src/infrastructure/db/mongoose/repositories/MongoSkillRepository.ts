import { Skill } from '../../../../domain/entities/Skill';
import { ISkillRepository } from '../../../../domain/ports/repositories/ISkillRepository';
import { SkillModel } from '../schemas/SkillSchema';

export class MongoSkillRepository implements ISkillRepository {
  async findAll(): Promise<Skill[]> {
    const docs = await SkillModel.find().sort({ category: 1, order: 1 }).lean();
    return docs.map(this.toEntity);
  }

  async findById(id: string): Promise<Skill | null> {
    const doc = await SkillModel.findById(id).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Skill> {
    const doc = await SkillModel.create(data);
    return this.toEntity(doc.toObject() as unknown as Record<string, unknown>);
  }

  async update(id: string, data: Partial<Skill>): Promise<Skill | null> {
    const doc = await SkillModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await SkillModel.findByIdAndDelete(id);
    return result !== null;
  }

  private toEntity(doc: Record<string, unknown>): Skill {
    const { _id, __v, ...rest } = doc;
    return { id: String(_id), ...rest } as Skill;
  }
}
