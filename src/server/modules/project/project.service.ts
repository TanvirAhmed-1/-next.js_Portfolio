import { prisma, isDatabaseConfigured } from "@/server/shared/prisma";
import { IProject, IProjectFilters } from "./project.interface";
import * as LocalStorage from "@/lib/storage";

const createProjectIntoDB = async (payload: any): Promise<IProject> => {
  const slug =
    payload.slug?.trim() ||
    payload.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const tagsArray = Array.isArray(payload.tags)
    ? payload.tags
    : typeof payload.tags === "string"
    ? payload.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean)
    : [];

  const formattedPayload = {
    ...payload,
    slug,
    tags: tagsArray,
    liveUrl: payload.liveUrl || null,
    githubUrl: payload.githubUrl || null,
    longDescription: payload.longDescription || payload.description,
  };

  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.project.create({
        data: formattedPayload,
      });
      return result as unknown as IProject;
    } catch (error) {
      console.warn("Prisma write error, fallback to local store:", error);
    }
  }

  return LocalStorage.addProject(formattedPayload) as unknown as IProject;
};

const getAllProjectsFromDB = async (
  filters: IProjectFilters = {}
): Promise<IProject[]> => {
  if (isDatabaseConfigured()) {
    try {
      const where: any = {};
      if (filters.category) {
        where.category = filters.category;
      }
      if (filters.featured !== undefined) {
        where.featured = filters.featured;
      }
      if (filters.searchTerm) {
        where.OR = [
          { title: { contains: filters.searchTerm, mode: "insensitive" } },
          { description: { contains: filters.searchTerm, mode: "insensitive" } },
        ];
      }

      const result = await prisma.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
      if (result.length > 0) {
        return result as unknown as IProject[];
      }
    } catch (error) {
      console.warn("Prisma read error, falling back to storage:", error);
    }
  }

  let projects = LocalStorage.getProjects();
  if (filters.category) {
    projects = projects.filter((p) => p.category === filters.category);
  }
  if (filters.featured !== undefined) {
    projects = projects.filter((p) => p.featured === filters.featured);
  }
  return projects as unknown as IProject[];
};

const getSingleProjectFromDB = async (id: string): Promise<IProject | null> => {
  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.project.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
      });
      if (result) return result as unknown as IProject;
    } catch (error) {
      console.warn("Prisma find error, fallback to local store:", error);
    }
  }

  const project = LocalStorage.getProjectById(id);
  return (project as unknown as IProject) || null;
};

const updateProjectInDB = async (
  id: string,
  payload: any
): Promise<IProject | null> => {
  const updates = { ...payload };
  if (updates.tags && typeof updates.tags === "string") {
    updates.tags = updates.tags
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
  }

  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.project.update({
        where: { id },
        data: updates,
      });
      return result as unknown as IProject;
    } catch (error) {
      console.warn("Prisma update error, fallback to local store:", error);
    }
  }

  return LocalStorage.updateProject(id, updates) as unknown as IProject | null;
};

const deleteProjectFromDB = async (id: string): Promise<boolean> => {
  if (isDatabaseConfigured()) {
    try {
      await prisma.project.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.warn("Prisma delete error, fallback to local store:", error);
    }
  }

  return LocalStorage.deleteProject(id);
};

export const ProjectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  updateProjectInDB,
  deleteProjectFromDB,
};

