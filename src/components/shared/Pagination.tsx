"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  itemLabel?: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20],
  itemLabel = "items",
  className = "",
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const startItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endItem = Math.min(safePage * pageSize, totalItems);

  // Build visible page numbers with ellipsis
  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];

    if (safePage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, safePage - 1);
    const end = Math.min(totalPages - 1, safePage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (safePage < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);
    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xs ${className}`}
    >
      {/* Left: Showing X to Y of Z + Optional Page Size Selector */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
        <span>
          Showing{" "}
          <strong className="font-bold text-slate-900 dark:text-white">
            {startItem}–{endItem}
          </strong>{" "}
          of{" "}
          <strong className="font-bold text-emerald-600 dark:text-emerald-400">
            {totalItems}
          </strong>{" "}
          {itemLabel}
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-3">
            <span className="text-[11px] text-slate-500">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageChange(1);
              }}
              aria-label="Rows per page"
              className="h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: Page Controls */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={safePage === 1}
          title="First Page"
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </button>

        {/* Previous Page */}
        <button
          type="button"
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage === 1}
          title="Previous Page"
          className="h-8 px-2.5 flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-0.5">
          {getPageNumbers().map((p, idx) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-1.5 text-xs font-mono text-slate-400 select-none"
              >
                ...
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`h-8 min-w-8 px-2 flex items-center justify-center rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  p === safePage
                    ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 border border-emerald-500"
                    : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage === totalPages}
          title="Next Page"
          className="h-8 px-2.5 flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        {/* Last Page */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={safePage === totalPages}
          title="Last Page"
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
