import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  passwordHash: string;
  googleId?: string;
  displayName?: string;
}

const schema = new Schema<UserDocument>(
  {
    email:        { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, default: '' },
    googleId:     { type: String, sparse: true, unique: true },
    displayName:  { type: String },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', schema);
