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
import { RHFInput, RHFSelector, RHFTextArea } from "@/components/shared/forms";
import { blogSchema, BlogFormData } from "@/lib/validations";
import { Blog } from "@/types";
import { Loader2, Plus, Edit } from "lucide-react";
import toast from "react-hot-toast";

interface BlogFormDialogProps {
  blogToEdit?: Blog | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (blog: Blog) => void;
}

const CATEGORIES = [
  "Full Stack",
  "Backend & Systems",
  "Database",
  "DevOps & Architecture",
  "AI & Cloud",
  "Engineering Leadership",
];

export function BlogFormDialog({
  blogToEdit,
  isOpen,
  onClose,
  onSuccess,
}: BlogFormDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema) as any,
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      category: "Full Stack",
      readTime: "6 min read",
      published: true,
      tags: "Next.js, TypeScript, Architecture",
    },
  });

  const titleValue = watch("title");

  // Auto-generate slug when creating new
  useEffect(() => {
    if (!blogToEdit && titleValue) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setValue("slug", generatedSlug);
    }
  }, [titleValue, blogToEdit, setValue]);

  useEffect(() => {
    if (blogToEdit) {
      reset({
        title: blogToEdit.title,
        slug: blogToEdit.slug,
        summary: blogToEdit.summary,
        content: blogToEdit.content || "",
        category: blogToEdit.category,
        readTime: blogToEdit.readTime,
        published: blogToEdit.published,
        tags: Array.isArray(blogToEdit.tags)
          ? blogToEdit.tags.join(", ")
          : blogToEdit.tags,
      });
    } else {
      reset({
        title: "",
        slug: "",
        summary: "",
        content: "",
        category: "Full Stack",
        readTime: "6 min read",
        published: true,
        tags: "Next.js, TypeScript, Architecture",
      });
    }
    setServerError(null);
  }, [blogToEdit, isOpen, reset]);

  const onSubmit = async (data: BlogFormData) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const formattedTags =
        typeof data.tags === "string"
          ? data.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
          : data.tags;

      const payload = {
        ...data,
        tags: formattedTags,
      };

      const isEdit = !!blogToEdit;
      const url = isEdit ? `/api/blogs/${blogToEdit.id}` : "/api/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || result.message || "Failed to save blog post");
      }

      toast.success(isEdit ? "Blog article updated!" : "Blog article published!");
      onSuccess(result.data);
      onClose();
    } catch (err: any) {
      console.error("Save blog error:", err);
      toast.error(err.message || "An unexpected error occurred");
      setServerError(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            {blogToEdit ? (
              <>
                <Edit className="h-5 w-5 text-primary" />
                Edit Technical Article
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-primary" />
                Publish New Technical Article
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {blogToEdit
              ? "Update technical article details and publish status in the database."
              : "Draft and publish a new engineering article with SEO metadata."}
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <div className="p-3 text-sm rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Title */}
          <RHFInput
            name="title"
            label="Article Title"
            placeholder="e.g. Architecting High-Throughput Event-Driven Microservices"
            required
            control={control}
          />

          {/* Slug */}
          <RHFInput
            name="slug"
            label="URL Slug"
            placeholder="architecting-high-throughput-microservices"
            control={control}
            className="font-mono text-xs"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <RHFSelector
              name="category"
              label="Category"
              required
              options={CATEGORIES}
              control={control}
            />

            {/* Read Time */}
            <RHFInput
              name="readTime"
              label="Estimated Read Time"
              placeholder="e.g. 7 min read"
              control={control}
            />
          </div>

          {/* Summary */}
          <RHFTextArea
            name="summary"
            label="Executive Summary / Overview"
            rows={3}
            placeholder="Concise technical summary for search previews and index cards..."
            required
            control={control}
          />

          {/* Full Content */}
          <RHFTextArea
            name="content"
            label="Article Content / Deep Dive (Markdown Supported)"
            rows={6}
            placeholder="Write the in-depth technical analysis, architecture breakdown, or code snippets..."
            control={control}
            className="font-mono text-xs"
          />

          {/* Tags */}
          <RHFInput
            name="tags"
            label="Technologies / Tags (comma-separated)"
            placeholder="NestJS, RabbitMQ, Docker, Microservices"
            required
            control={control}
          />

          {/* Published Switch */}
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-muted/30">
            <input
              type="checkbox"
              id="published"
              {...register("published")}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary/40 cursor-pointer"
            />
            <Label htmlFor="published" className="text-sm font-medium cursor-pointer">
              Publish immediately (visible to all readers on /blog)
            </Label>
          </div>

          <DialogFooter className="pt-4 border-t border-border/40 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="gap-2">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {blogToEdit ? "Save Changes" : "Publish Article"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
