// src/components/Header/Header.tsx
import React, { useState } from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import useDarkMode from "@/hooks/useDarkMode";
import useCurrentTime from "@/hooks/useCurrentTime";

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const formattedTime = useCurrentTime();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <header className="sticky top-0 left-0 w-full z-30 ">
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
