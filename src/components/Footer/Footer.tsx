import { ArrowUp } from "lucide-react";
import { useResumeContent, usePresentationCopy } from "@/lib/portfolioContent";

export default function Footer() {
  const { personal_info } = useResumeContent();
  const copy = usePresentationCopy();
  return (
    <footer className="site-footer page-shell">
      <p>© {new Date().getFullYear()} {personal_info.short_name}</p>
      <button type="button" className="text-link" onClick={() => {
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }}>{copy.backTop}<ArrowUp size={16} /></button>
    </footer>
  );
}
