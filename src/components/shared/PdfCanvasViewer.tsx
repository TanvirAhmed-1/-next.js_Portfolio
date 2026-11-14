"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, FileWarning, ExternalLink } from "lucide-react";

interface PdfCanvasViewerProps {
  url: string;
  title?: string;
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function loadPdfJs(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("SSR"));
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
      return resolve(window.pdfjsLib);
    }

    const existing = document.querySelector(`script[src="${PDFJS_CDN}"]`);
    if (existing) {
      existing.addEventListener("load", () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
          resolve(window.pdfjsLib);
        } else {
          reject(new Error("pdfjsLib not available"));
        }
      });
      existing.addEventListener("error", () => reject(new Error("Failed to load pdf.js")));
      return;
    }

    const script = document.createElement("script");
    script.src = PDFJS_CDN;
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
        resolve(window.pdfjsLib);
      } else {
        reject(new Error("pdfjsLib failed to initialize"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load pdf.js script"));
    document.head.appendChild(script);
  });
}

export function PdfCanvasViewer({ url, title = "Resume PDF" }: PdfCanvasViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const [useFallbackIframe, setUseFallbackIframe] = useState(false);

  const isImageUrl = /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(url || "");

  useEffect(() => {
    let cancelled = false;

    async function renderPdf() {
      if (!url) return;

      if (isImageUrl) {
        setLoading(false);
        return;
      }

      // Google Drive links cannot be fetched directly as raw PDF bytes due to CORS
      if (url.includes("drive.google.com")) {
        setUseFallbackIframe(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setUseFallbackIframe(false);
      setNumPages(0);

      try {
        const pdfjsLib = await loadPdfJs();
        if (cancelled) return;

        const cleanUrl = url.split("#")[0];
        const loadingTask = pdfjsLib.getDocument({
          url: cleanUrl,
          withCredentials: false,
        });

        const pdf = await loadingTask.promise;
        if (cancelled) return;

        setNumPages(pdf.numPages);

        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = "";

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNum);

          // Render at high resolution so text is razor-sharp when CSS scales to 100% width
          const baseViewport = page.getViewport({ scale: 1 });
          const targetWidth = Math.max(container.clientWidth || 850, 850);
          const scale = (targetWidth / baseViewport.width) * dpr;
          const viewport = page.getViewport({ scale });

          const pageWrapper = document.createElement("div");
          pageWrapper.className =
            "relative w-full rounded-xl overflow-hidden bg-white border border-slate-200/90 dark:border-slate-800 shadow-lg";

          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.setAttribute("aria-label", `${title} - Page ${pageNum}`);

          const ctx = canvas.getContext("2d");
          if (ctx) {
            await page.render({
              canvasContext: ctx,
              viewport,
            }).promise;
          }

          pageWrapper.appendChild(canvas);

          if (pdf.numPages > 1) {
            const badge = document.createElement("div");
            badge.className =
              "px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between";
            badge.innerHTML = `<span>${title}</span><span>Page ${pageNum} of ${pdf.numPages}</span>`;
            pageWrapper.appendChild(badge);
          }

          container.appendChild(pageWrapper);
        }

        if (!cancelled) {
          setLoading(false);
        }
      } catch (err) {
        console.warn("PDF.js canvas render failed, falling back to iframe:", err);
        if (!cancelled) {
          setUseFallbackIframe(true);
          setLoading(false);
        }
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [url, title, isImageUrl]);

  if (isImageUrl) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-white">
          <img
            src={url}
            alt={title}
            className="w-full h-auto block object-contain bg-white"
          />
        </div>
      </div>
    );
  }

  if (useFallbackIframe) {
    const fallbackUrl = url.includes("drive.google.com/file/d/")
      ? url.replace(/\/view(\?.*)?$/, "/preview")
      : `${url.split("#")[0]}#view=FitH&toolbar=0&navpanes=0`;

    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-white">
          <iframe
            src={fallbackUrl}
            className="w-full h-[1200px] border-0 block bg-white"
            title={title}
          />
        </div>
        <div className="mt-3 flex items-center justify-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open full PDF in new tab
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {loading && (
        <div className="py-24 flex flex-col items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mb-3" />
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Rendering full PDF pages...
          </p>
        </div>
      )}

      <div
        ref={containerRef}
        className={`space-y-6 ${loading ? "hidden" : "block"}`}
      />

      {!loading && numPages === 0 && !useFallbackIframe && (
        <div className="py-16 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <FileWarning className="h-8 w-8 text-amber-500 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Unable to preview PDF inline
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open PDF directly
          </a>
        </div>
      )}
    </div>
  );
}
