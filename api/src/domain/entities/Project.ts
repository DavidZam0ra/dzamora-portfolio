export interface Project {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}
