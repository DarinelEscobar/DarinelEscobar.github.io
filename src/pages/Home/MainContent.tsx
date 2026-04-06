import React, { useEffect } from "react";
import img from "../../assets/images/me.webp";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePortfolioContent } from "@/lib/portfolioContent";

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
const MainContent: React.FC = () => {
  const {
    resume: {
      personal_info: { short_name },
    },
  } = usePortfolioContent();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      className="flex flex-col justify-center md:justify-between items-center bg-whi w-screen min-h-[100dvh] text-dar gap-4 md:gap-0"
      variants={containerVariants}
      initial="visible"
      animate={controls}
    >
      {/* Imagen con efecto hover */}
      <motion.div
        className="flex flex-none md:flex-grow justify-center items-center"
        /* Removed variants/animation from LCP element container to prevent layout shift/delay */
        style={{ willChange: "transform" }}
      >
        <img
          src={img}
          alt={short_name}
          width="200"
          height="300"
          className="shadow-lg rounded-md w-[200px] h-[300px] object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Título dinámico */}
      <motion.div
        className="flex justify-center items-center px-4 pb-4 md:pb-8 w-full"
        /* Removed animation for LCP */
      >
        <h1 className="custom-title font-cor text-dar text-4xl tracking-wide">
          {short_name}
        </h1>
      </motion.div>
    </motion.section>
  );
};

export default MainContent;
