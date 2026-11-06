"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Terminal, Sparkles, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaNodeJs, FaReact, FaDocker } from "react-icons/fa";
import { SiNestjs, SiNextdotjs, SiTypescript, SiPostgresql } from "react-icons/si";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary/10 via-emerald-500/5 to-cyan-500/10 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/80 bg-background/60 backdrop-blur-sm text-xs font-medium text-foreground mb-6 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Senior Full-Stack & Backend Engineering Roles</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-6">
            Architecting Resilient{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              NestJS Backends
            </span>{" "}
            & Modern{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Next.js
            </span>{" "}
            Applications
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
            Hi, I&apos;m <strong className="text-foreground font-semibold">Tanvir Ahmed</strong>. A Senior Full-Stack Software Engineer specializing in scalable microservices, clean architecture, high-performance APIs, and reactive frontend experiences.
          </p>

          {/* Key Engineering Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 text-xs sm:text-sm text-muted-foreground font-mono">
            <span className="inline-flex items-center gap-1.5 bg-muted/60 px-3 py-1 rounded-md">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Microservices & DDD
            </span>
            <span className="inline-flex items-center gap-1.5 bg-muted/60 px-3 py-1 rounded-md">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Next.js 16 App Router
            </span>
            <span className="inline-flex items-center gap-1.5 bg-muted/60 px-3 py-1 rounded-md">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              PostgreSQL & Redis
            </span>
            <span className="inline-flex items-center gap-1.5 bg-muted/60 px-3 py-1 rounded-md">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Docker & Cloud CI/CD
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a href="#projects" className="w-full sm:w-auto">
              <Button size="lg" className="w-full gap-2 px-6 shadow-sm">
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full gap-2 px-6">
                Contact Me
              </Button>
            </a>
            <Link href="/admin" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full gap-2 px-6 font-mono text-xs">
                <Terminal className="h-4 w-4 text-primary" />
                CMS Admin Panel
              </Button>
            </Link>
          </div>

          {/* Socials & Tech Bar */}
          <div className="mt-16 pt-8 border-t border-border/50 w-full flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-5">
              Core Production Stack
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 text-2xl text-muted-foreground/80">
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium hover:text-[#ea2849] transition-colors">
                <SiNestjs className="text-xl text-[#ea2849]" /> NestJS
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium hover:text-foreground transition-colors">
                <SiNextdotjs className="text-xl" /> Next.js
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium hover:text-[#3178c6] transition-colors">
                <SiTypescript className="text-xl text-[#3178c6]" /> TypeScript
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium hover:text-[#61dafb] transition-colors">
                <FaReact className="text-xl text-[#61dafb]" /> React 19
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium hover:text-[#336791] transition-colors">
                <SiPostgresql className="text-xl text-[#336791]" /> PostgreSQL
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium hover:text-[#2496ed] transition-colors">
                <FaDocker className="text-xl text-[#2496ed]" /> Docker
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

