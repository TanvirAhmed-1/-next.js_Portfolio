import { prisma, isDatabaseConfigured } from "@/server/shared/prisma";
import { IBlog } from "./blog.interface";

const initialBlogs: IBlog[] = [
  {
    id: "blog-1",
    title: "Architecting Scalable Microservices with NestJS, RabbitMQ, and Redis",
    slug: "building-scalable-microservices-with-nestjs-and-rabbitmq",
    summary:
      "A deep dive into event-driven design, distributed message queues, dead-letter exchanges, and graceful error handling in enterprise NestJS clusters.",
    category: "Backend & Systems",
    readTime: "8 min read",
    published: true,
    tags: ["NestJS", "RabbitMQ", "Microservices", "Docker"],
    createdAt: "2024-11-01T00:00:00.000Z",
  },
  {
    id: "blog-2",
    title: "Next.js 16 App Router & Turbopack: Advanced Production Patterns",
    slug: "nextjs-16-app-router-turbopack-production-patterns",
    summary:
      "Leveraging Server Components, Server Actions, Partial Prerendering (PPR), and dynamic caching strategies for ultra-fast First Contentful Paint.",
    category: "Full Stack",
    readTime: "6 min read",
    published: true,
    tags: ["Next.js", "React 19", "Performance", "Web Dev"],
    createdAt: "2024-10-01T00:00:00.000Z",
  },
  {
    id: "blog-3",
    title: "PostgreSQL Indexing & Query Optimization for High-Throughput APIs",
    slug: "optimizing-postgresql-queries-for-ten-million-records",
    summary:
      "Practical strategies for indexing with B-Tree and GIN, analyzing EXPLAIN queries, connection pooling, and Prisma query tuning.",
    category: "Database",
    readTime: "10 min read",
    published: true,
    tags: ["PostgreSQL", "Prisma", "SQL", "Database"],
    createdAt: "2024-09-01T00:00:00.000Z",
  },
];

let memoryBlogs = [...initialBlogs];

const getAllBlogsFromDB = async (): Promise<IBlog[]> => {
  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.blog.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      });
      if (result.length > 0) return result as unknown as IBlog[];
    } catch (error) {
      console.warn("Prisma blog find error:", error);
    }
  }

  return memoryBlogs;
};

const getSingleBlogFromDB = async (slug: string): Promise<IBlog | null> => {
  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.blog.findFirst({
        where: {
          OR: [{ slug }, { id: slug }],
        },
      });
      if (result) return result as unknown as IBlog;
    } catch (error) {
      console.warn("Prisma blog find error:", error);
    }
  }

  return memoryBlogs.find((b) => b.slug === slug || b.id === slug) || null;
};

const createBlogIntoDB = async (payload: any): Promise<IBlog> => {
  const slug =
    payload.slug?.trim() ||
    payload.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const blogData = {
    ...payload,
    slug,
  };

  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.blog.create({
        data: blogData,
      });
      return result as unknown as IBlog;
    } catch (error) {
      console.warn("Prisma blog create error:", error);
    }
  }

  const newBlog: IBlog = {
    ...blogData,
    id: `blog-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  memoryBlogs = [newBlog, ...memoryBlogs];
  return newBlog;
};

export const BlogService = {
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  createBlogIntoDB,
};

