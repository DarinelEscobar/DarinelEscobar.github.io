import React, { useState } from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import useDarkMode from "@/hooks/useDarkMode";
import useCurrentTime from "@/hooks/useCurrentTime";
import useMediaQuery from "@/hooks/useMediaQuery";
import useLanguage from "@/hooks/useLanguage";
import { usePortfolioContent } from "@/lib/portfolioContent";

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage } = useLanguage();
  const { ui } = usePortfolioContent();
  const formattedTime = useCurrentTime(ui.locale.time);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header
      className="top-0 left-0 z-50 sticky pt-[env(safe-area-inset-top)] w-full transition-colors duration-100 ease-in-out"
    >
      {isMobile ? (
        <HeaderMobile
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          formattedTime={formattedTime}
          language={language}
          setLanguage={setLanguage}
        />
      ) : (
        <HeaderDesktop
          formattedTime={formattedTime}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          language={language}
          setLanguage={setLanguage}
        />
      )}
    </header>
  );
};

export default Header;
