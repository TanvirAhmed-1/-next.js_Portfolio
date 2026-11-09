"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, ProjectCategory } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectFormDialog } from "@/components/admin/ProjectFormDialog";
import {
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  FolderGit2,
  Sparkles,
  Info,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

interface ProjectsSectionProps {
  initialProjects: Project[];
}

export function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeProjectDetail, setActiveProjectDetail] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Dynamic categories extracted from live projects + defaults
  const categoriesList = [
    "All",
    ...Array.from(
      new Set([
        "Full Stack",
        "Backend",
        "Frontend",
        "Mobile",
        "DevOps",
        ...projects.map((p) => p.category),
      ])
    ),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const handleAddSuccess = (newOrUpdated: Project) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === newOrUpdated.id);
      if (exists) {
        return prev.map((p) => (p.id === newOrUpdated.id ? newOrUpdated : p));
      }
      return [newOrUpdated, ...prev];
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        toast.success(`Project "${title}" deleted`);
      } else {
        toast.error(result.error || "Failed to delete project");
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section id="projects" className="py-24 bg-slate-50/90 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="outline" className="mb-3 font-mono text-xs border-emerald-200 text-emerald-800 bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/5 px-3 py-1">
              Selected Works
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Production Applications &amp; Microservices
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl">
              Architectural case studies, full-stack microservices, and interactive web applications.
            </p>
          </div>
        </div>

        {/* Category Filter Pills (Dynamic) */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-400 shadow-2xs"
              }`}
            >
              {cat}
              {cat === "All" && ` (${projects.length})`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
            <FolderGit2 className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-900 dark:text-white">No projects found in this category</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select another category filter to explore more work.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/50 transition-all duration-300"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                  {/* Top Left Category / Featured Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold font-mono bg-slate-900/80 backdrop-blur-md text-white border border-white/15">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-2 hover:underline">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] py-0.5 px-2.5 rounded-md font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links / Actions footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live Demo
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                          <FaGithub className="h-3.5 w-3.5" />
                          Code
                        </Link>
                      )}
                    </div>

                    <Link href={`/projects/${project.slug}`}>
                      <Button
                        size="xs"
                        variant="outline"
                        className="text-xs font-semibold border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400"
                      >
                        <Info className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                        Case Study
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Project Add / Edit Dialog */}
      <ProjectFormDialog
        isOpen={isDialogOpen}
        projectToEdit={projectToEdit}
        onClose={() => {
          setIsDialogOpen(false);
          setProjectToEdit(null);
        }}
        onSuccess={handleAddSuccess}
      />

      {/* Project Deep Dive Detail Modal */}
      {activeProjectDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setActiveProjectDetail(null)}
        >
          <div
            className="bg-card border border-border/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-primary uppercase font-semibold">
                  {activeProjectDetail.category} Architecture
                </span>
                <h3 className="text-2xl font-bold text-foreground mt-1">
                  {activeProjectDetail.title}
                </h3>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setActiveProjectDetail(null)}
              >
                ✕
              </Button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden mb-5">
              <Image
                src={activeProjectDetail.imageUrl}
                alt={activeProjectDetail.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Overview</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeProjectDetail.description}
                </p>
              </div>

              {activeProjectDetail.longDescription && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    System Architecture & Design Decisions
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {activeProjectDetail.longDescription}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProjectDetail.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-end gap-3">
                {activeProjectDetail.githubUrl && (
                  <Link
                    href={activeProjectDetail.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <FaGithub className="h-4 w-4" />
                      View Source
                    </Button>
                  </Link>
                )}
                {activeProjectDetail.liveUrl && (
                  <Link
                    href={activeProjectDetail.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Open Live Demo
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

