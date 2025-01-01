// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\pages\Home\AboutMe.tsx
import React from "react";
import data from "@data/data.json";
// Import framer-motion
import { motion } from "framer-motion";

const fadeScaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 100,
    }
  }
};

const AboutMe: React.FC = () => {
  const { summary, note } = data.resume.professional_summary;

  return (
    // motion.section con animación
    <motion.section
      className="flex items-center justify-center w-screen h-screen bg-5dar text-whi"
      variants={fadeScaleVariants}
      initial="hidden"
      animate="visible"
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
