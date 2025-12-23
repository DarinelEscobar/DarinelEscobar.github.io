import React, { useEffect } from "react";
import img from "../../assets/images/me.jpg";
import data from "@data/data.json";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const MainContent: React.FC = () => {
  const { short_name } = data.resume.personal_info;
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const controls = useAnimation();

  // Actualiza la variable CSS --vh para reflejar el alto real de la ventana
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      // Se reemplaza h-screen por min-h con la variable --vh para que se adapte al alto real
      className="flex flex-col justify-between items-center bg-whi w-screen min-h-[calc(var(--vh,1vh)*100)] text-dar"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Imagen con efecto hover */}
      <motion.div
        className="flex flex-grow justify-center items-center"
        variants={itemVariants}
      >
        <motion.img
          src={img}
          alt={short_name}
          className="shadow-lg rounded-md w-[200px] h-[300px] object-cover"
          whileHover={{ rotate: 5, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          fetchPriority="high"
        />
      </motion.div>

      {/* Título dinámico */}
      <motion.div
        className="flex justify-center items-center px-4 pb-8 w-full"
        variants={itemVariants}
      >
        <h1 className="custom-title font-cor text-dar text-4xl tracking-wide">
          {short_name}
        </h1>
      </motion.div>
    </motion.section>
  );
};

export default MainContent;
