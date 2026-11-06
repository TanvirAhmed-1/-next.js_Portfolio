"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const sizeConfig = {
    sm: {
      badge: "h-8 w-8 text-xs rounded-lg",
      text: "text-base",
      subtext: "text-[9px]",
      dot: "h-1.5 w-1.5",
    },
    md: {
      badge: "h-9 w-9 text-sm rounded-xl",
      text: "text-lg",
      subtext: "text-[10px]",
      dot: "h-2 w-2",
    },
    lg: {
      badge: "h-12 w-12 text-lg rounded-2xl",
      text: "text-2xl",
      subtext: "text-xs",
      dot: "h-2.5 w-2.5",
    },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group transition-transform hover:scale-[1.02] select-none ${className}`}
    >
      {/* Monogram Badge */}
      <div
        className={`${sizeConfig.badge} relative flex items-center justify-center font-mono font-black shadow-xs border border-sky-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden`}
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:6px_6px] opacity-15" />

        {/* Monogram letters */}
        <span className="relative z-10 flex items-center">
          <span className="text-sky-400 group-hover:text-sky-300 transition-colors">T</span>
          <span className="text-rose-500 group-hover:text-rose-400 transition-colors">A</span>
        </span>

        {/* Live status dot */}
        <span
          className={`absolute top-1 right-1 ${sizeConfig.dot} rounded-full bg-emerald-500 ring-2 ring-slate-950 shadow-xs`}
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`${sizeConfig.text} font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors leading-none`}
          >
            Tanvir <span className="bg-gradient-to-r from-sky-400 to-rose-500 bg-clip-text text-transparent">Ahmed</span>
          </span>
          <span
            className={`${sizeConfig.subtext} text-muted-foreground font-mono font-medium tracking-wider uppercase mt-1`}
          >
            Full-Stack Engineer
          </span>
        </div>
      )}
    </Link>
  );
}

