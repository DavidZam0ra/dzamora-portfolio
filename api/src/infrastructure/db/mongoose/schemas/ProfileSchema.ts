import { Schema, model, Document } from 'mongoose';

export interface ProfileDocument extends Document {
  name: string;
  role: string;
  focus: string;
  location: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  avatarUrl?: string;
}

const schema = new Schema<ProfileDocument>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    focus: { type: String, required: true },
    location: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true },
    github: { type: String, required: true },
    linkedin: { type: String, required: true },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export const ProfileModel = model<ProfileDocument>('Profile', schema);
