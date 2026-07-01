import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ChevronUp } from "lucide-react";
import { usePortfolioContent } from "@/lib/portfolioContent";

const Footer: React.FC = () => {
  const {
    resume: {
      personal_info: { short_name, email, linkedin, github, phone },
    },
    ui,
  } = usePortfolioContent();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const mainContainer = document.getElementById("main-container");
    if (mainContainer && mainContainer.scrollHeight > mainContainer.clientHeight + 1) {
      mainContainer.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-dar/10 pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] dark:border-white/10">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 px-0 py-5 text-sm text-dar/70 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-rob text-xs font-bold text-dar">
            {short_name}
          </p>
          <p className="mt-1 font-lat text-sm">&copy; {year}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="rounded-full p-2 text-dar/70 transition-colors hover:bg-dar/5 hover:text-[rgb(var(--cobalt))]"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-dar/70 transition-colors hover:bg-dar/5 hover:text-[rgb(var(--cobalt))]"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-dar/70 transition-colors hover:bg-dar/5 hover:text-[rgb(var(--cobalt))]"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={`https://wa.me/${phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-dar/70 transition-colors hover:bg-dar/5 hover:text-[rgb(var(--cobalt))]"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="ml-1 inline-flex items-center gap-1 rounded-full border border-dar/10 px-3 py-2 font-rob text-xs font-bold text-dar transition-colors hover:border-[rgb(var(--cobalt))] hover:text-[rgb(var(--cobalt))] dark:border-white/10"
          >
            {ui.footer.topLabel}
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
