"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      className={`p-2 rounded-lg border transition-all duration-200 cursor-target flex items-center justify-center ${
        theme === "dark"
          ? "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/25"
          : "bg-black/5 border-black/10 text-gray-700 hover:text-black hover:bg-black/10 hover:border-black/25"
      } ${className}`}
      data-cursor-label={`THEME // ${theme === "dark" ? "LIGHT" : "DARK"}`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
    </button>
  );
};
