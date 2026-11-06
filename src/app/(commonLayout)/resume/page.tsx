"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { initialProfile, experiences, initialSkills } from "@/data/initial-data";
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
  Award,
  Terminal,
  Phone,
  Download,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IProfile } from "@/server/modules/profile/profile.interface";

export default function ResumePage() {
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProfile(data.data);
        }
      })
      .catch((err) => console.error("Failed to load profile", err));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const name = profile?.name || initialProfile.name;
  const title = profile?.title || initialProfile.title;
  const email = profile?.email || initialProfile.email;
  const phone = profile?.phone || "+880 1700-000000";
  const location = profile?.location || initialProfile.location;
  const about = profile?.about || initialProfile.about;
  const github = profile?.github || initialProfile.github;
  const linkedin = profile?.linkedin || initialProfile.linkedin;
  const resumeUrl = profile?.resumeUrl || "/resume";

  return (
    <div className="min-h-screen py-24 sm:py-32 bg-background text-foreground print:py-0 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Print Bar (Hidden in print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                <Button size="sm" variant="outline" className="gap-2 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10">
                  <Download className="h-4 w-4" />
                  Download Verified PDF
                </Button>
              </a>
            )}

            <Button onClick={handlePrint} size="sm" className="gap-2">
              <Printer className="h-4 w-4" />
              Print / Save PDF
            </Button>
          </div>
        </div>

        {/* Resume Sheet */}
        <div className="bg-card print:bg-white border border-border/80 print:border-none rounded-2xl p-8 sm:p-12 shadow-sm print:shadow-none space-y-10">
          {/* Header */}
          <div className="border-b border-border/60 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground print:text-black mb-1">
                {name}
              </h1>
              <p className="text-base sm:text-lg font-mono font-medium text-emerald-400 print:text-blue-600">
                {title}
              </p>
            </div>

            <div className="text-xs text-muted-foreground print:text-gray-600 space-y-1.5 font-mono">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-emerald-400" />
                <a href={`tel:${phone}`} className="hover:underline">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                <a href={`mailto:${email}`} className="hover:underline">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
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
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-blue-700 mb-3 flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Executive Summary
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground print:text-gray-800 leading-relaxed">
              {about}
            </p>
          </div>

          {/* Core Technical Arsenal */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-blue-700 mb-4 flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 print:border-gray-200">
                <h3 className="text-xs font-bold uppercase font-mono text-foreground print:text-black mb-2">
                  Backend & Systems Architecture
                </h3>
                <p className="text-xs text-muted-foreground print:text-gray-700 leading-relaxed font-mono">
                  NestJS, Node.js, Express, TypeScript, Microservices, RabbitMQ, Redis, GraphQL, REST APIs, SOLID Principles, Clean Architecture
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 print:border-gray-200">
                <h3 className="text-xs font-bold uppercase font-mono text-foreground print:text-black mb-2">
                  Database & Cloud Infrastructure
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
                  Testing & DevOps Quality
                </h3>
                <p className="text-xs text-muted-foreground print:text-gray-700 leading-relaxed font-mono">
                  Jest Unit Testing, Supertest Integration Testing, ESLint, Git Version Control, Agile/Scrum Methodologies
                </p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-blue-700 mb-6 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Work Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-emerald-500/30 pl-4 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-foreground print:text-black">
                      {exp.role} <span className="text-emerald-400 font-medium">@ {exp.company}</span>
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
        </div>
      </div>
    </div>
  );
}
