"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { projectSchema, ProjectFormData } from "@/lib/validations";
import { Project, ProjectCategory } from "@/types";
import { Loader2, Plus, Edit } from "lucide-react";

interface ProjectFormDialogProps {
  projectToEdit?: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (project: Project) => void;
}

const CATEGORIES: ProjectCategory[] = [
  "Full Stack",
  "Backend",
  "Frontend",
  "Mobile",
  "DevOps",
];

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

export function ProjectFormDialog({
  projectToEdit,
  isOpen,
  onClose,
  onSuccess,
}: ProjectFormDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema) as any,
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      category: "Full Stack",
      tags: "NestJS, Next.js, TypeScript",
      imageUrl: DEFAULT_IMAGE,
      liveUrl: "",
      githubUrl: "",
      featured: false,
    },
  });

  const titleValue = watch("title");

  // Auto slug generation if creating new
  useEffect(() => {
    if (!projectToEdit && titleValue) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setValue("slug", generatedSlug);
    }
  }, [titleValue, projectToEdit, setValue]);

  useEffect(() => {
    if (projectToEdit) {
      reset({
        title: projectToEdit.title,
        slug: projectToEdit.slug,
        description: projectToEdit.description,
        longDescription: projectToEdit.longDescription || projectToEdit.description,
        category: projectToEdit.category,
        tags: Array.isArray(projectToEdit.tags)
          ? projectToEdit.tags.join(", ")
          : projectToEdit.tags,
        imageUrl: projectToEdit.imageUrl,
        liveUrl: projectToEdit.liveUrl || "",
        githubUrl: projectToEdit.githubUrl || "",
        featured: projectToEdit.featured,
      });
    } else {
      reset({
        title: "",
        slug: "",
        description: "",
        longDescription: "",
        category: "Full Stack",
        tags: "NestJS, Next.js, TypeScript, PostgreSQL",
        imageUrl: DEFAULT_IMAGE,
        liveUrl: "",
        githubUrl: "",
        featured: false,
      });
    }
    setServerError(null);
  }, [projectToEdit, isOpen, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const isEdit = !!projectToEdit;
      const url = isEdit ? `/api/projects/${projectToEdit.id}` : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to save project");
      }

      onSuccess(result.data);
      onClose();
    } catch (err: any) {
      console.error("Save project error:", err);
      setServerError(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {projectToEdit ? (
              <>
                <Edit className="h-5 w-5 text-primary" />
                Edit Project
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-primary" />
                Add New Project
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {projectToEdit
              ? "Update project details, repository links, and tech stack tags."
              : "Add a new showcase project to your portfolio dynamically."}
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <div className="p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Project Title */}
          <div className="space-y-1.5">
            <Label htmlFor="project-title">Project Title *</Label>
            <Input
              id="project-title"
              placeholder="e.g. Distributed NestJS Microservices"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="project-category">Category *</Label>
              <select
                id="project-category"
                {...register("category")}
                className="w-full h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-background text-foreground">
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category.message}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <Label htmlFor="project-slug">Slug (URL friendly)</Label>
              <Input
                id="project-slug"
                placeholder="e.g. nestjs-distributed-microservices"
                {...register("slug")}
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <Label htmlFor="project-desc">Short Description *</Label>
            <Textarea
              id="project-desc"
              rows={2}
              placeholder="Brief summary of the architecture and business outcome..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Long / Architecture Details */}
          <div className="space-y-1.5">
            <Label htmlFor="project-long-desc">Extended Architectural Details</Label>
            <Textarea
              id="project-long-desc"
              rows={3}
              placeholder="Detailed explanation of design patterns, database choices, queues, etc."
              {...register("longDescription")}
            />
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-1.5">
            <Label htmlFor="project-tags">Tech Stack Tags (comma-separated) *</Label>
            <Input
              id="project-tags"
              placeholder="NestJS, Next.js, Redis, RabbitMQ, Docker"
              {...register("tags")}
            />
            {errors.tags && (
              <p className="text-xs text-destructive">{errors.tags.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <Label htmlFor="project-image">Cover Image URL *</Label>
            <Input
              id="project-image"
              placeholder="https://images.unsplash.com/..."
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <p className="text-xs text-destructive">{errors.imageUrl.message}</p>
            )}
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="project-live">Live Demo URL</Label>
              <Input
                id="project-live"
                placeholder="https://example.com"
                {...register("liveUrl")}
              />
              {errors.liveUrl && (
                <p className="text-xs text-destructive">{errors.liveUrl.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="project-github">GitHub Repository</Label>
              <Input
                id="project-github"
                placeholder="https://github.com/..."
                {...register("githubUrl")}
              />
              {errors.githubUrl && (
                <p className="text-xs text-destructive">{errors.githubUrl.message}</p>
              )}
            </div>
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="project-featured"
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              {...register("featured")}
            />
            <Label htmlFor="project-featured" className="cursor-pointer text-sm font-normal">
              Feature on home page hero / spotlight
            </Label>
          </div>

          <DialogFooter className="mt-6 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {projectToEdit ? "Update Project" : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

