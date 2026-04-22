import { Schema, model, Document } from 'mongoose';

export interface EducationDocument extends Document {
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  order: number;
}

const schema = new Schema<EducationDocument>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const EducationModel = model<EducationDocument>('Education', schema);
