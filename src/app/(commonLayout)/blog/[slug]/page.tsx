import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogService } from "@/server/modules/blog/blog.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Sparkles,
} from "lucide-react";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await BlogService.getAllBlogsFromDB();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await BlogService.getSingleBlogFromDB(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Tanvir Ahmed",
    };
  }

  return {
    title: `${blog.title} | Engineering Blog`,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      type: "article",
    },
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const blog = await BlogService.getSingleBlogFromDB(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen py-24 sm:py-32 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to All Articles
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-border/60">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" className="font-mono text-xs">
              {blog.category}
            </Badge>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {blog.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2] mb-6">
            {blog.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {blog.summary}
          </p>

          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-border/40">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                TA
              </div>
              <div>
                <span className="text-sm font-bold text-foreground block">
                  Tanvir Ahmed
                </span>
                <span className="text-xs text-muted-foreground">
                  Senior Full-Stack Software Engineer
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/#contact">
                <Button size="sm" variant="outline" className="text-xs">
                  Discuss Topic
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <main className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-foreground leading-relaxed text-base sm:text-lg">
          <p>
            In modern distributed web development, building fault-tolerant and high-performance systems requires a strict balance between domain-driven architectures, resilient message queues, and clean API boundaries.
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-foreground mt-8 mb-4">
            Core Architectural Principles
          </h2>
          <p>
            When scaling backends with NestJS and database layers with PostgreSQL and Prisma, query indexing, connection pooling, and message broker guarantees (such as RabbitMQ dead-letter queues and Redis idempotency locks) ensure that the system can handle traffic spikes without degradation.
          </p>

          <div className="p-6 rounded-2xl bg-muted/40 border border-border/60 my-6">
            <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Key Takeaway
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed m-0">
              Always decouple heavy computational tasks and background jobs from synchronous HTTP request-response cycles. Using asynchronous event workers ensures 99.9% API uptime and predictable latency.
            </p>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground mt-8 mb-4">
            Implementation Summary
          </h2>
          <p>
            By adopting modular folder architectures (Interfaces, Validations, Services, Controllers), enterprise applications maintain documentation integrity, type safety, and painless continuous deployments to cloud infrastructure like Vercel and AWS.
          </p>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono mr-2">Tags:</span>
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-mono text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </main>

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-card border border-border/80 text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">
            Enjoyed this deep dive?
          </h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            I regularly architect scalable systems and write about production engineering. Feel free to connect or discuss software architecture opportunities.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link href="/#contact">
              <Button size="sm">Get in Touch</Button>
            </Link>
            <Link href="/blog">
              <Button size="sm" variant="outline">
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
