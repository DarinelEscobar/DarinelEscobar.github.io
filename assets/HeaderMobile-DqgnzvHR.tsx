import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import data from "@data/data.json";

interface HeaderMobileProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  formattedTime: string;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({
  isMenuOpen,
  toggleMenu,
  toggleDarkMode,
  isDarkMode,
  formattedTime,
}) => {
  const { short_name, rol, location } = data.resume.personal_info;

  return (
    <div
      className="z-30 flex justify-between items-center bg-bla px-5 py-3 text-white text-sm transition-colors duration-500 ease-in-out"
    >
      {/* Nombre corto */}
      <h1 className="font-rob font-bold text-dar text-lg">{short_name}</h1>

      {/* Botón para abrir/cerrar menú */}
      <button
        onClick={toggleMenu}
        className="font-rob font-bold text-dar text-lg"
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      {isMenuOpen && (
        <div
          className="z-50 fixed inset-0 flex flex-col bg-whi text-white transition-colors duration-500 ease-in-out"
        >
          {/* Sección superior del menú (botón Close) */}
          <div className="flex justify-between items-center px-5 py-4 border-gray-700 border-b w-full">
            <h1 className="font-rob font-bold text-dar text-lg">
              {short_name}
            </h1>
            <button
              onClick={toggleMenu}
              className="font-rob font-bold text-dar text-lg hover:underline"
            >
              Close
            </button>
          </div>

          {/* CONTENIDO PRINCIPAL DEL MENÚ */}
          <div className="flex flex-col justify-start items-start gap-6 mt-4 px-5 text-dar">
            {/* Info: Nombre corto + rol */}
            <div>
              <h2 className="font-rob font-bold text-xl">{short_name}</h2>
              <p className="font-lat text-5dar text-base">{rol}</p>
            </div>

            {/* Info: Location + hora */}
            <div>
              <h2 className="font-rob font-bold text-base">Location:</h2>
              <p className="font-lat text-5dar text-sm">
                {location} ({formattedTime})
              </p>
            </div>

            {/* Toggle de tema */}
            <div>
              <h2 className="font-rob font-bold text-base">Theme:</h2>
              <button
                onClick={toggleDarkMode}
                className="font-lat text-5dar text-sm underline"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>

          {/* NAVEGACIÓN (enlaces) */}
          <div className="flex flex-col gap-6 mt-auto px-5 pb-10 text-dar">
            <MobileLink to="/" indexNumber="01" label="Index" />
            <MobileLink to="/Contact" indexNumber="02" label="Contact" />
            <MobileLink to="/Project" indexNumber="03" label="Projects" />
            {/* <MobileLink to="/Archive" indexNumber="03" label="Archive" /> */}
          </div>
        </div>
      )}
    </div>
  );
};

interface MobileLinkProps {
  to: string;
  indexNumber: string;
  label: string;
}

const MobileLink: React.FC<MobileLinkProps> = ({ to, indexNumber, label }) => (
  <Link
    to={to}
    className="flex justify-between items-center pb-4 border-gray-700 border-b font-bold text-xl"
    onClick={() => window.scrollTo(0, 0)}
  >
    <div className="flex items-center gap-3">
      <span className="font-extrabold text-2xl">{indexNumber}</span> {label}
    </div>
    <ArrowUpRight size={20} className="text-5dar" />
  </Link>
);

export default HeaderMobile;
