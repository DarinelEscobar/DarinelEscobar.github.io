import React, { useEffect } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { ChevronUp } from 'lucide-react';
import data from "@data/data.json";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Footer: React.FC = () => {
  const { short_name, email, linkedin, github, phone } = data.resume.personal_info;
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
    if (mainContainer) {
      mainContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
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
            Top <ChevronUp size={16} />
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
          <h1 className="font-rob font-bold text-[0.89rem] text-dar">Copyright:</h1>
          <p className="flex items-center gap-1 text-[0.89rem] text-dar">&copy; 2024</p>
        </div>

        <div className="text-left">
          <h1 className="font-rob font-bold text-[0.89rem] text-dar">Quick Jump:</h1>
          <a
            href="#top"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[0.89rem] text-dar hover:underline"
          >
            Ascend to Top <ChevronUp size={16} />
          </a>
        </div>

        <div className="text-left">
          <h1 className="font-rob font-bold text-[0.89rem] text-dar">Contact Info:</h1>
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
          <h1 className="font-rob font-bold text-[0.89rem] text-dar">Crafted & Aesthetic by:</h1>
          <p className="flex items-center gap-1 text-[0.89rem] text-dar">{short_name}</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;