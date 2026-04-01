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
      className={`inline-flex items-center gap-2 ${className}`}
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
              className={`font-rob text-[0.89rem] uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none ${
                isActive
                  ? "text-dar underline underline-offset-4 dark:text-white"
                  : "text-dar/45 hover:text-dar dark:text-white/55 dark:hover:text-white/80"
              }`}
            >
              {languageLabels[option]}
            </button>

            {index < toggleOptions.length - 1 ? (
              <span className="text-dar/25 dark:text-white/20">/</span>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
