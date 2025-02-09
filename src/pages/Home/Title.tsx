import React, { useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import data from "@data/data.json";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variantsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const variantsChild = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const Title: React.FC = () => {
  const { short_name, rol } = data.resume.personal_info;
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const controls = useAnimation();

  // Actualizamos la variable CSS --vh para que represente el alto real de la ventana
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      // En lugar de h-screen usamos la variable --vh para calcular el alto real
      className="flex flex-col justify-between bg-whi w-screen min-h-[calc(var(--vh,1vh)*100)] text-dar"
      variants={variantsContainer}
      initial="hidden"
      animate={controls}
    >
      <motion.div className="flex flex-col flex-grow justify-center items-center">
        <motion.h1 className="custom-title font-cor" variants={variantsChild}>
          {short_name}
        </motion.h1>
        <motion.p className="custom-paragraph font-cor" variants={variantsChild}>
          {rol}
        </motion.p>
      </motion.div>

      {/* Footer */}
      <motion.div variants={variantsChild}>
        <Footer />
      </motion.div>
    </motion.section>
  );
};

export default Title;
