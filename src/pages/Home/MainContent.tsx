import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import portrait from "@/assets/images/me.webp";
import { usePortfolioContent } from "@/lib/portfolioContent";

export default function MainContent() {
  const { language, resume } = usePortfolioContent();
  const es = language === "es";
  return <section className="hero editorial-wrap">
    <div className="hero-copy">
      <p className="hero-intro">{resume.personal_info.rol} <span> / </span> México</p>
      <h1>{es ? <>Ideas que se convierten en <em>experiencias digitales.</em></> : <>Ideas shaped into <em>digital experiences.</em></>}</h1>
      <p className="hero-description">{es ? "Soy Darinel Escobar. Desarrollo productos digitales y soluciones full-stack para desafíos reales." : "I’m Darinel Escobar. I build digital products and full-stack solutions for real-world challenges."}</p>
      <div className="hero-actions">
        <Link className="editorial-button" to="/Project">{es ? "Ver proyectos" : "View projects"} <ArrowUpRight size={17} /></Link>
        <Link className="text-link" to="/Contact">{es ? "Hablemos" : "Let’s talk"} <ArrowUpRight size={17} /></Link>
      </div>
    </div>
    <div className="hero-visual">
      <div className="portrait-frame"><img src={portrait} alt={resume.personal_info.short_name} fetchPriority="high" /></div>
      <div className="portrait-caption"><span>Darinel Escobar</span><span>{es ? "Ingeniería y diseño digital" : "Engineering & digital design"}</span></div>
      <span className="hero-mark" aria-hidden="true">DE</span>
    </div>
    <div className="hero-bottom"><span>{es ? "Portafolio seleccionado" : "Selected portfolio"}</span><button type="button" onClick={() => document.getElementById("work")?.scrollIntoView()}>{es ? "Explorar" : "Explore"} <ArrowDownRight size={16} /></button></div>
  </section>;
}
