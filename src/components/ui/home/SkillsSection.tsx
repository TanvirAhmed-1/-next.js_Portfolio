"use client";

import React, { useState } from "react";
import { Skill, SkillCategory } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechIcon } from "@/components/ui/home/TechIcon";
import { SkillFormDialog } from "@/components/admin/SkillFormDialog";
import { Plus, Edit2, Trash2, Layers, CheckCircle2 } from "lucide-react";

interface SkillsSectionProps {
  initialSkills: Skill[];
}

const CATEGORIES: Array<"All" | SkillCategory> = [
  "All",
  "Backend",
  "Frontend",
  "Database",
  "DevOps & Cloud",
  "Tools & Others",
];

export function SkillsSection({ initialSkills }: SkillsSectionProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [selectedCategory, setSelectedCategory] = useState<"All" | SkillCategory>("All");
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const handleAddSuccess = (newOrUpdated: Skill) => {
    setSkills((prev) => {
      const exists = prev.some((s) => s.id === newOrUpdated.id);
      if (exists) {
        return prev.map((s) => (s.id === newOrUpdated.id ? newOrUpdated : s));
      }
      return [...prev, newOrUpdated];
    });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete skill "${name}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert(result.error || "Failed to delete skill");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to delete skill");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="outline" className="mb-3 font-mono text-xs">
              Technical Arsenal
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Skills & Engineering Competencies
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              Fully dynamic tech stack. Add, edit, or delete technologies on the fly.
            </p>
          </div>

          {/* Quick Add Button */}
          <Button
            onClick={() => {
              setSkillToEdit(null);
              setIsDialogOpen(true);
            }}
            className="gap-2 shrink-0 shadow-xs"
          >
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border/40 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              {cat}
              {cat === "All" && ` (${skills.length})`}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-dashed border-border/60 bg-muted/10">
            <Layers className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">No skills in this category yet</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Click Add Skill to expand your technical stack.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSkillToEdit(null);
                setIsDialogOpen(true);
              }}
            >
              Add First Skill
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="group relative p-4 rounded-xl bg-card border border-border/60 shadow-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Actions */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                      <TechIcon name={skill.iconName || skill.name} className="h-5 w-5" />
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        onClick={() => {
                          setSkillToEdit(skill);
                          setIsDialogOpen(true);
                        }}
                        title="Edit Skill"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                      </Button>
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        disabled={deletingId === skill.id}
                        onClick={() => handleDelete(skill.id, skill.name)}
                        title="Delete Skill"
                        className="hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Skill Name & Level */}
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    <Badge variant="secondary" className="text-[10px] py-0 px-1.5 font-normal">
                      {skill.level}
                    </Badge>
                  </div>

                  <p className="text-[11px] text-muted-foreground font-mono">
                    {skill.category}
                  </p>
                </div>

                {/* Proficiency Progress Bar */}
                <div className="mt-4 pt-2">
                  <div className="flex justify-between items-center text-[10px] text-muted-foreground mb-1">
                    <span>Proficiency</span>
                    <span className="font-mono font-medium text-foreground">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skill Add / Edit Dialog */}
      <SkillFormDialog
        isOpen={isDialogOpen}
        skillToEdit={skillToEdit}
        onClose={() => {
          setIsDialogOpen(false);
          setSkillToEdit(null);
        }}
        onSuccess={handleAddSuccess}
      />
    </section>
  );
}
