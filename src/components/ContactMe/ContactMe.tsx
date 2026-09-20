import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { usePortfolioContent, usePresentationCopy } from "@/lib/portfolioContent";

export default function ContactMe({ standalone = false }: { standalone?: boolean }) {
  const { resume: { personal_info } } = usePortfolioContent();
  const copy = usePresentationCopy();
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const Title = standalone ? "h1" : "h2";

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 4000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(personal_info.email);
      setStatus("copied");
    } catch { setStatus("error"); }
  }

  const links = [
    { label: "GitHub", href: personal_info.github },
    { label: "LinkedIn", href: personal_info.linkedin },
    { label: "WhatsApp", href: "https://wa.me/" + personal_info.phone.replace(/\D/g, "") },
  ];
  return (
    <section id="contact" className={"contact-section section-space" + (standalone ? " contact-standalone" : "")} aria-labelledby="contact-title">
      <div className="page-shell">
        <Title id="contact-title" className="contact-title">{copy.contactTitle}</Title>
        <p className="contact-description">{copy.contactBody}</p>
        <div className="contact-email-row">
          <a className="contact-email" href={"mailto:" + personal_info.email}>{personal_info.email}<ArrowUpRight aria-hidden="true" /></a>
          <button type="button" className="icon-button copy-button" onClick={copyEmail} aria-label={status === "copied" ? copy.copied : copy.copy} title={copy.copy}>
            {status === "copied" ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
        <p className="copy-status" role="status">{status === "copied" ? copy.copied : status === "error" ? copy.copyFailed : ""}</p>
        <div className="contact-bottom">
          <a className="button button-primary" href={"mailto:" + personal_info.email}>{copy.email}<Mail size={18} /></a>
          <div><p className="contact-social-label">{copy.elsewhere}</p><div className="social-links">
            {links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16} /></a>)}
          </div></div>
        </div>
      </div>
    </section>
  );
}
