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
    <section id="experience" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-3 font-mono text-xs">
            Work Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Career Timeline & Professional Impact
          </h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
            Track record of shipping enterprise microservices and mission-critical full stack platforms.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-border/60 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="relative pl-8 md:pl-10 group">
              {/* Timeline marker */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors" />

              {/* Date pill on left for desktop */}
              <div className="md:absolute md:-left-36 md:top-1 flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground mb-2 md:mb-0">
                <Calendar className="h-3.5 w-3.5 text-primary md:hidden" />
                {exp.period}
              </div>

              {/* Card content */}
              <div className="p-6 rounded-xl bg-card border border-border/60 shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-semibold text-primary font-mono">
                    {exp.company}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill, sIdx) => (
                    <Badge
                      key={sIdx}
                      variant="secondary"
                      className="text-[11px] font-mono py-0 px-2 font-normal"
                    >
                      {skill}
                    </Badge>
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

