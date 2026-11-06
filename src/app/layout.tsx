import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tanvir-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tanvir Ahmed | Senior Full-Stack Engineer (NestJS & Next.js)",
    template: "%s | Tanvir Ahmed",
  },
  description:
    "Production portfolio of Tanvir Ahmed, a Senior Full-Stack Software Engineer specializing in NestJS microservices, Next.js 16, TypeScript, distributed systems, and PostgreSQL.",
  keywords: [
    "Full-Stack Developer",
    "NestJS Developer",
    "Next.js Developer",
    "Senior Software Engineer",
    "TypeScript",
    "React 19",
    "Microservices",
    "PostgreSQL",
    "Docker",
    "Redis",
    "Tanvir Ahmed",
    "Bangladesh Software Engineer",
  ],
  authors: [{ name: "Tanvir Ahmed", url: siteUrl }],
  creator: "Tanvir Ahmed",
  publisher: "Tanvir Ahmed",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Tanvir Ahmed | Senior Full-Stack Engineer (NestJS & Next.js)",
    description:
      "Explore the enterprise projects, microservices architectures, and technical skills of Tanvir Ahmed.",
    siteName: "Tanvir Ahmed Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tanvir Ahmed - Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanvir Ahmed | Senior Full-Stack Engineer",
    description:
      "Enterprise microservices in NestJS and ultra-responsive full stack apps in Next.js 16.",
    creator: "@tanvir_dev",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tanvir Ahmed",
    jobTitle: "Senior Full-Stack Software Engineer",
    url: siteUrl,
    sameAs: [
      "https://github.com",
      "https://linkedin.com",
      "https://twitter.com",
    ],
    knowsAbout: [
      "NestJS",
      "Next.js",
      "React",
      "TypeScript",
      "Microservices",
      "PostgreSQL",
      "Docker",
      "Redis",
      "RabbitMQ",
      "GraphQL",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
