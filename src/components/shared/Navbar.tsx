"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Terminal, ShieldAlert } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export function Navbar({ onOpenAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-8"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Admin Shortcut */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaLinkedin className="h-5 w-5" />
            </Link>

            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-1.5 font-mono text-xs">
                <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                Manage CMS
                <Badge variant="secondary" className="text-[10px] py-0 px-1.5 ml-1">
                  CRUD
                </Badge>
              </Button>
            </Link>

            <a href="#contact">
              <Button size="sm">Get In Touch</Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/admin">
              <Button variant="outline" size="icon-sm" aria-label="Admin">
                <ShieldAlert className="h-4 w-4 text-amber-500" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-border/40 bg-background/95 backdrop-blur-md rounded-b-xl flex flex-col gap-3 px-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-border/30 flex flex-col gap-2">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-500" />
                  Admin CMS (CRUD Projects & Skills)
                </Button>
              </Link>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Get In Touch</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

