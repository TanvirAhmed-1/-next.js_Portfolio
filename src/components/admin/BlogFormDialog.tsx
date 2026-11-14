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
      <DialogContent className="max-w-3xl no-scrollbar">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            {blogToEdit ? (
              <>
                <Edit className="h-5 w-5 text-emerald-500" />
                Edit Technical Article
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-emerald-500" />
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
          <div className="p-3 text-xs rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          {/* Row 1: Title + Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <RHFInput
              name="title"
              label="Article Title"
              placeholder="e.g. Architecting Event-Driven Microservices"
              required
              control={control}
            />

            <RHFInput
              name="slug"
              label="URL Slug (Auto Generated)"
              placeholder="architecting-event-driven-microservices"
              control={control}
              className="font-mono text-xs"
            />
          </div>

          {/* Row 2: Category + Read Time + Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            <RHFSelector
              name="category"
              label="Category"
              required
              options={CATEGORIES}
              control={control}
            />

            <RHFInput
              name="readTime"
              label="Estimated Read Time"
              placeholder="e.g. 7 min read"
              control={control}
            />

            <RHFInput
              name="tags"
              label="Technologies / Tags"
              placeholder="NestJS, RabbitMQ, Docker"
              required
              control={control}
            />
          </div>

          {/* Row 3: Summary */}
          <RHFTextArea
            name="summary"
            label="Executive Summary / Overview"
            rows={2}
            placeholder="Concise technical summary for search previews and index cards..."
            required
            control={control}
          />

          {/* Row 4: Full Content */}
          <RHFTextArea
            name="content"
            label="Article Content / Deep Dive (Markdown Supported)"
            rows={4}
            placeholder="Write the in-depth technical analysis, architecture breakdown, or code snippets..."
            control={control}
            className="font-mono text-xs"
          />

          {/* Published Switch */}
          <label
            htmlFor="published"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-emerald-500/40 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              id="published"
              {...register("published")}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/40 cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              Publish immediately (visible to all readers on /blog)
            </span>
          </label>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
              className="h-9 px-4 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="h-9 px-5 rounded-lg gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {blogToEdit ? "Save Changes" : "Publish Article"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
