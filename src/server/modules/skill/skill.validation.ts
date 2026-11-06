import { z } from "zod";

export const createSkillZodSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  category: z.enum([
    "Frontend",
    "Backend",
    "Database",
    "DevOps & Cloud",
    "Tools & Others",
  ]),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
  proficiency: z.coerce
    .number()
    .min(1, "Proficiency must be at least 1")
    .max(100, "Proficiency cannot exceed 100"),
  iconName: z.string().optional().default("FaCode"),
  iconImage: z.string().optional().nullable(),
});

export const updateSkillZodSchema = createSkillZodSchema.partial();

export const SkillValidation = {
  createSkillZodSchema,
  updateSkillZodSchema,
};
