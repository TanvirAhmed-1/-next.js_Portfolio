"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RHFInput, RHFTextArea } from "@/components/shared/forms";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  User,
  AtSign,
  Tag,
  Loader2,
  Download,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { IProfile } from "@/server/modules/profile/profile.interface";
import toast from "react-hot-toast";

interface ContactSectionProps {
  profile?: IProfile | null;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = profile?.email || "tanvir.dev@example.com";
  const phone = profile?.phone || "01786924911";
  const location = profile?.location || "Dhaka, Bangladesh";
  const resumeUrl = profile?.resumeUrl || "/resume";
  const github = profile?.github || "https://github.com";
  const linkedin = profile?.linkedin || "https://linkedin.com";

  const { handleSubmit, reset, control } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSubmitted(true);
        reset();
        toast.success("Thank you! Your message has been sent successfully.");
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (e: any) {
      console.error("Contact submit error:", e);
      toast.error(e.message || "Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-14 bg-slate-50/90 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-cyan-500/10 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <Badge
            variant="outline"
            className="mb-2.5 font-mono text-xs border-emerald-200 text-emerald-800 bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/10 px-3 py-0.5 font-semibold"
          >
            Initiate Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Get In Touch &amp; Collaborate
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-3 mb-2" />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
            Have a project in mind, a senior full-stack opportunity, or architectural inquiry? Let&apos;s connect.
          </p>
        </div>

        {/* Compact Equal-Height Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: Compact Bento Contact Hub */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              {/* Top Emerald Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

              <div className="space-y-4">
                {/* Header + Live Availability Pill */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      Contact Channels
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Available
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Direct instant channels for engineering roles, consulting &amp; collaborations.
                  </p>
                </div>

                {/* Row 1: WhatsApp & Phone Side-by-Side (2-Col Bento) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* WhatsApp Card */}
                  <a
                    href="https://wa.me/8801786924911"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-200/80 dark:border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all"
                  >
                    <div className="h-9 w-9 rounded-lg bg-white dark:bg-slate-800 text-[#25D366] flex items-center justify-center shrink-0 border border-emerald-200/80 dark:border-emerald-500/30 shadow-2xs group-hover:scale-105 transition-transform">
                      <FaWhatsapp className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          WhatsApp
                        </span>
                        <ArrowUpRight className="h-3 w-3 text-emerald-600 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block truncate mt-0.5">
                        01786924911
                      </span>
                    </div>
                  </a>

                  {/* Direct Phone Card */}
                  <a
                    href={`tel:${phone || "01786924911"}`}
                    className="group relative flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 hover:border-teal-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all"
                  >
                    <div className="h-9 w-9 rounded-lg bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-2xs group-hover:scale-105 transition-transform">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Direct Call
                        </span>
                        <ArrowUpRight className="h-3 w-3 text-slate-400 opacity-60 group-hover:opacity-100 transition-all" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block truncate mt-0.5">
                        {phone || "01786924911"}
                      </span>
                    </div>
                  </a>
                </div>

                {/* Row 2: Email Full-Width Card */}
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-2xs group-hover:scale-105 transition-transform">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Official Email
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block">
                        {email}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-500/20 shrink-0">
                    Send Mail
                  </span>
                </a>

                {/* Row 3: Location & Response Time Compact Pills */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                    <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block leading-none">
                        Base Location
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block mt-1">
                        {location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                    <Clock className="h-4 w-4 text-emerald-500 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block leading-none">
                        Response SLA
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block mt-1">
                        Within 24 Hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Single-Row Action Bar: CV + GitHub + LinkedIn */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-colors shadow-xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download CV
                </a>

                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Profile"
                  className="h-9.5 w-9.5 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <FaGithub className="h-4 w-4" />
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn Profile"
                  className="h-9.5 w-9.5 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 text-[#0077b5] transition-colors"
                >
                  <FaLinkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Direct Message Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="h-full flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              {/* Top Cyan-Emerald Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      Send a Direct Message
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      Delivered directly to inbox • Encrypted &amp; Verified
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-center animate-in fade-in my-auto">
                    <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-2.5" />
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-md mx-auto">
                      Thank you for reaching out. I will review your message and reply within 24 hours.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/40 dark:text-emerald-300 font-mono text-xs"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <RHFInput
                        name="name"
                        label="Your Name"
                        placeholder="John Doe"
                        required
                        control={control}
                        icon={<User className="h-4 w-4" />}
                      />

                      <RHFInput
                        name="email"
                        label="Your Email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        control={control}
                        icon={<AtSign className="h-4 w-4" />}
                      />
                    </div>

                    <RHFInput
                      name="subject"
                      label="Subject"
                      placeholder="e.g. Full-Stack Role / System Architecture"
                      required
                      control={control}
                      icon={<Tag className="h-4 w-4" />}
                    />

                    <RHFTextArea
                      name="message"
                      label="Message"
                      rows={3}
                      placeholder="Tell me about your project scope, tech stack, or opportunity..."
                      required
                      control={control}
                    />

                    <div className="pt-1">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        Send Direct Message
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
