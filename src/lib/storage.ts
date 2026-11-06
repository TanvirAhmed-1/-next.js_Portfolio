import fs from "fs";
import path from "path";
import { Project, Skill, ProfileInfo } from "@/types";
import { initialProjects, initialSkills, initialProfile } from "@/data/initial-data";

interface StorageData {
  projects: Project[];
  skills: Skill[];
  profile: ProfileInfo;
}

// In-memory cache singleton across server requests
let memoryCache: StorageData | null = null;

function getDataFilePath(): string {
  // Check if we are running in a serverless environment (e.g. Vercel)
  const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
  if (isServerless) {
    return path.join("/tmp", "portfolio-data.json");
  }
  return path.join(process.cwd(), "src", "data", "portfolio-store.json");
}

export function loadData(): StorageData {
  if (memoryCache) {
    return memoryCache;
  }

  const filePath = getDataFilePath();

  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content) as StorageData;
      if (parsed.projects && parsed.skills) {
        memoryCache = parsed;
        return memoryCache;
      }
    }
  } catch (error) {
    console.error("Error reading storage file, falling back to initial data:", error);
  }

  // Initialize with initial seed data
  memoryCache = {
    projects: [...initialProjects],
    skills: [...initialSkills],
    profile: { ...initialProfile },
  };

  // Try saving initially
  try {
    saveData(memoryCache);
  } catch (e) {
    // Silent fail if filesystem is read-only
  }

  return memoryCache;
}

export function saveData(data: StorageData): void {
  memoryCache = data;
  try {
    const filePath = getDataFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Could not write to filesystem, preserved in memory:", error);
  }
}

// Projects Operations
export function getProjects(): Project[] {
  const data = loadData();
  return data.projects;
}

export function getProjectById(id: string): Project | undefined {
  const data = loadData();
  return data.projects.find((p) => p.id === id || p.slug === id);
}

export function addProject(
  newProject: Omit<Project, "id" | "createdAt" | "slug"> & { slug?: string }
): Project {
  const data = loadData();
  const slug =
    newProject.slug?.trim() ||
    newProject.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const project: Project = {
    ...newProject,
    id: `project-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    slug,
    createdAt: new Date().toISOString(),
  };

  data.projects = [project, ...data.projects];
  saveData(data);
  return project;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const data = loadData();
  const index = data.projects.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;

  data.projects[index] = {
    ...data.projects[index],
    ...updates,
  };
  saveData(data);
  return data.projects[index];
}

export function deleteProject(id: string): boolean {
  const data = loadData();
  const beforeLen = data.projects.length;
  data.projects = data.projects.filter((p) => p.id !== id && p.slug !== id);
  if (data.projects.length !== beforeLen) {
    saveData(data);
    return true;
  }
  return false;
}

// Skills Operations
export function getSkills(): Skill[] {
  const data = loadData();
  return data.skills;
}

export function addSkill(newSkill: Omit<Skill, "id" | "createdAt">): Skill {
  const data = loadData();
  const skill: Skill = {
    ...newSkill,
    id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  data.skills = [...data.skills, skill];
  saveData(data);
  return skill;
}

export function updateSkill(id: string, updates: Partial<Skill>): Skill | null {
  const data = loadData();
  const index = data.skills.findIndex((s) => s.id === id);
  if (index === -1) return null;

  data.skills[index] = {
    ...data.skills[index],
    ...updates,
  };
  saveData(data);
  return data.skills[index];
}

export function deleteSkill(id: string): boolean {
  const data = loadData();
  const beforeLen = data.skills.length;
  data.skills = data.skills.filter((s) => s.id !== id);
  if (data.skills.length !== beforeLen) {
    saveData(data);
    return true;
  }
  return false;
}

// Profile Operations
export function getProfile(): ProfileInfo {
  const data = loadData();
  return data.profile;
}

export function updateProfile(updates: Partial<ProfileInfo>): ProfileInfo {
  const data = loadData();
  data.profile = { ...data.profile, ...updates };
  saveData(data);
  return data.profile;
}

// Reset data to defaults
export function resetData(): StorageData {
  memoryCache = {
    projects: [...initialProjects],
    skills: [...initialSkills],
    profile: { ...initialProfile },
  };
  saveData(memoryCache);
  return memoryCache;
}
