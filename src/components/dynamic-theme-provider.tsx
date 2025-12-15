"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { generateTheme, applyThemeToDom } from "@/lib/theme-utils";

interface DynamicThemeContextType {
  sourceColor: string;
  setSourceColor: (color: string) => void;
}

const DynamicThemeContext = createContext<DynamicThemeContextType | undefined>(undefined);

export function useDynamicTheme() {
  const context = useContext(DynamicThemeContext);
  if (!context) {
    throw new Error("useDynamicTheme must be used within a DynamicThemeProvider");
  }
  return context;
}

export function DynamicThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  const [sourceColor, setSourceColor] = useState("#5E60CE"); // Default Aurora Blue

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    const generatedTheme = generateTheme(sourceColor, isDark);
    applyThemeToDom(generatedTheme);
  }, [sourceColor, resolvedTheme, theme]);

  return (
    <DynamicThemeContext.Provider value={{ sourceColor, setSourceColor }}>
      {children}
    </DynamicThemeContext.Provider>
  );
}
