"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Home,
  ArrowLeft,
  Terminal,
  FolderGit2,
  BookOpen,
  Mail,
  Compass,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const quickLinks = [
    {
      name: "Projects",
      desc: "Explore full-stack & microservice architectures",
      href: "/#projects",
      icon: FolderGit2,
    },
    {
      name: "Technical Blog",
      desc: "Read engineering articles & system deep-dives",
      href: "/blog",
      icon: BookOpen,
    },
    {
      name: "Direct Contact",
      desc: "Reach out for roles or collaborations",
      href: "/#contact",
      icon: Mail,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden selection:bg-emerald-500 selection:text-white">
      {/* Ambient Background Lighting & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.07] dark:opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-emerald-500/20 via-teal-400/10 to-cyan-500/20 blur-3xl rounded-full pointer-events-none" />

      {/* Top Minimal Header */}
      <header className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
        <Logo size="sm" />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/25">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          STATUS: 404_NOT_FOUND
        </span>
      </header>

      {/* Main 404 Centerpiece */}
      <main className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center text-center">
        {/* Animated 3D-Styled 404 Glitch Emblem */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6 select-none"
        >
          {/* Floating Orbit Ring */}
          <div className="absolute -inset-6 rounded-full border border-dashed border-emerald-500/25 dark:border-emerald-400/20 animate-[spin_24s_linear_infinite] pointer-events-none" />

          <div className="relative flex items-center justify-center gap-2 sm:gap-4">
            <span className="text-7xl sm:text-9xl font-black tracking-tighter bg-gradient-to-b from-slate-900 via-slate-700 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-600 bg-clip-text text-transparent drop-shadow-sm">
              4
            </span>

            {/* Center Cyber-Compass Core */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="h-20 w-20 sm:h-28 sm:w-28 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-0.5 shadow-xl shadow-emerald-500/25 flex items-center justify-center"
            >
              <div className="h-full w-full rounded-[22px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:8px_8px] opacity-20" />
                <Compass className="h-10 w-10 sm:h-14 sm:w-14 text-emerald-400 animate-pulse" />
              </div>
            </motion.div>

            <span className="text-7xl sm:text-9xl font-black tracking-tighter bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-600 bg-clip-text text-transparent drop-shadow-sm">
              4
            </span>
          </div>
        </motion.div>

        {/* Headline & Description */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="space-y-3 max-w-xl"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Route Resolution Failed
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            This Endpoint Does Not Exist
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            The page or resource you are looking for may have been moved, renamed, or never existed in this deployment.
          </p>
        </motion.div>

        {/* Developer Terminal Diagnostic Box */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="w-full max-w-lg mt-6 rounded-2xl bg-slate-900 dark:bg-slate-900/90 border border-slate-800 shadow-lg overflow-hidden text-left font-mono text-xs"
        >
          <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 text-[11px] text-slate-400 flex items-center gap-1">
                <Terminal className="h-3 w-3 text-emerald-400" />
                router-diagnostics.sh
              </span>
            </div>
            <span className="text-[10px] text-emerald-400">Next.js 16 App Router</span>
          </div>
          <div className="p-4 space-y-1.5 text-slate-300">
            <p>
              <span className="text-emerald-400">$</span> curl -I current_request_uri
            </p>
            <p className="text-rose-400">
              &gt; HTTP/2 404 Not Found • Controller: NoMatchingRouteException
            </p>
            <p className="text-cyan-300">
              &gt; Suggestion: Redirecting to verified production routes below...
            </p>
          </div>
        </motion.div>

        {/* Primary Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-7"
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="h-11 px-5 rounded-xl font-mono text-xs font-bold border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>

          <Link href="/">
            <Button className="h-11 px-6 rounded-xl font-mono text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 gap-2 cursor-pointer">
              <Home className="h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </motion.div>

        {/* Quick Destination Cards */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-left"
        >
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md transition-all flex items-start gap-3"
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 text-center py-5 text-xs font-mono text-slate-500 dark:text-slate-500 border-t border-slate-200/60 dark:border-slate-900">
        © {new Date().getFullYear()} Tanvir Ahmed • Full-Stack Architect
      </footer>
    </div>
  );
}
