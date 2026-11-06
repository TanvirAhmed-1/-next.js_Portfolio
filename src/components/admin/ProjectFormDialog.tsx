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
import { Label } from "@/components/ui/label";
import { RHFInput, RHFSelector, RHFTextArea, RHFImageUpload } from "@/components/shared/forms";
import { projectSchema, ProjectFormData } from "@/lib/validations";
import { Project, ProjectCategory } from "@/types";
import { Loader2, Plus, Edit, FolderPlus, Check } from "lucide-react";
import toast from "react-hot-toast";

interface ProjectFormDialogProps {
  projectToEdit?: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (project: Project) => void;
}

const DEFAULT_CATEGORIES: string[] = [
  "Full Stack",
  "Backend",
  "Frontend",
  "Mobile",
  "DevOps",
  "AI & Cloud",
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
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [newCatName, setNewCatName] = useState("");
  const [isAddingCat, setIsAddingCat] = useState(false);

  // Fetch dynamic categories from database
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        const names = data.data.map((c: any) => c.name);
        setDynamicCategories((prev) => Array.from(new Set([...prev, ...names])));
      }
    } catch (e) {
      console.error("Failed to fetch dynamic categories:", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
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

  const handleCreateNewCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const added = data.data.name;
        setDynamicCategories((prev) => Array.from(new Set([...prev, added])));
        setValue("category", added as any);
        setNewCatName("");
        setIsAddingCat(false);
        toast.success(`Category "${added}" added!`);
      } else {
        toast.error(data.error || "Failed to create category");
      }
    } catch (e: any) {
      toast.error(e.message || "Error creating category");
    }
  };

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

      toast.success(isEdit ? "Project updated successfully!" : "Project created successfully!");
      onSuccess(result.data);
      onClose();
    } catch (err: any) {
      console.error("Save project error:", err);
      toast.error(err.message || "An unexpected error occurred");
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
          <RHFInput
            name="title"
            label="Project Title"
            placeholder="e.g. Distributed NestJS Microservices"
            required
            control={control}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
            {/* Dynamic Category Selector & Quick Add */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category <span className="text-destructive">*</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddingCat(!isAddingCat)}
                  className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1"
                >
                  <FolderPlus className="h-3 w-3" />
                  {isAddingCat ? "Cancel" : "+ New"}
                </button>
              </div>

              {isAddingCat ? (
                <div className="flex items-center gap-1.5 pt-0.5">
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Enter category name..."
                    className="h-8 flex-1 rounded-lg border border-input bg-background px-2.5 text-xs outline-none focus:border-primary"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCreateNewCategory();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="xs"
                    onClick={handleCreateNewCategory}
                    className="h-8 px-2.5 text-xs gap-1"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Add
                  </Button>
                </div>
              ) : (
                <RHFSelector
                  name="category"
                  options={dynamicCategories}
                  control={control}
                  required
                />
              )}
            </div>

            {/* Slug */}
            <RHFInput
              name="slug"
              label="URL Slug (Auto Generated)"
              placeholder="e.g. nestjs-distributed-microservices"
              control={control}
              className="font-mono text-xs"
            />
          </div>

          {/* Short Description */}
          <RHFTextArea
            name="description"
            label="Short Description"
            rows={2}
            placeholder="Brief summary of the architecture and business outcome..."
            required
            control={control}
          />

          {/* Long / Architecture Details */}
          <RHFTextArea
            name="longDescription"
            label="Extended Architectural Details"
            rows={3}
            placeholder="Detailed explanation of design patterns, database choices, queues, etc."
            control={control}
          />

          {/* Tech Stack Tags */}
          <RHFInput
            name="tags"
            label="Tech Stack Tags (comma-separated)"
            placeholder="NestJS, Next.js, Redis, RabbitMQ, Docker"
            required
            control={control}
          />

          {/* Cloudinary Image Upload */}
          <RHFImageUpload
            name="imageUrl"
            label="Cover Image (Cloudinary CDN)"
            folder="portfolio/projects"
            required
            control={control}
          />

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RHFInput
              name="liveUrl"
              label="Live Demo URL"
              placeholder="https://example.com"
              control={control}
            />

            <RHFInput
              name="githubUrl"
              label="GitHub Repository URL"
              placeholder="https://github.com/..."
              control={control}
            />
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="project-featured"
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary cursor-pointer"
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
