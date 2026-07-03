import { useState, useEffect } from "react";

export type Theme =
  | "slate"
  | "dark"
  | "midnight"
  | "obsidian"
  | "ocean"
  | "sapphire"
  | "forest"
  | "emerald"
  | "mist"
  | "sunset"
  | "grape"
  | "amethyst"
  | "rose"
  | "ruby"
  | "amber"
  | "mint";

const THEME_CLASSES: Record<Theme, string | null> = {
  slate: null, // slate lives on :root, no class needed
  dark: "dark",
  midnight: "theme-midnight",
  obsidian: "theme-obsidian",
  ocean: "theme-ocean",
  sapphire: "theme-sapphire",
  forest: "theme-forest",
  emerald: "theme-emerald",
  mist: "theme-mist",
  sunset: "theme-sunset",
  grape: "theme-grape",
  amethyst: "theme-amethyst",
  rose: "theme-rose",
  ruby: "theme-ruby",
  amber: "theme-amber",
  mint: "theme-mint",
};

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && stored in THEME_CLASSES) return stored;
    return "ocean";
  });

  useEffect(() => {
    const root = document.documentElement;
    Object.values(THEME_CLASSES).forEach((cls) => {
      if (cls) root.classList.remove(cls);
    });
    const cls = THEME_CLASSES[theme];
    if (cls) root.classList.add(cls);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}