import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Language } from "@/content/portfolio/types";
import { usePortfolioContent } from "@/lib/portfolioContent";
import LanguageToggle from "./LanguageToggle";

interface HeaderDesktopProps {
  formattedTime: string;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  language: Language;
  setLanguage: (language: Language) => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const HeaderDesktop: React.FC<HeaderDesktopProps> = ({
  formattedTime,
  toggleDarkMode,
  isDarkMode,
  language,
  setLanguage,
}) => {
  const {
    resume: {
      personal_info: { short_name, rol, location },
    },
    ui,
  } = usePortfolioContent();

  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className="top-0 left-0 z-10 absolute flex justify-between bg-transparent px-5 py-3 w-full text-sm transition-colors duration-100 ease-in-out"
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
    >
      <InfoSection title={`${short_name}:`} content={rol} />
      <InfoSection title={ui.header.locationLabel} content={`${location} (${formattedTime})`} />
      <NavigationLinks navigationLabel={ui.header.navigationLabel} navigationLinks={ui.header.navigationLinks} />
      <ControlsSection
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        setLanguage={setLanguage}
        themeLabel={ui.header.themeLabel}
        lightModeLabel={ui.header.lightModeLabel}
        darkModeLabel={ui.header.darkModeLabel}
        languageLabel={ui.header.languageLabel}
      />
    </motion.div>
  );
};

interface InfoSectionProps {
  title: string;
  content: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content }) => (
  <motion.div className="flex flex-col gap-0.5 text-left" variants={fadeIn}>
    <h1 className="font-bold font-rob text-[0.89rem] text-dar">{title}</h1>
    <p className="font-lat text-[0.89rem] text-dar">{content}</p>
  </motion.div>
);

interface NavigationLinksProps {
  navigationLabel: string;
  navigationLinks: Array<{ to: string; label: string }>;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  navigationLabel,
  navigationLinks,
}) => (
  <motion.div className="flex flex-col gap-0.5 text-left" variants={fadeIn}>
    <h1 className="font-bold font-rob text-[0.89rem] text-dar">{navigationLabel}</h1>
    <p className="font-lat text-[0.89rem] text-dar">
      {navigationLinks.map((link, index) => (
        <React.Fragment key={link.to}>
          {index > 0 ? ", " : ""}
          <Link to={link.to}>{link.label}</Link>
        </React.Fragment>
      ))}
    </p>
  </motion.div>
);

interface ControlsSectionProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
  themeLabel: string;
  lightModeLabel: string;
  darkModeLabel: string;
  languageLabel: string;
}

const ControlsSection: React.FC<ControlsSectionProps> = ({
  isDarkMode,
  toggleDarkMode,
  language,
  setLanguage,
  themeLabel,
  lightModeLabel,
  darkModeLabel,
  languageLabel,
}) => {
  return (
    <motion.div className="flex flex-col gap-1.5 text-left" variants={fadeIn}>
      <div className="flex flex-col gap-0.5">
        <h1 className="font-bold font-rob text-[0.89rem] text-dar">{themeLabel}</h1>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-fit font-rob text-[0.89rem] text-dar underline"
          >
            {isDarkMode ? lightModeLabel : darkModeLabel}
          </button>

          <LanguageToggle
            language={language}
            setLanguage={setLanguage}
            tooltipLabel={languageLabel}
            className="shrink-0"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HeaderDesktop;
