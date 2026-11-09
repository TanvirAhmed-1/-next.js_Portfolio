"use client";

import React from "react";
import { Education } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface EducationSectionProps {
  educations: Education[];
}

export function EducationSection({ educations }: EducationSectionProps) {
  if (!educations || educations.length === 0) return null;

  return (
    <section
      id="education"
      className="py-24 bg-slate-50/90 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge
            variant="outline"
            className="mb-3 font-mono text-xs border-emerald-200 text-emerald-800 bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/5 px-3 py-1"
          >
            Academic Background
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Education &amp; Qualifications
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl">
            Academic foundation in Computer Science &amp; Engineering combined with specialized full-stack and backend systems training.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {educations.map((edu, index) => {
            const isPrimary = index === 0;
            return (
              <div
                key={edu.id}
                className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isPrimary
                    ? "bg-white dark:bg-slate-900 border-emerald-500/60 shadow-lg ring-2 ring-emerald-500/15"
                    : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-emerald-500/40"
                }`}
              >
                {/* Top Status Ribbon for Primary Degree */}
                {edu.status && (
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div
                      className={`h-12 w-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                        isPrimary
                          ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {index === 1 ? (
                        <Award className="h-6 w-6" />
                      ) : (
                        <GraduationCap className="h-6 w-6" />
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200/80 dark:border-slate-700">
                        <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        {edu.period}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        {edu.grade}
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  {/* Degree & Field */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-1.5">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
                    {edu.field}
                  </p>

                  {/* Institution & Location */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium mb-4 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                      <BookOpen className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      {edu.institution}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {edu.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {edu.description}
                  </p>
                </div>

                {/* Key Coursework / Highlights */}
                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800">
                    <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-slate-500 dark:text-slate-400 block mb-2.5">
                      Key Coursework &amp; Focus Areas:
                    </span>
                    <div className="space-y-2">
                      {edu.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-mono font-medium"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

