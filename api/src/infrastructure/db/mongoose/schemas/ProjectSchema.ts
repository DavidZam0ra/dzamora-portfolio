import { Schema, model, Document } from 'mongoose';

export interface ProjectDocument extends Document {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

const schema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], default: [] },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ProjectModel = model<ProjectDocument>('Project', schema);
