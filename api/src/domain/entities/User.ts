export interface User {
  id?: string;
  email: string;
  passwordHash: string;
  googleId?: string;
  displayName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
