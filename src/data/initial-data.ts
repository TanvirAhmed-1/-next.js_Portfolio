import { Project, Skill, ProfileInfo, Experience } from "@/types";

export const initialProfile: ProfileInfo = {
  name: "Tanvir Ahmed",
  title: "Full-Stack Software Engineer & Backend Specialist",
  bio: "Passionate Full-Stack Developer specializing in high-performance web applications using Next.js, Nest.js, TypeScript, and modern cloud architectures.",
  about:
    "I am a results-driven Full Stack Developer with extensive expertise in architecting scalable distributed systems, microservices with NestJS, and ultra-responsive full-stack web applications with Next.js & React. I focus on writing clean, modular, and maintainable code adhering to SOLID principles and industry best practices.",
  location: "Dhaka, Bangladesh",
  email: "tanvir.dev@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  availableForHire: true,
};

export const initialSkills: Skill[] = [
  // Backend
  {
    id: "skill-1",
    name: "NestJS",
    category: "Backend",
    level: "Expert",
    proficiency: 95,
    iconName: "SiNestjs",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-2",
    name: "Node.js & Express",
    category: "Backend",
    level: "Expert",
    proficiency: 92,
    iconName: "FaNodeJs",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-3",
    name: "TypeScript",
    category: "Backend",
    level: "Expert",
    proficiency: 95,
    iconName: "SiTypescript",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-4",
    name: "GraphQL & REST APIs",
    category: "Backend",
    level: "Advanced",
    proficiency: 90,
    iconName: "SiGraphql",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  // Frontend
  {
    id: "skill-5",
    name: "Next.js (App Router)",
    category: "Frontend",
    level: "Expert",
    proficiency: 95,
    iconName: "SiNextdotjs",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-6",
    name: "React 19",
    category: "Frontend",
    level: "Expert",
    proficiency: 94,
    iconName: "FaReact",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-7",
    name: "Tailwind CSS & Shadcn/UI",
    category: "Frontend",
    level: "Expert",
    proficiency: 96,
    iconName: "SiTailwindcss",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-8",
    name: "Redux Toolkit & Zustand",
    category: "Frontend",
    level: "Advanced",
    proficiency: 88,
    iconName: "SiRedux",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  // Database
  {
    id: "skill-9",
    name: "PostgreSQL & Prisma",
    category: "Database",
    level: "Advanced",
    proficiency: 90,
    iconName: "SiPostgresql",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-10",
    name: "MongoDB & Mongoose",
    category: "Database",
    level: "Advanced",
    proficiency: 88,
    iconName: "SiMongodb",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-11",
    name: "Redis Caching",
    category: "Database",
    level: "Advanced",
    proficiency: 85,
    iconName: "SiRedis",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  // DevOps & Cloud
  {
    id: "skill-12",
    name: "Docker & Containerization",
    category: "DevOps & Cloud",
    level: "Advanced",
    proficiency: 85,
    iconName: "FaDocker",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-13",
    name: "CI/CD & GitHub Actions",
    category: "DevOps & Cloud",
    level: "Intermediate",
    proficiency: 80,
    iconName: "FaGithub",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-14",
    name: "AWS & Vercel Deployment",
    category: "DevOps & Cloud",
    level: "Advanced",
    proficiency: 88,
    iconName: "FaAws",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  // Tools
  {
    id: "skill-15",
    name: "Jest & Supertest",
    category: "Tools & Others",
    level: "Advanced",
    proficiency: 84,
    iconName: "SiJest",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "skill-16",
    name: "Git & Linux CLI",
    category: "Tools & Others",
    level: "Expert",
    proficiency: 92,
    iconName: "FaGitAlt",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
];

export const initialProjects: Project[] = [
  {
    id: "project-1",
    title: "Enterprise E-Commerce Microservices",
    slug: "enterprise-ecommerce-microservices",
    description:
      "A high-throughput distributed e-commerce backend built with NestJS, RabbitMQ, PostgreSQL, and Next.js storefront.",
    longDescription:
      "Engineered an enterprise-grade multi-tenant e-commerce system with event-driven architecture using RabbitMQ, Redis distributed locks, and automated payment webhook processing with Stripe and SSLCommerz.",
    tags: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "RabbitMQ", "Docker"],
    category: "Full Stack",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://ecommerce-preview.example.com",
    githubUrl: "https://github.com/example/ecommerce-nest-microservices",
    featured: true,
    createdAt: "2024-12-01T00:00:00.000Z",
  },
  {
    id: "project-2",
    title: "AI SaaS Automation Platform",
    slug: "ai-saas-automation-platform",
    description:
      "Full-stack AI workflow automation tool with Next.js 16 App Router, OpenAI API, Server Actions, and Tailwind CSS.",
    longDescription:
      "Full-stack SaaS application that allows users to create and orchestrate multi-step AI agents. Features real-time streaming LLM responses, token usage billing, and an interactive drag-and-drop workflow canvas.",
    tags: ["Next.js", "React 19", "Tailwind CSS", "OpenAI", "Prisma", "Zod"],
    category: "Full Stack",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://ai-platform.example.com",
    githubUrl: "https://github.com/example/ai-saas-platform",
    featured: true,
    createdAt: "2024-11-01T00:00:00.000Z",
  },
  {
    id: "project-3",
    title: "NestJS Distributed Task Queue & Scheduler",
    slug: "nestjs-task-queue-scheduler",
    description:
      "High-performance BullMQ job queue manager with NestJS, Redis, Prometheus metrics, and Grafana monitoring.",
    longDescription:
      "A resilient distributed task processor supporting exponential backoff retries, cron jobs, rate limiting, and real-time socket events for system metrics.",
    tags: ["NestJS", "BullMQ", "Redis", "TypeScript", "Prometheus", "Jest"],
    category: "Backend",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://queue-docs.example.com",
    githubUrl: "https://github.com/example/nestjs-task-queue",
    featured: true,
    createdAt: "2024-10-01T00:00:00.000Z",
  },
  {
    id: "project-4",
    title: "FinTech Real-time Trading Dashboard",
    slug: "fintech-trading-dashboard",
    description:
      "Interactive cryptocurrency and stock market analytics portal with WebSockets, Recharts, and Shadcn/UI.",
    longDescription:
      "Sub-second updates of order book feeds and candle charts using WebSocket streaming, custom canvas-based indicators, and persistent user watchlists.",
    tags: ["Next.js", "WebSockets", "Shadcn/UI", "Tailwind CSS", "Zustand"],
    category: "Frontend",
    imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://fintech-dash.example.com",
    githubUrl: "https://github.com/example/fintech-dashboard",
    featured: false,
    createdAt: "2024-09-01T00:00:00.000Z",
  },
  {
    id: "project-5",
    title: "Cloud Native Healthcare API Gateway",
    slug: "cloud-native-healthcare-api-gateway",
    description:
      "HIPAA-compliant REST and GraphQL API Gateway built with NestJS, OAuth2, and MongoDB.",
    longDescription:
      "Secure backend gateway managing electronic medical records, featuring field-level encryption, role-based access control (RBAC), and automated audit logs.",
    tags: ["NestJS", "GraphQL", "MongoDB", "OAuth2", "Docker", "Swagger"],
    category: "Backend",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://healthcare-api.example.com",
    githubUrl: "https://github.com/example/healthcare-gateway",
    featured: false,
    createdAt: "2024-08-01T00:00:00.000Z",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Senior Full-Stack Engineer",
    company: "TechNova Solutions",
    period: "2023 - Present",
    description:
      "Leading architecture and development of scalable microservices in NestJS and frontend web apps in Next.js 15/16. Spearheaded transition to event-driven architectures reducing API latency by 45%.",
    skills: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: "exp-2",
    role: "Backend Software Engineer",
    company: "Innovate Digital Labs",
    period: "2021 - 2023",
    description:
      "Developed high-throughput REST APIs and GraphQL microservices. Designed database schemas with PostgreSQL and optimized query indexing for 10M+ records.",
    skills: ["Node.js", "NestJS", "MongoDB", "Redis", "Jest", "CI/CD"],
  },
  {
    id: "exp-3",
    role: "Full-Stack Web Developer",
    company: "CodeCraft Studios",
    period: "2019 - 2021",
    description:
      "Built responsive client portals and dashboards using React, Node.js, and modern CSS frameworks with cross-browser compatibility.",
    skills: ["React", "JavaScript", "Express", "Tailwind CSS", "Git"],
  },
];
