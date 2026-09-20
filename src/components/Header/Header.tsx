import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "@/lib/portfolioContent";
import useDarkMode from "@/hooks/useDarkMode";
import useLanguage from "@/hooks/useLanguage";
import useMediaQuery from "@/hooks/useMediaQuery";
import useModalDialog from "@/hooks/useModalDialog";
import LanguageToggle from "./LanguageToggle";

function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { ui, resume } = usePortfolioContent();
  useModalDialog(ref);
  return (
    <dialog ref={ref} id="mobile-navigation" className="mobile-menu" aria-label={ui.header.navigationLabel}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <div className="mobile-menu-top"><span>{resume.personal_info.short_name}</span>
        <button type="button" className="icon-button" aria-label={ui.header.closeLabel} onClick={onClose}><X /></button>
      </div>
      <nav aria-label={ui.header.navigationLabel}>
        {ui.header.navigationLinks.map((link) => <NavLink end={link.to === "/"} to={link.to} key={link.to} onClick={onClose}>{link.label}<ArrowUpRight /></NavLink>)}
      </nav>
      <a className="mobile-menu-email" href={"mailto:" + resume.personal_info.email}>{resume.personal_info.email}</a>
    </dialog>
  );
}

export default function Header() {
  const { ui, resume } = usePortfolioContent();
  const { language, setLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [isDesktop, location.pathname]);
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link className="brand-name" to="/">{resume.personal_info.short_name}<span aria-hidden="true">.</span></Link>
        <nav className="desktop-navigation" aria-label={ui.header.navigationLabel}>
          {ui.header.navigationLinks.map((link) => <NavLink to={link.to} key={link.to} end={link.to === "/"}>{link.label}</NavLink>)}
        </nav>
        <div className="header-controls">
          <LanguageToggle language={language} setLanguage={setLanguage} tooltipLabel={ui.header.languageLabel} />
          <button type="button" className="icon-button" onClick={toggleDarkMode}
            aria-label={isDarkMode ? ui.header.lightModeLabel : ui.header.darkModeLabel}
            title={isDarkMode ? ui.header.lightModeLabel : ui.header.darkModeLabel}>
            {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button type="button" className="icon-button menu-trigger" aria-expanded={menuOpen} aria-controls="mobile-navigation"
            aria-label={ui.header.menuLabel} onClick={() => setMenuOpen(true)}><Menu size={22} /></button>
        </div>
      </div>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
