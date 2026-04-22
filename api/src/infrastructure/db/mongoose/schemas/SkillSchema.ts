import { Schema, model, Document } from 'mongoose';
import { SkillCategory, SkillLevel } from '../../../../domain/entities/Skill';

export interface SkillDocument extends Document {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  order: number;
}

const schema = new Schema<SkillDocument>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Backend', 'Frontend', 'Database', 'DevOps', 'AI', 'Testing'],
      required: true,
    },
    level: {
      type: String,
      enum: ['expert', 'advanced', 'intermediate'],
      required: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SkillModel = model<SkillDocument>('Skill', schema);
