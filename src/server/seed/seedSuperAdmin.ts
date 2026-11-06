import bcrypt from "bcryptjs";
import { prisma, isDatabaseConfigured } from "../shared/prisma";
import config from "../config";

export const seedSuperAdmin = async () => {
  if (!isDatabaseConfigured()) {
    console.warn("Database URL not configured or invalid. Skipping super admin seeding.");
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
      console.log(`Hashing password for Super Admin (${superAdminEmail})...`);
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

      console.log("=========================================");
      console.log("✨ Super Admin Created Successfully!");
      console.log(`Email:    ${created.email}`);
      console.log(`Role:     ${created.role}`);
      console.log(`Status:   ${created.status}`);
      console.log("=========================================");
      return created;
    } else {
      console.log(`Super Admin already exists: ${existingSuperAdmin.email} (${existingSuperAdmin.role})`);
      return existingSuperAdmin;
    }
  } catch (error) {
    console.error("Failed to seed super admin:", error);
    throw error;
  }
};

// If run directly from CLI
if (require.main === module) {
  seedSuperAdmin()
    .then(() => {
      console.log("Seeding script finished.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Seeding script failed:", err);
      process.exit(1);
    });
}

