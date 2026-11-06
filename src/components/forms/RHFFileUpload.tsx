"use client";

import React, { useState, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  FileText,
  UploadCloud,
  Loader2,
  CheckCircle2,
  X,
  ExternalLink,
  Download,
} from "lucide-react";

export interface RHFFileUploadProps {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  folder?: string;
  accept?: string;
  control?: any;
  customError?: string;
  containerClassName?: string;
}

export function RHFFileUpload({
  name,
  label = "Upload CV / Resume (PDF)",
  helperText = "Upload PDF directly to Cloudinary or paste a direct Google Drive / PDF link",
  required = false,
  folder = "portfolio/resumes",
  accept = ".pdf,.docx,.doc",
  control,
  customError,
  containerClassName = "",
}: RHFFileUploadProps) {
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

    if (file.size > 15 * 1024 * 1024) {
      setUploadError("File size must be under 15MB");
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
        throw new Error(result.error || "Failed to upload document");
      }

      onChange(result.data.secure_url);
    } catch (err: any) {
      console.error("Cloudinary document upload error:", err);
      setUploadError(err.message || "Failed to upload file");
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
    const isUploaded = !!value;

    return (
      <div className={`space-y-2 w-full ${containerClassName}`}>
        <div className="flex items-center justify-between">
          <Label
            htmlFor={name}
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1"
          >
            <span>{label}</span>
            {required && <span className="text-destructive">*</span>}
          </Label>

          <button
            type="button"
            onClick={() => setMode(mode === "upload" ? "url" : "upload")}
            className="text-[11px] text-primary hover:underline font-mono"
          >
            {mode === "upload" ? "Paste direct URL instead" : "Upload file instead"}
          </button>
        </div>

        {isUploaded ? (
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-card shadow-xs">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">
                    Current Document
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-mono px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Active
                  </span>
                </div>
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground hover:underline truncate block font-mono"
                >
                  {value}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="View / Download Document"
              >
                <Download className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-2 rounded-lg border border-destructive/20 hover:bg-destructive/10 text-destructive transition-colors"
                title="Remove Document"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : mode === "upload" ? (
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
              accept={accept}
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
                  Uploading Document to Cloudinary...
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Optimizing and generating secure cloud URL
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Click to browse or drop your CV / Resume file here
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    PDF, DOCX, DOC up to 15MB (Stored on Cloudinary Cloud)
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-1.5">
            <input
              type="url"
              placeholder="https://drive.google.com/... or https://res.cloudinary.com/.../resume.pdf"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
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

