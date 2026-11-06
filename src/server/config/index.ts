import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  site_url: process.env.NEXT_PUBLIC_SITE_URL || "https://tanvir-portfolio.vercel.app",
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  jwt: {
    secret: process.env.JWT_SECRET || "super-secret-jwt-portfolio-tanvir-ahmed-key-2026",
    expires_in: process.env.JWT_EXPIRES_IN || "30d",
  },
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@tanvir.com",
    password: process.env.ADMIN_PASSWORD || "admin123",
  },
  super_admin: {
    name: process.env.SUPER_ADMIN_NAME || "Tanvir Ahmed",
    email: process.env.SUPER_ADMIN_EMAIL || "superadmin@tanvir.com",
    password: process.env.SUPER_ADMIN_PASSWORD || "superadmin123",
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dczux9dym",
    api_key: process.env.CLOUDINARY_API_KEY || "836625327334786",
    api_secret: process.env.CLOUDINARY_API_SECRET || "4ZJn_oXqBO9VbEOyCwoWqtU0VOI",
    url: process.env.CLOUDINARY_URL,
  },
};

export default config;

