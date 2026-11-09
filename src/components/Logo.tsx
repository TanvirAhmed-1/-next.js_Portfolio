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
        className={`${sizeConfig.badge} relative flex items-center justify-center font-mono font-black shadow-sm border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white overflow-hidden`}
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:6px_6px] opacity-20" />

        {/* Monogram letters */}
        <span className="relative z-10 flex items-center">
          <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">T</span>
          <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">A</span>
        </span>

        {/* Live status dot */}
        <span
          className={`absolute top-1 right-1 ${sizeConfig.dot} rounded-full bg-emerald-400 ring-2 ring-slate-900 shadow-xs`}
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`${sizeConfig.text} font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-none`}
          >
            Tanvir{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Ahmed
            </span>
          </span>
          <span
            className={`${sizeConfig.subtext} text-slate-500 dark:text-slate-400 font-mono font-semibold tracking-wider uppercase mt-1`}
          >
            Full-Stack Engineer
          </span>
        </div>
      )}
    </Link>
  );
}

