import { ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "@/lib/portfolioContent";

export default function ContactMe({ page = false }: { page?: boolean }) {
  const { resume: { personal_info: { email, phone, linkedin, github } }, language } = usePortfolioContent();
  const es = language === "es";
  return <section className="contact-section"><div className="editorial-wrap">
    <div className="contact-top"><p>{es ? "¿Tienes una idea?" : "Have an idea?"}</p><span>DE / México</span></div>
    {page ? <h1>{es ? <>Hagamos algo <em>extraordinario.</em></> : <>Let’s make something <em>meaningful.</em></>}</h1> : <h2>{es ? <>Hagamos algo <em>extraordinario.</em></> : <>Let’s make something <em>meaningful.</em></>}</h2>}
    <p className="contact-description">{es ? "Conversemos sobre tu proyecto, una oportunidad o una buena idea." : "Let’s talk about your project, an opportunity, or a good idea."}</p>
    <a className="contact-email" href={`mailto:${email}`}>{email} <ArrowUpRight size={24} /></a>
    <div className="contact-footer"><span>© {new Date().getFullYear()} Darinel Escobar</span><div>
      <a href={github} target="_blank" rel="noreferrer">GitHub ↗</a>
      <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
      <a href={`https://wa.me/${phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp ↗</a>
    </div></div>
  </div></section>;
}
