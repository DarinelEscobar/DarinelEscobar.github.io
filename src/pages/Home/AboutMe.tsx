import { ArrowUpRight } from "lucide-react";
import { usePortfolioContent, usePresentationCopy } from "@/lib/portfolioContent";

export default function AboutMe() {
  const { resume } = usePortfolioContent();
  const copy = usePresentationCopy();
  return (
    <section id="about" className="about-section section-space" aria-labelledby="about-title">
      <div className="page-shell about-layout">
        <div>
          <p className="eyebrow">{copy.about}</p>
          <h2 id="about-title" className="section-title about-title">{copy.aboutIntro}</h2>
        </div>
        <div className="about-copy">
          <p>{copy.aboutBody}</p>
          <p className="text-muted-foreground">{copy.aboutNote}</p>
          <a className="text-link" href={resume.personal_info.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={18} /></a>
          {resume.education.slice(0, 1).map((education) => (
            <div className="education-note" key={education.institution}>
              <p>{education.degree}</p>
              <p className="text-muted-foreground">{education.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
