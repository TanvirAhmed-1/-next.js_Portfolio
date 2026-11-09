"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RHFInput, RHFSelector, RHFTextArea } from "@/components/shared/forms";
import { Education } from "@/types";
import { Loader2, Plus, Edit, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";

interface EducationFormDialogProps {
  educationToEdit?: Education | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (edu: Education) => void;
}

export function EducationFormDialog({
  educationToEdit,
  isOpen,
  onClose,
  onSuccess,
}: EducationFormDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      degree: "",
      field: "",
      institution: "",
      location: "Dhaka, Bangladesh",
      period: "",
      grade: "",
      status: "Completed",
      description: "",
      highlights: "",
      order: 1,
    },
  });

  useEffect(() => {
    if (educationToEdit) {
      reset({
        degree: educationToEdit.degree || "",
        field: educationToEdit.field || "",
        institution: educationToEdit.institution || "",
        location: educationToEdit.location || "Bangladesh",
        period: educationToEdit.period || "",
        grade: educationToEdit.grade || "",
        status: educationToEdit.status || "Completed",
        description: educationToEdit.description || "",
        highlights: Array.isArray(educationToEdit.highlights)
          ? educationToEdit.highlights.join("\n")
          : "",
        order: educationToEdit.order ?? 1,
      });
    } else {
      reset({
        degree: "",
        field: "",
        institution: "",
        location: "Dhaka, Bangladesh",
        period: "2024 – Present",
        grade: "CGPA: 3.75 / 4.00",
        status: "Completed",
        description: "",
        highlights: "",
        order: 1,
      });
    }
    setServerError(null);
  }, [educationToEdit, isOpen, reset]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const formattedHighlights =
        typeof data.highlights === "string"
          ? data.highlights
              .split("\n")
              .map((h: string) => h.trim().replace(/^[-*•]\s*/, ""))
              .filter(Boolean)
          : data.highlights;

      const payload = {
        ...data,
        order: Number(data.order) || 0,
        highlights: formattedHighlights,
      };

      const isEdit = !!educationToEdit;
      const url = isEdit
        ? `/api/educations/${educationToEdit.id}`
        : "/api/educations";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(
          result.error || result.message || "Failed to save education qualification"
        );
      }

      toast.success(
        isEdit
          ? `Education "${data.degree}" updated!`
          : `Education "${data.degree}" added!`
      );
      onSuccess(result.data);
      onClose();
    } catch (err: any) {
      console.error("Save education error:", err);
      toast.error(err.message || "An unexpected error occurred");
      setServerError(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {educationToEdit ? (
              <>
                <Edit className="h-5 w-5 text-emerald-500" />
                Edit Education Qualification
              </>
            ) : (
              <>
                <GraduationCap className="h-5 w-5 text-emerald-500" />
                Add Education Qualification
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            Add or update your university degrees, diplomas, and academic qualifications.
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <div className="p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RHFInput
              name="degree"
              label="Degree / Qualification Title"
              placeholder="e.g. Bachelor of Science (B.Sc)"
              required
              control={control}
            />

            <RHFInput
              name="field"
              label="Major / Department / Group"
              placeholder="e.g. BSc in Computer Science and Engineering."
              required
              control={control}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RHFInput
              name="institution"
              label="Institution / University / School"
              placeholder="e.g. Northern University Bangladesh"
              required
              control={control}
            />

            <RHFInput
              name="location"
              label="Location"
              placeholder="e.g. Dhaka, Bangladesh"
              required
              control={control}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <RHFInput
              name="period"
              label="Duration / Session"
              placeholder="e.g. 02/01/2024 – Present"
              required
              control={control}
            />

            <RHFInput
              name="grade"
              label="Result / CGPA / GPA"
              placeholder="e.g. CGPA: 3.67"
              required
              control={control}
            />

            <RHFSelector
              name="status"
              label="Status"
              options={[
                { label: "Ongoing / Running", value: "Ongoing" },
                { label: "Completed / Graduated", value: "Completed" },
              ]}
              control={control}
            />
          </div>

          <RHFTextArea
            name="description"
            label="Summary / Details"
            rows={2}
            placeholder="Brief description of your academic focus or achievements..."
            required
            control={control}
          />

          <RHFTextArea
            name="highlights"
            label="Key Coursework / Highlights (One per line)"
            rows={3}
            placeholder="BSc in Computer Science and Engineering&#10;Data Structures & Algorithms&#10;Database Management Systems"
            control={control}
            helperText="Write each highlight or key subject on a new line."
          />

          <RHFInput
            name="order"
            label="Display Order (1 = First)"
            type="number"
            min={0}
            max={50}
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
            <Button
              type="submit"
              disabled={submitting}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              {educationToEdit ? "Save Changes" : "Add Education"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

