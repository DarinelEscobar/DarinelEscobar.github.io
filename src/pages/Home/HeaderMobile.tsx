import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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
  return (
    <div className="py-3 px-5 flex justify-between items-center text-sm bg-bla text-white">
      <h1 className="font-rob text-lg font-bold text-dar">Darinel Escobar</h1>
      <button onClick={toggleMenu} className="font-rob text-lg font-bold text-dar">
        {isMenuOpen ? "Close" : "Menu"}
      </button>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-whi text-white z-50 flex flex-col">
          {/* Botón Close */}
          <div className="w-full flex justify-between items-center px-5 py-4 border-b border-gray-700">
            <h1 className="font-rob text-lg font-bold text-dar">Darinel Escobar</h1>
            <button
              onClick={toggleMenu}
              className="font-rob text-lg font-bold text-dar hover:underline"
            >
              Close
            </button>
          </div>
          {/* Contenido principal */}
          <div className="flex flex-col justify-start items-start px-5 gap-6 mt-4 text-dar ">
            <div>
              <h2 className="font-rob text-xl font-bold">Darinel Escobar</h2>
              <p className="font-lat text-base text-5dar">Software Engineering</p>
            </div>
            <div>
              <h2 className="font-rob text-base font-bold">Location:</h2>
              <p className="font-lat text-sm text-5dar">
                Chiapas, Mexico ({formattedTime})
              </p>
            </div>
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
          {/* Navegación */}
          <div className="mt-auto flex flex-col gap-6 px-5 pb-10 text-dar">
            <Link
              to="/"
              className="flex justify-between items-center text-xl font-bold border-b border-gray-700 pb-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold">01</span> Index
              </div>
              <ArrowUpRight size={20} className="text-5dar" />
            </Link>
            <Link
              to="/Projects"
              className="flex justify-between items-center text-xl font-bold border-b border-gray-700 pb-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold">02</span> Projects
              </div>
              <ArrowUpRight size={20} className="text-5dar" />
            </Link>
            <Link
              to="/Archive"
              className="flex justify-between items-center text-xl font-bold border-b border-gray-700 pb-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold">03</span> Archive
              </div>
              <ArrowUpRight size={20} className="text-5dar" />
            </Link>
            <Link
              to="/Contact"
              className="flex justify-between items-center text-xl font-bold border-b border-gray-700 pb-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold">04</span> Contact
              </div>
              <ArrowUpRight size={20} className="text-5dar" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMobile;

