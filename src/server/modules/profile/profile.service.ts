import { prisma, isDatabaseConfigured } from "@/server/shared/prisma";
import { IProfile } from "./profile.interface";

const defaultProfile: IProfile = {
  id: "default-profile",
  name: "Tanvir Ahmed",
  title: "Full-Stack Software Engineer & Backend Specialist",
  bio: "Passionate Full-Stack Developer specializing in high-performance web applications using Next.js, Nest.js, TypeScript, and modern cloud architectures.",
  about:
    "I am a results-driven Full Stack Developer with extensive expertise in architecting scalable distributed systems, microservices with NestJS, and ultra-responsive full-stack web applications with Next.js & React. I focus on writing clean, modular, and maintainable code adhering to SOLID principles and industry best practices.",
  location: "Dhaka, Bangladesh",
  phone: "+880 1700-000000",
  email: "tanvir.dev@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  resumeUrl: "/resume",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  availableForHire: true,
  yearsOfExperience: 5,
  projectsCompleted: 35,
};

let memoryProfile: IProfile = { ...defaultProfile };

const getProfileFromDB = async (): Promise<IProfile> => {
  if (isDatabaseConfigured()) {
    try {
      const result = await prisma.profile.findFirst();
      if (result) {
        return result as unknown as IProfile;
      }

      // If no profile in DB yet, create one
      const created = await prisma.profile.create({
        data: {
          name: defaultProfile.name,
          title: defaultProfile.title,
          bio: defaultProfile.bio,
          about: defaultProfile.about,
          location: defaultProfile.location,
          phone: defaultProfile.phone,
          email: defaultProfile.email,
          github: defaultProfile.github,
          linkedin: defaultProfile.linkedin,
          twitter: defaultProfile.twitter,
          resumeUrl: defaultProfile.resumeUrl,
          avatarUrl: defaultProfile.avatarUrl,
          availableForHire: defaultProfile.availableForHire,
          yearsOfExperience: defaultProfile.yearsOfExperience,
          projectsCompleted: defaultProfile.projectsCompleted,
        },
      });
      return created as unknown as IProfile;
    } catch (error) {
      console.warn("Prisma profile find/create error:", error);
    }
  }

  return memoryProfile;
};

const updateProfileInDB = async (payload: Partial<IProfile>): Promise<IProfile> => {
  if (isDatabaseConfigured()) {
    try {
      const existing = await prisma.profile.findFirst();

      if (existing) {
        const updated = await prisma.profile.update({
          where: { id: existing.id },
          data: payload,
        });
        return updated as unknown as IProfile;
      } else {
        const created = await prisma.profile.create({
          data: {
            ...defaultProfile,
            ...payload,
          } as any,
        });
        return created as unknown as IProfile;
      }
    } catch (error) {
      console.warn("Prisma profile update error:", error);
    }
  }

  memoryProfile = { ...memoryProfile, ...payload };
  return memoryProfile;
};

export const ProfileService = {
  getProfileFromDB,
  updateProfileInDB,
};

