import { PrismaClient } from "@prisma/client";
import { prisma, isDatabaseConfigured } from "@/server/shared/prisma";
import { educations as fallbackEducations } from "@/data/initial-data";
import crypto from "crypto";

const DEFAULT_EDUCATIONS = fallbackEducations.map(({ id, ...rest }) => rest);

let hasAttemptedSeed = false;

// Ensure we have a Prisma client that knows about the Education model even if globalForPrisma was cached earlier
const getClient = (): any => {
  if ((prisma as any).education) {
    return prisma;
  }
  const g = globalThis as any;
  if (!g.__educationPrisma) {
    g.__educationPrisma = new PrismaClient();
  }
  return g.__educationPrisma;
};

export const seedDefaultEducations = async () => {
  if (hasAttemptedSeed || !isDatabaseConfigured()) return;
  hasAttemptedSeed = true;

  try {
    const db = getClient();
    if (db.education) {
      const count = await db.education.count();
      if (count === 0) {
        for (const item of DEFAULT_EDUCATIONS) {
          await db.education.create({ data: item });
        }
      }
    } else {
      const rows: any[] = await prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as cnt FROM "educations"`);
      if (rows?.[0]?.cnt === 0) {
        for (const item of DEFAULT_EDUCATIONS) {
          await prisma.$executeRawUnsafe(
            `INSERT INTO "educations" ("id", "degree", "field", "institution", "location", "period", "grade", "status", "description", "highlights", "order", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())`,
            crypto.randomUUID(),
            item.degree,
            item.field,
            item.institution,
            item.location,
            item.period,
            item.grade,
            item.status || "Completed",
            item.description,
            item.highlights || [],
            item.order || 0
          );
        }
      }
    }
  } catch (err: any) {
    console.warn("Could not seed initial educations to DB (will use fallback):", err?.message || err);
  }
};

const getAllEducationsFromDB = async () => {
  try {
    await seedDefaultEducations();
  } catch (seedErr) {
    console.warn("seedDefaultEducations warning:", seedErr);
  }

  if (!isDatabaseConfigured()) {
    return fallbackEducations;
  }

  try {
    const db = getClient();
    if (db.education) {
      const list = await db.education.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
      if (list && list.length > 0) return list;
    } else {
      const list: any[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM "educations" ORDER BY "order" ASC, "createdAt" DESC`
      );
      if (list && list.length > 0) return list;
    }
    return fallbackEducations;
  } catch (error: any) {
    console.warn("Prisma error in getAllEducationsFromDB, using fallback:", error?.message || error);
    return fallbackEducations;
  }
};

const getEducationByIdFromDB = async (id: string) => {
  if (!isDatabaseConfigured()) {
    return fallbackEducations.find((e) => e.id === id) || null;
  }

  try {
    const db = getClient();
    if (db.education) {
      const edu = await db.education.findUnique({ where: { id } });
      if (edu) return edu;
    } else {
      const rows: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM "educations" WHERE "id" = $1 LIMIT 1`, id);
      if (rows?.[0]) return rows[0];
    }
  } catch (error: any) {
    console.warn("Prisma error in getEducationByIdFromDB:", error?.message || error);
  }

  return fallbackEducations.find((e) => e.id === id) || null;
};

const createEducationIntoDB = async (payload: any) => {
  if (!isDatabaseConfigured()) {
    throw new Error("Database not configured");
  }

  const db = getClient();
  const data = {
    degree: payload.degree,
    field: payload.field || "",
    institution: payload.institution,
    location: payload.location || "Bangladesh",
    period: payload.period,
    grade: payload.grade || "",
    status: payload.status || "Completed",
    description: payload.description || "",
    highlights: Array.isArray(payload.highlights) ? payload.highlights : [],
    order: typeof payload.order === "number" ? payload.order : Number(payload.order) || 0,
  };

  if (db.education) {
    return db.education.create({ data });
  }

  const newId = crypto.randomUUID();
  const rows: any[] = await prisma.$queryRawUnsafe(
    `INSERT INTO "educations" ("id", "degree", "field", "institution", "location", "period", "grade", "status", "description", "highlights", "order", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
     RETURNING *`,
    newId,
    data.degree,
    data.field,
    data.institution,
    data.location,
    data.period,
    data.grade,
    data.status,
    data.description,
    data.highlights,
    data.order
  );
  return rows[0];
};

const updateEducationInDB = async (id: string, payload: any) => {
  if (!isDatabaseConfigured()) {
    throw new Error("Database not configured");
  }

  const db = getClient();
  const data: any = {
    degree: payload.degree,
    field: payload.field ?? "",
    institution: payload.institution,
    location: payload.location ?? "Bangladesh",
    period: payload.period,
    grade: payload.grade ?? "",
    status: payload.status ?? "Completed",
    description: payload.description ?? "",
    highlights: Array.isArray(payload.highlights) ? payload.highlights : [],
    order: typeof payload.order === "number" ? payload.order : Number(payload.order) || 0,
  };

  if (db.education) {
    return db.education.update({
      where: { id },
      data,
    });
  }

  const rows: any[] = await prisma.$queryRawUnsafe(
    `UPDATE "educations"
     SET "degree" = $2, "field" = $3, "institution" = $4, "location" = $5, "period" = $6, "grade" = $7, "status" = $8, "description" = $9, "highlights" = $10, "order" = $11, "updatedAt" = NOW()
     WHERE "id" = $1
     RETURNING *`,
    id,
    data.degree,
    data.field,
    data.institution,
    data.location,
    data.period,
    data.grade,
    data.status,
    data.description,
    data.highlights,
    data.order
  );
  return rows[0];
};

const deleteEducationFromDB = async (id: string) => {
  if (!isDatabaseConfigured()) {
    throw new Error("Database not configured");
  }

  const db = getClient();
  if (db.education) {
    return db.education.delete({ where: { id } });
  }

  const rows: any[] = await prisma.$queryRawUnsafe(
    `DELETE FROM "educations" WHERE "id" = $1 RETURNING *`,
    id
  );
  return rows[0];
};

export const EducationService = {
  seedDefaultEducations,
  getAllEducationsFromDB,
  getEducationByIdFromDB,
  createEducationIntoDB,
  updateEducationInDB,
  deleteEducationFromDB,
};
