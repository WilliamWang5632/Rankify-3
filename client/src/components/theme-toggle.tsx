import { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import type { Theme } from "../hooks/useTheme";

const THEMES: { value: Theme; label: string; bg: string; primary: string }[] = [
    { value: "slate", label: "Slate", bg: "0 0% 88%", primary: "0 0% 25%" },
    { value: "dark", label: "Dark", bg: "0 0% 11%", primary: "0 0% 90%" },
    { value: "midnight", label: "Midnight", bg: "0 0% 6%", primary: "0 0% 100%" },
    { value: "obsidian", label: "Obsidian", bg: "215 28% 6%", primary: "212 92% 65%" },
    { value: "mist", label: "Mist", bg: "0 0% 96%", primary: "0 0% 15%" },
    { value: "ocean", label: "Ocean", bg: "217 33% 12%", primary: "199 89% 60%" },
    { value: "sapphire", label: "Sapphire", bg: "225 45% 8%", primary: "221 83% 58%" },
    { value: "forest", label: "Forest", bg: "178 25% 10%", primary: "172 60% 45%" },
    { value: "emerald", label: "Emerald", bg: "155 45% 7%", primary: "152 76% 45%" },
    { value: "sunset", label: "Sunset", bg: "15 30% 10%", primary: "24 90% 58%" },
    { value: "amber", label: "Amber", bg: "30 20% 9%", primary: "38 92% 55%" },
    { value: "mint", label: "Mint", bg: "150 35% 96%", primary: "152 65% 40%" },
    { value: "grape", label: "Grape", bg: "270 25% 10%", primary: "271 70% 65%" },
    { value: "amethyst", label: "Amethyst", bg: "262 45% 8%", primary: "258 70% 62%" },
    { value: "rose", label: "Rose", bg: "340 25% 10%", primary: "340 75% 60%" },
    { value: "ruby", label: "Ruby", bg: "350 45% 8%", primary: "350 78% 52%" },
];

export default function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-full bg-secondary hover:bg-accent text-foreground transition-colors"
        aria-label="Choose theme"
        title="Choose theme"
      >
        <Palette className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-popover border border-border rounded-lg shadow-lg p-2 z-50 grid grid-cols-2 gap-1">
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setTheme(t.value);
                setOpen(false);
              }}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-popover-foreground hover:bg-accent transition-colors"
            >
              <span
                className="w-4 h-4 rounded-full border border-border shrink-0"
                style={{
                  background: `linear-gradient(135deg, hsl(${t.bg}) 50%, hsl(${t.primary}) 50%)`,
                }}
              />
              <span className="flex-1 text-left truncate">{t.label}</span>
              {theme === t.value && <Check className="w-3 h-3 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}