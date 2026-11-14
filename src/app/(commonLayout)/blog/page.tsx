"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Blog } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/shared/Pagination";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  X,
  Sparkles,
} from "lucide-react";

const FALLBACK_ARTICLES: Blog[] = [
  {
    id: "blog-1",
    slug: "building-scalable-microservices-with-nestjs-and-rabbitmq",
    title: "Architecting Scalable Microservices with NestJS, RabbitMQ, and Redis",
    summary:
      "A deep dive into event-driven design, distributed message queues, dead-letter exchanges, and graceful error handling in enterprise NestJS clusters.",
    content: "",
    readTime: "8 min read",
    category: "Backend & Systems",
    tags: ["NestJS", "RabbitMQ", "Microservices", "Docker"],
    published: true,
    createdAt: "2024-11-12T00:00:00.000Z",
  },
  {
    id: "blog-2",
    slug: "nextjs-16-app-router-turbopack-production-patterns",
    title: "Next.js 16 App Router & Turbopack: Advanced Production Patterns",
    summary:
      "Leveraging Server Components, Server Actions, Partial Prerendering (PPR), and dynamic caching strategies for ultra-fast First Contentful Paint.",
    content: "",
    readTime: "6 min read",
    category: "Full Stack",
    tags: ["Next.js", "React 19", "Performance", "Web Dev"],
    published: true,
    createdAt: "2024-10-18T00:00:00.000Z",
  },
  {
    id: "blog-3",
    slug: "optimizing-postgresql-queries-for-ten-million-records",
    title: "PostgreSQL Indexing & Query Optimization for High-Throughput APIs",
    summary:
      "Practical strategies for indexing with B-Tree and GIN, analyzing EXPLAIN queries, connection pooling, and Prisma query tuning.",
    content: "",
    readTime: "10 min read",
    category: "Database",
    tags: ["PostgreSQL", "Prisma", "SQL", "Database"],
    published: true,
    createdAt: "2024-09-25T00:00:00.000Z",
  },
];

export default function BlogPage() {
  const [articles, setArticles] = useState<Blog[]>(FALLBACK_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setArticles(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch live blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean))),
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q) ||
      article.tags?.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen py-24 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="mb-10">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 mb-5 font-mono text-xs">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="outline"
              className="font-mono text-xs border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10"
            >
              <Sparkles className="h-3 w-3 mr-1 text-emerald-500" />
              Technical Writing &amp; Case Studies
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Engineering Insights &amp; Deep Dives
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Articles and practical architectural guides on modern full-stack development, NestJS microservices, and distributed systems.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200/80 dark:border-slate-800">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  {cat}
                  {cat === "All" && ` (${articles.length})`}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search articles or #tags..."
              className="pl-10 pr-8"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Articles List */}
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
            <BookOpen className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              No matching articles found
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try adjusting your search keywords or selecting a different category.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {paginatedArticles.map((article) => (
              <article
                key={article.id || article.slug}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all group"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono mb-3">
                  <Badge
                    variant="secondary"
                    className="text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-500/20"
                  >
                    {article.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Nov 2024"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-teal-500" />
                    {article.readTime}
                  </span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2.5 hover:underline">
                    {article.title}
                  </h2>
                </Link>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  {article.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags?.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                          setCurrentPage(1);
                        }}
                        className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-500/15 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}

            {/* Shared Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredArticles.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              pageSizeOptions={[3, 5, 10]}
              itemLabel="articles"
              className="mt-6"
            />
          </div>
        )}
      </div>
    </div>
  );
}
