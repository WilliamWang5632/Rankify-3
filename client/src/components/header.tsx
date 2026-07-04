import ThemeToggle from "./theme-toggle";
import type { Theme } from "../hooks/useTheme";

export default function Header({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-2 w-full">
      <div className="flex-1" />
      <h1 className="text-2xl font-bold text-foreground text-center flex-1">
        RankBase
      </h1>
      <div className="flex-1 flex justify-end">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}