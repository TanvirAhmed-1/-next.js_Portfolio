"use client";

import React from "react";
import Link from "next/link";
import { Service } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Code2,
  Globe,
  Smartphone,
  Server,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

interface ServicesSectionProps {
  services: Service[];
}

// Icon mapper for dynamic service cards
const getServiceIcon = (iconName?: string | null) => {
  switch (iconName) {
    case "ShoppingCart":
      return <ShoppingCart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />;
    case "Globe":
      return <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    case "Smartphone":
      return <Smartphone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />;
    case "Server":
      return <Server className="h-6 w-6 text-amber-600 dark:text-amber-400" />;
    case "Layers":
      return <Layers className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />;
    case "ShieldCheck":
      return <ShieldCheck className="h-6 w-6 text-rose-600 dark:text-rose-400" />;
    case "Zap":
      return <Zap className="h-6 w-6 text-amber-500" />;
    default:
      return <Code2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />;
  }
};

export function ServicesSection({ services }: ServicesSectionProps) {
  // Only display active services that are set to show on homepage
  const homeServices = services.filter((s) => s.showOnHome && s.status === "ACTIVE");

  if (homeServices.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900/30 border-b border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3 font-mono text-xs border-emerald-200 text-emerald-800 bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/5 px-3 py-1">
              Available For Hire
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Engineering Services &amp; Solutions
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              Tailored software engineering for founders, businesses, and startups — from modern e-commerce architectures to cross-platform mobile apps.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/services">
              <Button variant="outline" className="gap-2 group bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold shadow-xs">
                View All Services &amp; Pricing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeServices.map((service) => (
            <div
              key={service.id}
              className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                service.featured
                  ? "bg-white dark:bg-slate-900 border-emerald-500/60 shadow-lg ring-2 ring-emerald-500/15"
                  : "bg-slate-50/70 dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-xs hover:bg-white dark:hover:bg-slate-900 hover:border-emerald-500/40"
              }`}
            >
              {/* Featured Badge */}
              {service.featured && (
                <div className="absolute -top-3.5 right-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold font-mono bg-emerald-600 text-white shadow-sm">
                    <Sparkles className="h-3 w-3" />
                    Popular Choice
                  </span>
                </div>
              )}

              <div>
                {/* Icon & Meta */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {service.iconImage ? (
                      <img
                        src={service.iconImage}
                        alt={service.title}
                        className="w-7 h-7 object-contain rounded-sm"
                      />
                    ) : (
                      getServiceIcon(service.icon)
                    )}
                  </div>

                  {service.deliveryTime && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-slate-700">
                      <Clock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      {service.deliveryTime}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Features / Deliverables */}
                {service.features && service.features.length > 0 && (
                  <div className="space-y-2.5 pt-4 border-t border-slate-200/70 dark:border-slate-800 mb-6">
                    <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1">
                      Deliverables:
                    </span>
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-mono font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing & CTA */}
              <div className="pt-5 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                    Starting from
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                    {service.pricing || "Custom Quote"}
                  </span>
                </div>

                <a href="#contact">
                  <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm px-4">
                    Inquire
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-sky-50 dark:from-emerald-500/10 dark:via-cyan-500/5 dark:to-indigo-500/10 border border-emerald-200/80 dark:border-emerald-500/20 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Have a custom project or architecture requirements?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              I collaborate with international teams and founders on hourly, fixed-scope, and retainer contracts.
            </p>
          </div>
          <a href="#contact" className="shrink-0">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20">
              Book a Free Architecture Call
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

