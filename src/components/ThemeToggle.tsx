"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSoundSystem } from "@/hooks/useSoundSystem";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { playToggle } = useSoundSystem();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
        <span className="sr-only">Toggle theme</span>
        <div className="w-5 h-5" />
      </button>
    );
  }

  const handleToggle = () => {
    playToggle();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-neon-blue" />
      ) : (
        <Sun className="h-5 w-5 text-neon-blue" />
      )}
    </button>
  );
}
