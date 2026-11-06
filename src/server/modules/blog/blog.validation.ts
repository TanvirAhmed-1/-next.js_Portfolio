import { z } from "zod";

export const createBlogZodSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().optional(),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  content: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  readTime: z.string().default("5 min read"),
  published: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
});

export const updateBlogZodSchema = createBlogZodSchema.partial();

export const BlogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
