import { prisma, isDatabaseConfigured } from "@/server/shared/prisma";
import { IService, IServiceFilters } from "./service.interface";

const DEFAULT_SERVICES = [
  {
    title: "E-Commerce Website Design & Development",
    slug: "e-commerce-website-design-development",
    description: "Full-cycle e-commerce platforms engineered for conversion, blazing fast performance, secure checkout, payment gateways, and real-time inventory management.",
    features: [
      "Custom Storefront with Next.js 16 & Server Components",
      "Stripe, PayPal & Local Payment Gateway Integration",
      "Admin Inventory, Order Tracking & Coupon Engine",
      "Cart Abandonment & Lightning Sub-Second Page Speeds",
      "Mobile-First Responsive Layout & SEO Optimization",
    ],
    icon: "ShoppingCart",
    pricing: "Starting at $799",
    deliveryTime: "2-3 Weeks",
    status: "ACTIVE",
    showOnHome: true,
    featured: true,
    order: 1,
  },
  {
    title: "Custom Full-Stack Web Development",
    slug: "custom-full-stack-web-development",
    description: "Enterprise web applications tailored to specific business domains using clean hexagonal architecture, modular NestJS APIs, and interactive Next.js interfaces.",
    features: [
      "Robust NestJS Modular REST & GraphQL Architecture",
      "PostgreSQL Database Design with Prisma ORM",
      "Role-Based Access Control (RBAC) & OAuth2 Security",
      "Background Jobs, BullMQ, Redis Caching & Cloudinary",
      "Comprehensive Automated Unit & Integration Testing",
    ],
    icon: "Code2",
    pricing: "Starting at $999",
    deliveryTime: "3-4 Weeks",
    status: "ACTIVE",
    showOnHome: true,
    featured: true,
    order: 2,
  },
  {
    title: "High-Converting Portfolio & Brand Sites",
    slug: "high-converting-portfolio-brand-sites",
    description: "Stunning, high-conversion developer & executive portfolios, agency websites, and SaaS landing pages with modern glassmorphism, dark/light themes, and CMS.",
    features: [
      "Interactive Modern UI with Tailwind CSS & Framer Animation",
      "Integrated Headless CMS for Instant Project & Blog Updates",
      "100/100 Core Web Vitals & Google Lighthouse Scores",
      "Dynamic Resume & Verified PDF Document Embeds",
      "Automated Contact Lead Generation & Email Alerts",
    ],
    icon: "Globe",
    pricing: "Starting at $399",
    deliveryTime: "1-2 Weeks",
    status: "ACTIVE",
    showOnHome: true,
    featured: true,
    order: 3,
  },
  {
    title: "Mobile & Cross-Platform App Development",
    slug: "mobile-cross-platform-app-development",
    description: "Sleek, fluid iOS and Android mobile applications built using React Native and Expo, backed by high-throughput real-time WebSocket APIs.",
    features: [
      "Single Codebase for Both iOS and Android",
      "Offline-First SQLite / WatermelonDB Local Sync",
      "Push Notifications via Firebase Cloud Messaging",
      "Biometric Authentication (FaceID & Fingerprint)",
      "App Store & Google Play Console Submission Support",
    ],
    icon: "Smartphone",
    pricing: "Starting at $899",
    deliveryTime: "3-5 Weeks",
    status: "ACTIVE",
    showOnHome: true,
    featured: false,
    order: 4,
  },
  {
    title: "API Microservices & Backend Architecture",
    slug: "api-microservices-backend-architecture",
    description: "High-concurrency microservices, message queue brokers with RabbitMQ, distributed caching, and database query optimization for millions of records.",
    features: [
      "Event-Driven Architecture with RabbitMQ & Kafka",
      "PostgreSQL Indexing, Connection Pooling & Partitioning",
      "Docker Containerization & Kubernetes Ready Setups",
      "Strict SOLID & Clean Architecture Implementation",
      "Prometheus & Grafana API Health Monitoring",
    ],
    icon: "Server",
    pricing: "Starting at $650",
    deliveryTime: "2-3 Weeks",
    status: "ACTIVE",
    showOnHome: false,
    featured: false,
    order: 5,
  },
];

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

let hasAttemptedSeed = false;

