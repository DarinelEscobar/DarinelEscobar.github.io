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
      className="
        py-3
        px-5
        flex
        justify-between
        items-center
        text-sm
        bg-bla
        text-white
        z-30
        transition-colors
        duration-500
        ease-in-out
      "
    >
      {/* Nombre corto (como en HeaderDesktop) */}
      <h1 className="font-rob text-lg font-bold text-dar">{short_name}</h1>

      {/* Botón para abrir/cerrar menú */}
      <button
        onClick={toggleMenu}
        className="font-rob text-lg font-bold text-dar"
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-whi text-white z-50 flex flex-col transition-colors duration-500 ease-in-out">
          {/* Sección superior del menú (botón Close) */}
          <div className="w-full flex justify-between items-center px-5 py-4 border-b border-gray-700">
            <h1 className="font-rob text-lg font-bold text-dar">{short_name}</h1>
            <button
              onClick={toggleMenu}
              className="font-rob text-lg font-bold text-dar hover:underline"
            >
              Close
            </button>
          </div>

          {/* CONTENIDO PRINCIPAL DEL MENÚ */}
          <div className="flex flex-col justify-start items-start px-5 gap-6 mt-4 text-dar">
            {/* Info: Nombre corto + rol */}
            <div>
              <h2 className="font-rob text-xl font-bold">{short_name}</h2>
              <p className="font-lat text-base text-5dar">{rol}</p>
            </div>

            {/* Info: Location + hora */}
            <div>
              <h2 className="font-rob text-base font-bold">Location:</h2>
              <p className="font-lat text-sm text-5dar">
                {location} ({formattedTime})
              </p>
            </div>

            {/* Toggle de tema */}
            <div>
              <h2 className="font-rob text-base font-bold">Theme:</h2>
              <button
                onClick={toggleDarkMode}
                className="font-lat text-sm underline text-5dar"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>

          {/* NAVEGACIÓN (enlaces) */}
          <div className="mt-auto flex flex-col gap-6 px-5 pb-10 text-dar">
            <MobileLink to="/" indexNumber="01" label="Index" />
            <MobileLink to="/Contact" indexNumber="02" label="Contact" />
            <MobileLink to="/Archive" indexNumber="03" label="Archive" />
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
    className="flex justify-between items-center text-xl font-bold border-b border-gray-700 pb-4"
    onClick={() => window.scrollTo(0, 0)}
  >
    <div className="flex items-center gap-3">
      <span className="text-2xl font-extrabold">{indexNumber}</span> {label}
    </div>
    <ArrowUpRight size={20} className="text-5dar" />
  </Link>
);

export default HeaderMobile;
