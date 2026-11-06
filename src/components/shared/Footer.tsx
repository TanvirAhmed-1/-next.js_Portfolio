"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-xs text-muted-foreground border-l border-border/60 pl-3">
              © {currentYear} All rights reserved.
            </span>
          </div>

          {/* Tech stack badge */}
          <div className="text-xs text-muted-foreground text-center">
            Built with{" "}
            <span className="font-semibold text-foreground">Next.js 16 App Router</span>,{" "}
            <span className="font-semibold text-foreground">NestJS API</span>,{" "}
            <span className="font-semibold text-foreground">Tailwind CSS</span> &{" "}
            <span className="font-semibold text-foreground">Shadcn UI</span>.
          </div>

          {/* Socials & Admin */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="h-4 w-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-4 w-4" />
            </Link>
            <Link
              href="/admin"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              /admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
