import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/images/me.webp";
import spotlight from "@/assets/images/eztickets.mx/admin-dashboard.webp";
import { useResumeContent, usePresentationCopy } from "@/lib/portfolioContent";

export default function MainContent() {
  const { personal_info } = useResumeContent();
  const copy = usePresentationCopy();
  return (
    <section className="hero page-shell" aria-labelledby="hero-title">
      <div className="hero-content">
        <div className="hero-identity hero-enter">
          <img src={portrait} alt="" width={48} height={48} decoding="async" />
          <div><p>{personal_info.short_name}</p><p>{personal_info.rol}</p></div>
        </div>
        <h1 id="hero-title" className="hero-name hero-enter">{copy.heroTitle}<span>{copy.heroAccent}</span></h1>
        <p className="hero-description hero-enter">{copy.intro}</p>
        <div className="button-row hero-enter">
          <Link className="button button-primary" to="/#projects">{copy.work}<ArrowDownRight size={18} /></Link>
          <Link className="button button-outline" to="/Contact">{copy.contact}<ArrowUpRight size={18} /></Link>
        </div>
      </div>
      <figure className="hero-showcase hero-enter">
        <div className="hero-showcase-image"><img src={spotlight} alt={copy.spotlightAlt} width={1879} height={968} fetchPriority="high" decoding="async" /></div>
        <figcaption><div><p>EZTICKET</p><p>{copy.spotlightDescription}</p></div><span>Laravel / Livewire</span></figcaption>
      </figure>
    </section>
  );
}
