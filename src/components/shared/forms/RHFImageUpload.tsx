"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  useFormContext,
  Controller,
  Control,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export interface RHFImageUploadProps {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  folder?: string;
  control?: any;
  customError?: string;
  containerClassName?: string;
}

export function RHFImageUpload({
  name,
  label = "Cover Image",
  helperText = "Upload directly to Cloudinary or paste a direct image URL",
  required = false,
  folder = "portfolio",
  control,
  customError,
  containerClassName = "",
}: RHFImageUploadProps) {
  const formContext = useFormContext();
  const effectiveControl = control || formContext?.control;

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    file: File,
    onChange: (value: string) => void
  ) => {
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image size must be less than 10MB");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to upload to Cloudinary");
      }

      // Update form value with Cloudinary secure_url
      onChange(result.data.secure_url);
    } catch (err: any) {
      console.error("Cloudinary upload failed:", err);
      setUploadError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const renderContent = (
    value: string = "",
    onChange: (val: string) => void,
    errorMessage?: string
  ) => {
    const isCloudinary = value.includes("cloudinary.com");

    return (
      <div className={`space-y-2 w-full ${containerClassName}`}>
        <div className="flex items-center justify-between h-5">
          <Label
            htmlFor={name}
            className="font-sans text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1 leading-none"
          >
            <span>{label}</span>
            {required && <span className="text-rose-500">*</span>}
          </Label>

          <button
            type="button"
            onClick={() => setMode(mode === "upload" ? "url" : "upload")}
            className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-mono font-medium"
          >
            {mode === "upload" ? "Paste Image URL instead" : "Upload File instead"}
          </button>
        </div>

        {/* Existing preview if value exists */}
        {value ? (
          <div className="relative group rounded-xl overflow-hidden border border-border/80 bg-muted/30 p-2">
            <div className="relative h-40 sm:h-48 w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-destructive hover:text-white backdrop-blur-md transition-colors text-foreground shadow-sm"
                title="Remove Image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 px-1 text-xs text-muted-foreground">
              <span className="truncate max-w-[260px] font-mono text-[11px]">
                {value}
              </span>
              {isCloudinary && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3" /> Cloudinary CDN
                </span>
              )}
            </div>
          </div>
        ) : mode === "upload" ? (
          /* Upload Zone */
          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              uploading
                ? "border-primary/50 bg-primary/5 cursor-wait"
                : "border-border/80 hover:border-primary/60 hover:bg-muted/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, onChange);
              }}
            />

            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm font-medium text-foreground">
                  Uploading to Cloudinary...
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Optimizing and CDN processing
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Click to browse or drop image here
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    PNG, JPG, WEBP, GIF up to 10MB (Cloudinary Storage)
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Direct URL Input */
          <div className="space-y-1.5">
            <input
              type="url"
              placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="h-10 w-full px-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        )}

        {(uploadError || errorMessage) && (
          <p className="text-xs text-destructive font-medium">
            {uploadError || errorMessage}
          </p>
        )}

        {!uploadError && !errorMessage && helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  };

  if (effectiveControl) {
    return (
      <Controller
        name={name}
        control={effectiveControl}
        render={({ field, fieldState: { error } }) => {
          const errorMessage = customError || error?.message;
          return renderContent(field.value, field.onChange, errorMessage);
        }}
      />
    );
  }

  return null;
}
