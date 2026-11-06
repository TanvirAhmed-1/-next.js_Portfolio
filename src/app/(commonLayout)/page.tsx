import { getProjects, getSkills } from "@/lib/storage";
import { ProfileService } from "@/server/modules/profile/profile.service";
import { experiences } from "@/data/initial-data";
import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/ui/home/HeroSection";
import { AboutSection } from "@/components/ui/home/AboutSection";
import { SkillsSection } from "@/components/ui/home/SkillsSection";
import { ProjectsSection } from "@/components/ui/home/ProjectsSection";
import { ExperienceSection } from "@/components/ui/home/ExperienceSection";
import { ContactSection } from "@/components/ui/home/ContactSection";
import { Footer } from "@/components/shared/Footer";

export default async function Home() {
  const projects = getProjects();
  const skills = getSkills();
  const profile = await ProfileService.getProfileFromDB();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Dynamic Hero with verified Avatar & metrics */}
        <HeroSection profile={profile} />

        {/* About & Engineering Philosophy */}
        <AboutSection profile={profile} />

        {/* Dynamic Skills (CRUD Enabled) */}
        <SkillsSection initialSkills={skills} />

        {/* Dynamic Projects (CRUD Enabled) */}
        <ProjectsSection initialProjects={projects} />

        {/* Work Experience Timeline */}
        <ExperienceSection experiences={experiences} />

        {/* Contact Form with React Hook Form + Dynamic Phone/Email */}
        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
