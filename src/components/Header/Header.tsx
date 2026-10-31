import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import useDarkMode from "@/hooks/useDarkMode";
import useLanguage from "@/hooks/useLanguage";

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage } = useLanguage();
  const es = language === "es";
  return <header className="editorial-header">
    <Link className="brand" to="/" aria-label="Darinel Escobar — Home">DE<span>.</span></Link>
    <nav aria-label={es ? "Navegación principal" : "Main navigation"}>
      <Link to="/">{es ? "Inicio" : "Home"}</Link>
      <Link to="/Project">{es ? "Proyectos" : "Projects"}</Link>
      <Link to="/Contact">{es ? "Contacto" : "Contact"}</Link>
    </nav>
    <div className="header-actions">
      <button type="button" onClick={() => setLanguage(es ? "en" : "es")} aria-label={es ? "Switch to English" : "Cambiar a español"}>{es ? "EN" : "ES"}</button>
      <button type="button" onClick={toggleDarkMode} aria-label={isDarkMode ? (es ? "Tema claro" : "Light theme") : (es ? "Tema oscuro" : "Dark theme")}>
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  </header>;
}
