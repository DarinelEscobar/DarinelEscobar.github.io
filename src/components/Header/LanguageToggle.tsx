import React from "react";
import type { Language } from "@/content/portfolio/types";

interface LanguageToggleProps {
  language: Language;
  setLanguage: (language: Language) => void;
  className?: string;
  tooltipLabel?: string;
}

const toggleOptions: Language[] = ["en", "es"];

const languageLabels: Record<Language, string> = {
  en: "EN",
  es: "ES",
};

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  setLanguage,
  className = "",
  tooltipLabel = "Language",
}) => {
  const sanitizedTooltipLabel = tooltipLabel.replace(/:\s*$/, "");

  return (
    <div
      role="group"
      aria-label={sanitizedTooltipLabel}
      title={sanitizedTooltipLabel}
      className={`inline-flex items-center gap-1.5 ${className}`}
    >
      {toggleOptions.map((option, index) => {
        const isActive = option === language;

        return (
          <React.Fragment key={option}>
            <button
              type="button"
              aria-pressed={isActive}
              aria-label={`${sanitizedTooltipLabel}: ${option === "en" ? "English" : "Spanish"}`}
              onClick={() => setLanguage(option)}
              className={`border-b border-transparent pb-px font-rob text-[0.8rem] leading-none uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-none ${
                isActive
                  ? "border-dar/60 text-dar dark:border-white/70 dark:text-white"
                  : "text-dar/40 hover:border-dar/25 hover:text-dar/70 dark:text-white/45 dark:hover:border-white/25 dark:hover:text-white/75"
              }`}
            >
              {languageLabels[option]}
            </button>

            {index < toggleOptions.length - 1 ? (
              <span className="-mt-px text-[0.72rem] text-dar/20 dark:text-white/18">/</span>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
