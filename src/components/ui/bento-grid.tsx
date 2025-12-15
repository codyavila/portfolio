"use client";
import { motion } from "framer-motion";
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
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "row-span-1 rounded-[2rem] group/bento hover:shadow-xl shadow-sm p-8 bg-[var(--glass-base)] border border-[var(--glass-border)] backdrop-blur-sm justify-between flex flex-col space-y-4 overflow-hidden transition-colors hover:bg-[var(--glass-elevated)]",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-300">
        {icon}
        <div className="font-sans font-bold text-[var(--text-primary)] mb-2 mt-2 text-lg">
          {title}
        </div>
        <div className="font-sans font-normal text-[var(--text-secondary)] text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
