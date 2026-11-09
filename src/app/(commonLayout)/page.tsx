import { ProfileService } from "@/server/modules/profile/profile.service";
import { SkillService } from "@/server/modules/skill/skill.service";
import { ProjectService } from "@/server/modules/project/project.service";
import { EducationService } from "@/server/modules/education/education.service";
import { experiences } from "@/data/initial-data";
import { HeroSection } from "@/components/ui/home/HeroSection";
import { AboutSection } from "@/components/ui/home/AboutSection";
import { SkillsSection } from "@/components/ui/home/SkillsSection";
import { EducationSection } from "@/components/ui/home/EducationSection";
import { ProjectsSection } from "@/components/ui/home/ProjectsSection";
import { ExperienceSection } from "@/components/ui/home/ExperienceSection";
import { ContactSection } from "@/components/ui/home/ContactSection";

export default async function Home() {
  const rawProjects = await ProjectService.getAllProjectsFromDB();
  const projects = (rawProjects as any[]).map((p) => ({
    ...p,
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
  }));

  const rawSkills = await SkillService.getAllSkillsFromDB();
  const skills = (rawSkills as any[]).map((sk) => ({
    ...sk,
    createdAt: sk.createdAt ? new Date(sk.createdAt).toISOString() : new Date().toISOString(),
  }));

  const rawEducations = await EducationService.getAllEducationsFromDB();
  const educations = (rawEducations as any[]).map((edu) => ({
    ...edu,
    createdAt: edu.createdAt ? new Date(edu.createdAt).toISOString() : new Date().toISOString(),
  }));

  const profile = await ProfileService.getProfileFromDB();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        {/* Dynamic Hero with verified Avatar & metrics */}
        <HeroSection profile={profile} />

        {/* About & Engineering Philosophy */}
        <AboutSection profile={profile} />

        {/* Dynamic Skills */}
        <SkillsSection initialSkills={skills} />

        {/* Dynamic Projects */}
        <ProjectsSection initialProjects={projects} />

        {/* Work Experience Timeline */}
        <ExperienceSection experiences={experiences} />

        {/* Academic Background & Education Qualifications */}
        <EducationSection educations={educations} />

        {/* Contact Form with React Hook Form + Dynamic Phone/Email */}
        <ContactSection profile={profile} />
      </main>
    </div>
  );
}