// Seed default services if database table is empty
export const seedDefaultServices = async () => {
  if (hasAttemptedSeed || !isDatabaseConfigured()) return;
  hasAttemptedSeed = true;

  try {
    const count = await (prisma as any).service.count();
    if (count === 0) {
      console.log("Seeding initial professional services...");
      for (const item of DEFAULT_SERVICES) {
        await (prisma as any).service.create({
          data: item,
        });
      }
      console.log("Initial services successfully seeded!");
    }
  } catch (err: any) {
    console.warn("Could not seed initial services to DB (will use in-memory fallback):", err?.message || err);
  }
};

// Filter fallback list in memory
const filterFallbackServices = (filters: IServiceFilters = {}) => {
  let list = [...DEFAULT_SERVICES];
  if (filters.showOnHome !== undefined) {
    list = list.filter((s) => s.showOnHome === filters.showOnHome);
  }
  if (filters.status) {
    list = list.filter((s) => s.status === filters.status);
  }
  if (filters.featured !== undefined) {
    list = list.filter((s) => s.featured === filters.featured);
  }
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    list = list.filter(
      (s) =>
        s.title.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term)
    );
  }
  return list;
};

// Get all services with optional filters
export const getAllServices = async (filters: IServiceFilters = {}) => {
  try {
    await seedDefaultServices();
  } catch (seedErr) {
    console.warn("seedDefaultServices warning:", seedErr);
  }

  if (!isDatabaseConfigured()) {
    return filterFallbackServices(filters);
  }

  try {
    const where: any = {};
    if (filters.showOnHome !== undefined) {
      where.showOnHome = filters.showOnHome;
    }
    if (filters.status) {
      where.status = filters.status;
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

    return await (prisma as any).service.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch (error: any) {
    console.warn("Prisma error in getAllServices, using fallback:", error?.message || error);
    return filterFallbackServices(filters);
  }
};

// Get single service by id or slug
export const getServiceByIdOrSlug = async (identifier: string) => {
  if (!isDatabaseConfigured()) {
    return DEFAULT_SERVICES.find((s) => s.slug === identifier || (s as any).id === identifier) || null;
  }

  try {
    const service = await (prisma as any).service.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
    });
    if (service) return service;
  } catch (error: any) {
    console.warn("Prisma error in getServiceByIdOrSlug, using fallback:", error?.message || error);
  }

  return DEFAULT_SERVICES.find((s) => s.slug === identifier || (s as any).id === identifier) || null;
};

// Create service
export const createService = async (payload: any) => {
  if (!isDatabaseConfigured()) {
    throw new Error("Database not configured");
  }

  const slug = payload.slug || generateSlug(payload.title);

  return (prisma as any).service.create({
    data: {
      ...payload,
      slug,
    },
  });
};

// Update service
export const updateService = async (id: string, payload: any) => {
  if (!isDatabaseConfigured()) {
    throw new Error("Database not configured");
  }

  if (payload.title && !payload.slug) {
    payload.slug = generateSlug(payload.title);
  }

  return (prisma as any).service.update({
    where: { id },
    data: payload,
  });
};

// Toggle home visibility
export const toggleHomeVisibility = async (id: string) => {
  if (!isDatabaseConfigured()) throw new Error("Database not configured");

  const current = await (prisma as any).service.findUnique({
    where: { id },
    select: { showOnHome: true },
  });

  if (!current) throw new Error("Service not found");

  return (prisma as any).service.update({
    where: { id },
    data: { showOnHome: !current.showOnHome },
  });
};

// Toggle status (ACTIVE <-> INACTIVE)
export const toggleStatus = async (id: string) => {
  if (!isDatabaseConfigured()) throw new Error("Database not configured");

  const current = await (prisma as any).service.findUnique({
    where: { id },
    select: { status: true },
  });

  if (!current) throw new Error("Service not found");

  const nextStatus = current.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  return (prisma as any).service.update({
    where: { id },
    data: { status: nextStatus },
  });
};

// Delete service
export const deleteService = async (id: string) => {
  if (!isDatabaseConfigured()) {
    throw new Error("Database not configured");
  }

  return (prisma as any).service.delete({
    where: { id },
  });
};

export const ServiceService = {
  seedDefaultServices,
  getAllServices,
  getServiceByIdOrSlug,
  createService,
  updateService,
  toggleHomeVisibility,
  toggleStatus,
  deleteService,
};

