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
import { createServiceValidationSchema } from "@/server/modules/service/service.validation";
import { Service } from "@/types";
import { Loader2, Plus, Edit, Sparkles, ShoppingBag, Code, Smartphone, Globe } from "lucide-react";
import toast from "react-hot-toast";

interface ServiceFormDialogProps {
  serviceToEdit?: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (service: Service) => void;
}

const COMMON_ICONS = [
  { label: "Shopping Cart (E-Commerce)", value: "ShoppingCart" },
  { label: "Code & APIs (Web Dev)", value: "Code2" },
  { label: "Globe (Portfolio & Brand)", value: "Globe" },
  { label: "Smartphone (Mobile Apps)", value: "Smartphone" },
  { label: "Server (Microservices / DevOps)", value: "Server" },
  { label: "Layers (Full Stack)", value: "Layers" },
  { label: "Shield Check (Security & Auth)", value: "ShieldCheck" },
  { label: "Zap (Optimization & Scaling)", value: "Zap" },
];

export function ServiceFormDialog({
  serviceToEdit,
  isOpen,
  onClose,
  onSuccess,
}: ServiceFormDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      features: "",
      pricing: "Starting at $499",
      deliveryTime: "2-3 Weeks",
      icon: "Code2",
      iconImage: "",
      status: "ACTIVE" as "ACTIVE" | "INACTIVE",
      showOnHome: true,
      featured: false,
      order: 0,
    },
  });

  const titleValue = watch("title");

  // Auto-slug generation for new services
  useEffect(() => {
    if (!serviceToEdit && titleValue) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setValue("slug", generatedSlug);
    }
  }, [titleValue, serviceToEdit, setValue]);

  // Reset form when modal opens or serviceToEdit changes
  useEffect(() => {
    if (serviceToEdit) {
      reset({
        title: serviceToEdit.title,
        slug: serviceToEdit.slug,
        description: serviceToEdit.description,
        features: Array.isArray(serviceToEdit.features)
          ? serviceToEdit.features.join("\n")
          : serviceToEdit.features,
        pricing: serviceToEdit.pricing || "Custom Quote",
        deliveryTime: serviceToEdit.deliveryTime || "2-3 Weeks",
        icon: serviceToEdit.icon || "Code2",
        iconImage: serviceToEdit.iconImage || "",
        status: serviceToEdit.status,
        showOnHome: serviceToEdit.showOnHome ?? true,
        featured: serviceToEdit.featured ?? false,
        order: serviceToEdit.order || 0,
      });
    } else {
      reset({
        title: "",
        slug: "",
        description: "",
        features: "Custom Storefront with Next.js 16\nPayment Gateway Integration\nMobile Responsive UI\nAdmin CMS Dashboard\nSEO Optimization",
        pricing: "Starting at $499",
        deliveryTime: "2-3 Weeks",
        icon: "Code2",
        iconImage: "",
        status: "ACTIVE",
        showOnHome: true,
        featured: false,
        order: 0,
      });
    }
    setServerError(null);
  }, [serviceToEdit, isOpen, reset]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const formattedFeatures = typeof data.features === "string"
        ? data.features.split("\n").map((f: string) => f.trim().replace(/^[-*•]\s*/, "")).filter(Boolean)
        : data.features;

      const payload = {
        ...data,
        features: formattedFeatures,
      };

      const isEdit = !!serviceToEdit;
      const url = isEdit ? `/api/services/${serviceToEdit.id}` : "/api/services";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || result.message || "Failed to save service");
      }

      toast.success(isEdit ? `Service "${data.title}" updated!` : `Service "${data.title}" added!`);
      onSuccess(result.data);
      onClose();
    } catch (err: any) {
      console.error("Save service error:", err);
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
            {serviceToEdit ? (
              <>
                <Edit className="h-5 w-5 text-primary" />
                Edit Engineering Service
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-primary" />
                Add New Engineering Service
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            Configure services you offer (e-commerce, portfolios, app development) and control their homepage display status.
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <div className="p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Service Title */}
          <RHFInput
            name="title"
            label="Service Title"
            placeholder="e.g. E-Commerce Website Design & Development"
            required
            control={control}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Slug */}
            <RHFInput
              name="slug"
              label="URL Slug (Auto Generated)"
              placeholder="e.g. e-commerce-website-design-development"
              control={control}
              className="font-mono text-xs"
            />

            {/* Icon Preset */}
            <RHFSelector
              name="icon"
              label="Service Icon"
              options={COMMON_ICONS}
              control={control}
            />
          </div>

          {/* Short Description */}
          <RHFTextArea
            name="description"
            label="Service Pitch / Description"
            rows={2}
            placeholder="Full-cycle custom web solutions engineered for maximum performance, security, and sales..."
            required
            control={control}
          />

          {/* Deliverables / Features (one per line) */}
          <RHFTextArea
            name="features"
            label="Features & Deliverables (One per line)"
            rows={4}
            placeholder="Custom Storefront with Next.js 16&#10;Stripe & Payment Gateway&#10;Inventory Management&#10;Sub-Second Page Speeds"
            required
            control={control}
            helperText="Write each key deliverable or tech highlight on a new line."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Pricing */}
            <RHFInput
              name="pricing"
              label="Pricing / Rate"
              placeholder="e.g. Starting at $799"
              control={control}
            />

            {/* Delivery Time */}
            <RHFInput
              name="deliveryTime"
              label="Est. Delivery Time"
              placeholder="e.g. 2-3 Weeks"
              control={control}
            />

            {/* Status (ACTIVE / INACTIVE) */}
            <RHFSelector
              name="status"
              label="Status"
              options={[
                { label: "🟢 Active (Published)", value: "ACTIVE" },
                { label: "⚪ Inactive (Draft)", value: "INACTIVE" },
              ]}
              control={control}
            />
          </div>

          {/* Cloudinary Icon Image (Optional) */}
          <RHFImageUpload
            name="iconImage"
            label="Custom Icon / Service Banner Image (Cloudinary CDN)"
            folder="portfolio/services"
            control={control}
          />

          {/* Homepage Visibility & Featured Checkboxes */}
          <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="service-showOnHome"
                className="h-4 w-4 rounded border-input text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                {...register("showOnHome")}
              />
              <Label htmlFor="service-showOnHome" className="text-xs font-semibold cursor-pointer">
                Show this service on Homepage (&quot;Services &amp; Solutions&quot; Section)
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="service-featured"
                className="h-4 w-4 rounded border-input text-amber-500 focus:ring-amber-400 cursor-pointer"
                {...register("featured")}
              />
              <Label htmlFor="service-featured" className="text-xs font-semibold cursor-pointer">
                Highlight as &quot;Popular / Featured&quot; service
              </Label>
            </div>
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
            <Button type="submit" disabled={submitting} className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold">
              {submitting && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              {serviceToEdit ? "Save Changes" : "Create Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

