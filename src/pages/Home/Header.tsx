import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderMobile from "./HeaderMobile";

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
    if (
      darkModePreference.matches &&
      !document.documentElement.classList.contains("dark")
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <header className="sticky top-0 left-0 w-full z-10">
      {isMobile ? (
        <HeaderMobile
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          formattedTime={formattedTime}
        />
      ) : (
        <div className="absolute top-0 left-0 w-full py-3 px-5 flex justify-between text-sm bgs-transparent z-10">
          <div className="flex flex-col text-left gap-0.5">
            <h1 className="font-rob text-[.9rem] font-bold text-lg leading-none text-dar">
              Darinel Escobar:
            </h1>
            <p className="font-lat text-[.9rem] text-base text-5dar leading-none">
              Software Engineering
            </p>
          </div>
          <div className="flex flex-col text-left gap-0.5">
            <h1 className="font-rob text-[.9rem] font-bold text-lg leading-none text-dar">
              Location:
            </h1>
            <p className="font-lat text-[.9rem] text-base text-5dar leading-none">
              Chiapas, Mexico ({formattedTime})
            </p>
          </div>
          <div className="flex flex-col text-left gap-0.5">
            <h1 className="font-rob text-[.9rem] font-bold text-lg leading-none text-dar">
              Navigation:
            </h1>
            <p className="font-lat text-[.9rem] text-base text-5dar leading-none">
              <Link to="/">Index</Link>, <Link to="/Projects">Projects</Link>,{" "}
              <Link to="/Archive">Archive</Link>, <Link to="/Contact">Contact</Link>
            </p>
          </div>
          <div className="flex flex-col text-left gap-0.5">
            <h1 className="font-rob text-[.9rem] font-bold text-lg leading-none text-dar">
              Theme:
            </h1>
            <button
              onClick={toggleDarkMode}
              className="font-rob text-[.9rem] font-bold text-lg leading-none text-dar underline"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
