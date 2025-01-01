// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\pages\Home\AboutMe.tsx
import React, { useEffect } from "react";
import data from "@data/data.json";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const aboutVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const AboutMe: React.FC = () => {
  const { summary, note } = data.resume.professional_summary;

  // Intersection observer + controls
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: false, // para que se repita
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      className="flex items-center justify-center w-screen h-screen bg-5dar text-whi"
      variants={aboutVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="text-center max-w-screen-md">
        <p className="text-[3rem] leading-relaxed font-cor">
          {summary}
          {note}
        </p>
      </div>
    </motion.section>
  );
};

export default AboutMe;
