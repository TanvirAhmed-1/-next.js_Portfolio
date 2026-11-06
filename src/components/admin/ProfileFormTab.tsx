"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileZodSchema } from "@/server/modules/profile/profile.validation";
import { IProfile } from "@/server/modules/profile/profile.interface";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  RHFInput,
  RHFTextArea,
  RHFImageUpload,
  RHFFileUpload,
} from "@/components/forms";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  CheckCircle2,
  Loader2,
  Sparkles,
  Download,
  FileText,
  Save,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";

interface ProfileFormTabProps {
  onProfileUpdated?: (profile: IProfile) => void;
}

export function ProfileFormTab({ onProfileUpdated }: ProfileFormTabProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm<any>({
    resolver: zodResolver(updateProfileZodSchema) as any,
    defaultValues: {
      name: "",
      title: "",
      phone: "",
      email: "",
      location: "",
      bio: "",
      about: "",
      github: "",
      linkedin: "",
      twitter: "",
      resumeUrl: "",
      avatarUrl: "",
      availableForHire: true,
      yearsOfExperience: 5,
      projectsCompleted: 35,
    },
  });

  const resumeUrlValue = watch("resumeUrl");

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile");
      const result = await res.json();
      if (result.success && result.data) {
        reset({
          name: result.data.name || "",
          title: result.data.title || "",
          phone: result.data.phone || "",
          email: result.data.email || "",
          location: result.data.location || "",
          bio: result.data.bio || "",
          about: result.data.about || "",
          github: result.data.github || "",
          linkedin: result.data.linkedin || "",
          twitter: result.data.twitter || "",
          resumeUrl: result.data.resumeUrl || "",
          avatarUrl: result.data.avatarUrl || "",
          availableForHire: result.data.availableForHire ?? true,
          yearsOfExperience: result.data.yearsOfExperience || 5,
          projectsCompleted: result.data.projectsCompleted || 35,
        });
      }
    } catch (e) {
      console.error("Failed to fetch profile", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onSubmit = async (data: any) => {
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || result.message || "Failed to update profile");
      }

      toast.success("Profile & CV updated successfully!");
      setSuccessMessage("Your profile information, phone, email, and CV have been saved to PostgreSQL & Cloudinary!");
      if (onProfileUpdated) {
        onProfileUpdated(result.data);
      }
    } catch (err: any) {
      console.error("Profile update error:", err);
      toast.error(err.message || "Failed to update profile");
      setErrorMessage(err.message || "An unexpected error occurred while saving profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center rounded-2xl bg-card border border-border/60">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
        <p className="text-sm text-muted-foreground font-mono">Loading profile details from database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Section 1: Basic Identity & Contact Information */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-md space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-emerald-400" />
              Personal & Contact Information
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Update your direct contact phone number, email address, designation, and location.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RHFInput
              name="name"
              label="Full Name"
              placeholder="Tanvir Ahmed"
              required
              control={control}
              icon={<User className="h-4 w-4" />}
            />

            <RHFInput
              name="title"
              label="Professional Title / Designation"
              placeholder="Senior Full-Stack Software Engineer"
              required
              control={control}
              icon={<Briefcase className="h-4 w-4" />}
            />

            <RHFInput
              name="phone"
              label="Direct Phone / WhatsApp Number"
              placeholder="+880 1700-123456"
              required
              control={control}
              icon={<Phone className="h-4 w-4 text-emerald-400" />}
              helperText="Displayed and clickable (tel:...) in Hero and Contact sections"
            />

            <RHFInput
              name="email"
              label="Primary Email Address"
              type="email"
              placeholder="tanvir.dev@example.com"
              required
              control={control}
              icon={<Mail className="h-4 w-4 text-cyan-400" />}
              helperText="Receives direct contact form submissions"
            />

            <RHFInput
              name="location"
              label="Location"
              placeholder="Dhaka, Bangladesh (Remote Available)"
              required
              control={control}
              icon={<MapPin className="h-4 w-4 text-amber-400" />}
            />

            <div className="grid grid-cols-2 gap-3">
              <RHFInput
                name="yearsOfExperience"
                label="Years of Experience"
                type="number"
                min={1}
                placeholder="5"
                control={control}
              />

              <RHFInput
                name="projectsCompleted"
                label="Projects Delivered"
                type="number"
                min={1}
                placeholder="35"
                control={control}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Resume / CV & Media Uploads (Cloudinary) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-md space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-cyan-400" />
              CV / Resume & Cloudinary Media
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Upload your latest CV (PDF/DOCX) and profile photo directly to your Cloudinary storage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Resume Upload */}
            <div className="space-y-3">
              <RHFFileUpload
                name="resumeUrl"
                label="CV / Resume Document (PDF / DOCX)"
                folder="portfolio/resumes"
                accept=".pdf,.docx,.doc"
                control={control}
                helperText="Stored on Cloudinary CDN. Automatically linked to all 'Download CV' buttons on the site."
              />

              {resumeUrlValue && (
                <div className="pt-1">
                  <a
                    href={resumeUrlValue}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Preview / Test Current Download Link
                  </a>
                </div>
              )}
            </div>

            {/* Avatar Upload */}
            <div>
              <RHFImageUpload
                name="avatarUrl"
                label="Profile Picture / Avatar"
                folder="portfolio/avatar"
                control={control}
                helperText="Square 1:1 image recommended. Displayed in Hero section and About narrative."
              />
            </div>
          </div>
        </div>

        {/* Section 3: Professional Narrative & Social Links */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-md space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              Bio Narrative & Social Links
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Customize your short bio, engineering story, and public social URLs.
            </p>
          </div>

          <div className="space-y-4">
            <RHFTextArea
              name="bio"
              label="Short Professional Bio"
              rows={2}
              placeholder="Passionate Full-Stack Developer specializing in high-performance web applications using Next.js, Nest.js, TypeScript..."
              required
              control={control}
            />

            <RHFTextArea
              name="about"
              label="Extended About & Engineering Philosophy"
              rows={4}
              placeholder="I believe software engineering is about solving complex domain problems with the simplest, most resilient architecture possible..."
              required
              control={control}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <RHFInput
                name="github"
                label="GitHub Profile URL"
                placeholder="https://github.com/your-username"
                control={control}
                icon={<FaGithub className="h-4 w-4" />}
              />

              <RHFInput
                name="linkedin"
                label="LinkedIn Profile URL"
                placeholder="https://linkedin.com/in/your-username"
                control={control}
                icon={<FaLinkedin className="h-4 w-4 text-[#0077b5]" />}
              />

              <RHFInput
                name="twitter"
                label="Twitter / X Profile URL"
                placeholder="https://twitter.com/your-handle"
                control={control}
                icon={<FaTwitter className="h-4 w-4 text-[#1da1f2]" />}
              />
            </div>

            {/* Available for hire toggle */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-muted/20">
              <input
                type="checkbox"
                id="profile-available"
                className="h-4 w-4 rounded border-input text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                {...register("availableForHire")}
              />
              <Label htmlFor="profile-available" className="text-sm font-medium cursor-pointer">
                Show &apos;Available for Full-Stack &amp; Backend Engineering Roles&apos; badge on portfolio
              </Label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            disabled={saving}
            size="lg"
            className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 shadow-lg shadow-emerald-500/20"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

