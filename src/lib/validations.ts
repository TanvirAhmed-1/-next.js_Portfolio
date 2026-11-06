import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title is too long"),
  slug: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters").max(300, "Description is too long"),
  longDescription: z.string().optional(),
  category: z.enum(["Full Stack", "Backend", "Frontend", "Mobile", "DevOps"], {
    error: "Please select a valid category",
  }),
  tags: z
    .string()
    .min(1, "Please provide at least one tag (comma-separated)")
    .or(z.array(z.string())),
  imageUrl: z.string().url("Please provide a valid image URL"),
  liveUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export const skillSchema = z.object({
  name: z.string().min(2, "Skill name must be at least 2 characters").max(50, "Skill name is too long"),
  category: z.enum(["Frontend", "Backend", "Database", "DevOps & Cloud", "Tools & Others"], {
    error: "Please select a valid category",
  }),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"], {
    error: "Please select a proficiency level",
  }),
  proficiency: z.coerce.number().min(1, "Proficiency must be 1-100").max(100, "Proficiency max is 100"),
  iconName: z.string().optional().default("FaCode"),
});

export type SkillFormData = z.infer<typeof skillSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

