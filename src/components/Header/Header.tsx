import React, { useState } from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import useDarkMode from "@/hooks/useDarkMode";
import useCurrentTime from "@/hooks/useCurrentTime";
import useMediaQuery from "@/hooks/useMediaQuery";

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const formattedTime = useCurrentTime();
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
        />
      ) : (
        <HeaderDesktop
          formattedTime={formattedTime}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      )}
    </header>
  );
};

export default Header;
