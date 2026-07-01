import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Language } from "@/content/portfolio/types";
import { useResumeContent, useUiCopy } from "@/lib/portfolioContent";
import { modalOverlay, staggerContainer, staggerItem } from "@/lib/motionPresets";
import LanguageToggle from "./LanguageToggle";

interface HeaderMobileProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  language: Language;
  setLanguage: (language: Language) => void;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({
  isMenuOpen,
  toggleMenu,
  toggleDarkMode,
  isDarkMode,
  language,
  setLanguage,
}) => {
  const {
    personal_info: { short_name, rol },
  } = useResumeContent();
  const ui = useUiCopy();
  const reduceMotion = useReducedMotion();

  return (
    <div className="theme-transition z-30 mx-3 mt-3 flex h-14 items-center justify-between rounded-full border border-dar/10 bg-whi/88 px-4 text-sm shadow-[0_14px_36px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/10">
      <Link to="/" className="font-rob text-sm font-bold text-dar">
        {short_name}
      </Link>

      <button
        type="button"
        onClick={toggleMenu}
        className="font-rob text-sm font-bold text-dar transition-colors hover:text-[rgb(var(--cobalt))]"
      >
        {isMenuOpen ? ui.header.closeLabel : ui.header.menuLabel}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="theme-transition fixed inset-0 z-50 flex flex-col bg-whi px-5 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] text-dar"
            variants={modalOverlay}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            exit={reduceMotion ? undefined : "exit"}
          >
            <div className="flex items-center justify-between border-b border-dar/10 py-5 dark:border-white/10">
              <div>
                <p className="font-rob text-sm font-bold text-dar">{short_name}</p>
                <p className="font-lat text-sm text-dar/55">{rol}</p>
              </div>
              <button
                type="button"
                onClick={toggleMenu}
                className="font-rob text-sm font-bold text-dar transition-colors hover:text-[rgb(var(--cobalt))]"
              >
                {ui.header.closeLabel}
              </button>
            </div>

            <div className="mt-8 flex items-center justify-between rounded-2xl border border-dar/10 bg-white/45 p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <div>
                <p className="font-rob text-xs font-bold text-dar/55">
                  {ui.header.themeLabel}
                </p>
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="mt-2 font-lat text-sm font-bold text-dar transition-colors hover:text-[rgb(var(--cobalt))]"
                >
                  {isDarkMode ? ui.header.lightModeLabel : ui.header.darkModeLabel}
                </button>
              </div>
              <LanguageToggle
                language={language}
                setLanguage={setLanguage}
                tooltipLabel={ui.header.languageLabel}
              />
            </div>

            <motion.nav
              className="mt-auto flex flex-col gap-4 pb-10"
              variants={staggerContainer}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
            >
              {ui.header.navigationLinks.map((link) => (
                <MobileLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  onNavigate={toggleMenu}
                />
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface MobileLinkProps {
  to: string;
  label: string;
  onNavigate: () => void;
}

const MobileLink: React.FC<MobileLinkProps> = ({ to, label, onNavigate }) => (
  <motion.div variants={staggerItem}>
    <Link
      to={to}
      className="flex items-center justify-between rounded-2xl border border-dar/10 bg-white/45 px-5 py-4 font-rob text-xl font-bold text-dar transition-colors hover:border-[rgb(var(--cobalt))] hover:text-[rgb(var(--cobalt))] dark:border-white/10 dark:bg-white/[0.04]"
      onClick={() => {
        onNavigate();
        window.scrollTo(0, 0);
      }}
    >
      {label}
      <ArrowUpRight size={20} className="text-current" />
    </Link>
  </motion.div>
);

export default HeaderMobile;
