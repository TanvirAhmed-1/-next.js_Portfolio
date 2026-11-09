import { z } from "zod";

export const createServiceValidationSchema = z.object({
  title: z.string().min(2, "Service title must be at least 2 characters"),
  slug: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  features: z.union([z.string(), z.array(z.string())]).transform((val) => {
    if (Array.isArray(val)) return val;
    return val
      .split("\n")
      .map((s) => s.trim().replace(/^[-*•]\s*/, ""))
      .filter(Boolean);
  }),
  icon: z.string().optional().default("Code2"),
  iconImage: z.string().optional().nullable(),
  pricing: z.string().optional().default("Custom Quote"),
  deliveryTime: z.string().optional().default("1-2 Weeks"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  showOnHome: z.boolean().default(true),
  featured: z.boolean().default(false),
  order: z.coerce.number().default(0),
});

export const updateServiceValidationSchema = createServiceValidationSchema.partial();

export const ServiceValidation = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};

