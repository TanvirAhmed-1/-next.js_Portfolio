import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ServiceService } from "@/server/modules/service/service.service";
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
  HelpCircle,
  FileCode2,
  Rocket,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Solutions | Full-Stack Engineering & E-Commerce",
  description:
    "Tailored software engineering services: E-Commerce design & development, custom full-stack web applications, mobile apps, and high-performance backend microservices.",
};

const getServiceIcon = (iconName?: string | null) => {
  switch (iconName) {
    case "ShoppingCart":
      return <ShoppingCart className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />;
    case "Globe":
      return <Globe className="h-7 w-7 text-blue-600 dark:text-blue-400" />;
    case "Smartphone":
      return <Smartphone className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />;
    case "Server":
      return <Server className="h-7 w-7 text-amber-600 dark:text-amber-400" />;
    case "Layers":
      return <Layers className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />;
    case "ShieldCheck":
      return <ShieldCheck className="h-7 w-7 text-rose-600 dark:text-rose-400" />;
    case "Zap":
      return <Zap className="h-7 w-7 text-amber-500" />;
    default:
      return <Code2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />;
  }
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Blueprint",
    desc: "We analyze your business goals, target audience, technical specifications, and architect the optimal data models and system design.",
    icon: Search,
  },
  {
    step: "02",
    title: "Iterative Architecture & UI",
    desc: "Crafting modern, accessible user interfaces in Next.js paired with robust modular NestJS endpoints, ensuring strict type safety.",
    icon: FileCode2,
  },
  {
    step: "03",
    title: "Testing & Performance Tuning",
    desc: "Rigorous unit testing, database query optimization, Lighthouse audits, and Cloudinary media optimization for sub-second speeds.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Production Deployment",
    desc: "CI/CD automated pipeline setup on Vercel, Docker container deployment, SSL, database backups, and 30 days of warranty support.",
    icon: Rocket,
  },
];

const FAQS = [
  {
    q: "How does the project estimation and payment work?",
    a: "We work with standard milestone-based contracts (typically 40% initial, 30% after alpha prototype, 30% upon final deployment). Fixed scope and hourly options are both available.",
  },
  {
    q: "Can you build custom e-commerce stores with local & international payment gateways?",
    a: "Yes! I architect custom e-commerce platforms using Next.js 16 and NestJS, integrating Stripe, PayPal, SSLCommerz, bKash, and custom checkout flows with real-time stock sync.",
  },
  {
    q: "Will my website or application be mobile-friendly and fast?",
    a: "Absolutely. Every project guarantees 95+ Google Lighthouse scores, complete responsive mobile testing across iOS and Android, and sub-second First Contentful Paint.",
  },
  {
    q: "Do you provide post-launch maintenance and support?",
    a: "Yes, every delivered project includes 30 days of complimentary bug-fixing and technical guidance. Long-term retainer contracts are also available.",
  },
];

export default async function ServicesPage() {
  let rawServices: any[] = [];
  try {
    rawServices = (await ServiceService.getAllServices()) as any[];
  } catch (e) {
    console.warn("Failed to load services on services page:", e);
  }

  const services: Service[] = (rawServices || []).map((s) => ({
    ...s,
    createdAt: s.createdAt ? new Date(s.createdAt).toISOString() : new Date().toISOString(),
  }));

  const activeServices = services.filter((s) => s.status === "ACTIVE");

  return (
    <div className="min-h-screen py-24 sm:py-32 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <Badge variant="outline" className="font-mono text-xs border-emerald-500/30 text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/5">
            Full-Stack Engineering Services
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
            Engineering High-Performance{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Web &amp; Digital Solutions
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            From modern e-commerce storefronts to mission-critical backend architectures and mobile applications. Every project is engineered for speed, conversion, and long-term maintainability.
          </p>
        </div>

        {/* All Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
          {activeServices.map((service) => (
            <div
              key={service.id}
              className={`group relative flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 ${
                service.featured
                  ? "border-emerald-500/60 shadow-lg ring-2 ring-emerald-500/15"
                  : "border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-emerald-500/40"
              }`}
            >
              {service.featured && (
                <div className="absolute -top-3.5 right-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-600 text-white shadow-md">
                    <Sparkles className="h-3.5 w-3.5" />
                    Recommended Choice
                  </span>
                </div>
              )}

              <div>
                {/* Icon & Delivery */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {service.iconImage ? (
                      <img
                        src={service.iconImage}
                        alt={service.title}
                        className="w-8 h-8 object-contain rounded-sm"
                      />
                    ) : (
                      getServiceIcon(service.icon)
                    )}
                  </div>

                  {service.deliveryTime && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-slate-700">
                      <Clock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      {service.deliveryTime}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables */}
                {service.features && service.features.length > 0 && (
                  <div className="space-y-3 pt-6 border-t border-slate-200/70 dark:border-slate-800 mb-6">
                    <span className="text-xs uppercase tracking-wider font-mono font-bold text-slate-500 dark:text-slate-400 block">
                      Scope of Deliverables:
                    </span>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-mono font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing & CTA */}
              <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-4 mt-auto">
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">
                    Starting Investment
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    {service.pricing || "Custom Quote"}
                  </span>
                </div>

                <Link href={`/#contact`}>
                  <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm px-4">
                    Order / Inquire
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Process */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-3 font-mono text-xs border-emerald-500/30 text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/5">
              Production Workflow
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              How We Deliver Projects Successfully
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              A transparent, structured four-step methodology ensuring on-time delivery and predictable results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-emerald-500/80">
                        {step.step}
                      </span>
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3 font-mono text-xs border-emerald-500/30 text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/5">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-2"
              >
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Card */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-sky-50 dark:from-emerald-500/15 dark:via-cyan-500/10 dark:to-indigo-500/15 border border-emerald-200 dark:border-emerald-500/30 text-center max-w-4xl mx-auto space-y-6 shadow-sm">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Ready to Build Your Next Product?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Share your requirements, mockups, or project idea, and let&apos;s build an exceptional high-converting digital solution.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
            <Link href="/#contact">
              <Button size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 shadow-lg shadow-emerald-600/20">
                Start a Conversation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#projects">
              <Button size="lg" variant="outline" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700">
                View Past Case Studies
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

