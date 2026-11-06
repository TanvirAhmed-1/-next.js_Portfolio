import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Engineering Blog | Tanvir Ahmed",
  description:
    "Technical articles and deep-dives on NestJS microservices, Next.js architecture, distributed systems, and modern full-stack development.",
};

const articles = [
  {
    slug: "building-scalable-microservices-with-nestjs-and-rabbitmq",
    title: "Architecting Scalable Microservices with NestJS, RabbitMQ, and Redis",
    summary:
      "A deep dive into event-driven design, distributed message queues, dead-letter exchanges, and graceful error handling in enterprise NestJS clusters.",
    date: "November 2024",
    readTime: "8 min read",
    category: "Backend & Systems",
    tags: ["NestJS", "RabbitMQ", "Microservices", "Docker"],
  },
  {
    slug: "nextjs-16-app-router-turbopack-production-patterns",
    title: "Next.js 16 App Router & Turbopack: Advanced Production Patterns",
    summary:
      "Leveraging Server Components, Server Actions, Partial Prerendering (PPR), and dynamic caching strategies for ultra-fast First Contentful Paint.",
    date: "October 2024",
    readTime: "6 min read",
    category: "Full Stack",
    tags: ["Next.js", "React 19", "Performance", "Web Dev"],
  },
  {
    slug: "optimizing-postgresql-queries-for-ten-million-records",
    title: "PostgreSQL Indexing & Query Optimization for High-Throughput APIs",
    summary:
      "Practical strategies for indexing with B-Tree and GIN, analyzing EXPLAIN queries, connection pooling, and Prisma query tuning.",
    date: "September 2024",
    readTime: "10 min read",
    category: "Database",
    tags: ["PostgreSQL", "Prisma", "SQL", "Database"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="mb-12">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="font-mono text-xs">
              Technical Writing
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Engineering Insights & Deep Dives
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Articles and practical architectural guides on modern full-stack development, NestJS, and distributed systems.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="p-6 sm:p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono mb-3">
                <Badge variant="secondary" className="text-[11px] font-normal">
                  {article.category}
                </Badge>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                {article.title}
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                {article.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/40">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-muted/60 text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

