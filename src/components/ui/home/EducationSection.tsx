"use client";

import React from "react";
import { Education } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface EducationSectionProps {
  educations: Education[];
}

export function EducationSection({ educations }: EducationSectionProps) {
  if (!educations || educations.length === 0) return null;

  return (
    <section
      id="education"
      className="py-14 sm:py-16 bg-slate-50/60 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-cyan-500/10 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 motion-preset-slide-up motion-duration-700">
          <Badge
            variant="outline"
            className="mb-3 font-mono text-xs border-emerald-200 text-emerald-800 bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/10 px-3 py-1 font-semibold"
          >
            Academic Background
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Education &amp; Qualifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4 mb-3" />
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Academic degrees and foundations in Computer Science, Software Engineering, and Technology.
          </p>
        </div>

        {/* Education Timeline / Showcase Stack */}
        <div className="space-y-4 sm:space-y-5">
          {educations.map((edu, index) => {
            const isOngoing =
              edu.status?.toLowerCase().includes("ongoing") ||
              edu.status?.toLowerCase().includes("running") ||
              edu.period?.toLowerCase().includes("present");

            return (
              <ScrollReveal
                key={edu.id || index}
                direction="up"
                delay={index * 0.15}
              >
                <div
                  className={`group relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isOngoing
                      ? "bg-white dark:bg-slate-900/90 border-emerald-500/50 shadow-md ring-2 ring-emerald-500/10 hover:border-emerald-500"
                      : "bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-emerald-500/40"
                  }`}
                >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left Column: Icon + Primary Academic Details */}
                  <div className="flex items-start gap-4 sm:gap-5 flex-1">
                    {/* Degree Icon */}
                    <div
                      className={`h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-xs ${
                        isOngoing
                          ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/30"
                      }`}
                    >
                      {index === 0 ? (
                        <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8" />
                      ) : index === 1 ? (
                        <Award className="h-7 w-7 sm:h-8 sm:w-8" />
                      ) : (
                        <BookOpen className="h-7 w-7 sm:h-8 sm:w-8" />
                      )}
                    </div>

                    {/* Degree Info */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Top Row: Title + Status Pill */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                          {edu.degree}
                        </h3>

                        {isOngoing ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30 shadow-2xs">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            {edu.status || "Running"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                            {edu.status || "Completed"}
                          </span>
                        )}
                      </div>

                      {/* Institution */}
                      <p className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 pt-0.5">
                        <Building2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{edu.institution}</span>
                      </p>

                      {/* Major / Field */}
                      {edu.field && (
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 font-mono">
                          {edu.field}
                        </p>
                      )}

                      {/* Description */}
                      {edu.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1.5">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Meta Pills (Duration, Location, Grade) */}
                  <div className="flex flex-wrap lg:flex-col items-start lg:items-end justify-between lg:justify-start gap-2.5 shrink-0 pt-4 lg:pt-0 border-t border-slate-100 dark:border-slate-800/80 lg:border-t-0">
                    {/* Period / Timeline */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                      <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{edu.period}</span>
                    </div>

                    {/* Location */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-400 shrink-0" />
                      <span>{edu.location}</span>
                    </div>

                    {/* Grade / CGPA */}
                    {edu.grade && (
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-500/30 shadow-2xs">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{edu.grade}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
          })}
        </div>
      </div>
    </section>
  );
}
