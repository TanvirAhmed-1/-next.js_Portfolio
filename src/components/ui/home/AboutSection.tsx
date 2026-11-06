"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Server, ShieldCheck, Zap, Code2, Cpu } from "lucide-react";

export function AboutSection() {
  const highlights = [
    {
      icon: Server,
      title: "Backend & Distributed Systems",
      desc: "Architecting modular NestJS microservices, Redis pub/sub, RabbitMQ queues, and robust REST/GraphQL APIs.",
    },
    {
      icon: Layers,
      title: "Full-Stack Web Engineering",
      desc: "Building SSR/SSG apps using Next.js 16 App Router, React 19, Tailwind CSS, Base UI, and Server Actions.",
    },
    {
      icon: ShieldCheck,
      title: "Clean Architecture & Security",
      desc: "Implementing Domain-Driven Design (DDD), SOLID principles, OAuth2/JWT security, and strict data validation.",
    },
    {
      icon: Zap,
      title: "High Performance & Scalability",
      desc: "Database query optimization with PostgreSQL & Prisma, multi-tier caching with Redis, and containerization with Docker.",
    },
  ];

  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "35+", label: "Projects Delivered" },
    { value: "99.9%", label: "Uptime Focus" },
    { value: "100%", label: "Clean TypeScript" },
  ];

  return (
    <section id="about" className="py-20 bg-muted/20 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-3 font-mono text-xs">
            About Me
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Engineering High-Impact Digital Solutions
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl text-base sm:text-lg">
            A deep focus on clean code, automated testing, maintainable architectures, and modern developer tooling.
          </p>
        </div>

        {/* Bio + Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-xs">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                Senior Engineering Philosophy
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                I believe software engineering is about solving complex domain problems with the simplest, most resilient architecture possible. My journey spans developing enterprise microservices in <strong className="text-foreground">NestJS</strong>, building modern interactive web experiences with <strong className="text-foreground">Next.js</strong>, and optimizing databases for millions of queries.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed text-sm sm:text-base">
                Whether deploying containerized applications with Docker or ensuring seamless CI/CD delivery to Vercel and AWS, I prioritize code readability, comprehensive automated testing, and developer ergonomics.
              </p>

              {/* Quick stats strip */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/40">
                {stats.map((s, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">
                      {s.value}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Core Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className="p-6 transition-all duration-200 hover:shadow-md hover:border-primary/40 bg-card/80 backdrop-blur-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-base text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

