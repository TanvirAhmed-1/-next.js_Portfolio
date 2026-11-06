"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Download,
  Terminal,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  FileText,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaNodeJs, FaReact, FaDocker } from "react-icons/fa";
import { SiNestjs, SiNextdotjs, SiTypescript, SiPostgresql, SiRedis, SiRabbitmq } from "react-icons/si";
import { IProfile } from "@/server/modules/profile/profile.interface";

interface HeroSectionProps {
  profile?: IProfile | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<"service" | "architecture">("service");

  const email = profile?.email || "tanvir.dev@example.com";
  const phone = profile?.phone || "+880 1700-000000";
  const location = profile?.location || "Dhaka, Bangladesh";
  const resumeUrl = profile?.resumeUrl || "/resume";
  const avatarUrl =
    profile?.avatarUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden bg-tech-grid">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-100/50 via-cyan-100/40 to-indigo-100/40 blur-3xl pointer-events-none rounded-full -z-10 dark:from-emerald-500/15 dark:via-cyan-500/10 dark:to-indigo-500/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 text-xs font-mono font-semibold text-emerald-700 shadow-xs dark:bg-emerald-500/10 dark:text-emerald-400 animate-in fade-in duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>Available for Senior Full-Stack &amp; Backend Roles</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
              Architecting Resilient{" "}
              <span className="text-rose-600 dark:text-rose-400 font-extrabold">
                NestJS
              </span>{" "}
              Backends &amp; Modern{" "}
              <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                Next.js
              </span>{" "}
              Applications
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Hi, I&apos;m <strong className="text-foreground font-semibold">{profile?.name || "Tanvir Ahmed"}</strong>. A Senior Full-Stack Engineer specializing in high-concurrency event-driven microservices, clean hexagonal architectures, PostgreSQL query tuning, and responsive Next.js web applications.
            </p>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs font-mono">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-xs"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:border-cyan-500 hover:text-cyan-600 transition-colors shadow-xs"
              >
                <Mail className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                {email}
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground shadow-xs">
                <MapPin className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                {location}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a href="#projects">
                <Button size="lg" className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
                  Explore Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>

              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                <Button size="lg" variant="outline" className="gap-2 border-border/80 hover:border-cyan-500/50 hover:bg-cyan-500/10">
                  <Download className="h-4 w-4 text-cyan-400" />
                  Download CV / Resume
                </Button>
              </a>

              <a href="#contact">
                <Button size="lg" variant="ghost" className="gap-2 hover:bg-card">
                  Contact Me
                </Button>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border/60 text-center lg:text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono block">
                  {profile?.yearsOfExperience || 5}+
                </span>
                <span className="text-xs text-muted-foreground font-medium">Years Experience</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono block">
                  {profile?.projectsCompleted || 35}+
                </span>
                <span className="text-xs text-muted-foreground font-medium">Delivered Projects</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono block">
                  99.99%
                </span>
                <span className="text-xs text-muted-foreground font-medium">High Availability</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono block">
                  &lt;1.8ms
                </span>
                <span className="text-xs text-muted-foreground font-medium">P99 Microservice</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal & Developer Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xl shadow-2xl overflow-hidden">
              
