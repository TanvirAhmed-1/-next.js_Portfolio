"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RHFInput } from "@/components/shared/forms";
import { Lock, Mail, ArrowLeft, Loader2, ShieldCheck, KeyRound, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: {
      email: "admin@tanvir.com",
      password: "admin123",
    },
  });

  const handleSuperAdminFill = () => {
    setValue("email", "superadmin@tanvir.com");
    setValue("password", "superadmin123");
    setError(null);
  };

  const handleAdminFill = () => {
    setValue("email", "admin@tanvir.com");
    setValue("password", "admin123");
    setError(null);
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || result.message || "Authentication failed. Check credentials.");
      }

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_auth", JSON.stringify(result.data));
      }

      toast.success("Login successful! Redirecting to dashboard...");

      // Redirect directly to admin dashboard
      window.location.href = "/admin";
    } catch (err: any) {
      console.error("Login failed:", err);
      toast.error(err.message || "Failed to authenticate. Please try again.");
      setError(err.message || "Failed to authenticate. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground relative bg-tech-grid">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-indigo-500/15 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-xs hover:bg-card">
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Button>
          </Link>
          <Logo size="sm" showText={false} />
        </div>

        <Card className="border-border/80 shadow-2xl bg-card/95 backdrop-blur-xl">
          <CardHeader className="text-center pb-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <CardTitle className="text-2xl font-black tracking-tight text-foreground">
              Admin Portal
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Authenticate to manage dynamic projects, blogs, skills, and portfolio profile.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-xs bg-destructive/10 border border-destructive/30 text-destructive rounded-xl">
                {error}
              </div>
            )}

            {/* Demo Hint Banner */}
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[11px] font-mono text-emerald-300">
                  <span className="font-bold text-emerald-400">⚡ Super Admin: </span>
                  superadmin@tanvir.com / superadmin123
                </div>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  onClick={handleSuperAdminFill}
                  className="text-[10px] h-6 px-2 font-mono border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 shrink-0"
                >
                  Super Admin
                </Button>
              </div>
              <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-emerald-500/20">
                <div className="text-[11px] font-mono text-emerald-300">
                  <span className="font-bold text-emerald-400">🛡️ Admin: </span>
                  admin@tanvir.com / admin123
                </div>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  onClick={handleAdminFill}
                  className="text-[10px] h-6 px-2 font-mono border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 shrink-0"
                >
                  Admin
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <RHFInput
                name="email"
                label="Admin Email"
                type="email"
                placeholder="admin@tanvir.com"
                required
                control={control}
                icon={<Mail className="h-4 w-4 text-cyan-400" />}
              />

              <RHFInput
                name="password"
                label="Admin Password"
                type="password"
                placeholder="••••••••"
                required
                control={control}
                icon={<Lock className="h-4 w-4 text-emerald-400" />}
                helperText="Password toggle enabled (Eye icon)"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full gap-2 mt-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    Access Admin Dashboard
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
