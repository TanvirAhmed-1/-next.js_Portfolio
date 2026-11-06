import bcrypt from "bcryptjs";
import { prisma, isDatabaseConfigured } from "@/server/shared/prisma";
import config from "@/server/config";
import { IUser, ILoginUser } from "./user.interface";

// Automatically seed super admin if does not exist
export const seedSuperAdmin = async () => {
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    const superAdminEmail = config.super_admin.email;
    const existingSuperAdmin = await prisma.user.findFirst({
      where: {
        OR: [
          { email: superAdminEmail },
          { role: "SUPER_ADMIN" },
        ],
      },
    });

    if (!existingSuperAdmin) {
      const hashedPassword = await bcrypt.hash(
        config.super_admin.password,
        config.bcrypt_salt_rounds
      );

      const created = await prisma.user.create({
        data: {
          name: config.super_admin.name,
          email: superAdminEmail,
          password: hashedPassword,
          role: "SUPER_ADMIN",
          status: "ACTIVE",
        },
      });

      console.log(`[Seed] Super Admin initialized successfully: ${created.email}`);
      return created;
    }

    return existingSuperAdmin;
  } catch (error) {
    console.error("[Seed] Failed to seed super admin:", error);
    return null;
  }
};

// Login user with password comparison
export const loginUser = async (payload: ILoginUser) => {
  // Ensure super admin is initialized
  await seedSuperAdmin();

  if (isDatabaseConfigured()) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (user) {
        if (user.status === "BLOCKED") {
          throw new Error("Your account has been blocked. Contact system administrator.");
        }

        const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

        // Also check plain-text fallback in case of seed transition
        const isPlainFallback =
          (payload.email === config.super_admin.email && payload.password === config.super_admin.password) ||
          (payload.email === config.admin.email && payload.password === config.admin.password);

        if (!isPasswordMatched && !isPlainFallback) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        };
      }
    } catch (err: any) {
      if (err.message && err.message.includes("blocked") || err.message.includes("Invalid")) {
        throw err;
      }
      console.error("DB Login error, checking config fallback:", err);
    }
  }

  // Fallback to config admin/superadmin credentials if DB is unreachable or during initial setup
  if (
    (payload.email === config.super_admin.email && payload.password === config.super_admin.password) ||
    (payload.email === config.admin.email && payload.password === config.admin.password)
  ) {
    const isSuper = payload.email === config.super_admin.email;
    return {
      id: isSuper ? "super-admin-root" : "admin-root",
      name: isSuper ? config.super_admin.name : "Portfolio Admin",
      email: payload.email,
      role: isSuper ? "SUPER_ADMIN" : "ADMIN",
      avatar: null,
    };
  }

  throw new Error("Invalid email or password");
};

// Get all users
export const getAllUsers = async () => {
  if (!isDatabaseConfigured()) return [];
  await seedSuperAdmin();
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// Create new user
export const createUser = async (payload: IUser) => {
  if (!isDatabaseConfigured()) {
    throw new Error("Database not configured");
  }

  const existing = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existing) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password || "default123456",
    config.bcrypt_salt_rounds
  );

  return prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role || "USER",
      status: payload.status || "ACTIVE",
      avatar: payload.avatar || null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const UserService = {
  seedSuperAdmin,
  loginUser,
  getAllUsers,
  createUser,
};

