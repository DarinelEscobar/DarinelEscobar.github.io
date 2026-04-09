import React from "react";
import { cn } from "@/lib/utils";
import type { ProjectsViewMode } from "./quickViewUtils";

interface ProjectsViewToggleProps {
  label: string;
  simplifiedLabel: string;
  detailedLabel: string;
  value: ProjectsViewMode;
  onChange: (nextValue: ProjectsViewMode) => void;
  className?: string;
}

const baseButtonClass =
  "rounded-full px-3 py-2 font-rob text-xs uppercase tracking-[0.18em] transition-colors sm:px-4";

const ProjectsViewToggle: React.FC<ProjectsViewToggleProps> = ({
  label,
  simplifiedLabel,
  detailedLabel,
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 p-1.5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/20",
        className
      )}
    >
      <span className="pl-2 font-rob text-[11px] uppercase tracking-[0.22em] text-5dar">
        {label}
      </span>

      <div className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] p-1 dark:bg-white/[0.04]">
        <button
          type="button"
          aria-pressed={value === "simplified"}
          className={cn(
            baseButtonClass,
            value === "simplified"
              ? "bg-dar text-whi shadow-sm dark:bg-white dark:text-black"
              : "text-dar hover:bg-black/[0.06] dark:text-whi dark:hover:bg-white/[0.08]"
          )}
          onClick={() => onChange("simplified")}
        >
          {simplifiedLabel}
        </button>

        <button
          type="button"
          aria-pressed={value === "detailed"}
          className={cn(
            baseButtonClass,
            value === "detailed"
              ? "bg-dar text-whi shadow-sm dark:bg-white dark:text-black"
              : "text-dar hover:bg-black/[0.06] dark:text-whi dark:hover:bg-white/[0.08]"
          )}
          onClick={() => onChange("detailed")}
        >
          {detailedLabel}
        </button>
      </div>
    </div>
  );
};

export default ProjectsViewToggle;
