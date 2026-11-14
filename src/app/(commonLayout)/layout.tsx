import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ParticleCanvas } from "@/components/animations/ParticleCanvas";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <ParticleCanvas />
      <Navbar />
      <div className="relative z-10">{children}</div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

