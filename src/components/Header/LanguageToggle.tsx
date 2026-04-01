import React from "react";
import { motion } from "framer-motion";
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
      className={`group relative inline-flex items-center rounded-full border border-slate-200/90 bg-slate-100/95 p-[3px] shadow-[0_1px_2px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-none ${className}`}
    >
      <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-1 font-rob text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-200 md:block md:group-hover:-translate-y-0.5 md:group-hover:opacity-100 dark:bg-white dark:text-slate-900">
        {sanitizedTooltipLabel}
      </span>

      {toggleOptions.map((option) => {
        const isActive = option === language;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            aria-label={`${sanitizedTooltipLabel}: ${option === "en" ? "English" : "Spanish"}`}
            title={sanitizedTooltipLabel}
            onClick={() => setLanguage(option)}
            className="relative min-w-[3.2rem] rounded-full px-3 py-1.5 text-center font-rob text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/80 dark:focus-visible:ring-white/20"
          >
            {isActive && (
              <motion.span
                layoutId="language-toggle-active"
                className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(15,23,42,0.10)] dark:bg-white/10 dark:shadow-[0_1px_3px_rgba(2,6,23,0.35)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <span
              className={`relative z-10 transition-colors ${
                isActive
                  ? "text-slate-800 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-white/55 dark:hover:text-white/80"
              }`}
            >
              {languageLabels[option]}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
