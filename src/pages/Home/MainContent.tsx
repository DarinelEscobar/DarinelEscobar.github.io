import React, { useEffect } from "react";
import img from "../../assets/images/me.png";
import data from "@data/data.json";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Variants for container and children animations
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

  // Intersection Observer
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      className="flex flex-col items-center justify-between h-screen w-screen bg-whi text-dar"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Image with hover effects */}
      <motion.div
        className="flex-grow flex items-center justify-center"
        variants={itemVariants}
      >
        <motion.img
          src={img}
          alt={short_name}
          className="w-[200px] h-[300px] object-cover rounded-md shadow-lg"
          whileHover={{ rotate: 5, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
      </motion.div>

      {/* Dynamic Title */}
      <motion.div
        className="w-full flex items-center justify-center px-4 pb-8"
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
