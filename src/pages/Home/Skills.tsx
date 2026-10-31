import { usePortfolioContent } from "@/lib/portfolioContent";

export default function Skills() {
  const { resume, ui, language } = usePortfolioContent();
  const es = language === "es";
  return <section className="capabilities"><div className="editorial-wrap capabilities-layout">
    <div className="capabilities-intro"><p className="section-label">{es ? "Sobre mí" : "A little about me"}</p><h2>{es ? "Pensar, construir, mejorar." : "Think, build, refine."}</h2><p>{resume.professional_summary.summary} {resume.professional_summary.note}</p></div>
    <div className="capability-list"><p className="section-label">{es ? "Herramientas y conocimientos" : "Tools & knowledge"}</p>
      {Object.entries(resume.Skills_Technologies).map(([key, section]) => {
        const items = section.skills || section.languages_list || [];
        if (!items.length) return null;
        return <div className="capability-row" key={key}><h3>{ui.home.skills.sectionTitles[key] || key}</h3><p>{items.map(item => item.name).join(" / ")}</p></div>;
      })}
      {resume.certifications.items.length > 0 && <div className="capability-row"><h3>{ui.home.skills.sectionTitles.certifications}</h3><div className="certifications">{resume.certifications.items.map(item => <a key={item.name} href={item.link} target="_blank" rel="noreferrer">{item.name} ↗</a>)}</div></div>}
    </div>
  </div></section>;
}
