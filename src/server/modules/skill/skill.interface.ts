export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps & Cloud"
  | "Tools & Others";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface ISkill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  proficiency: number;
  iconName?: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface ISkillFilters {
  searchTerm?: string;
  category?: SkillCategory;
  level?: SkillLevel;
}

