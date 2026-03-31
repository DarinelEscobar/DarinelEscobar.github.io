import React from "react";
import type { Language } from "@/content/portfolio/types";

interface LanguageToggleProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const toggleOptions: Language[] = ["en", "es"];

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  return (
    <div className="inline-flex rounded-full border border-dar/15 bg-whi/90 p-1 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/70">
      {toggleOptions.map((option) => {
        const isActive = option === language;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLanguage(option)}
            className={`rounded-full px-3 py-1 font-rob text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
              isActive
                ? "bg-blue-500 text-whi shadow-sm"
                : "text-dar/70 hover:text-dar dark:text-white/70 dark:hover:text-white"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
