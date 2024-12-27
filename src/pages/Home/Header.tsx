// src/pages/Home/components/Header.tsx
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full py-3 px-5 flex justify-between text-sm bg-transparent z-10">
      <div className="flex flex-col text-left gap-0.5">
        {/* Texto oscuro en white mode => text-dar
            (Y se invertirá en modo oscuro) */}
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
          Chiapas, Mexico (9:00PM)
        </p>
      </div>
      <div className="flex flex-col text-left gap-0.5">
        <h1 className="font-rob text-[.9rem] font-bold text-lg leading-none text-dar">
          Navigation:
        </h1>
        <p className="font-lat text-[.9rem] text-base text-5dar leading-none">
          Index, Projects, Archive, Contact
        </p>
      </div>
      <div className="flex flex-col text-left gap-0.5">
        <h1 className="font-rob text-[.9rem] font-bold text-lg leading-none text-dar">
          Theme:
        </h1>
        {/* Botón para alternar */}
        <button
          onClick={toggleDarkMode}
          className="font-rob text-[.9rem] font-bold text-lg leading-none text-dar underline"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
};

export default Header;
