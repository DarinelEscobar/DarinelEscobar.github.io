import type { Language } from "@/content/portfolio/types";

interface LanguageToggleProps {
  language: Language;
  setLanguage: (language: Language) => void;
  className?: string;
  tooltipLabel?: string;
}

export default function LanguageToggle({ language, setLanguage, className = "", tooltipLabel = "Language" }: LanguageToggleProps) {
  const nextLanguage = language === "en" ? "es" : "en";
  const label = nextLanguage === "es" ? "Español" : "English";
  return <button type="button" className={"language-toggle " + className}
    aria-label={tooltipLabel.replace(/:\s*$/, "") + ": " + label} title={label}
    onClick={() => setLanguage(nextLanguage)}>{nextLanguage.toUpperCase()}</button>;
}
