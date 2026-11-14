"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { initialProfile, experiences, educations as initialEducations } from "@/data/initial-data";
import { Education } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Printer,
  ArrowLeft,
  Mail,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Terminal,
  Phone,
  Download,
  FileText,
  Eye,
  Sparkles,
  LayoutTemplate,
  Loader2,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IProfile } from "@/server/modules/profile/profile.interface";
import { PdfCanvasViewer } from "@/components/shared/PdfCanvasViewer";

export default function ResumePage() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [educations, setEducations] = useState<Education[]>(initialEducations);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"pdf" | "web">("pdf");
  const [pdfEngine, setPdfEngine] = useState<"native" | "gview">("native");

  useEffect(() => {
    Promise.all([
      fetch("/api/profile").then((res) => res.json()),
      fetch("/api/educations").then((res) => res.json()),
    ])
      .then(([data, eduData]) => {
        if (eduData?.success && Array.isArray(eduData.data) && eduData.data.length > 0) {
          setEducations(eduData.data);
        }
        if (data?.success && data.data) {
          setProfile(data.data);
          // If no custom PDF uploaded, default to web view
          const url = data.data.resumeUrl;
          const hasPdf = Boolean(
            url &&
            url !== "/resume" &&
            (url.startsWith("http://") || url.startsWith("https://") || url.endsWith(".pdf"))
          );
          if (!hasPdf) {
            setViewMode("web");
          }
        }
      })
      .catch((err) => console.error("Failed to load profile", err))
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const name = profile?.name || initialProfile.name;
  const title = profile?.title || initialProfile.title;
  const email = profile?.email || initialProfile.email;
  const phone = profile?.phone || "01786924911";
  const location = profile?.location || initialProfile.location;
  const about = profile?.about || initialProfile.about;
  const github = profile?.github || initialProfile.github;
  const linkedin = profile?.linkedin || initialProfile.linkedin;
  const resumeUrl = profile?.resumeUrl || "";

  const hasCustomPdf = Boolean(
    resumeUrl &&
    resumeUrl !== "/resume" &&
    (resumeUrl.startsWith("http://") || resumeUrl.startsWith("https://") || resumeUrl.endsWith(".pdf"))
  );

  const isImageResume = /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(resumeUrl);

  // Build properly fitted PDF embed URL so browser never clips or horizontally scrolls the page
  const getPdfEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return "";
    // Google Drive view links -> embeddable preview links
    if (rawUrl.includes("drive.google.com/file/d/")) {
      return rawUrl.replace(/\/view(\?.*)?$/, "/preview");
    }
    if (pdfEngine === "gview" && rawUrl.startsWith("https://")) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(rawUrl)}&embedded=true`;
    }
    // Native browser PDF viewer: force FitH (fit horizontal width) and hide clunky side panes
    const cleanUrl = rawUrl.split("#")[0];
    return `${cleanUrl}#view=FitH&toolbar=0&navpanes=0`;
  };

  const pdfEmbedUrl = getPdfEmbedUrl(resumeUrl);

  return (
    <div className="min-h-screen py-24 sm:py-28 bg-background text-foreground print:py-0 print:bg-white print:text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Action Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>

          {/* View Mode Toggle & Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* View Switcher Tabs (PDF vs Digital) */}
            <div className="inline-flex p-1 rounded-xl bg-muted/80 border border-border/80">
              <button
                type="button"
                onClick={() => setViewMode("pdf")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === "pdf"
                    ? "bg-card text-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-emerald-500" />
                <span>PDF Document</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("web")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === "web"
                    ? "bg-card text-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutTemplate className="h-3.5 w-3.5 text-cyan-500" />
                <span>Digital CV</span>
              </button>
            </div>

            {hasCustomPdf && (
              <>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                  <Button size="sm" className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-md shadow-emerald-500/20 text-xs">
                    <Download className="h-3.5 w-3.5" />
                    Download PDF
                  </Button>
                </a>

                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="gap-2 text-xs">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Fullscreen
                  </Button>
                </a>
              </>
            )}

            {viewMode === "web" && (
              <Button onClick={handlePrint} size="sm" variant="outline" className="gap-2 text-xs">
                <Printer className="h-3.5 w-3.5" />
                Print / Save
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center rounded-2xl bg-card border border-border shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-mono">Loading resume...</p>
          </div>
        ) : viewMode === "pdf" && hasCustomPdf ? (
          /* PDF EMBEDDED VIEWER */
          <div className="rounded-2xl bg-card border border-border/90 shadow-xl overflow-hidden">
            {/* Document Header Bar */}
            <div className="px-5 py-4 border-b border-border/80 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-foreground flex items-center gap-2 flex-wrap">
                    <span>{name}&apos;s Official Resume</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] border-emerald-500/40 text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10 font-mono"
                    >
                      A4 PDF Document
                    </Badge>
                  </h1>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    Live uploaded resume • Auto-fitted to viewport width
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {!isImageResume && resumeUrl.startsWith("https://") && !resumeUrl.includes("drive.google.com") && (
                  <div className="inline-flex p-0.5 rounded-lg bg-muted border border-border/80 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setPdfEngine("native")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        pdfEngine === "native"
                          ? "bg-card text-foreground font-bold shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Fit Width
                    </button>
                    <button
                      type="button"
                      onClick={() => setPdfEngine("gview")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        pdfEngine === "gview"
                          ? "bg-card text-foreground font-bold shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Cloud Viewer
                    </button>
                  </div>
                )}

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 bg-background hover:bg-muted text-xs font-mono font-medium text-foreground transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-emerald-500" />
                  Open Original
                </a>
              </div>
            </div>

            {/* Clean A4-Fitted Full-Page CV Viewer (No trapped X/Y scrollbars) */}
            <div className="p-3 sm:p-6 bg-slate-100/90 dark:bg-slate-950/70">
              {!isImageResume && pdfEngine === "gview" && resumeUrl.startsWith("https://") ? (
                <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-white">
                  <iframe
                    key={pdfEmbedUrl}
                    src={pdfEmbedUrl}
                    className="w-full h-[1200px] border-0 block bg-white"
                    title={`${name} Official Resume PDF`}
                    loading="lazy"
                  />
                </div>
              ) : (
                <PdfCanvasViewer
                  url={resumeUrl}
                  title={`${name} Official Resume`}
                />
              )}
            </div>
          </div>
        ) : (
          /* DIGITAL WEB RESUME (or fallback when no custom PDF uploaded yet) */
          <div className="space-y-6">
            {!hasCustomPdf && (
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-amber-700 dark:text-amber-300">
                  <span className="font-bold block text-sm mb-0.5">Custom PDF Document not uploaded yet</span>
                  Currently showing your digital resume. To display your custom PDF here, upload your PDF file in Admin &gt; Profile &amp; CV.
                </div>
                <Link href="/admin">
                  <Button size="sm" variant="outline" className="text-xs shrink-0 border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10 font-mono">
                    Upload PDF in Admin
                  </Button>
                </Link>
              </div>
            )}

            {/* Resume Sheet */}
            <div className="bg-card print:bg-white border border-border print:border-none rounded-2xl p-8 sm:p-12 shadow-sm print:shadow-none space-y-10">
              {/* Header */}
              <div className="border-b border-border/60 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground print:text-black mb-1">
                    {name}
                  </h1>
                  <p className="text-base sm:text-lg font-mono font-medium text-emerald-600 dark:text-emerald-400 print:text-blue-600">
                    {title}
                  </p>
                </div>

                <div className="text-xs text-muted-foreground print:text-gray-600 space-y-1.5 font-mono">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-emerald-500" />
                    <a href={`tel:${phone}`} className="hover:underline">
                      {phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-cyan-500" />
                    <a href={`mailto:${email}`} className="hover:underline">
                      {email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-amber-500" />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaGithub className="h-3.5 w-3.5 text-foreground" />
                    <a href={github} target="_blank" rel="noreferrer" className="hover:underline">
                      GitHub Profile
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLinkedin className="h-3.5 w-3.5 text-[#0077b5]" />
                    <a href={linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 print:text-blue-700 mb-3 flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  Executive Summary
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground print:text-gray-800 leading-relaxed">
                  {about}
                </p>
              </div>

              {/* Core Technical Arsenal */}
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 print:text-blue-700 mb-4 flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  Technical Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-border/60 bg-muted/20 print:border-gray-200">
                    <h3 className="text-xs font-bold uppercase font-mono text-foreground print:text-black mb-2">
                      Backend &amp; Systems Architecture
                    </h3>
                    <p className="text-xs text-muted-foreground print:text-gray-700 leading-relaxed font-mono">
                      NestJS, Node.js, Express, TypeScript, Microservices, RabbitMQ, Redis, GraphQL, REST APIs, SOLID Principles, Clean Architecture
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/60 bg-muted/20 print:border-gray-200">
                    <h3 className="text-xs font-bold uppercase font-mono text-foreground print:text-black mb-2">
                      Database &amp; Cloud Infrastructure
                    </h3>
                    <p className="text-xs text-muted-foreground print:text-gray-700 leading-relaxed font-mono">
                      PostgreSQL, Prisma ORM, MongoDB, Docker, Docker Compose, Cloudinary CDN, AWS (EC2/S3), CI/CD GitHub Actions, Vercel
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/60 bg-muted/20 print:border-gray-200">
                    <h3 className="text-xs font-bold uppercase font-mono text-foreground print:text-black mb-2">
                      Frontend Engineering
                    </h3>
                    <p className="text-xs text-muted-foreground print:text-gray-700 leading-relaxed font-mono">
                      Next.js 16 (App Router), React 19, Tailwind CSS, React Hook Form, Zod, Redux Toolkit, WebSockets, Responsive UI/UX
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/60 bg-muted/20 print:border-gray-200">
                    <h3 className="text-xs font-bold uppercase font-mono text-foreground print:text-black mb-2">
                      Testing &amp; DevOps Quality
                    </h3>
                    <p className="text-xs text-muted-foreground print:text-gray-700 leading-relaxed font-mono">
                      Jest Unit Testing, Supertest Integration Testing, ESLint, Git Version Control, Agile/Scrum Methodologies
                    </p>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 print:text-blue-700 mb-6 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-emerald-500/30 pl-4 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="text-base font-bold text-foreground print:text-black">
                          {exp.role} <span className="text-emerald-600 dark:text-emerald-400 font-medium">@ {exp.company}</span>
                        </h3>
                        <span className="text-xs font-mono text-muted-foreground print:text-gray-600">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground print:text-gray-700 leading-relaxed pt-1">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.skills.map((s, idx) => (
                          <span key={idx} className="text-[10px] bg-muted/60 print:bg-gray-100 px-2 py-0.5 rounded font-mono text-muted-foreground print:text-black">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Qualifications */}
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 print:text-blue-700 mb-6 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Education &amp; Academic Qualifications
                </h2>
                <div className="space-y-6">
                  {educations.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-emerald-500/30 pl-4 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="text-base font-bold text-foreground print:text-black">
                          {edu.degree}{" "}
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            — {edu.grade}
                          </span>
                        </h3>
                        <span className="text-xs font-mono text-muted-foreground print:text-gray-600">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-xs font-mono font-semibold text-foreground/80 print:text-gray-700">
                        {edu.institution} • {edu.location}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground print:text-gray-700 leading-relaxed pt-1">
                        {edu.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {edu.highlights.map((h, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-muted/60 print:bg-gray-100 px-2 py-0.5 rounded font-mono text-muted-foreground print:text-black"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
