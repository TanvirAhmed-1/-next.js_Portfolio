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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { skillSchema, SkillFormData } from "@/lib/validations";
import { Skill, SkillCategory, SkillLevel } from "@/types";
import { Loader2, Plus, Edit } from "lucide-react";

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
  { label: "NestJS", val: "SiNestjs" },
  { label: "Next.js", val: "SiNextdotjs" },
  { label: "TypeScript", val: "SiTypescript" },
  { label: "React", val: "FaReact" },
  { label: "Node.js", val: "FaNodeJs" },
  { label: "PostgreSQL", val: "SiPostgresql" },
  { label: "MongoDB", val: "SiMongodb" },
  { label: "Redis", val: "SiRedis" },
  { label: "Docker", val: "FaDocker" },
  { label: "AWS", val: "FaAws" },
  { label: "GraphQL", val: "SiGraphql" },
  { label: "Git", val: "FaGitAlt" },
  { label: "Jest", val: "SiJest" },
  { label: "General Code", val: "FaCode" },
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
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
      });
    } else {
      reset({
        name: "",
        category: "Backend",
        level: "Advanced",
        proficiency: 85,
        iconName: "SiNestjs",
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

      onSuccess(result.data);
      onClose();
    } catch (err: any) {
      console.error("Save skill error:", err);
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
          <div className="space-y-1.5">
            <Label htmlFor="skill-name">Skill Name *</Label>
            <Input
              id="skill-name"
              placeholder="e.g. NestJS, Docker, React, PostgreSQL"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label htmlFor="skill-category">Category *</Label>
            <select
              id="skill-category"
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

          <div className="grid grid-cols-2 gap-3">
            {/* Level */}
            <div className="space-y-1.5">
              <Label htmlFor="skill-level">Proficiency Level *</Label>
              <select
                id="skill-level"
                {...register("level")}
                className="w-full h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-background text-foreground">
                    {lvl}
                  </option>
                ))}
              </select>
              {errors.level && (
                <p className="text-xs text-destructive">{errors.level.message}</p>
              )}
            </div>

            {/* Proficiency (0-100) */}
            <div className="space-y-1.5">
              <Label htmlFor="skill-prof">Proficiency (1-100)%</Label>
              <Input
                id="skill-prof"
                type="number"
                min={1}
                max={100}
                placeholder="85"
                {...register("proficiency")}
              />
              {errors.proficiency && (
                <p className="text-xs text-destructive">{errors.proficiency.message}</p>
              )}
            </div>
          </div>

          {/* Icon Selector */}
          <div className="space-y-1.5">
            <Label htmlFor="skill-icon">Icon Preset</Label>
            <select
              id="skill-icon"
              {...register("iconName")}
              className="w-full h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {COMMON_ICONS.map((icon) => (
                <option key={icon.val} value={icon.val} className="bg-background text-foreground">
                  {icon.label} ({icon.val})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-muted-foreground">
              Selects the dynamic React Icon from react-icons.
            </p>
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
              {skillToEdit ? "Update Skill" : "Create Skill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

