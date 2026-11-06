import { z } from "zod";

export const createProjectZodSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title is too long"),
  slug: z.string().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description is too long"),
  longDescription: z.string().optional(),
  category: z.enum(["Full Stack", "Backend", "Frontend", "Mobile", "DevOps"]),
  tags: z
    .string()
    .min(1, "Please provide at least one tag")
    .or(z.array(z.string())),
  imageUrl: z.string().url("Invalid Image URL"),
  liveUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

export const updateProjectZodSchema = createProjectZodSchema.partial();

export const ProjectValidation = {
  createProjectZodSchema,
  updateProjectZodSchema,
};
