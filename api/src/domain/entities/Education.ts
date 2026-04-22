export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}
