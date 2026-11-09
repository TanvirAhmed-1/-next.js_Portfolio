"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { IProfile } from "@/server/modules/profile/profile.interface";
import Image from "next/image";

interface HeroSectionProps {
  profile?: IProfile | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const email = profile?.email || "tanvir.dev@example.com";
  const phone = profile?.phone || "01786924911";
  const location = profile?.location || "Dhaka, Bangladesh";
  const resumeUrl = profile?.resumeUrl || "/resume";
  const avatarUrl = profile?.avatarUrl || "/images/tanvir.png";

  return (
    <section className="relative pt-20 pb-8 md:pt-24 md:pb-0 overflow-hidden bg-tech-grid border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/40 to-sky-200/30 blur-3xl pointer-events-none rounded-full -z-10 dark:from-emerald-500/15 dark:via-cyan-500/10 dark:to-indigo-500/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left md:py-10">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50/90 text-xs font-mono font-semibold text-emerald-800 shadow-xs dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-400"></span>
              </span>
              <span>Available for Senior Full-Stack &amp; Backend Roles</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Architecting Resilient{" "}
              <span className="bg-gradient-to-r from-rose-600 to-orange-600 dark:from-rose-400 dark:to-orange-400 bg-clip-text text-transparent font-extrabold">
                NestJS
              </span>{" "}
              Backends &amp; Modern{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent font-extrabold">
                Next.js
              </span>{" "}
              Applications
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Hi, I&apos;m <strong className="text-slate-900 dark:text-white font-bold">{profile?.name || "Tanvir Ahmed"}</strong>. A Senior Full-Stack Engineer specializing in high-concurrency event-driven microservices, clean hexagonal architectures, PostgreSQL query tuning, and responsive Next.js web applications.
            </p>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs font-mono">
              <a
                href="https://wa.me/8801786924911"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
                className="inline-flex items-center justify-center p-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all shadow-xs"
              >
                <FaWhatsapp className="h-4 w-4 text-[#25D366]" />
              </a>

              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors shadow-xs font-medium"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-700 dark:hover:text-cyan-400 transition-colors shadow-xs font-medium"
              >
                <Mail className="h-3.5 w-3.5 text-teal-600 dark:text-cyan-400" />
                {email}
              </a>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 shadow-xs font-medium">
                <MapPin className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                {location}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a href="#projects">
                <Button size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 px-6">
                  Explore Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>

              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                <Button size="lg" variant="outline" className="gap-2 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:border-emerald-500 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 font-semibold shadow-xs">
                  <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Download CV / Resume
                </Button>
              </a>

              <a href="#contact">
                <Button size="lg" variant="ghost" className="gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 font-semibold">
                  Contact Me
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Portrait Showcase (No bg/border, only shadow) */}
          <div className="lg:col-span-5 flex items-end justify-center self-end">
            <div className="relative w-full max-w-[460px] lg:max-w-[500px] mx-auto flex items-end justify-center group -mt-6 md:-mt-10">
              <Image
                src="/images/tanvir.png"
                width={540}
                height={580}
                priority
                alt={profile?.name || "Tanvir Ahmed"}
                className="relative z-10 w-full h-auto object-contain object-bottom drop-shadow-[0_20px_35px_rgba(15,23,42,0.22)] dark:drop-shadow-[0_20px_35px_rgba(16,185,129,0.18)] transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}