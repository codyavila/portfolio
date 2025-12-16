"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, XCircle, Sparkles } from "lucide-react";
import Image from "next/image";

// --- Callout Component ---
interface CalloutProps {
  type?: "default" | "info" | "warning" | "danger" | "success" | "insight";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ 
  type = "default", 
  title, 
  children, 
  className 
}: CalloutProps) {
  const icons = {
    default: Info,
    info: Info,
    warning: AlertCircle,
    danger: XCircle,
    success: CheckCircle2,
    insight: Sparkles,
  };

  const styles = {
    default: "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
    info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
    warning: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
    danger: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100",
    success: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100",
    insight: "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800 text-violet-900 dark:text-violet-100",
  };

  const Icon = icons[type] || icons.default;

  return (
    <div className={cn("my-6 rounded-lg border p-4", styles[type], className)}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 shrink-0 mt-0.5 opacity-80" />
        <div className="flex-1">
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div className="text-sm [&>p]:m-0 [&>p+p]:mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

// --- Grid Layout Components ---
interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

export function Grid({ children, cols = 2, className }: GridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6 my-8", gridCols[cols], className)}>
      {children}
    </div>
  );
}

export function GridItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(className)}>{children}</div>;
}

// --- Steps Component ---
export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="steps mb-12 ml-4 border-l border-zinc-200 dark:border-zinc-800 pl-8 [counter-reset:step]">
      {children}
    </div>
  );
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative mb-8 last:mb-0 group">
      <div className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium text-zinc-500 group-hover:border-[var(--neon-primary-end)] group-hover:text-[var(--neon-primary-end)] transition-colors duration-300 shadow-[0_0_0_1px_transparent] group-hover:shadow-[0_0_10px_var(--neon-primary-end)]">
        <span className="sr-only">Step</span>
      </div>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 mt-0.5 text-base group-hover:text-[var(--neon-primary-end)] transition-colors duration-300">
        {title}
      </h3>
      <div className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// --- Captioned Image ---
interface CaptionedImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function CaptionedImage({ src, alt, caption, width = 800, height = 450, className }: CaptionedImageProps) {
  return (
    <figure className={cn("my-8", className)}>
      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
