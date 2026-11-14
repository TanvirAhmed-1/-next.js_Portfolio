"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Project, Skill, Blog, Education } from "@/types";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Pagination } from "@/components/shared/Pagination";
import { ProjectFormDialog } from "@/components/admin/ProjectFormDialog";
import { SkillFormDialog } from "@/components/admin/SkillFormDialog";
import { BlogFormDialog } from "@/components/admin/BlogFormDialog";
import { EducationFormDialog } from "@/components/admin/EducationFormDialog";
import { ProfileFormTab } from "@/components/admin/ProfileFormTab";
import { TechIcon } from "@/components/TechIcon";
import {
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  ExternalLink,
  FolderGit2,
  Cpu,
  Mail,
  Calendar,
  Search,
  MessageSquare,
  BookOpen,
  UserCog,
  LogOut,
  Lock,
  KeyRound,
  Sparkles,
  GraduationCap,
  MapPin,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  FileEdit,
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

type AdminTab =
  | "projects"
  | "blogs"
  | "education"
  | "skills"
  | "messages"
  | "profile";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    name?: string;
    email?: string;
    role?: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  // Filtering & Search states
  const [search, setSearch] = useState("");
  const [projectCategoryFilter, setProjectCategoryFilter] = useState("All");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState("All");
  const [blogStatusFilter, setBlogStatusFilter] = useState<"All" | "Published" | "Draft">("All");
  const [skillCategoryFilter, setSkillCategoryFilter] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Dialog states
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const [educationDialogOpen, setEducationDialogOpen] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState<Education | null>(null);

  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);

  const [blogDialogOpen, setBlogDialogOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<Blog | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, skillRes, blogRes, msgRes, eduRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/skills"),
        fetch("/api/blogs?all=true"),
        fetch("/api/contact"),
        fetch("/api/educations"),
      ]);
      const projData = await projRes.json();
      const skillData = await skillRes.json();
      const blogData = await blogRes.json();
      const msgData = await msgRes.json();
      const eduData = await eduRes.json();

      if (projData.success) setProjects(projData.data || []);
      if (skillData.success) setSkills(skillData.data || []);
      if (blogData.success) setBlogs(blogData.data || []);
      if (msgData.success) setMessages(msgData.data || []);
      if (eduData.success) setEducations(eduData.data || []);
    } catch (e) {
      console.error("Failed to fetch admin data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
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

  const toggleTheme = () => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (root.classList.contains("dark")) {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
      } else {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
      }
    }
  };

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setSearch("");
    setCurrentPage(1);
    setSidebarOpen(false);
  };

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
      toast.error(err.message || "Failed to delete project");
    }
  };

  const handleToggleBestProduct = async (project: Project) => {
    const nextFeatured = !project.featured;
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: nextFeatured }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === project.id ? { ...p, featured: nextFeatured } : p
          )
        );
        toast.success(
          nextFeatured
            ? `"${project.title}" tagged as Best Product!`
            : `"${project.title}" removed from Best Product`
        );
      } else {
        toast.error(data.error || "Failed to update Best Product tag");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update Best Product tag");
    }
  };

  const handleDeleteEducation = async (id: string, degree: string) => {
    if (!confirm(`Are you sure you want to delete education: "${degree}"?`)) return;
    try {
      const res = await fetch(`/api/educations/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setEducations((prev) => prev.filter((e) => e.id !== id));
        toast.success(`Education "${degree}" deleted`);
      } else {
        toast.error(data.error || "Failed to delete education");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete education");
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
      toast.error(err.message || "Failed to delete skill");
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete blog article: "${title}"?`))
      return;
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
      toast.error(err.message || "Failed to reset data");
    } finally {
      setResetting(false);
    }
  };

  // Helper for Best Product check
  const isBestProduct = (p: Project) =>
    Boolean(
      p.featured ||
        p.category?.toLowerCase() === "best product" ||
        p.tags?.some((t) => t.toLowerCase() === "best product")
    );

  // Dynamic Filter Lists
  const projectCategories = [
    "All",
    "Best Product",
    ...Array.from(
      new Set([
        "Full Stack",
        "Backend",
        "Frontend",
        "Mobile",
        "DevOps",
        ...projects.map((p) => p.category),
      ])
    ).filter((c) => c?.toLowerCase() !== "best product"),
  ];

  const blogCategories = [
    "All",
    ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean))),
  ];

  const skillCategories = [
    "All",
    ...Array.from(new Set(skills.map((s) => s.category).filter(Boolean))),
  ];

  // Filtered Data
  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      projectCategoryFilter === "All"
        ? true
        : projectCategoryFilter === "Best Product"
        ? isBestProduct(p)
        : p.category === projectCategoryFilter;

    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat =
      blogCategoryFilter === "All" || b.category === blogCategoryFilter;
    const matchesStatus =
      blogStatusFilter === "All"
        ? true
        : blogStatusFilter === "Published"
        ? b.published
        : !b.published;

    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.tags?.some((t) => t.toLowerCase().includes(q));

    return matchesCat && matchesStatus && matchesSearch;
  });

  const filteredEducations = educations.filter((e) => {
    const q = search.trim().toLowerCase();
    return (
      !q ||
      e.degree.toLowerCase().includes(q) ||
      e.institution.toLowerCase().includes(q) ||
      (e.field || "").toLowerCase().includes(q)
    );
  });

  const filteredSkills = skills.filter((s) => {
    const matchesCat =
      skillCategoryFilter === "All" || s.category === skillCategoryFilter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const filteredMessages = messages.filter((m) => {
    const q = search.trim().toLowerCase();
    return (
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  // Paginated Slices
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const paginatedEducations = filteredEducations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const paginatedSkills = filteredSkills.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const navItems: {
    id: AdminTab;
    label: string;
    icon: React.ElementType;
    count?: number;
    badgeColor?: string;
  }[] = [
    {
      id: "projects",
      label: "Projects",
      icon: FolderGit2,
      count: projects.length,
    },
    {
      id: "blogs",
      label: "Blogs & Articles",
      icon: BookOpen,
      count: blogs.length,
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      count: educations.length,
    },
    {
      id: "skills",
      label: "Tech Stack Skills",
      icon: Cpu,
      count: skills.length,
    },
    {
      id: "messages",
      label: "Client Inquiries",
      icon: MessageSquare,
      count: messages.length,
    },
    {
      id: "profile",
      label: "Profile & CV",
      icon: UserCog,
    },
  ];

  const tabMeta: Record<AdminTab, { title: string; subtitle: string }> = {
    projects: {
      title: "Projects & Case Studies",
      subtitle:
        "Manage production applications, Best Product spotlights, and repository links.",
    },
    blogs: {
      title: "Engineering Blog Articles",
      subtitle:
        "Publish technical deep-dives, filter by category or status, and manage SEO slugs.",
    },
    education: {
      title: "Academic Qualifications",
      subtitle:
        "Manage degrees, institutions, sessions, and academic grades.",
    },
    skills: {
      title: "Technical Arsenal & Stack",
      subtitle:
        "Organize programming languages, frameworks, databases, and cloud tooling.",
    },
    messages: {
      title: "Client Inquiries & Messages",
      subtitle:
        "Review and respond to direct messages submitted through your portfolio.",
    },
    profile: {
      title: "Executive Profile & Resume",
      subtitle:
        "Configure hero bio, social links, contact details, and verified CV URL.",
    },
  };

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-5">
          <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
            <Lock className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Authentication Required</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Please sign in with your administrator credentials to access the Portfolio Control Center.
            </p>
          </div>
          <Link href="/login" className="block w-full">
            <Button
              size="lg"
              className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
            >
              <KeyRound className="h-4 w-4" />
              Go to Admin Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* LEFT SIDEBAR NAVIGATION (Fixed on Desktop, Slide-Over on Mobile) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-68 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Brand + CMS Badge */}
        <div>
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800">
            <Logo size="sm" />
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Group */}
          <div className="p-4 space-y-6">
            <div>
              <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
                Workspace Modules
              </span>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          className={`h-4 w-4 ${
                            isActive
                              ? "text-white"
                              : "text-slate-400 dark:text-slate-500"
                          }`}
                        />
                        <span>{item.label}</span>
                      </span>

                      {typeof item.count === "number" && (
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick System Status Box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">Database</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  PostgreSQL Live
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">Best Products</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {projects.filter(isBestProduct).length} Tagged
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Admin User Profile & Actions */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
          {currentUser && (
            <div className="flex items-center gap-2.5 px-2">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-black text-xs shrink-0">
                TA
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                  {currentUser.email || "admin@tanvir.dev"}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  {currentUser.role || "SUPER_ADMIN"}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 h-8.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 transition-colors"
            >
              <span>Live Site</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 h-8.5 px-2.5 rounded-xl border border-rose-500/25 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Command Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white truncate">
                {tabMeta[activeTab].title}
              </h1>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:block truncate">
                {tabMeta[activeTab].subtitle}
              </p>
            </div>
          </div>

          {/* Right Top Bar Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              title="Toggle Theme"
              className="h-9 px-3 flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500/40 transition-colors cursor-pointer"
            >
              {isDark ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleResetData}
              disabled={resetting}
              className="h-9 gap-1.5 text-xs font-mono rounded-xl hidden md:inline-flex"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${resetting ? "animate-spin" : ""}`} />
              Reset Defaults
            </Button>

            {activeTab === "projects" && (
              <Button
                onClick={() => {
                  setProjectToEdit(null);
                  setProjectDialogOpen(true);
                }}
                className="h-9 gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold shadow-sm shadow-emerald-600/20 cursor-pointer"
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
                className="h-9 gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold shadow-sm shadow-emerald-600/20 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Write Article
              </Button>
            )}

            {activeTab === "education" && (
              <Button
                onClick={() => {
                  setEducationToEdit(null);
                  setEducationDialogOpen(true);
                }}
                className="h-9 gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold shadow-sm shadow-emerald-600/20 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Education
              </Button>
            )}

            {activeTab === "skills" && (
              <Button
                onClick={() => {
                  setSkillToEdit(null);
                  setSkillDialogOpen(true);
                }}
                className="h-9 gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold shadow-sm shadow-emerald-600/20 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Skill
              </Button>
            )}
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Executive KPI Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => handleTabChange("projects")}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                  Total Projects
                </span>
                <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <FolderGit2 className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {projects.length}
              </div>
              <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                ★ {projects.filter(isBestProduct).length} Best Products
              </span>
            </div>

            <div
              onClick={() => handleTabChange("blogs")}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                  Blog Articles
                </span>
                <div className="h-8 w-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <BookOpen className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {blogs.length}
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                ● {blogs.filter((b) => b.published).length} Published
              </span>
            </div>

            <div
              onClick={() => handleTabChange("skills")}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                  Skills &amp; Degrees
                </span>
                <div className="h-8 w-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Layers className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {skills.length}
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {educations.length} Academic Degrees
              </span>
            </div>

            <div
              onClick={() => handleTabChange("messages")}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                  Client Inquiries
                </span>
                <div className="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {messages.length}
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Direct Inbox Messages
              </span>
            </div>
          </div>

          {/* Search & Contextual Filter Bar (for Table Modules) */}
          {activeTab !== "profile" && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Contextual Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {activeTab === "projects" &&
                  projectCategories.map((cat) => {
                    const isActive = projectCategoryFilter === cat;
                    const isBest = cat === "Best Product";
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setProjectCategoryFilter(cat);
                          setCurrentPage(1);
                        }}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-emerald-600 text-white shadow-xs"
                            : isBest
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {isBest && <Sparkles className="h-3 w-3" />}
                        {cat}
                      </button>
                    );
                  })}

                {activeTab === "blogs" && (
                  <>
                    {(["All", "Published", "Draft"] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          setBlogStatusFilter(status);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                          blogStatusFilter === status
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                    <span className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
                    <select
                      value={blogCategoryFilter}
                      onChange={(e) => {
                        setBlogCategoryFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      aria-label="Filter blogs by category"
                      className="h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 px-3.5 text-xs font-sans font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    >
                      {blogCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          Category: {cat}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {activeTab === "skills" &&
                  skillCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSkillCategoryFilter(cat);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                        skillCategoryFilter === cat
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}

                {(activeTab === "education" || activeTab === "messages") && (
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 px-1">
                    Showing all {activeTab === "education" ? filteredEducations.length : filteredMessages.length} records
                  </span>
                )}
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-72 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                <Input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-8"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* MODULE 1: PROJECTS SHADCN TABLE + PAGINATION */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Tech Stack Tags</TableHead>
                      <TableHead>Best Product</TableHead>
                      <TableHead>Links</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedProjects.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-32 text-center text-slate-500 font-mono text-xs"
                        >
                          No matching projects found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedProjects.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="max-w-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.imageUrl}
                                alt={p.title}
                                className="h-10 w-14 rounded-lg object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 dark:text-white truncate">
                                  {p.title}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                  {p.description}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono text-xs">
                              {p.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {p.tags.slice(0, 3).map((t, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md font-mono"
                                >
                                  {t}
                                </span>
                              ))}
                              {p.tags.length > 3 && (
                                <span className="text-[10px] text-slate-400 font-mono">
                                  +{p.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <button
                              type="button"
                              onClick={() => handleToggleBestProduct(p)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                                isBestProduct(p)
                                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/40"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-amber-500 border border-slate-200 dark:border-slate-700"
                              }`}
                            >
                              <Sparkles className="h-3 w-3" />
                              {isBestProduct(p) ? "Best Product" : "Tag Best"}
                            </button>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {p.slug && (
                                <Link
                                  href={`/projects/${p.slug}`}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                                  title="GitHub"
                                >
                                  <FaGithub className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
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
                                className="h-8 w-8 text-rose-500 hover:bg-rose-500/10"
                                onClick={() => handleDeleteProject(p.id, p.title)}
                                title="Delete Project"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={filteredProjects.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
                itemLabel="projects"
              />
            </div>
          )}

          {/* MODULE 2: BLOGS SHADCN TABLE + FILTERING + PAGINATION */}
          {activeTab === "blogs" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Article Title &amp; Summary</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Read Time</TableHead>
                      <TableHead>Published Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedBlogs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-32 text-center text-slate-500 font-mono text-xs"
                        >
                          No matching blog articles found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedBlogs.map((b) => (
                        <TableRow key={b.id}>
                          <TableCell className="max-w-md">
                            <div className="font-bold text-slate-900 dark:text-white truncate">
                              {b.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                              {b.summary}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono text-xs">
                              {b.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {b.published ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                                <CheckCircle2 className="h-3 w-3" />
                                Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                                <FileEdit className="h-3 w-3" />
                                Draft
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-slate-500">
                            {b.readTime}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-slate-500">
                            {new Date(b.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Link
                                href={`/blog/${b.slug}`}
                                target="_blank"
                                className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                                className="h-8 w-8 text-rose-500 hover:bg-rose-500/10"
                                onClick={() => handleDeleteBlog(b.id, b.title)}
                                title="Delete Article"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={filteredBlogs.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
                itemLabel="articles"
              />
            </div>
          )}

          {/* MODULE 3: EDUCATION SHADCN TABLE + PAGINATION */}
          {activeTab === "education" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Degree &amp; Major</TableHead>
                      <TableHead>Institution &amp; Location</TableHead>
                      <TableHead>Session / Period</TableHead>
                      <TableHead>Result &amp; Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedEducations.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="h-32 text-center text-slate-500 font-mono text-xs"
                        >
                          No education records found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedEducations.map((edu) => (
                        <TableRow key={edu.id}>
                          <TableCell className="max-w-sm">
                            <div className="flex items-start gap-3">
                              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white">
                                  {edu.degree}
                                </div>
                                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                                  {edu.field}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-xs text-slate-900 dark:text-white">
                              {edu.institution}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3" />
                              {edu.location}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-slate-600 dark:text-slate-400">
                            {edu.period}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <Badge
                                variant="outline"
                                className="font-mono text-xs w-fit border-emerald-500/30 text-emerald-700 dark:text-emerald-300 bg-emerald-500/10"
                              >
                                {edu.grade}
                              </Badge>
                              <span className="text-[10px] font-mono text-slate-500">
                                {edu.status}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => {
                                  setEducationToEdit(edu);
                                  setEducationDialogOpen(true);
                                }}
                                title="Edit Education"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-rose-500 hover:bg-rose-500/10"
                                onClick={() => handleDeleteEducation(edu.id, edu.degree)}
                                title="Delete Education"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={filteredEducations.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
                itemLabel="degrees"
              />
            </div>
          )}

          {/* MODULE 4: SKILLS SHADCN TABLE + PAGINATION */}
          {activeTab === "skills" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Skill &amp; Icon</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Expertise Level</TableHead>
                      <TableHead>Proficiency</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedSkills.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="h-32 text-center text-slate-500 font-mono text-xs"
                        >
                          No matching skills found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedSkills.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                {s.iconImage ? (
                                  <img
                                    src={s.iconImage}
                                    alt={s.name}
                                    className="h-5 w-5 object-contain"
                                  />
                                ) : (
                                  <TechIcon
                                    name={s.iconName || s.name}
                                    className="h-4 w-4 text-slate-800 dark:text-white"
                                  />
                                )}
                              </div>
                              <span className="font-bold text-slate-900 dark:text-white">
                                {s.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono text-xs">
                              {s.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {s.level}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2.5 max-w-[140px]">
                              <div className="h-2 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                                  style={{ width: `${s.proficiency}%` }}
                                />
                              </div>
                              <span className="text-xs font-mono font-bold">
                                {s.proficiency}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
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
                                className="h-8 w-8 text-rose-500 hover:bg-rose-500/10"
                                onClick={() => handleDeleteSkill(s.id, s.name)}
                                title="Delete Skill"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={filteredSkills.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
                itemLabel="skills"
              />
            </div>
          )}

          {/* MODULE 5: CLIENT INQUIRIES SHADCN TABLE + PAGINATION */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sender</TableHead>
                      <TableHead>Subject &amp; Message</TableHead>
                      <TableHead>Received At</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMessages.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="h-36 text-center text-slate-500 font-mono text-xs"
                        >
                          No inquiries received yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedMessages.map((msg) => (
                        <TableRow key={msg.id}>
                          <TableCell>
                            <div className="flex items-center gap-2.5">
                              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                                {msg.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white">
                                  {msg.name}
                                </div>
                                <a
                                  href={`mailto:${msg.email}`}
                                  className="text-xs font-mono text-slate-500 hover:text-emerald-600"
                                >
                                  {msg.email}
                                </a>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <div className="font-bold text-xs text-emerald-600 dark:text-emerald-400 font-mono mb-0.5">
                              {msg.subject}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                              {msg.message}
                            </p>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(msg.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                                msg.subject
                              )}`}
                            >
                              <Button
                                size="xs"
                                variant="outline"
                                className="gap-1.5 font-mono text-xs"
                              >
                                <Mail className="h-3.5 w-3.5" />
                                Reply
                              </Button>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={filteredMessages.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
                itemLabel="inquiries"
              />
            </div>
          )}

          {/* MODULE 6: PROFILE & CV */}
          {activeTab === "profile" && <ProfileFormTab />}
        </main>
      </div>

      {/* CRUD Dialogs */}
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

      <EducationFormDialog
        isOpen={educationDialogOpen}
        educationToEdit={educationToEdit}
        onClose={() => {
          setEducationDialogOpen(false);
          setEducationToEdit(null);
        }}
        onSuccess={() => {
          fetchData();
        }}
      />
    </div>
  );
}
