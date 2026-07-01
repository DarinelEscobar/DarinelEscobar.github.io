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
  "rounded-full px-3 py-2 font-rob text-xs font-bold transition-colors sm:px-4";

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
            ? "bg-[rgb(var(--cobalt))] text-white shadow-sm shadow-black/10"
            : "text-dar/75 hover:bg-white/[0.65] hover:text-[rgb(var(--cobalt))] dark:text-whi/72 dark:hover:bg-white/[0.08]"
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
            ? "bg-[rgb(var(--cobalt))] text-white shadow-sm shadow-black/10"
            : "text-dar/75 hover:bg-white/[0.65] hover:text-[rgb(var(--cobalt))] dark:text-whi/72 dark:hover:bg-white/[0.08]"
        )}
        onClick={() => onChange("experience")}
      >
        {realExperienceLabel}
      </button>
    </div>
  );
};

export default ProjectsSourceFilter;
