export interface IProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  about: string;
  location: string;
  phone?: string | null;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string | null;
  resumeUrl?: string | null;
  avatarUrl?: string | null;
  availableForHire: boolean;
  yearsOfExperience?: number | null;
  projectsCompleted?: number | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

