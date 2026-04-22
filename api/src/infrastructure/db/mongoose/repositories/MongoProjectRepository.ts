import { Project } from '../../../../domain/entities/Project';
import { IProjectRepository } from '../../../../domain/ports/repositories/IProjectRepository';
import { ProjectModel } from '../schemas/ProjectSchema';

export class MongoProjectRepository implements IProjectRepository {
  async findAll(): Promise<Project[]> {
    const docs = await ProjectModel.find().sort({ order: 1 }).lean();
    return docs.map(this.toEntity);
  }

  async findById(id: string): Promise<Project | null> {
    const doc = await ProjectModel.findById(id).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const doc = await ProjectModel.create(data);
    return this.toEntity(doc.toObject() as unknown as Record<string, unknown>);
  }

  async update(id: string, data: Partial<Project>): Promise<Project | null> {
    const doc = await ProjectModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProjectModel.findByIdAndDelete(id);
    return result !== null;
  }

  private toEntity(doc: Record<string, unknown>): Project {
    const { _id, __v, ...rest } = doc;
    return { id: String(_id), ...rest } as Project;
  }
}
