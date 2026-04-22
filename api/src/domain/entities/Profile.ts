export interface Profile {
  id?: string;
  name: string;
  role: string;
  focus: string;
  location: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
