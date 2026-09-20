import { ChevronDown } from "lucide-react";
import useSkillSections, { type SkillSection } from "@/hooks/useSkillSections";
import { usePresentationCopy } from "@/lib/portfolioContent";

function SkillGroup({ section }: { section: SkillSection }) {
  return (
    <div className="skill-group">
      <h3><span aria-hidden="true" className="skill-icon">{section.icon}</span>{section.title}</h3>
      <ul className="skill-list">
        {section.skills.map((skill, index) => <li key={skill.name + index}><span aria-hidden="true">{skill.icon}</span>{skill.name}</li>)}
      </ul>
    </div>
  );
}

export default function Skills() {
  const sections = useSkillSections();
  const copy = usePresentationCopy();
  const mainIds = ["frontend_development", "backend_development", "mobile_development", "databases"];
  const main = mainIds.flatMap((id) => sections.filter((section) => section.id === id));
  const other = sections.filter((section) => !mainIds.includes(section.id));
  return (
    <section id="skills" className="page-shell section-space" aria-labelledby="skills-title">
      <div className="section-heading"><h2 id="skills-title" className="section-title">{copy.skills}</h2><p>{copy.skillsIntro}</p></div>
      <div className="skills-grid">{main.map((section) => <SkillGroup key={section.id} section={section} />)}</div>
      <details className="skills-disclosure">
        <summary>{copy.moreSkills}<ChevronDown size={20} /></summary>
        <div className="skills-grid">{other.map((section) => <SkillGroup key={section.id} section={section} />)}</div>
      </details>
    </section>
  );
}
