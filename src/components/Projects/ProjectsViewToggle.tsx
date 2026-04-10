import React from "react";
import { cn } from "@/lib/utils";
import type { ProjectsViewMode } from "./quickViewUtils";

interface ProjectsViewToggleProps {
  simplifiedLabel: string;
  detailedLabel: string;
  value: ProjectsViewMode;
  onChange: (nextValue: ProjectsViewMode) => void;
  className?: string;
}

const baseButtonClass =
  "rounded-full px-3 py-2 font-rob text-[11px] uppercase tracking-[0.16em] transition-colors sm:px-4";

const ProjectsViewToggle: React.FC<ProjectsViewToggleProps> = ({
  simplifiedLabel,
  detailedLabel,
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-black/[0.04] p-1 dark:bg-white/[0.05]",
        className
      )}
    >
      <button
        type="button"
        aria-pressed={value === "simplified"}
        className={cn(
          baseButtonClass,
          value === "simplified"
            ? "bg-white text-dar shadow-sm shadow-black/10 dark:bg-white dark:text-black"
            : "text-dar/75 hover:bg-white/[0.65] dark:text-whi/72 dark:hover:bg-white/[0.08]"
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
            ? "bg-white text-dar shadow-sm shadow-black/10 dark:bg-white dark:text-black"
            : "text-dar/75 hover:bg-white/[0.65] dark:text-whi/72 dark:hover:bg-white/[0.08]"
        )}
        onClick={() => onChange("detailed")}
      >
        {detailedLabel}
      </button>
    </div>
  );
};

export default ProjectsViewToggle;
