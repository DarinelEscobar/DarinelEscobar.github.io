// src/components/Header/HeaderDesktop.tsx
import React from "react";
import { Link } from "react-router-dom";
import data from "@data/data.json";

interface HeaderDesktopProps {
  formattedTime: string;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const HeaderDesktop: React.FC<HeaderDesktopProps> = ({ formattedTime, toggleDarkMode, isDarkMode }) => {
  const { short_name, rol, location } = data.resume.personal_info;

  return (
    <div className="absolute top-0 left-0 w-full py-3 px-5 flex justify-between text-sm bg-transparent z-10">
      <InfoSection title={`${short_name}:`} content={rol} />
      <InfoSection title="Location:" content={`${location} (${formattedTime})`} />
      <NavigationLinks />
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

interface InfoSectionProps {
  title: string;
  content: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content }) => (
  <div className="flex flex-col text-left gap-0.5">
    <h1 className="font-rob text-dar text-[0.89rem] font-bold">{title}</h1>
    <p className="font-lat text-dar text-[0.89rem]">{content}</p>
  </div>
);

const NavigationLinks: React.FC = () => (
  <div className="flex flex-col text-left gap-0.5">
    <h1 className="font-rob text-dar text-[0.89rem] font-bold">Navigation:</h1>
    <p className="font-lat text-dar text-[0.89rem]">
      <Link to="/">Index</Link>, <Link to="/Contact">Contact</Link>,{" "}
      <Link to="/Page2">Archive</Link>
    </p>
  </div>
);

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleDarkMode }) => (
  <div className="flex flex-col text-left gap-0.5">
    <h1 className="font-rob text-dar text-[0.89rem] font-bold">Theme:</h1>
    <button
      onClick={toggleDarkMode}
      className="font-rob text-dar text-[0.89rem] underline"
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  </div>
);

export default HeaderDesktop;