              {/* Profile Card Header */}
              <div className="p-4 border-b border-border/60 bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={avatarUrl}
                      alt={profile?.name || "Tanvir Ahmed"}
                      className="h-12 w-12 rounded-xl object-cover border-2 border-emerald-500/40"
                    />
                    <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-emerald-500 border-2 border-card rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      {profile?.name || "Tanvir Ahmed"}
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-mono line-clamp-1">
                      {profile?.title || "Senior Full-Stack Engineer"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              {/* Terminal Tabs */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border/40 bg-muted/20 text-xs font-mono">
                <button
                  onClick={() => setActiveTab("service")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === "service"
                      ? "bg-primary/20 text-emerald-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  GatewayController.ts
                </button>
                <button
                  onClick={() => setActiveTab("architecture")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === "architecture"
                      ? "bg-primary/20 text-emerald-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  system_status.json
                </button>
              </div>

              {/* Code Snippet Box */}
              <div className="p-4 font-mono text-xs overflow-x-auto leading-relaxed bg-slate-950/80 min-h-[220px]">
                {activeTab === "service" ? (
                  <pre className="text-slate-300">
                    <span className="text-purple-400">@Controller</span>
                    <span className="text-slate-400">(</span>
                    <span className="text-emerald-300">&apos;api/v1/orders&apos;</span>
                    <span className="text-slate-400">)</span>
                    {"\n"}
                    <span className="text-blue-400">export class</span>{" "}
                    <span className="text-amber-300">OrderGatewayController</span> &#123;{"\n"}
                    {"  "}
                    <span className="text-purple-400">@Post</span>
                    <span className="text-slate-400">()</span>
                    {"\n"}
                    {"  "}
                    <span className="text-blue-400">async</span>{" "}
                    <span className="text-teal-300">dispatchOrder</span>
                    <span className="text-slate-400">(</span>
                    <span className="text-purple-400">@Body</span>
                    <span className="text-slate-400">() dto: </span>
                    <span className="text-amber-300">CreateOrderDto</span>
                    <span className="text-slate-400">) &#123;</span>
                    {"\n"}
                    {"    "}
                    <span className="text-slate-500">// Distributed RabbitMQ publisher</span>
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">await</span>{" "}
                    <span className="text-indigo-400">this</span>.queue.emit(
                    <span className="text-emerald-300">&apos;order.created&apos;</span>, dto);
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">return</span> &#123;{" "}
                    <span className="text-sky-300">status</span>:{" "}
                    <span className="text-emerald-400">201</span>,{" "}
                    <span className="text-sky-300">queued</span>:{" "}
                    <span className="text-amber-400">true</span> &#125;;
                    {"\n"}
                    {"  "}&#125;{"\n"}
                    &#125;
                  </pre>
                ) : (
                  <pre className="text-slate-300">
                    &#123;{"\n"}
                    {"  "}<span className="text-sky-400">&quot;cluster_status&quot;</span>: <span className="text-emerald-400">&quot;HEALTHY&quot;</span>,{"\n"}
                    {"  "}<span className="text-sky-400">&quot;database&quot;</span>: &#123;{"\n"}
                    {"    "}<span className="text-sky-400">&quot;engine&quot;</span>: <span className="text-amber-300">&quot;PostgreSQL 16&quot;</span>,{"\n"}
                    {"    "}<span className="text-sky-400">&quot;orm&quot;</span>: <span className="text-teal-300">&quot;Prisma Client&quot;</span>,{"\n"}
                    {"    "}<span className="text-sky-400">&quot;pool_size&quot;</span>: <span className="text-purple-400">20</span>{"\n"}
                    {"  "}&#125;,{"\n"}
                    {"  "}<span className="text-sky-400">&quot;caching&quot;</span>: <span className="text-emerald-400">&quot;Redis 7.2 Multi-Node&quot;</span>,{"\n"}
                    {"  "}<span className="text-sky-400">&quot;cloud_storage&quot;</span>: <span className="text-cyan-400">&quot;Cloudinary CDN&quot;</span>,{"\n"}
                    {"  "}<span className="text-sky-400">&quot;p99_latency_ms&quot;</span>: <span className="text-emerald-400">1.42</span>{"\n"}
                    &#125;
                  </pre>
                )}
              </div>

              {/* Floating tech badge bar */}
              <div className="p-3 border-t border-border/60 bg-muted/40 flex items-center justify-between text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                    <SiNestjs className="text-red-500" /> NestJS
                  </span>
                  <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                    <SiNextdotjs className="text-foreground" /> Next.js 16
                  </span>
                  <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <SiPostgresql className="text-sky-500" /> PostgreSQL
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}