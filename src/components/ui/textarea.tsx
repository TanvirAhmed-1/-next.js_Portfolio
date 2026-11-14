import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 px-3.5 py-2.5 text-sm font-sans text-slate-900 dark:text-slate-100 shadow-2xs transition-all duration-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 no-scrollbar",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
