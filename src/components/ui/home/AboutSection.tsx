"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Layers, Server, ShieldCheck, Zap, Code2, Cpu, CheckCircle2, GitBranch } from "lucide-react";
import { IProfile } from "@/server/modules/profile/profile.interface";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface AboutSectionProps {
  profile?: IProfile | null;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const highlights = [
    {
      icon: Server,
      title: "Backend & Distributed Systems",
      desc: "Architecting modular NestJS microservices, Redis caching, RabbitMQ queues, and robust REST/GraphQL APIs with strict SOLID principles.",
      accent: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20",
    },
    {
      icon: Layers,
      title: "Full-Stack Web Engineering",
      desc: "Building SSR/SSG apps using Next.js 16 App Router, React 19, Tailwind CSS, Base UI, and Server Actions for sub-second FCP.",
      accent: "text-teal-700 bg-teal-50 border-teal-200 dark:text-cyan-400 dark:bg-cyan-500/10 dark:border-cyan-500/20",
    },
    {
      icon: ShieldCheck,
      title: "Clean Architecture & Security",
      desc: "Implementing Domain-Driven Design (DDD), Hexagonal Architecture, JWT/OAuth2 security, rate-limiting, and Zod runtime schema validation.",
      accent: "text-indigo-700 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/20",
    },
    {
      icon: Zap,
      title: "High Performance & Scalability",
      desc: "PostgreSQL query optimization with B-Tree indexes, connection pooling, Docker containerization, and Cloudinary media optimization.",
      accent: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20",
    },
  ];

  const years = profile?.yearsOfExperience || 5;
  const projectsCount = profile?.projectsCompleted || 35;

  const stats = [
    { value: `${years}+`, label: "Years Experience" },
    { value: `${projectsCount}+`, label: "Production Apps" },
    { value: "99.99%", label: "Uptime Focus" },
    { value: "100%", label: "TypeScript Purity" },
  ];

  return (
    <section id="about" className="py-14 sm:py-16 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <Badge variant="outline" className="mb-3 font-mono text-xs border-emerald-200 text-emerald-800 bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/5 px-3 py-1">
            Engineering Identity
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Engineering High-Impact Digital Solutions
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-base sm:text-lg">
            A relentless focus on clean code, automated testing, maintainable architectures, and resilient developer tooling.
          </p>
        </ScrollReveal>

        {/* Bio + Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Bio Narrative */}
          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-50/80 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-emerald-100/80 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <Code2 className="h-5 w-5" />
                </span>
                Senior Engineering Philosophy
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {profile?.about ||
                  "I believe software engineering is about solving complex domain problems with the simplest, most resilient architecture possible. My journey spans developing enterprise microservices in NestJS, building modern interactive web experiences with Next.js, and optimizing databases for millions of queries."}
              </p>
              
              <div className="mt-5 pt-5 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5 text-xs font-mono">
                <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Domain-Driven Design (DDD) &amp; Modular Systems</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 dark:text-cyan-400 shrink-0" />
                  <span>Zero-Downtime Deployments &amp; Dockerized Stacks</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>PostgreSQL Index Tuning &amp; High-Throughput Caching</span>
                </div>
              </div>
            </div>

            {/* Quick stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              {stats.map((s, idx) => (
                <div key={idx} className="flex flex-col p-2.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                  <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                    {s.value}
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Column: 4 Core Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal
                  key={idx}
                  direction="up"
                  delay={0.15 + idx * 0.1}
                  className="p-6 rounded-2xl bg-slate-50/60 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800/80 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 border shadow-2xs ${item.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                    <GitBranch className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Production Tested
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
