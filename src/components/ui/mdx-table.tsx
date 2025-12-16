"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CustomTable — Styled table wrapper for MDX
 * 
 * Provides glassmorphic styling consistent with the design system
 */
export function Table({ children, className }: TableProps) {
  return (
    <div className={cn(
      "my-6 w-full overflow-x-auto rounded-xl not-prose",
      "border border-zinc-200 dark:border-white/10",
      "bg-zinc-50/50 dark:bg-white/[0.02]",
      className
    )}>
      <table className="w-full border-collapse text-sm m-0">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, className }: TableProps) {
  return (
    <thead className={cn(
      "bg-zinc-100 dark:bg-white/5",
      "border-b border-zinc-200 dark:border-white/10",
      className
    )}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableProps) {
  return (
    <tbody className={cn("divide-y divide-zinc-200 dark:divide-white/5", className)}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className }: TableProps) {
  return (
    <tr className={cn(
      "transition-colors duration-150 border-0",
      "hover:bg-zinc-100/50 dark:hover:bg-white/[0.03]",
      className
    )}>
      {children}
    </tr>
  );
}

export function TableHeader({ children, className }: TableProps) {
  return (
    <th className={cn(
      "px-4 py-2.5 text-left font-semibold border-0",
      "text-zinc-900 dark:text-white",
      className
    )}>
      {children}
    </th>
  );
}

export function TableCell({ children, className }: TableProps) {
  return (
    <td className={cn(
      "px-4 py-2.5 border-0",
      "text-zinc-700 dark:text-zinc-300",
      className
    )}>
      {children}
    </td>
  );
}

/**
 * Simple wrapper that applies all table component overrides to standard markdown tables
 */
export const tableComponents = {
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};
