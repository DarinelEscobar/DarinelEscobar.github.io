import React, { useEffect } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { ChevronUp } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { usePortfolioContent } from "@/lib/portfolioContent";

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Footer: React.FC = () => {
  const {
    resume: {
      personal_info: { short_name, email, linkedin, github, phone },
    },
    ui,
  } = usePortfolioContent();
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContainer = document.getElementById('main-container');
    if (mainContainer && mainContainer.scrollHeight > mainContainer.clientHeight + 1) {
      mainContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.footer
      ref={ref}
      className="z-10 bg-transparent px-5 py-3 w-full text-sm pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
      variants={footerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* MOBILE VERSION */}
      <div className="md:hidden block flex-col justify-between items-center">
        <div className="flex justify-between items-center">
          <p className="text-[0.89rem] text-dar">&copy; 2024</p>
          <a
            href="#top"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[0.89rem] text-dar hover:underline"
          >
            {ui.footer.topLabel} <ChevronUp size={16} />
          </a>
        </div>

        <div className="flex justify-center items-center gap-3 mt-2">
          <a href={`mailto:${email}`} className="flex items-center gap-1 hover:underline" aria-label="Email">
            <FaEnvelope />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
        </div>

        <div className="mt-2 text-center">
          <p className="text-[0.89rem] text-dar">{short_name}</p>
        </div>
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden md:flex justify-between">
        <div className="text-left">
          <h1 className="font-rob font-bold text-[0.89rem] text-dar">{ui.footer.copyrightLabel}</h1>
          <p className="flex items-center gap-1 text-[0.89rem] text-dar">&copy; 2024</p>
        </div>

        <div className="text-left">
          <h1 className="font-rob font-bold text-[0.89rem] text-dar">{ui.footer.quickJumpLabel}</h1>
          <a
            href="#top"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[0.89rem] text-dar hover:underline"
          >
            {ui.footer.ascendLabel} <ChevronUp size={16} />
          </a>
        </div>

        <div className="text-left">
          <h1 className="font-rob font-bold text-[0.89rem] text-dar">{ui.footer.contactInfoLabel}</h1>
          <p className="flex items-center gap-2 text-[0.89rem] text-dar">
            <a href={`mailto:${email}`} className="flex items-center gap-1 hover:underline" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </p>
        </div>

        <div className="text-left">
          <h1 className="font-rob font-bold text-[0.89rem] text-dar">{ui.footer.craftedByLabel}</h1>
          <p className="flex items-center gap-1 text-[0.89rem] text-dar">{short_name}</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
