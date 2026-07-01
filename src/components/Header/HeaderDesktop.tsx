import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import type { Language } from "@/content/portfolio/types";
import { useResumeContent, useUiCopy } from "@/lib/portfolioContent";
import { cn } from "@/lib/utils";
import { navActivePillTransition } from "@/lib/motionPresets";
import LanguageToggle from "./LanguageToggle";

interface HeaderDesktopProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  language: Language;
  setLanguage: (language: Language) => void;
}

const HeaderDesktop: React.FC<HeaderDesktopProps> = ({
  toggleDarkMode,
  isDarkMode,
  language,
  setLanguage,
}) => {
  const {
    personal_info: { short_name, rol },
  } = useResumeContent();
  const ui = useUiCopy();
  const location = useLocation();

  return (
    <motion.div
      className="theme-transition mx-auto mt-3 flex h-16 w-[calc(100%-2rem)] max-w-[1320px] items-center justify-between rounded-full border border-dar/10 bg-whi/82 px-4 text-sm shadow-[0_16px_44px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link to="/" className="min-w-0">
        <p className="font-rob text-sm font-bold text-dar">{short_name}</p>
        <p className="truncate font-lat text-xs text-dar/55">{rol}</p>
      </Link>

      <nav className="flex items-center gap-1 rounded-full border border-dar/10 bg-white/45 p-1 dark:border-white/10 dark:bg-white/[0.04]">
        {ui.header.navigationLinks.map((link) => {
          const isActive = location.pathname === link.to;

          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "relative overflow-hidden rounded-full px-4 py-2 font-rob text-xs font-bold transition-colors",
                isActive
                  ? "text-white"
                  : "text-dar/62 hover:text-[rgb(var(--cobalt))]",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="main-nav-active-pill"
                  className="absolute inset-0 rounded-full bg-[rgb(var(--cobalt))]"
                  transition={navActivePillTransition}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <LanguageToggle
          language={language}
          setLanguage={setLanguage}
          tooltipLabel={ui.header.languageLabel}
          className="shrink-0"
        />
        <button
          type="button"
          onClick={toggleDarkMode}
          className="rounded-full border border-dar/10 px-3 py-2 font-rob text-xs font-bold text-dar transition-colors hover:border-[rgb(var(--cobalt))] hover:text-[rgb(var(--cobalt))] dark:border-white/10"
        >
          {isDarkMode ? ui.header.lightModeLabel : ui.header.darkModeLabel}
        </button>
      </div>
    </motion.div>
  );
};

export default HeaderDesktop;
