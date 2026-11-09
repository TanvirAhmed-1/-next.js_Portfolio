"use client";

import React from "react";
import { Experience } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-slate-900/20 border-b border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-3 font-mono text-xs border-emerald-200 text-emerald-800 bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/5 px-3 py-1">
            Work Experience
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Career Timeline &amp; Professional Impact
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl">
            Track record of shipping enterprise microservices and mission-critical full stack platforms.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-emerald-200 dark:border-slate-800 ml-4 md:ml-36 space-y-10">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 md:pl-10 group">
              {/* Timeline marker */}
              <div className="absolute -left-[9px] top-6 h-4 w-4 rounded-full border-2 border-emerald-600 bg-white dark:bg-slate-950 group-hover:bg-emerald-600 group-hover:scale-125 transition-all shadow-xs" />

              {/* Date pill on left for desktop */}
              <div className="md:absolute md:-left-40 md:top-5 flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 mb-2 md:mb-0 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-slate-700 w-fit">
                <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 md:hidden" />
                {exp.period}
              </div>

              {/* Card content */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-50/70 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-3 py-1 rounded-full font-mono w-fit">
                    <Briefcase className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    {exp.company}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-mono font-medium py-0.5 px-2.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

