export interface Experience {
  id?: string;
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}
