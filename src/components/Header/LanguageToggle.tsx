import React from "react";
import type { Language } from "@/content/portfolio/types";

interface LanguageToggleProps {
  language: Language;
  setLanguage: (language: Language) => void;
  className?: string;
  tooltipLabel?: string;
}

const languageLabels: Record<Language, string> = {
  en: "English",
  es: "Spanish",
};

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  setLanguage,
  className = "",
  tooltipLabel = "Language",
}) => {
  const sanitizedTooltipLabel = tooltipLabel.replace(/:\s*$/, "");
  const nextLanguage: Language = language === "en" ? "es" : "en";
  const nextLanguageLabel = languageLabels[nextLanguage];

  return (
    <button
      type="button"
      aria-label={`${sanitizedTooltipLabel}: ${nextLanguageLabel}`}
      title={`${sanitizedTooltipLabel}: ${nextLanguageLabel}`}
      onClick={() => setLanguage(nextLanguage)}
      className={`border-b border-transparent pb-px font-rob text-[0.8rem] leading-none transition-all duration-200 hover:border-dar/25 hover:text-dar/70 focus-visible:outline-none dark:hover:border-white/25 dark:hover:text-white/75 ${className} text-dar/60 dark:text-white/70`}
    >
      {nextLanguageLabel}
    </button>
  );
};

export default LanguageToggle;
