import { z } from "zod";

export const updateProfileZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  title: z.string().min(2, "Title is required").optional(),
  bio: z.string().min(5, "Bio is required").optional(),
  about: z.string().min(10, "About is required").optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Valid email required").optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  resumeUrl: z.string().optional(),
  avatarUrl: z.string().optional(),
  availableForHire: z.boolean().optional(),
  yearsOfExperience: z.coerce.number().optional(),
  projectsCompleted: z.coerce.number().optional(),
});

export const ProfileValidation = {
  updateProfileZodSchema,
};

