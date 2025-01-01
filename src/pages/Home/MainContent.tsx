// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\pages\Home\MainContent.tsx
import React, { useEffect } from "react";
import img from "../../assets/images/me.png";
import data from "@data/data.json";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const MainContent: React.FC = () => {
  const { short_name } = data.resume.personal_info;

  // 1) Intersection Observer
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    // 2) motion.section con controls
    <motion.section
      ref={ref}
      className="flex flex-col items-center justify-between h-screen w-screen bg-whi text-dar"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Imagen con tilt al hover */}
      <div className="flex-grow flex items-center justify-center">
        <motion.img
          src={img}
          alt={short_name}
          className="w-[200px] h-[300px] object-cover rounded-md"
          whileHover={{ rotate: 2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        />
      </div>

      {/* Título dinámico */}
      <div className="w-full flex items-center justify-center px-4 pb-8">
        <h1 className="custom-title font-cor text-dar">{short_name}</h1>
      </div>
    </motion.section>
  );
};

export default MainContent;
