
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ className = "", showLabel = false }) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme placeholder"
        className={`p-2 rounded-xl border border-slate-700/80 bg-slate-900 text-slate-400 opacity-50 ${className}`}
        disabled
      >
        <Sun className="w-4 h-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-300 border ${
        isDark
          ? "bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800 hover:text-amber-300 hover:border-amber-500/40 shadow-sm"
          : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 shadow-sm"
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-semibold capitalize hidden sm:inline">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}

