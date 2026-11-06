import { getProjects, getSkills } from "@/lib/storage";
import { experiences } from "@/data/initial-data";
import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/ui/home/HeroSection";
import { AboutSection } from "@/components/ui/home/AboutSection";
import { SkillsSection } from "@/components/ui/home/SkillsSection";
import { ProjectsSection } from "@/components/ui/home/ProjectsSection";
import { ExperienceSection } from "@/components/ui/home/ExperienceSection";
import { ContactSection } from "@/components/ui/home/ContactSection";
import { Footer } from "@/components/shared/Footer";


export default function Home() {
  const projects = getProjects();
  const skills = getSkills();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* About & Engineering Philosophy */}
        <AboutSection />

        {/* Dynamic Skills (CRUD Enabled) */}
        <SkillsSection initialSkills={skills} />

        {/* Dynamic Projects (CRUD Enabled) */}
        <ProjectsSection initialProjects={projects} />

        {/* Work Experience Timeline */}
        <ExperienceSection experiences={experiences} />

        {/* Contact Form with React Hook Form + Zod */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
