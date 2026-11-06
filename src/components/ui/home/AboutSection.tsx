"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Layers, Server, ShieldCheck, Zap, Code2, Cpu, CheckCircle2, GitBranch } from "lucide-react";
import { IProfile } from "@/server/modules/profile/profile.interface";

interface AboutSectionProps {
  profile?: IProfile | null;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const highlights = [
    {
      icon: Server,
      title: "Backend & Distributed Systems",
      desc: "Architecting modular NestJS microservices, Redis caching, RabbitMQ queues, and robust REST/GraphQL APIs with strict SOLID principles.",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: Layers,
      title: "Full-Stack Web Engineering",
      desc: "Building SSR/SSG apps using Next.js 16 App Router, React 19, Tailwind CSS, Base UI, and Server Actions for sub-second FCP.",
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      icon: ShieldCheck,
      title: "Clean Architecture & Security",
      desc: "Implementing Domain-Driven Design (DDD), Hexagonal Architecture, JWT/OAuth2 security, rate-limiting, and Zod runtime schema validation.",
      accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: Zap,
      title: "High Performance & Scalability",
      desc: "PostgreSQL query optimization with B-Tree indexes, connection pooling, Docker containerization, and Cloudinary media optimization.",
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
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
    <section id="about" className="py-24 bg-slate-50/70 dark:bg-card/40 border-y border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-3 font-mono text-xs border-emerald-500/30 text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/5">
            Engineering Identity
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Engineering High-Impact Digital Solutions
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl text-base sm:text-lg">
            A relentless focus on clean code, automated testing, maintainable architectures, and resilient developer tooling.
          </p>
        </div>

        {/* Bio + Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Bio Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-xl">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-emerald-400" />
                Senior Engineering Philosophy
              </h3>
              
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {profile?.about ||
                  "I believe software engineering is about solving complex domain problems with the simplest, most resilient architecture possible. My journey spans developing enterprise microservices in NestJS, building modern interactive web experiences with Next.js, and optimizing databases for millions of queries."}
              </p>
              
              <div className="mt-4 pt-4 border-t border-border/40 space-y-2 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Domain-Driven Design (DDD) & Modular Systems</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span>Zero-Downtime Deployments & Dockerized Stacks</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                  <span>PostgreSQL Index Tuning & High-Throughput Caching</span>
                </div>
              </div>
            </div>

            {/* Quick stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-border/60">
              {stats.map((s, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl font-black text-foreground font-mono">
                    {s.value}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Core Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card border border-border/80 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 border ${item.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-base text-foreground mb-2 group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/30 flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                    <GitBranch className="h-3 w-3 text-emerald-400" /> Production Tested
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
