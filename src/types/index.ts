export type SkillCategory = "Frontend" | "Backend" | "Database" | "DevOps & Cloud" | "Tools & Others";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  iconName?: string;
  iconImage?: string;
  proficiency: number; // 0 - 100
  createdAt: string;
}

export type ProjectCategory = "Full Stack" | "Backend" | "Frontend" | "Mobile" | "DevOps";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: ProjectCategory;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  category: string;
  readTime: string;
  published: boolean;
  tags: string[];
  createdAt: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export interface ProfileInfo {
  name: string;
  title: string;
  bio: string;
  about: string;
  location: string;
  phone?: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  resumeUrl?: string;
  avatarUrl?: string;
  availableForHire: boolean;
  yearsOfExperience?: number;
  projectsCompleted?: number;
}

