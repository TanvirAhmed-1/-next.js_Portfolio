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
    { id: "lang-1", name: "JavaScript (ES6+)", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "SiJavascript", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { id: "lang-2", name: "TypeScript", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "SiTypescript", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { id: "lang-3", name: "C Language", category: "Backend" as SkillCategory, level: "Advanced" as const, proficiency: 85, iconName: "FaCode", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  ],
  frontend: [
    { id: "fe-1", name: "React.js", category: "Frontend" as SkillCategory, level: "Expert" as const, proficiency: 94, iconName: "FaReact", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { id: "fe-2", name: "Next.js", category: "Frontend" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "SiNextdotjs", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { id: "fe-3", name: "Redux Toolkit", category: "Frontend" as SkillCategory, level: "Advanced" as const, proficiency: 88, iconName: "SiRedux", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg" },
    { id: "fe-4", name: "Tailwind CSS", category: "Frontend" as SkillCategory, level: "Expert" as const, proficiency: 96, iconName: "SiTailwindcss", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { id: "fe-5", name: "HTML5", category: "Frontend" as SkillCategory, level: "Expert" as const, proficiency: 98, iconName: "FaHtml5", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { id: "fe-6", name: "CSS3", category: "Frontend" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "FaCss3Alt", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  ],
  backend: [
    { id: "be-1", name: "Node.js", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 92, iconName: "FaNodeJs", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { id: "be-2", name: "Express.js", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 90, iconName: "SiExpress", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
    { id: "be-3", name: "NestJS", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "SiNestjs", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
    { id: "be-4", name: "Prisma ORM", category: "Backend" as SkillCategory, level: "Advanced" as const, proficiency: 90, iconName: "SiPrisma", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
    { id: "be-5", name: "RESTful APIs", category: "Backend" as SkillCategory, level: "Expert" as const, proficiency: 94, iconName: "SiGraphql", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  ],
  database: [
    { id: "db-1", name: "MongoDB", category: "Database" as SkillCategory, level: "Advanced" as const, proficiency: 88, iconName: "SiMongodb", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    { id: "db-2", name: "Mongoose", category: "Database" as SkillCategory, level: "Advanced" as const, proficiency: 88, iconName: "SiMongodb", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg" },
    { id: "db-3", name: "PostgreSQL", category: "Database" as SkillCategory, level: "Advanced" as const, proficiency: 90, iconName: "SiPostgresql", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { id: "db-4", name: "MySQL", category: "Database" as SkillCategory, level: "Intermediate" as const, proficiency: 82, iconName: "SiMysql", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    { id: "db-5", name: "Redis", category: "Database" as SkillCategory, level: "Advanced" as const, proficiency: 85, iconName: "SiRedis", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  ],
  tools: [
    { id: "tool-1", name: "Git", category: "Tools & Others" as SkillCategory, level: "Expert" as const, proficiency: 92, iconName: "FaGitAlt", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { id: "tool-2", name: "GitHub", category: "Tools & Others" as SkillCategory, level: "Expert" as const, proficiency: 92, iconName: "FaGithub", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
    { id: "tool-3", name: "VS Code", category: "Tools & Others" as SkillCategory, level: "Expert" as const, proficiency: 95, iconName: "FaCode", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
    { id: "tool-4", name: "Docker", category: "DevOps & Cloud" as SkillCategory, level: "Advanced" as const, proficiency: 85, iconName: "FaDocker", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { id: "tool-5", name: "Figma", category: "Tools & Others" as SkillCategory, level: "Intermediate" as const, proficiency: 78, iconName: "FaFigma", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
    { id: "tool-6", name: "Firebase", category: "DevOps & Cloud" as SkillCategory, level: "Intermediate" as const, proficiency: 80, iconName: "SiFirebase", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
    { id: "tool-7", name: "Vercel", category: "DevOps & Cloud" as SkillCategory, level: "Expert" as const, proficiency: 92, iconName: "SiVercel", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
    { id: "tool-8", name: "Netlify", category: "DevOps & Cloud" as SkillCategory, level: "Advanced" as const, proficiency: 88, iconName: "SiNetlify", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg" },
    { id: "tool-9", name: "Cloudinary", category: "DevOps & Cloud" as SkillCategory, level: "Advanced" as const, proficiency: 90, iconName: "SiCloudinary", iconImage: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
  ],
};

const getSkillDefaultIcon = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes("type") || n.includes("ts")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg";
  if (n.includes("java") || n.includes("js")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg";
  if (n.includes("c lang") || n.includes("c++") || n.includes("c#")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg";
  if (n.includes("react")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg";
  if (n.includes("next")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg";
  if (n.includes("redux") || n.includes("zustand")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg";
  if (n.includes("tailwind")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg";
  if (n.includes("html")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg";
  if (n.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg";
  if (n.includes("node")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg";
  if (n.includes("express")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg";
  if (n.includes("nest")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg";
  if (n.includes("postgre")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg";
  if (n.includes("prisma")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg";
  if (n.includes("rest") || n.includes("api") || n.includes("graph")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg";
  if (n.includes("mongoose")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg";
  if (n.includes("mongo")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg";
  if (n.includes("mysql")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg";
  if (n.includes("redis")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg";
  if (n.includes("action") || n.includes("ci/cd")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg";
  if (n.includes("github")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg";
  if (n.includes("git")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg";
  if (n.includes("jest") || n.includes("test")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg";
  if (n.includes("code") || n.includes("vs")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg";
  if (n.includes("docker")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg";
  if (n.includes("figma")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg";
  if (n.includes("fire")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg";
  if (n.includes("aws") || n.includes("vercel")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg";
  if (n.includes("netli")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg";
  if (n.includes("cloud")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg";
  return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg";
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
        n.includes("python")
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
    const iconSrc = skill.iconImage || getSkillDefaultIcon(skill.name);

    return (
      <div
        key={skill.id}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 font-mono text-xs font-medium hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 dark:bg-slate-800/70 dark:border-slate-700/80 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 transition-all cursor-default shadow-2xs"
      >
        <img
          src={iconSrc}
          alt={skill.name}
          className="w-4 h-4 object-contain shrink-0"
        />
        <span>{skill.name}</span>
      </div>
    );
  };

  return (
    <section className="py-24 bg-slate-50/90 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-slate-800 relative" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
            <span className="font-mono text-xs text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-semibold">
              Technical Arsenal
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            My Skills &amp; Stack
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            A curated ecosystem of modern web technologies, programming languages, and cloud tools I leverage to build scalable, reliable software.
          </p>
        </div>

        {/* Grid of Stack Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Programming Languages */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4 group hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <span className="text-sm text-slate-900 dark:text-white font-bold flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20">
                  <Terminal className="h-4 w-4" />
                </span>
                Programming Languages
              </span>
              <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                {groups.languages.length.toString().padStart(2, "0")} Tools
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {groups.languages.map((item) => renderSkillPill(item))}
            </div>
          </div>

          {/* 2. Frameworks & UI */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4 group hover:border-teal-500/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <span className="text-sm text-slate-900 dark:text-white font-bold flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-teal-50 dark:bg-cyan-500/10 text-teal-600 dark:text-cyan-400 border border-teal-200/60 dark:border-cyan-500/20">
                  <Layers className="h-4 w-4" />
                </span>
                Frontend &amp; Frameworks
              </span>
              <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                {groups.frontend.length.toString().padStart(2, "0")} Tools
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {groups.frontend.map((item) => renderSkillPill(item))}
            </div>
          </div>

          {/* 3. Backend & APIs */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4 group hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <span className="text-sm text-slate-900 dark:text-white font-bold flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-500/20">
                  <Cpu className="h-4 w-4" />
                </span>
                Backend Architecture
              </span>
              <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                {groups.backend.length.toString().padStart(2, "0")} Tools
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {groups.backend.map((item) => renderSkillPill(item))}
            </div>
          </div>

          {/* 4. Databases */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4 group hover:border-amber-500/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <span className="text-sm text-slate-900 dark:text-white font-bold flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/20">
                  <Database className="h-4 w-4" />
                </span>
                Databases &amp; Modeling
              </span>
              <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                {groups.database.length.toString().padStart(2, "0")} Tools
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {groups.database.map((item) => renderSkillPill(item))}
            </div>
          </div>

          {/* 5. Platforms & Tooling (Spans 2 columns on tablet & desktop) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4 group hover:border-sky-500/50 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <span className="text-sm text-slate-900 dark:text-white font-bold flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-500/20">
                  <Wrench className="h-4 w-4" />
                </span>
                Tools, Cloud &amp; Platforms
              </span>
              <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                {groups.tools.length.toString().padStart(2, "0")} Tools
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {groups.tools.map((item) => renderSkillPill(item))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
