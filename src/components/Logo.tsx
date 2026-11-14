"use client";

import React, { useId } from "react";
import Link from "next/link";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const uid = useId().replace(/:/g, "");

  const sizeConfig = {
    sm: {
      emblem: "h-10 w-10",
      orbit: "h-11 w-11",
      title: "text-base",
      bracket: "text-xs",
      badgeText: "text-[8.5px]",
      gap: "gap-2.5",
    },
    md: {
      emblem: "h-11 w-11 sm:h-12 sm:w-12",
      orbit: "h-12 w-12 sm:h-13 sm:w-13",
      title: "text-lg sm:text-xl",
      bracket: "text-sm",
      badgeText: "text-[9.5px]",
      gap: "gap-3",
    },
    lg: {
      emblem: "h-14 w-14",
      orbit: "h-16 w-16",
      title: "text-2xl",
      bracket: "text-base",
      badgeText: "text-[10.5px]",
      gap: "gap-3.5",
    },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${sizeConfig.gap} group select-none focus:outline-none ${className}`}
    >
      {/* 3D Isometric Hexagonal Cyber-Core Emblem */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -3 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        className="relative flex items-center justify-center shrink-0"
      >
        {/* Multi-Spectrum Ambient Reactor Glow */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-emerald-500/35 via-teal-400/25 to-cyan-500/35 blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />

        {/* Rotating Orbital Tech Ring */}
        <svg
          viewBox="0 0 120 120"
          className={`absolute ${sizeConfig.orbit} pointer-events-none animate-[spin_14s_linear_infinite] opacity-75 group-hover:opacity-100 transition-opacity`}
          fill="none"
        >
          <circle
            cx="60"
            cy="60"
            r="57"
            stroke={`url(#orbit-${uid})`}
            strokeWidth="1.2"
            strokeDasharray="16 10 4 10"
          />
          <circle cx="60" cy="3" r="2.8" fill="#34d399" />
          <circle cx="117" cy="60" r="2.2" fill="#22d3ee" />
          <circle cx="60" cy="117" r="2.5" fill="#10b981" />
          <defs>
            <linearGradient id={`orbit-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Main 3D Hexagonal Isometric Cube SVG */}
        <svg
          viewBox="0 0 120 120"
          className={`${sizeConfig.emblem} relative z-10 drop-shadow-[0_4px_12px_rgba(16,185,129,0.28)]`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Metallic Armor Rim */}
            <linearGradient id={`armorRim-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="35%" stopColor="#10b981" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>

            {/* Inner Obsidian Frame */}
            <linearGradient id={`armorDark-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#090d16" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>

            {/* 3D Isometric Cube Faces */}
            <linearGradient id={`cubeTop-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>

            <linearGradient id={`cubeLeft-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id={`cubeRight-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#042f2e" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Core Radial Glow */}
            <radialGradient id={`coreGlow-${uid}`} cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
              <stop offset="55%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* 3D Sculpted 'T' Blade */}
            <linearGradient id={`tBlade-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="25%" stopColor="#6ee7b7" />
              <stop offset="65%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* 3D Sculpted 'A' Blade */}
            <linearGradient id={`aBlade-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cffafe" />
              <stop offset="30%" stopColor="#2dd4bf" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0e7490" />
            </linearGradient>

            {/* Specular Edge Highlight */}
            <linearGradient id={`spec-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* 1. Outer 3D Hexagonal Metallic Shield */}
          <polygon
            points="60,5 108,32.5 108,87.5 60,115 12,87.5 12,32.5"
            fill={`url(#armorRim-${uid})`}
          />

          {/* 2. Inner Armor Cutout */}
          <polygon
            points="60,9.5 104,34.8 104,85.2 60,110.5 16,85.2 16,34.8"
            fill={`url(#armorDark-${uid})`}
          />

          {/* 3. 3D Isometric Cube Facets */}
          <polygon points="60,13 101,36.5 60,60 19,36.5" fill={`url(#cubeTop-${uid})`} />
          <polygon points="19,36.5 60,60 60,107 19,83.5" fill={`url(#cubeLeft-${uid})`} />
          <polygon points="60,60 101,36.5 101,83.5 60,107" fill={`url(#cubeRight-${uid})`} />

          {/* 4. Isometric Depth Seam Lines */}
          <path
            d="M60 13 V60 M19 36.5 L60 60 L101 36.5 M60 60 V107"
            stroke="#34d399"
            strokeWidth="1.2"
            strokeOpacity="0.25"
          />

          {/* 5. Reactor Core Radial Glow */}
          <circle cx="60" cy="60" r="44" fill={`url(#coreGlow-${uid})`} />

          {/* 6. Inner Cybernetic Hex-Circuit */}
          <polygon
            points="60,21 94,40.5 94,79.5 60,99 26,79.5 26,40.5"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            strokeDasharray="7 4"
          />

          {/* 6 Vertex Energy Nodes */}
          <circle cx="60" cy="14" r="2.2" fill="#6ee7b7" />
          <circle cx="100" cy="37" r="2.2" fill="#2dd4bf" />
          <circle cx="100" cy="83" r="2.2" fill="#06b6d4" />
          <circle cx="60" cy="106" r="2.2" fill="#10b981" />
          <circle cx="20" cy="83" r="2.2" fill="#10b981" />
          <circle cx="20" cy="37" r="2.2" fill="#6ee7b7" />

          {/* 7. Side Neon Code Chevrons < > */}
          <path
            d="M24 51.5 L16.5 60 L24 68.5"
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M96 51.5 L103.5 60 L96 68.5"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 8. 3D Sculpted Interlocking 'T' & 'A' Blades */}
          {/* 3D 'T' Blade */}
          <path
            d="M27 36.5 H63.5 L58.8 47.5 H48.5 V84.5 H36.5 V47.5 H27 Z"
            fill={`url(#tBlade-${uid})`}
          />
          <path
            d="M27 36.5 H63.5 L61.8 40.5 H29.5 V47.5 H27 Z"
            fill={`url(#spec-${uid})`}
          />

          {/* 3D Interlocking 'A' Blade */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M66.5 36.5 H77.5 L93 84.5 H80.8 L77.5 73.2 H63.5 L59.8 84.5 H48.5 L66.5 36.5 Z M70.8 50.5 L66.5 63.8 H74.8 L70.8 50.5 Z"
            fill={`url(#aBlade-${uid})`}
          />
          <path
            d="M66.5 36.5 H70.2 L52.2 84.5 H48.5 L66.5 36.5 Z"
            fill={`url(#spec-${uid})`}
          />

          {/* 9. Top Specular Crown Highlight */}
          <path
            d="M36 18.5 L60 5 L84 18.5"
            fill="none"
            stroke="#ecfdf5"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </motion.div>

      {/* Brand Typography & Cyber-Architect Lockup */}
      {showText && (
        <div className="flex flex-col text-left">
          {/* Top Row: <TANVIR AHMED /> */}
          <div className="flex items-center gap-1 leading-none">
            <span
              className={`${sizeConfig.bracket} font-mono font-black text-cyan-500 dark:text-cyan-400 -mr-0.5 group-hover:-translate-x-0.5 transition-transform duration-300`}
            >
              &lt;
            </span>
            <span
              className={`${sizeConfig.title} font-black tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors`}
            >
              Tanvir
            </span>
            <span
              className={`${sizeConfig.title} font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent`}
            >
              Ahmed
            </span>
            <span
              className={`${sizeConfig.bracket} font-mono font-black text-emerald-500 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform duration-300`}
            >
              /&gt;
            </span>
          </div>

          {/* Bottom Row: Live Status Radar Pill + Role */}
          <div className="mt-1.5 inline-flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 dark:border-emerald-400/25">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span
              className={`${sizeConfig.badgeText} font-mono font-extrabold tracking-[0.16em] uppercase text-emerald-800 dark:text-emerald-300 leading-none`}
            >
              Full-Stack Architect
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}
