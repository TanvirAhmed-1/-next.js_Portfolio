import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProjectService } from "@/server/modules/project/project.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechIcon } from "@/components/TechIcon";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await ProjectService.getAllProjectsFromDB();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await ProjectService.getSingleProjectFromDB(slug);

  if (!project) {
    return {
      title: "Project Not Found | Tanvir Ahmed",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Architectural Case Study`,
      description: project.description,
      images: [{ url: project.imageUrl }],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = await ProjectService.getSingleProjectFromDB(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen py-24 sm:py-32 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link href="/#projects">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              {project.category}
            </Badge>
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                <Sparkles className="h-3 w-3" />
                Featured Work
              </span>
            )}
          </div>
        </div>

        {/* Title & Headline */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Action Bar (Live Demo, GitHub, Meta) */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border/60 mb-10 shadow-xs">
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              Published: {new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-primary" />
              Domain: {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2 font-mono text-xs">
                  <FaGithub className="h-4 w-4" />
                  View Repository
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="gap-2 text-xs">
                  <ExternalLink className="h-4 w-4" />
                  Launch Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/80 mb-12 shadow-md">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Grid: Architecture Breakdown & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <section className="p-6 sm:p-8 rounded-2xl bg-card border border-border/60 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                System Architecture & Implementation
              </h2>
              <div className="text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line">
                {project.longDescription || project.description}
              </div>
            </section>

            <section className="p-6 sm:p-8 rounded-2xl bg-card border border-border/60 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Engineering Highlights
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Engineered with strict TypeScript typing, validation schemas, and modular domain services.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Optimized database querying with indexing, connection pooling, and sub-second response times.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Clean API interfaces and error recovery mechanisms designed for production reliability.</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar Tech Stack (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/60 sticky top-28">
              <h3 className="text-base font-bold text-foreground mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-col gap-2.5">
                {project.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/40 border border-border/40 text-sm font-medium text-foreground"
                  >
                    <TechIcon name={tag} className="h-4 w-4 text-primary shrink-0" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <h4 className="text-xs uppercase font-mono tracking-wider text-muted-foreground mb-2">
                  Need a similar system?
                </h4>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Let&apos;s discuss architecture, performance benchmarks, and implementation timelines.
                </p>
                <Link href="/#contact">
                  <Button className="w-full text-xs">
                    Contact Tanvir
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
