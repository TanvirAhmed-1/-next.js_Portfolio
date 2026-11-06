import { z } from "zod";

export const createUserValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"]).default("USER"),
  avatar: z.string().optional(),
});

export const loginUserValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const updateUserValidationSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"]).optional(),
  status: z.enum(["ACTIVE", "BLOCKED"]).optional(),
  avatar: z.string().optional(),
});

export const UserValidation = {
  createUserValidationSchema,
  loginUserValidationSchema,
  updateUserValidationSchema,
};

