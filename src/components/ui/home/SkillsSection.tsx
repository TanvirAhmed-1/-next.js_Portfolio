"use client";

import React, { useState } from "react";
import { Skill, SkillCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { SkillFormDialog } from "@/components/admin/SkillFormDialog";
import {
  Terminal,
  Layers,
  Cpu,
  Database,
  Wrench,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

interface SkillsSectionProps {
  initialSkills: Skill[];
}

// Fallback/starter default skill items if not yet in database
const DEFAULT_STACK_ITEMS = {
  languages: [
    { id: "lang-1", name: "JavaScript (ES6+)", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "SiJavascript" },
    { id: "lang-2", name: "TypeScript", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "SiTypescript" },
    { id: "lang-3", name: "C Language", category: "Backend" as SkillCategory, level: "Advanced" as const, proficiency: 85, iconName: "FaCode" },
  ],
  frontend: [
    { id: "fe-1", name: "React.js", category: "Frontend" as SkillCategory, level: "Expert" as const, proficiency: 94, iconName: "FaReact" },
    { id: "fe-2", name: "Next.js", category: "Frontend" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "SiNextdotjs" },
    { id: "fe-3", name: "Redux Toolkit", category: "Frontend" as SkillCategory, level: "Advanced" as const, proficiency: 88, iconName: "SiRedux" },
    { id: "fe-4", name: "Tailwind CSS", category: "Frontend" as SkillCategory, level: "Expert" as const, proficiency: 96, iconName: "SiTailwindcss" },
    { id: "fe-5", name: "HTML5", category: "Frontend" as SkillCategory, level: "Expert" as const, proficiency: 98, iconName: "FaHtml5" },
    { id: "fe-6", name: "CSS3", category: "Frontend" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "FaCss3Alt" },
  ],
  backend: [
    { id: "be-1", name: "Node.js", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 92, iconName: "FaNodeJs" },
    { id: "be-2", name: "Express.js", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 90, iconName: "SiExpress" },
    { id: "be-3", name: "NestJS", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "SiNestjs" },
    { id: "be-4", name: "Prisma ORM", category: "Backend" as SkillCategory, level: "Advanced" as const, proficiency: 90, iconName: "SiPrisma" },
    { id: "be-5", name: "RESTful APIs", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 94, iconName: "SiGraphql" },
  ],
  database: [
    { id: "db-1", name: "MongoDB", category: "Database" as SkillCategory, level: "Advanced" as const, proficiency: 88, iconName: "SiMongodb" },
    { id: "db-2", name: "Mongoose", category: "Database" as SkillCategory, level: "Advanced" as const, proficiency: 88, iconName: "SiMongodb" },
    { id: "db-3", name: "PostgreSQL", category: "Database" as SkillCategory, level: "Advanced" as const, proficiency: 90, iconName: "SiPostgresql" },
    { id: "db-4", name: "MySQL", category: "Database" as SkillCategory, level: "Intermediate" as const, proficiency: 82, iconName: "SiMysql" },
    { id: "db-5", name: "Redis", category: "Database" as SkillCategory, level: "Advanced" as const, proficiency: 85, iconName: "SiRedis" },
  ],
  tools: [
    { id: "tool-1", name: "Git", category: "Tools & Others" as SkillCategory, level: "Expert" as const, proficiency: 92, iconName: "FaGitAlt" },
    { id: "tool-2", name: "GitHub", category: "Tools & Others" as SkillCategory, level: "Expert" as const, proficiency: 92, iconName: "FaGithub" },
    { id: "tool-3", name: "VS Code", category: "Tools & Others" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "FaCode" },
    { id: "tool-4", name: "Docker", category: "DevOps & Cloud" as SkillCategory, level: "Advanced" as const, proficiency: 85, iconName: "FaDocker" },
    { id: "tool-5", name: "Figma", category: "Tools & Others" as SkillCategory, level: "Intermediate" as const, proficiency: 78, iconName: "FaFigma" },
    { id: "tool-6", name: "Firebase", category: "DevOps & Cloud" as SkillCategory, level: "Intermediate" as const, proficiency: 80, iconName: "SiFirebase" },
    { id: "tool-7", name: "Vercel", category: "DevOps & Cloud" as SkillCategory, level: "Expert" as const, proficiency: 92, iconName: "SiVercel" },
    { id: "tool-8", name: "Netlify", category: "DevOps & Cloud" as SkillCategory, level: "Advanced" as const, proficiency: 88, iconName: "SiNetlify" },
    { id: "tool-9", name: "Cloudinary", category: "DevOps & Cloud" as SkillCategory, level: "Advanced" as const, proficiency: 90, iconName: "SiCloudinary" },
  ],
};

const getSkillDotColor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes("type") || n.includes("ts")) return "bg-blue-500";
  if (n.includes("java") || n.includes("js")) return "bg-amber-400";
  if (n.includes("c lang") || n.includes("c++") || n.includes("c#")) return "bg-indigo-400";
  if (n.includes("react")) return "bg-cyan-400";
  if (n.includes("next")) return "bg-slate-300";
  if (n.includes("redux")) return "bg-purple-400";
  if (n.includes("tailwind")) return "bg-teal-400";
  if (n.includes("html")) return "bg-orange-400";
  if (n.includes("css")) return "bg-blue-400";
  if (n.includes("node")) return "bg-emerald-500";
  if (n.includes("express")) return "bg-slate-300";
  if (n.includes("nest")) return "bg-red-500";
  if (n.includes("prisma")) return "bg-cyan-300";
  if (n.includes("rest") || n.includes("api") || n.includes("graph")) return "bg-amber-500";
  if (n.includes("mongo") && !n.includes("mongoose")) return "bg-green-500";
  if (n.includes("mongoose")) return "bg-red-400";
  if (n.includes("postgre")) return "bg-sky-500";
  if (n.includes("mysql")) return "bg-orange-400";
  if (n.includes("redis")) return "bg-rose-500";
  if (n.includes("git") && !n.includes("hub")) return "bg-orange-600";
  if (n.includes("github")) return "bg-slate-100";
  if (n.includes("code") || n.includes("vs")) return "bg-blue-500";
  if (n.includes("docker")) return "bg-sky-400";
  if (n.includes("figma")) return "bg-purple-500";
  if (n.includes("fire")) return "bg-amber-500";
  if (n.includes("vercel")) return "bg-white";
  if (n.includes("cloud")) return "bg-blue-400";
  if (n.includes("netli")) return "bg-teal-300";
  return "bg-emerald-400";
};

