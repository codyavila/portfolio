"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { GlassCard } from "./glass-card";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4 md:gap-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[var(--glass-surface)] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle icon={item.icon}>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <GlassCard
      size="lg"
      enableTilt={false}
      enableShimmer={true}
      enableSpotlight={false}
      enableIridescence={false}
      enableChromatic={false}
      className={cn("h-full w-full p-4 overflow-hidden", className)}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </GlassCard>
  );
};
export const CardTitle = ({
  className,
  children,
  icon,
}: {
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2">
        {icon}
        <h4 className={cn("text-[var(--text-primary)] font-bold tracking-wide mt-4", className)}>
        {children}
        </h4>
    </div>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-[var(--text-secondary)] tracking-wide leading-relaxed text-body-m",
        className
      )}
    >
      {children}
    </p>
  );
};

