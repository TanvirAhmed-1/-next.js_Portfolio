"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Project, Skill, Blog } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectFormDialog } from "@/components/admin/ProjectFormDialog";
import { SkillFormDialog } from "@/components/admin/SkillFormDialog";
import { BlogFormDialog } from "@/components/admin/BlogFormDialog";
import { ProfileFormTab } from "@/components/admin/ProfileFormTab";
import { TechIcon } from "@/components/TechIcon";
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
  Mail,
  Calendar,
  Search,
  MessageSquare,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  UserCog,
  LogOut,
  Lock,
  KeyRound,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<{ name?: string; email?: string; role?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "blogs" | "skills" | "messages" | "profile">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Dialog states
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);

  const [blogDialogOpen, setBlogDialogOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<Blog | null>(null);

  const [resetting, setResetting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, skillRes, blogRes, msgRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/skills"),
        fetch("/api/blogs?all=true"),
        fetch("/api/contact"),
      ]);
      const projData = await projRes.json();
      const skillData = await skillRes.json();
      const blogData = await blogRes.json();
      const msgData = await msgRes.json();

      if (projData.success) setProjects(projData.data || []);
      if (skillData.success) setSkills(skillData.data || []);
      if (blogData.success) setBlogs(blogData.data || []);
      if (msgData.success) setMessages(msgData.data || []);
    } catch (e) {
      console.error("Failed to fetch admin data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authRaw = localStorage.getItem("admin_auth");
      const hasAuth =
        authRaw !== null ||
        document.cookie.includes("admin_session=authenticated");
      setIsAuthenticated(hasAuth);
      if (authRaw) {
        try {
          setCurrentUser(JSON.parse(authRaw));
        } catch (e) {}
      }
      if (hasAuth) {
        fetchData();
      } else {
        setLoading(false);
      }
    }
  }, []);

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth");
    }
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        toast.success(`Project "${title}" deleted`);
      } else {
        toast.error(data.error || "Failed to delete project");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete project");
    }
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete skill: "${name}"?`)) return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
        toast.success(`Skill "${name}" deleted`);
      } else {
        toast.error(data.error || "Failed to delete skill");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete skill");
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete blog article: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        toast.success(`Blog "${title}" deleted`);
      } else {
        toast.error(data.error || "Failed to delete blog article");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete blog article");
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
        toast.success("All portfolio data successfully reset to clean defaults!");
      } else {
        toast.error(data.error || "Failed to reset data");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to reset data");
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

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.summary.toLowerCase().includes(search.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredSkills = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground bg-tech-grid relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-indigo-500/15 blur-3xl pointer-events-none rounded-full" />
        <div className="max-w-md w-full relative z-10 p-8 rounded-2xl bg-card/95 border border-border/80 shadow-2xl text-center space-y-5">
          <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <Lock className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-foreground">Authentication Required</h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              You must be authenticated as an administrator to access and manage portfolio projects, blogs, skills, and CV information.
            </p>
          </div>
          <Link href="/login" className="block w-full">
            <Button size="lg" className="w-full gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              <KeyRound className="h-4 w-4" />
              Go to Admin Login
            </Button>
          </Link>
          <Link href="/" className="inline-block text-xs text-muted-foreground hover:underline font-mono">
            ← Return to Public Portfolio
          </Link>
        </div>
      </div>
    );
  }

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
                  Back to Site
                </Button>
              </Link>
              <div className="h-5 w-px bg-border/80 hidden sm:block" />
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                  Portfolio Management (CMS)
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  PostgreSQL & Prisma Live Backend • Full CRUD
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {currentUser && (
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-card/90 border border-border/80 text-[11px] font-mono">
                  <span className={`w-2 h-2 rounded-full ${currentUser.role === "SUPER_ADMIN" ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
                  <span className="text-muted-foreground hidden md:inline">{currentUser.email || "Admin"}</span>
                  <Badge variant="outline" className={`text-[10px] uppercase font-bold ${currentUser.role === "SUPER_ADMIN" ? "border-amber-500/40 text-amber-400 bg-amber-500/10" : "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"}`}>
                    {currentUser.role || "ADMIN"}
                  </Badge>
                </div>
              )}
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
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-1.5 text-xs text-destructive hover:bg-destructive/10 border-destructive/20 font-mono"
              >
                <LogOut className="h-3.5 w-3.5" />
                Log Out
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 pt-2 border-t border-border/40">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "projects"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
              }`}
            >
              <FolderGit2 className="h-4 w-4" />
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "blogs"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Blogs ({blogs.length})
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "skills"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
              }`}
            >
              <Cpu className="h-4 w-4" />
              Skills ({skills.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "messages"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Inquiries ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "profile"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
              }`}
            >
              <UserCog className="h-4 w-4" />
              Profile &amp; CV
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Actions Bar (for list tabs) */}
        {activeTab !== "profile" && (
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

            {activeTab === "projects" && (
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
            )}

            {activeTab === "blogs" && (
              <Button
                onClick={() => {
                  setBlogToEdit(null);
                  setBlogDialogOpen(true);
                }}
                className="gap-2 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                Write New Blog
              </Button>
            )}

            {activeTab === "skills" && (
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
        )}

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
                            {p.slug && (
                              <Link
                                href={`/projects/${p.slug}`}
                                className="text-muted-foreground hover:text-foreground"
                                title="View Case Study"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Link>
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
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => {
                                setProjectToEdit(p);
                                setProjectDialogOpen(true);
                              }}
                              title="Edit Project"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteProject(p.id, p.title)}
                              title="Delete Project"
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

        {/* Tab 2: Blogs Table */}
        {activeTab === "blogs" && (
          <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase font-mono text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Article Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Read Time</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        No blog articles found.
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map((b) => (
                      <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">
                          <div className="flex flex-col">
                            <span className="text-foreground font-semibold flex items-center gap-1.5">
                              {b.title}
                            </span>
                            <span className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                              {b.summary}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="font-mono text-xs">
                            {b.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          {b.published ? (
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs font-mono">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-amber-500 text-xs font-mono">
                              Draft
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                          {b.readTime}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                          {new Date(b.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/blog/${b.slug}`}
                              target="_blank"
                              className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                              title="View Article"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => {
                                setBlogToEdit(b);
                                setBlogDialogOpen(true);
                              }}
                              title="Edit Article"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteBlog(b.id, b.title)}
                              title="Delete Article"
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

        {/* Tab 3: Skills Table */}
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
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => {
                                setSkillToEdit(s);
                                setSkillDialogOpen(true);
                              }}
                              title="Edit Skill"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteSkill(s.id, s.name)}
                              title="Delete Skill"
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

        {/* Tab 4: Messages Inbox Table */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center rounded-xl border border-dashed border-border/60 bg-card">
                <Mail className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">No inquiries received yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Messages submitted through your portfolio contact form will appear here.
                </p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-5 rounded-xl bg-card border border-border/60 shadow-xs space-y-3 hover:border-primary/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                        {msg.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-foreground block">
                          {msg.name}
                        </span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-muted-foreground hover:underline font-mono"
                        >
                          {msg.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(msg.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono font-semibold text-primary block mb-1">
                      Subject: {msg.subject}
                    </span>
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <Mail className="h-3.5 w-3.5" />
                        Reply via Email
                      </Button>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 5: Profile & CV Information */}
        {activeTab === "profile" && <ProfileFormTab />}
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

      <BlogFormDialog
        isOpen={blogDialogOpen}
        blogToEdit={blogToEdit}
        onClose={() => {
          setBlogDialogOpen(false);
          setBlogToEdit(null);
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
