"use client";

import React, { useState } from "react";
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
import { RHFInput, RHFSelector, RHFImageUpload } from "@/components/shared/forms";
import { skillSchema, SkillFormData } from "@/lib/validations";
import { Skill, SkillCategory, SkillLevel } from "@/types";
import { Loader2, Plus, Edit } from "lucide-react";
import toast from "react-hot-toast";

interface SkillFormDialogProps {
  skillToEdit?: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (skill: Skill) => void;
}

const CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Cloud",
  "Tools & Others",
];

const LEVELS: SkillLevel[] = ["Beginner", "Intermediate", "Advanced", "Expert"];

const COMMON_ICONS = [
  { label: "NestJS (SiNestjs)", value: "SiNestjs" },
  { label: "Next.js (SiNextdotjs)", value: "SiNextdotjs" },
  { label: "TypeScript (SiTypescript)", value: "SiTypescript" },
  { label: "React (FaReact)", value: "FaReact" },
  { label: "Node.js (FaNodeJs)", value: "FaNodeJs" },
  { label: "PostgreSQL (SiPostgresql)", value: "SiPostgresql" },
  { label: "MongoDB (SiMongodb)", value: "SiMongodb" },
  { label: "Redis (SiRedis)", value: "SiRedis" },
  { label: "Docker (FaDocker)", value: "FaDocker" },
  { label: "AWS (FaAws)", value: "FaAws" },
  { label: "GraphQL (SiGraphql)", value: "SiGraphql" },
  { label: "Git (FaGitAlt)", value: "FaGitAlt" },
  { label: "Jest (SiJest)", value: "SiJest" },
  { label: "General Code (FaCode)", value: "FaCode" },
];

export function SkillFormDialog({
  skillToEdit,
  isOpen,
  onClose,
  onSuccess,
}: SkillFormDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    handleSubmit,
    reset,
    control,
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema) as any,
    defaultValues: skillToEdit
      ? {
        name: skillToEdit.name,
        category: skillToEdit.category,
        level: skillToEdit.level,
        proficiency: skillToEdit.proficiency,
        iconName: skillToEdit.iconName || "FaCode",
      }
      : {
        name: "",
        category: "Backend",
        level: "Advanced",
        proficiency: 85,
        iconName: "SiNestjs",
        iconImage: "",
      },
  });

  // Reset form when modal opens or skillToEdit changes
  React.useEffect(() => {
    if (skillToEdit) {
      reset({
        name: skillToEdit.name,
        category: skillToEdit.category,
        level: skillToEdit.level,
        proficiency: skillToEdit.proficiency,
        iconName: skillToEdit.iconName || "FaCode",
        iconImage: skillToEdit.iconImage || "",
      });
    } else {
      reset({
        name: "",
        category: "Backend",
        level: "Advanced",
        proficiency: 85,
        iconName: "SiNestjs",
        iconImage: "",
      });
    }
    setServerError(null);
  }, [skillToEdit, isOpen, reset]);

  const onSubmit = async (data: SkillFormData) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const isEdit = !!skillToEdit;
      const url = isEdit ? `/api/skills/${skillToEdit.id}` : "/api/skills";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to save skill");
      }

      toast.success(isEdit ? `Skill "${data.name}" updated!` : `Skill "${data.name}" added!`);
      onSuccess(result.data);
      onClose();
    } catch (err: any) {
      console.error("Save skill error:", err);
      toast.error(err.message || "An unexpected error occurred");
      setServerError(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {skillToEdit ? (
              <>
                <Edit className="h-5 w-5 text-primary" />
                Edit Skill
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-primary" />
                Add New Skill
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {skillToEdit
              ? "Update this technical skill's details and proficiency level."
              : "Add a new technology, framework, or tool to your portfolio."}
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <div className="p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Skill Name */}
          <RHFInput
            name="name"
            label="Skill Name"
            placeholder="e.g. NestJS, Docker, React, PostgreSQL"
            required
            control={control}
          />

          {/* Category */}
          <RHFSelector
            name="category"
            label="Category"
            required
            options={CATEGORIES}
            control={control}
          />

          <div className="grid grid-cols-2 gap-3">
            {/* Level */}
            <RHFSelector
              name="level"
              label="Proficiency Level"
              required
              options={LEVELS}
              control={control}
            />

            {/* Proficiency (0-100) */}
            <RHFInput
              name="proficiency"
              label="Proficiency (1-100)%"
              type="number"
              min={1}
              max={100}
              placeholder="85"
              required
              control={control}
            />
          </div>

          {/* Custom Icon Image (Cloudinary or Direct URL) */}
          <RHFImageUpload
            name="iconImage"
            label="Skill Icon Image (Cloudinary PNG / SVG)"
            folder="portfolio/skills"
            control={control}
          />

          {/* Icon Selector */}
          <RHFSelector
            name="iconName"
            label="Fallback Icon Preset"
            options={COMMON_ICONS}
            helperText="Used if no custom icon image is uploaded"
            control={control}
          />

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
              {skillToEdit ? "Update Skill" : "Create Skill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
