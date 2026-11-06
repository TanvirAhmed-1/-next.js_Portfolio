"use client";

import React from "react";
import {
  SiNestjs,
  SiNextdotjs,
  SiTypescript,
  SiGraphql,
  SiTailwindcss,
  SiRedux,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiJest,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiLinux,
  SiNodedotjs,
} from "react-icons/si";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGithub,
  FaGitAlt,
  FaDatabase,
  FaCode,
  FaServer,
  FaLayerGroup,
  FaTools,
} from "react-icons/fa";

interface TechIconProps {
  name?: string;
  className?: string;
  size?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  SiNestjs,
  nestjs: SiNestjs,
  SiNextdotjs,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  SiTypescript,
  typescript: SiTypescript,
  SiGraphql,
  graphql: SiGraphql,
  SiTailwindcss,
  tailwind: SiTailwindcss,
  "tailwindcss": SiTailwindcss,
  SiRedux,
  redux: SiRedux,
  SiPostgresql,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  SiMongodb,
  mongodb: SiMongodb,
  SiRedis,
  redis: SiRedis,
  SiJest,
  jest: SiJest,
  SiPrisma,
  prisma: SiPrisma,
  SiDocker,
  FaDocker,
  docker: FaDocker,
  SiKubernetes,
  kubernetes: SiKubernetes,
  SiGit,
  FaGitAlt,
  git: FaGitAlt,
  SiLinux,
  linux: SiLinux,
  FaReact,
  react: FaReact,
  FaNodeJs,
  nodejs: FaNodeJs,
  node: FaNodeJs,
  SiNodedotjs,
  FaAws,
  aws: FaAws,
  FaGithub,
  github: FaGithub,
  FaDatabase,
  database: FaDatabase,
  FaServer,
  backend: FaServer,
  FaLayerGroup,
  frontend: FaLayerGroup,
  FaTools,
  tools: FaTools,
  FaCode,
  code: FaCode,
};

export function TechIcon({ name = "FaCode", className = "w-5 h-5", size }: TechIconProps) {
  const normalizedKey = name.toLowerCase().replace(/[\s\.\-_]/g, "");
  const IconComponent =
    iconMap[name] ||
    iconMap[normalizedKey] ||
    Object.entries(iconMap).find(([k]) => k.toLowerCase() === normalizedKey)?.[1] ||
    FaCode;

  return <IconComponent className={className} size={size} />;
}

