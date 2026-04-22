import { Schema, model, Document } from 'mongoose';

export interface ExperienceDocument extends Document {
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
  order: number;
}

const schema = new Schema<ExperienceDocument>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, required: true },
    achievements: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ExperienceModel = model<ExperienceDocument>('Experience', schema);
