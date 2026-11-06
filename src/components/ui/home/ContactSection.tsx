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
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IProfile } from "@/server/modules/profile/profile.interface";
import toast from "react-hot-toast";

interface ContactSectionProps {
  profile?: IProfile | null;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = profile?.email || "tanvir.dev@example.com";
  const phone = profile?.phone || "+880 1700-000000";
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
    <section id="contact" className="py-24 bg-slate-50/50 dark:bg-card/30 border-t border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-3 font-mono text-xs border-emerald-500/30 text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/5">
            Initiate Contact
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Get In Touch & Collaborate
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-xl">
            Have a complex architecture to build, a senior engineering role, or a contract project? Let&apos;s talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-xl">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Direct Contact Information
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                I respond within 24 hours. Feel free to call directly, send an email, or download my verified resume.
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block font-mono">Direct Phone / WhatsApp</span>
                    <a
                      href={`tel:${phone}`}
                      className="hover:underline font-mono font-medium text-emerald-400"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <div className="h-9 w-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block font-mono">Email Address</span>
                    <a
                      href={`mailto:${email}`}
                      className="hover:underline font-medium text-foreground"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <div className="h-9 w-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block font-mono">Location</span>
                    <span className="font-medium text-muted-foreground">{location}</span>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block font-mono">Status</span>
                    <span className="font-medium text-emerald-400">Available for Opportunities</span>
                  </div>
                </div>
              </div>

              {/* CV Download Strip */}
              <div className="mt-6 pt-6 border-t border-border/40">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono font-medium transition-all"
                >
                  <Download className="h-4 w-4" />
                  Download Verified CV (PDF)
                </a>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 hover:bg-muted text-xs font-medium text-foreground transition-colors"
                >
                  <FaGithub className="h-4 w-4" /> GitHub
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 hover:bg-muted text-xs font-medium text-foreground transition-colors"
                >
                  <FaLinkedin className="h-4 w-4 text-[#0077b5]" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: React Hook Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-xl">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                Validated with React Hook Form & Zod runtime schema.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in fade-in">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-foreground mb-1">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4">
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

                  <Button type="submit" disabled={loading} className="w-full sm:w-auto gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold">
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
