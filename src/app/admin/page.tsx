"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Project, Skill } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectFormDialog } from "@/components/admin/ProjectFormDialog";
import { SkillFormDialog } from "@/components/admin/SkillFormDialog";
import { TechIcon } from "@/components/ui/home/TechIcon";
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  FolderGit2,
  Cpu,
  CheckCircle2,
  Search,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "skills">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Dialog states
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);

  const [resetting, setResetting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, skillRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/skills"),
      ]);
      const projData = await projRes.json();
      const skillData = await skillRes.json();
      if (projData.success) setProjects(projData.data);
      if (skillData.success) setSkills(skillData.data);
    } catch (e) {
      console.error("Failed to fetch admin data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(data.error || "Failed to delete project");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete skill: "${name}"?`)) return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert(data.error || "Failed to delete skill");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete skill");
    }
  };

  const handleResetData = async () => {
    if (
      !confirm(
        "Are you sure you want to reset all Projects and Skills to default starter data?"
      )
    )
      return;

    setResetting(true);
    try {
      const res = await fetch("/api/reset", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        await fetchData();
        alert("All portfolio data successfully reset to clean defaults!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to reset data");
    } finally {
      setResetting(false);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredSkills = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Admin Header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Portfolio
                </Button>
              </Link>
              <div className="h-5 w-px bg-border/80 hidden sm:block" />
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                  Portfolio Content Management (CMS)
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  Full Stack CRUD Operations (Next.js 16 + Server Storage)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetData}
                disabled={resetting}
                className="gap-1.5 text-xs font-mono"
              >
                <RotateCcw className={`h-3.5 w-3.5 ${resetting ? "animate-spin" : ""}`} />
                Reset Defaults
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4 pt-2 border-t border-border/40">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "projects"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
                }`}
            >
              <FolderGit2 className="h-4 w-4" />
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "skills"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
                }`}
            >
              <Cpu className="h-4 w-4" />
              Skills ({skills.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-input bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {activeTab === "projects" ? (
            <Button
              onClick={() => {
                setProjectToEdit(null);
                setProjectDialogOpen(true);
              }}
              className="gap-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          ) : (
            <Button
              onClick={() => {
                setSkillToEdit(null);
                setSkillDialogOpen(true);
              }}
              className="gap-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          )}
        </div>

        {/* Tab 1: Projects Table */}
        {activeTab === "projects" && (
          <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase font-mono text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Tags</th>
                    <th className="px-4 py-3">Links</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        No projects found.
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">
                          <div className="flex flex-col">
                            <span className="text-foreground font-semibold flex items-center gap-1.5">
                              {p.title}
                              {p.featured && (
                                <Badge variant="secondary" className="text-[10px] py-0 px-1 font-normal text-amber-500">
                                  Featured
                                </Badge>
                              )}
                            </span>
                            <span className="text-xs text-muted-foreground line-clamp-1 max-w-sm">
                              {p.description}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="font-mono text-xs">
                            {p.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {p.tags.slice(0, 3).map((t, idx) => (
                              <span key={idx} className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">
                                {t}
                              </span>
                            ))}
                            {p.tags.length > 3 && (
                              <span className="text-[10px] text-muted-foreground font-mono">
                                +{p.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-foreground"
                                title="Live Demo"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                            {p.githubUrl && (
                              <a
                                href={p.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-foreground"
                                title="GitHub"
                              >
                                <FaGithub className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="icon-xs"
                              variant="ghost"
                              onClick={() => {
                                setProjectToEdit(p);
                                setProjectDialogOpen(true);
                              }}
                              title="Edit"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon-xs"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteProject(p.id, p.title)}
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Skills Table */}
        {activeTab === "skills" && (
          <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase font-mono text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Skill & Icon</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3">Proficiency</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredSkills.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        No skills found.
                      </td>
                    </tr>
                  ) : (
                    filteredSkills.map((s) => (
                      <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                              <TechIcon name={s.iconName || s.name} className="h-4 w-4 text-foreground" />
                            </div>
                            <span className="text-foreground font-semibold">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="font-mono text-xs">
                            {s.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-xs font-mono">{s.level}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 max-w-[120px]">
                            <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${s.proficiency}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono">{s.proficiency}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="icon-xs"
                              variant="ghost"
                              onClick={() => {
                                setSkillToEdit(s);
                                setSkillDialogOpen(true);
                              }}
                              title="Edit"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon-xs"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteSkill(s.id, s.name)}
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Dialogs */}
      <ProjectFormDialog
        isOpen={projectDialogOpen}
        projectToEdit={projectToEdit}
        onClose={() => {
          setProjectDialogOpen(false);
          setProjectToEdit(null);
        }}
        onSuccess={() => {
          fetchData();
        }}
      />

      <SkillFormDialog
        isOpen={skillDialogOpen}
        skillToEdit={skillToEdit}
        onClose={() => {
          setSkillDialogOpen(false);
          setSkillToEdit(null);
        }}
        onSuccess={() => {
          fetchData();
        }}
      />
    </div>
  );
}

