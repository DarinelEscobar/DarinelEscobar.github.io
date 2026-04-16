import React from "react";
import { cn } from "@/lib/utils";
import type { ProjectsSourceFilterMode } from "./quickViewUtils";

interface ProjectsSourceFilterProps {
  allProjectsLabel: string;
  realExperienceLabel: string;
  value: ProjectsSourceFilterMode;
  onChange: (nextValue: ProjectsSourceFilterMode) => void;
  className?: string;
}

const baseButtonClass =
  "rounded-full px-3 py-2 font-rob text-[11px] uppercase tracking-[0.16em] transition-colors sm:px-4";

const ProjectsSourceFilter: React.FC<ProjectsSourceFilterProps> = ({
  allProjectsLabel,
  realExperienceLabel,
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
        aria-pressed={value === "all"}
        className={cn(
          baseButtonClass,
          value === "all"
            ? "bg-white text-dar shadow-sm shadow-black/10 dark:bg-white dark:text-black"
            : "text-dar/75 hover:bg-white/[0.65] dark:text-whi/72 dark:hover:bg-white/[0.08]"
        )}
        onClick={() => onChange("all")}
      >
        {allProjectsLabel}
      </button>

      <button
        type="button"
        aria-pressed={value === "experience"}
        className={cn(
          baseButtonClass,
          value === "experience"
            ? "bg-white text-dar shadow-sm shadow-black/10 dark:bg-white dark:text-black"
            : "text-dar/75 hover:bg-white/[0.65] dark:text-whi/72 dark:hover:bg-white/[0.08]"
        )}
        onClick={() => onChange("experience")}
      >
        {realExperienceLabel}
      </button>
    </div>
  );
};

export default ProjectsSourceFilter;
