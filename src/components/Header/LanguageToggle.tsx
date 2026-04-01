import React from "react";
import { motion } from "framer-motion";
import type { Language } from "@/content/portfolio/types";

interface LanguageToggleProps {
  language: Language;
  setLanguage: (language: Language) => void;
  className?: string;
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
}) => {
  return (
    <div
      className={`inline-flex rounded-full border border-slate-200 bg-slate-100/95 p-1 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/70 ${className}`}
    >
      {toggleOptions.map((option) => {
        const isActive = option === language;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            aria-label={`Switch language to ${option === "en" ? "English" : "Spanish"}`}
            onClick={() => setLanguage(option)}
            className="relative rounded-full px-4 py-2 font-rob text-sm font-semibold uppercase tracking-[0.22em] transition-colors duration-200"
          >
            {isActive && (
              <motion.span
                layoutId="language-toggle-active"
                className="absolute inset-0 rounded-full bg-white shadow-[0_6px_16px_rgba(15,23,42,0.10)] dark:bg-slate-800 dark:shadow-[0_8px_24px_rgba(2,6,23,0.45)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <span
              className={`relative z-10 transition-colors ${
                isActive
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
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
