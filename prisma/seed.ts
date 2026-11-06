import { PrismaClient } from "@prisma/client";
import { initialProjects, initialSkills, initialProfile } from "../src/data/initial-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Skills
  console.log("Seeding skills...");
  for (const skill of initialSkills) {
    await prisma.skill.upsert({
      where: { id: skill.id },
      update: {
        name: skill.name,
        category: skill.category,
        level: skill.level,
        proficiency: skill.proficiency,
        iconName: skill.iconName,
      },
      create: {
        id: skill.id,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        proficiency: skill.proficiency,
        iconName: skill.iconName,
      },
    });
  }

  // 2. Seed Projects
  console.log("Seeding projects...");
  for (const project of initialProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        category: project.category,
        tags: project.tags,
        imageUrl: project.imageUrl,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        featured: project.featured,
      },
      create: {
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        longDescription: project.longDescription,
        category: project.category,
        tags: project.tags,
        imageUrl: project.imageUrl,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        featured: project.featured,
      },
    });
  }

  // 3. Seed Profile
  console.log("Seeding profile...");
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        name: initialProfile.name,
        title: initialProfile.title,
        bio: initialProfile.bio,
        about: initialProfile.about,
        location: initialProfile.location,
        email: initialProfile.email,
        github: initialProfile.github,
        linkedin: initialProfile.linkedin,
        twitter: initialProfile.twitter,
        availableForHire: initialProfile.availableForHire,
      },
    });
  }

  // 4. Seed Initial Blogs
  console.log("Seeding blogs...");
  const sampleBlogs = [
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
    },
  ];

  for (const blog of sampleBlogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {
        title: blog.title,
        summary: blog.summary,
        category: blog.category,
        readTime: blog.readTime,
        published: blog.published,
        tags: blog.tags,
      },
      create: {
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        summary: blog.summary,
        category: blog.category,
        readTime: blog.readTime,
        published: blog.published,
        tags: blog.tags,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

