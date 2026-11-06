export interface IBlog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string | null;
  category: string;
  readTime: string;
  published: boolean;
  tags: string[];
  createdAt: string | Date;
  updatedAt?: string | Date;
}

