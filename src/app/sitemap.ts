import { MetadataRoute } from "next";
import { getProjects } from "@/lib/storage";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tanvir-portfolio.vercel.app";
  const projects = getProjects();

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.createdAt || "2025-01-01"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogSlugs = [
    "building-scalable-microservices-with-nestjs-and-rabbitmq",
    "nextjs-16-app-router-turbopack-production-patterns",
    "optimizing-postgresql-queries-for-ten-million-records",
  ];

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date("2025-01-01"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...projectEntries,
    ...blogEntries,
  ];
}
