export type ProjectCategory =
  | "Full Stack"
  | "Backend"
  | "Frontend"
  | "Mobile"
  | "DevOps";

export interface IProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  category: ProjectCategory;
  tags: string[];
  imageUrl: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface IProjectFilters {
  searchTerm?: string;
  category?: ProjectCategory;
  featured?: boolean;
}

