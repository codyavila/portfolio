"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] shadow-sm dark:shadow-none p-6 dark:bg-zinc-900/50 dark:border-white/[0.1] bg-white border border-zinc-200/50 backdrop-blur-sm justify-between flex flex-col space-y-4 overflow-hidden",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-300">
        {icon}
        <div className="font-sans font-bold text-neutral-800 dark:text-neutral-100 mb-2 mt-2 text-lg">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-400 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
