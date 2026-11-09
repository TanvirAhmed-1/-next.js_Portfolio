"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RHFInput, RHFTextArea } from "@/components/forms";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  Phone,
  User,
  AtSign,
  Tag,
  Download,
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
  const location = profile?.location || "Dhaka, Bangladesh (Remote Available)";
  const resumeUrl = profile?.resumeUrl || "/resume";
  const github = profile?.github || "https://github.com";
  const linkedin = profile?.linkedin || "https://linkedin.com";

  const {
    handleSubmit,
    reset,
    control,
  } = useForm<ContactFormData>({
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
    <section id="contact" className="py-24 bg-slate-50/90 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-3 font-mono text-xs border-emerald-200 text-emerald-800 bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/5 px-3 py-1">
            Initiate Contact
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Get In Touch &amp; Collaborate
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl">
            Have a complex architecture to build, a senior engineering role, or a contract project? Let&apos;s talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Direct Contact Information
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                I respond within 24 hours. Feel free to message on WhatsApp, call directly, send an email, or download my verified resume.
              </p>

              <div className="space-y-4">
                {/* WhatsApp Direct */}
                <div className="flex items-center gap-3.5 text-sm text-slate-900 dark:text-white">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-[#25D366] flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/30 shadow-2xs">
                    <FaWhatsapp className="h-5 w-5 text-[#25D366]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">WhatsApp (Instant Chat)</span>
                    <a
                      href="https://wa.me/8801786924911"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline font-mono font-bold text-emerald-700 dark:text-emerald-400"
                    >
                      01786924911
                    </a>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-center gap-3.5 text-sm text-slate-900 dark:text-white">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/20 shadow-2xs">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Direct Phone</span>
                    <a
                      href={`tel:${phone || "01786924911"}`}
                      className="hover:underline font-mono font-semibold text-slate-800 dark:text-slate-200"
                    >
                      {phone || "01786924911"}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3.5 text-sm text-slate-900 dark:text-white">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-cyan-500/10 text-teal-700 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-teal-200 dark:border-cyan-500/20 shadow-2xs">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Email Address</span>
                    <a
                      href={`mailto:${email}`}
                      className="hover:underline font-semibold text-slate-800 dark:text-slate-200"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3.5 text-sm text-slate-900 dark:text-white">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-500/20 shadow-2xs">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Location</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{location}</span>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-3.5 text-sm text-slate-900 dark:text-white">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/20 shadow-2xs">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Status</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">Available for Opportunities</span>
                  </div>
                </div>
              </div>

              {/* CV Download Strip */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold transition-all shadow-2xs"
                >
                  <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Download Verified CV (PDF)
                </a>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <FaGithub className="h-4 w-4" /> GitHub
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <FaLinkedin className="h-4 w-4 text-[#0077b5]" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: React Hook Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Validated with React Hook Form &amp; Zod runtime schema.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-center animate-in fade-in">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                    Thank you for reaching out. I will get back to your email as soon as possible.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="e.g. Distributed System Architecture / Job Offer"
                    required
                    control={control}
                    icon={<Tag className="h-4 w-4" />}
                  />

                  <RHFTextArea
                    name="message"
                    label="Message / Architecture Requirements"
                    rows={4}
                    placeholder="Tell me about your tech stack, timeline, and goals..."
                    required
                    control={control}
                  />

                  <Button type="submit" disabled={loading} className="w-full sm:w-auto gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 px-6">
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Send Direct Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
