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

interface ProjectsSectionProps {
  initialProjects: Project[];
}

const CATEGORIES: Array<"All" | ProjectCategory> = [
  "All",
  "Full Stack",
  "Backend",
  "Frontend",
  "Mobile",
  "DevOps",
];

export function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<"All" | ProjectCategory>("All");
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeProjectDetail, setActiveProjectDetail] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
      } else {
        alert(result.error || "Failed to delete project");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section id="projects" className="py-20 bg-muted/20 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="outline" className="mb-3 font-mono text-xs">
              Selected Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Production Applications & Microservices
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              Fully dynamic projects catalog. Add new case studies, edit tech tags, or manage live URLs.
            </p>
          </div>

          <Button
            onClick={() => {
              setProjectToEdit(null);
              setIsDialogOpen(true);
            }}
            className="gap-2 shrink-0 shadow-xs"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border/40 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
              {cat === "All" && ` (${projects.length})`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-dashed border-border/60 bg-muted/10">
            <FolderGit2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">No projects found in this category</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Add your recent work or change the category filter.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setProjectToEdit(null);
                setIsDialogOpen(true);
              }}
            >
              Add Project Now
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative flex flex-col rounded-xl bg-card border border-border/60 overflow-hidden shadow-xs hover:shadow-lg hover:border-primary/40 transition-all"
              >
                {/* Image Container with Badges & Actions */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Top Left Category / Featured Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium font-mono bg-black/75 backdrop-blur-md text-white border border-white/10">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-amber-500/90 text-white shadow-xs">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Top Right Actions (Edit / Delete) */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      className="text-white hover:text-primary hover:bg-white/20"
                      onClick={() => {
                        setProjectToEdit(project);
                        setIsDialogOpen(true);
                      }}
                      title="Edit Project"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      className="text-white hover:text-destructive hover:bg-white/20"
                      disabled={deletingId === project.id}
                      onClick={() => handleDelete(project.id, project.title)}
                      title="Delete Project"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-[10px] py-0 px-2 font-mono font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Links / Actions footer */}
                  <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors"
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
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors ml-2"
                        >
                          <FaGithub className="h-3.5 w-3.5" />
                          Code
                        </Link>
                      )}
                    </div>

                    <Button
                      size="xs"
                      variant="ghost"
                      className="text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => setActiveProjectDetail(project)}
                    >
                      <Info className="h-3.5 w-3.5 mr-1" />
                      Details
                    </Button>
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

