import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Language } from "@/content/portfolio/types";
import { useResumeContent, useUiCopy } from "@/lib/portfolioContent";
import LanguageToggle from "./LanguageToggle";
import CurrentTime from "./CurrentTime";

interface HeaderMobileProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  language: Language;
  setLanguage: (language: Language) => void;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({
  isMenuOpen,
  toggleMenu,
  toggleDarkMode,
  isDarkMode,
  language,
  setLanguage,
}) => {
  const {
    personal_info: { short_name, rol, location },
  } = useResumeContent();
  const ui = useUiCopy();

  return (
    <div
      className="theme-transition z-30 flex items-center justify-between bg-bla px-5 py-3 text-sm text-white"
    >
      {/* Nombre corto */}
      <h1 className="font-rob font-bold text-dar text-lg">{short_name}</h1>

      {/* Botón para abrir/cerrar menú */}
      <button
        onClick={toggleMenu}
        className="font-rob font-bold text-dar text-lg"
      >
        {isMenuOpen ? ui.header.closeLabel : ui.header.menuLabel}
      </button>

      {isMenuOpen && (
        <div
          className="theme-transition fixed inset-0 z-50 flex flex-col bg-whi pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)] text-white"
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
              {ui.header.closeLabel}
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
              <h2 className="font-rob font-bold text-base">{ui.header.locationLabel}</h2>
              <p className="font-lat text-5dar text-sm">
                {location} (<CurrentTime locale={ui.locale.time} />)
              </p>
            </div>

            {/* Toggle de tema */}
            <div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-rob font-bold text-base">{ui.header.themeLabel}</h2>
                <LanguageToggle
                  language={language}
                  setLanguage={setLanguage}
                  tooltipLabel={ui.header.languageLabel}
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="theme-transition font-lat text-5dar text-sm underline"
                >
                  {isDarkMode ? ui.header.lightModeLabel : ui.header.darkModeLabel}
                </button>
              </div>
            </div>
          </div>

          {/* NAVEGACIÓN (enlaces) */}
          <div className="flex flex-col gap-6 mt-auto px-5 pb-10 text-dar">
            {ui.header.navigationLinks.map((link, index) => (
              <MobileLink
                key={link.to}
                to={link.to}
                indexNumber={String(index + 1).padStart(2, "0")}
                label={link.label}
                onNavigate={toggleMenu}
              />
            ))}
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
  onNavigate: () => void;
}

const MobileLink: React.FC<MobileLinkProps> = ({ to, indexNumber, label, onNavigate }) => (
  <Link
    to={to}
    className="flex justify-between items-center pb-4 border-gray-700 border-b font-bold text-xl"
    onClick={() => {
      onNavigate();
      window.scrollTo(0, 0);
    }}
  >
    <div className="flex items-center gap-3">
      <span className="font-extrabold text-2xl">{indexNumber}</span> {label}
    </div>
    <ArrowUpRight size={20} className="text-5dar" />
  </Link>
);

export default HeaderMobile;
