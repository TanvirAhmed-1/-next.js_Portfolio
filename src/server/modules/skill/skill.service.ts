import { prisma, isDatabaseConfigured } from "@/server/shared/prisma";
import { ISkill, ISkillFilters } from "./skill.interface";
import * as LocalStorage from "@/lib/storage";

const createSkillIntoDB = async (payload: any): Promise<ISkill> => {
  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.skill.create({
        data: payload,
      });
      return result as unknown as ISkill;
    } catch (error) {
      console.warn("Prisma skill create error, fallback to local store:", error);
    }
  }

  return LocalStorage.addSkill(payload) as unknown as ISkill;
};

const getAllSkillsFromDB = async (
  filters: ISkillFilters = {}
): Promise<ISkill[]> => {
  if (isDatabaseConfigured()) {
    try {
      const where: any = {};
      if (filters.category) {
        where.category = filters.category;
      }
      if (filters.level) {
        where.level = filters.level;
      }
      if (filters.searchTerm) {
        where.name = { contains: filters.searchTerm, mode: "insensitive" };
      }

      const result = await prisma.skill.findMany({
        where,
        orderBy: { proficiency: "desc" },
      });
      if (result.length > 0) {
        return result as unknown as ISkill[];
      }
    } catch (error) {
      console.warn("Prisma skill find error, fallback to local store:", error);
    }
  }

  let skills = LocalStorage.getSkills();
  if (filters.category) {
    skills = skills.filter((s) => s.category === filters.category);
  }
  if (filters.level) {
    skills = skills.filter((s) => s.level === filters.level);
  }
  return skills as unknown as ISkill[];
};

const updateSkillInDB = async (
  id: string,
  payload: any
): Promise<ISkill | null> => {
  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.skill.update({
        where: { id },
        data: payload,
      });
      return result as unknown as ISkill;
    } catch (error) {
      console.warn("Prisma skill update error, fallback to local store:", error);
    }
  }

  return LocalStorage.updateSkill(id, payload) as unknown as ISkill | null;
};

const deleteSkillFromDB = async (id: string): Promise<boolean> => {
  if (isDatabaseConfigured()) {
    try {
      await prisma.skill.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.warn("Prisma skill delete error, fallback to local store:", error);
    }
  }

  return LocalStorage.deleteSkill(id);
};

export const SkillService = {
  createSkillIntoDB,
  getAllSkillsFromDB,
  updateSkillInDB,
  deleteSkillFromDB,
};