interface SkillItem {
  id: string;
  name: string;
  category?: string;
  level?: string;
  proficiency?: number;
  iconName?: string;
  iconImage?: string;
  createdAt?: string;
}

export function SkillsSection({ initialSkills }: SkillsSectionProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills || []);
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Group skills into the 5 structured categories
  const categorizeSkills = () => {
    // Check if initialSkills has items
    const all = skills.length > 0 ? skills : [
      ...DEFAULT_STACK_ITEMS.languages,
      ...DEFAULT_STACK_ITEMS.frontend,
      ...DEFAULT_STACK_ITEMS.backend,
      ...DEFAULT_STACK_ITEMS.database,
      ...DEFAULT_STACK_ITEMS.tools,
    ];

    const isLang = (name: string) => {
      const n = name.toLowerCase();
      return (
        n.includes("javascript") ||
        n.includes("typescript") ||
        n.includes("c lang") ||
        n.includes("python") ||
        n.includes("sql")
      );
    };

    const languages = all.filter((s) => isLang(s.name));
    const frontend = all.filter((s) => s.category === "Frontend" && !isLang(s.name));
    const backend = all.filter((s) => s.category === "Backend" && !isLang(s.name));
    const database = all.filter((s) => s.category === "Database");
    const tools = all.filter(
      (s) => (s.category === "DevOps & Cloud" || s.category === "Tools & Others") && !isLang(s.name)
    );

    // If any group is empty, ensure rich defaults from DEFAULT_STACK_ITEMS
    return {
      languages: languages.length > 0 ? languages : DEFAULT_STACK_ITEMS.languages,
      frontend: frontend.length > 0 ? frontend : DEFAULT_STACK_ITEMS.frontend,
      backend: backend.length > 0 ? backend : DEFAULT_STACK_ITEMS.backend,
      database: database.length > 0 ? database : DEFAULT_STACK_ITEMS.database,
      tools: tools.length > 0 ? tools : DEFAULT_STACK_ITEMS.tools,
    };
  };

  const groups = categorizeSkills();

  const handleAddSuccess = (newOrUpdated: Skill) => {
    setSkills((prev) => {
      const exists = prev.some((s) => s.id === newOrUpdated.id);
      if (exists) {
        return prev.map((s) => (s.id === newOrUpdated.id ? newOrUpdated : s));
      }
      return [...prev, newOrUpdated];
    });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete skill "${name}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
        toast.success(`Skill "${name}" deleted`);
      } else {
        toast.error(result.error || "Failed to delete skill");
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Failed to delete skill");
    } finally {
      setDeletingId(null);
    }
  };

  const renderSkillPill = (skill: SkillItem) => {
    const dotColor = getSkillDotColor(skill.name);
    const isCustom = !skill.id.startsWith("lang-") && !skill.id.startsWith("fe-") && !skill.id.startsWith("be-") && !skill.id.startsWith("db-") && !skill.id.startsWith("tool-");

    return (
      <div
        key={skill.id}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/90 border border-slate-200/90 text-slate-800 font-mono text-xs hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-muted/60 dark:border-border/60 dark:text-foreground dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 transition-all cursor-default shadow-xs"
      >
        {skill.iconImage ? (
          <img
            src={skill.iconImage}
            alt={skill.name}
            className="w-4 h-4 object-contain rounded-xs shrink-0"
          />
        ) : (
          <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
        )}
        <span>{skill.name}</span>
      </div>
    );
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative" id="skills">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
            Technical Arsenal
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight mb-3">
          My Skills &amp; Stack
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
          A curated ecosystem of modern web technologies, programming languages, and cloud tools I leverage to build scalable, reliable software.
        </p>
      </div>

      {/* Grid of Glassmorphic Stack Containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Programming Languages */}
        <div className="p-6 rounded-2xl bg-card/80 border border-border/80 shadow-md flex flex-col gap-4 group hover:border-emerald-500/40 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <span className="text-sm text-foreground font-bold flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              Programming Languages
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {groups.languages.length.toString().padStart(2, "0")} Tools
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {groups.languages.map((item) => renderSkillPill(item))}
          </div>
        </div>

        {/* 2. Frameworks & UI */}
        <div className="p-6 rounded-2xl bg-card/80 border border-border/80 shadow-md flex flex-col gap-4 group hover:border-cyan-500/40 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <span className="text-sm text-foreground font-bold flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              Frontend &amp; Frameworks
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {groups.frontend.length.toString().padStart(2, "0")} Tools
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {groups.frontend.map((item) => renderSkillPill(item))}
          </div>
        </div>

        {/* 3. Backend & APIs */}
        <div className="p-6 rounded-2xl bg-card/80 border border-border/80 shadow-md flex flex-col gap-4 group hover:border-indigo-500/40 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <span className="text-sm text-foreground font-bold flex items-center gap-2">
              <Cpu className="h-4 w-4 text-indigo-400" />
              Backend Architecture
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {groups.backend.length.toString().padStart(2, "0")} Tools
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {groups.backend.map((item) => renderSkillPill(item))}
          </div>
        </div>

        {/* 4. Databases */}
        <div className="p-6 rounded-2xl bg-card/80 border border-border/80 shadow-md flex flex-col gap-4 group hover:border-amber-500/40 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <span className="text-sm text-foreground font-bold flex items-center gap-2">
              <Database className="h-4 w-4 text-amber-400" />
              Databases &amp; Modeling
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {groups.database.length.toString().padStart(2, "0")} Tools
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {groups.database.map((item) => renderSkillPill(item))}
          </div>
        </div>

        {/* 5. Platforms & Tooling (Spans 2 columns on tablet & desktop) */}
        <div className="p-6 rounded-2xl bg-card/80 border border-border/80 shadow-md flex flex-col gap-4 group hover:border-sky-500/40 hover:shadow-xl transition-all md:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <span className="text-sm text-foreground font-bold flex items-center gap-2">
              <Wrench className="h-4 w-4 text-sky-400" />
              Tools, Cloud &amp; Platforms
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {groups.tools.length.toString().padStart(2, "0")} Tools
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {groups.tools.map((item) => renderSkillPill(item))}
          </div>
        </div>

      </div>
    </section>
  );
}
