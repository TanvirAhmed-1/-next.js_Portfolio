"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
      } else {
        alert(result.message || "Failed to send message");
      }
    } catch (e) {
      console.error("Contact submit error:", e);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/20 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-3 font-mono text-xs">
            Let&apos;s Connect
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Get In Touch & Collaborate
          </h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
            Have an engineering challenge, contract opportunity, or full-time position? Let&apos;s talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-xs">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Contact Information
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                I respond within 24 hours. Feel free to reach out directly via email or connect on LinkedIn and GitHub.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block font-mono">Email</span>
                    <a
                      href="mailto:tanvir.dev@example.com"
                      className="hover:underline font-medium"
                    >
                      tanvir.dev@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-foreground">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block font-mono">Location</span>
                    <span className="font-medium">Dhaka, Bangladesh (Remote Worldwide)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40 flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 hover:bg-muted text-xs font-medium text-foreground transition-colors"
                >
                  <FaGithub className="h-4 w-4" /> GitHub
                </a>
                <a
                  href="https://linkedin.com"
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
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/60 shadow-xs">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                Validated with React Hook Form & Zod schema.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center animate-in fade-in">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                  <h4 className="text-base font-bold text-foreground mb-1">
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
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">Your Name *</Label>
                      <Input
                        id="contact-name"
                        placeholder="John Doe"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">Your Email *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-subject">Subject *</Label>
                    <Input
                      id="contact-subject"
                      placeholder="e.g. Project Discussion / Job Opportunity"
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Tell me about your architecture, timeline, and requirements..."
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" disabled={loading} className="w-full sm:w-auto gap-2">
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Send Message
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

