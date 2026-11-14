"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  Sparkles,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  GraduationCap,
  BookOpen,
  FileText,
  Mail,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export function Navbar({ onOpenAdmin }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("About");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navLinks = [
    { name: "About", href: "/#about", id: "about", icon: User },
    { name: "Skills", href: "/#skills", id: "skills", icon: Cpu },
    { name: "Projects", href: "/#projects", id: "projects", icon: FolderGit2 },
    { name: "Experience", href: "/#experience", id: "experience", icon: Briefcase },
    { name: "Education", href: "/#education", id: "education", icon: GraduationCap },
    { name: "Blog", href: "/blog", id: "blog", icon: BookOpen },
    { name: "Resume", href: "/resume", id: "resume", icon: FileText },
    { name: "Contact", href: "/#contact", id: "contact", icon: Mail },
  ];

  useEffect(() => {
    if (pathname?.startsWith("/blog")) {
      setActiveNav("Blog");
    } else if (pathname?.startsWith("/resume")) {
      setActiveNav("Resume");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Spy on home page sections when on "/"
      if (window.location.pathname === "/") {
        const sections = ["about", "skills", "projects", "experience", "education", "contact"];
        const scrollPosition = window.scrollY + 220;

        for (const secId of sections) {
          const el = document.getElementById(secId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              const matched = navLinks.find((l) => l.id === secId);
              if (matched) setActiveNav(matched.name);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }

    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.08)] py-2.5"
          : "bg-white/60 dark:bg-slate-950/40 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/30 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Dock */}
          <nav
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden xl:flex items-center gap-0.5 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-inner"
          >
            {navLinks.map((link) => {
              const isActive = activeNav === link.name;
              const isHovered = hoveredNav === link.name;
              const showPill = isHovered || (hoveredNav === null && isActive);

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveNav(link.name)}
                  onMouseEnter={() => setHoveredNav(link.name)}
                  className={`relative px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold tracking-tight transition-colors duration-200 select-none ${
                    isActive
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {showPill && (
                    <motion.span
                      layoutId="navbar-sliding-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      className={`absolute inset-0 rounded-xl -z-10 ${
                        isActive
                          ? "bg-white dark:bg-slate-800 border border-emerald-500/35 dark:border-emerald-500/40 shadow-xs"
                          : "bg-white/75 dark:bg-slate-800/75 border border-slate-200/70 dark:border-slate-700/70"
                      }`}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    )}
                    {link.name}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Compact Tablet/Medium Desktop Nav */}
          <nav className="hidden md:flex xl:hidden items-center gap-0.5 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = activeNav === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveNav(link.name)}
                  className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all ${
                    isActive
                      ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 shadow-2xs border border-emerald-500/30"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster: Unified Control Pod + Hire Me CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Unified Theme + Socials Control Dock */}
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800">
              {/* Theme Switcher Pill */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/40 font-mono text-xs font-bold shadow-2xs transition-all cursor-pointer"
              >
                {isDark ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Dark</span>
                  </>
                )}
              </button>

              <span className="h-4 w-px bg-slate-200/90 dark:bg-slate-800 mx-0.5" />

              {/* GitHub Button */}
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                <FaGithub className="h-4 w-4" />
              </Link>

              {/* LinkedIn Button */}
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:text-[#0077b5] dark:hover:text-[#38bdf8] hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>
            </div>

            {/* Premium Hire Me CTA */}
            <a
              href="/#contact"
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-500/35 border border-emerald-400/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span>Hire Me</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-2xs"
              title="Toggle Theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-emerald-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 shadow-2xs"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Animated Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3 p-3 border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl space-y-1.5"
            >
              <div className="grid grid-cols-2 gap-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeNav === link.name;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        setActiveNav(link.name);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                        isActive
                          ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>

              <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <a
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-mono text-xs font-bold shadow-md"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Hire Me Now
                </a>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                >
                  <FaGithub className="h-4 w-4" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-[#0077b5]"
                >
                  <FaLinkedin className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
