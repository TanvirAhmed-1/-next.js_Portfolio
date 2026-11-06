import { prisma, isDatabaseConfigured } from "@/server/shared/prisma";

const DEFAULT_CATEGORIES = [
  "Full Stack",
  "Backend",
  "Frontend",
  "Mobile",
  "DevOps",
  "AI & Cloud",
];

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const seedDefaultCategories = async () => {
  if (!isDatabaseConfigured()) return [];

  try {
    for (const name of DEFAULT_CATEGORIES) {
      const slug = generateSlug(name);
      await (prisma as any).category.upsert({
        where: { name },
        update: {},
        create: { name, slug },
      });
    }
  } catch (error) {
    console.error("Failed to seed default categories:", error);
  }
};

export const getAllCategories = async () => {
  if (!isDatabaseConfigured()) {
    return DEFAULT_CATEGORIES.map((name) => ({
      id: generateSlug(name),
      name,
      slug: generateSlug(name),
    }));
  }

  try {
    await seedDefaultCategories();
    return await (prisma as any).category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return DEFAULT_CATEGORIES.map((name) => ({
      id: generateSlug(name),
      name,
      slug: generateSlug(name),
    }));
  }
};

export const createCategory = async (name: string) => {
  if (!isDatabaseConfigured()) {
    throw new Error("Database not configured");
  }

  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("Category name is required");
  }

  const slug = generateSlug(trimmed);

  return (prisma as any).category.upsert({
    where: { name: trimmed },
    update: {},
    create: {
      name: trimmed,
      slug,
    },
  });
};

export const deleteCategory = async (id: string) => {
  if (!isDatabaseConfigured()) {
    throw new Error("Database not configured");
  }

  return (prisma as any).category.delete({
    where: { id },
  });
};

export const CategoryService = {
  seedDefaultCategories,
  getAllCategories,
  createCategory,
  deleteCategory,
};

