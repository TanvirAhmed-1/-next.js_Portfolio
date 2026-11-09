"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-3">
              © {currentYear} All rights reserved.
            </span>
          </div>

          {/* Tech stack badge */}
          <div className="text-xs text-slate-600 dark:text-slate-400 text-center">
            Built with{" "}
            <span className="font-bold text-slate-900 dark:text-white">Next.js 16 App Router</span>,{" "}
            <span className="font-bold text-slate-900 dark:text-white">NestJS API</span>,{" "}
            <span className="font-bold text-slate-900 dark:text-white">Tailwind CSS</span> &amp;{" "}
            <span className="font-bold text-slate-900 dark:text-white">Shadcn UI</span>.
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/8801786924911"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-[#25D366] hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
              aria-label="WhatsApp"
              title="WhatsApp: 01786924911"
            >
              <FaWhatsapp className="h-4 w-4" />
            </a>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="h-4 w-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-[#0077b5] hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
