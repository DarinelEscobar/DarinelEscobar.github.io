import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import sampleProject from "../../assets/images/Sample.png";
import './Projects.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 }
  }
};

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
  hover: {
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    }
  }
};

const Projects: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col min-h-screen w-screen bg-whi justify-center items-center py-8 lg:py-0 px-4 sm:px-6 transition-colors duration-300"
    >
      <motion.div
        className="card relative w-full lg:w-[90%] h-auto lg:h-[80vh]
          dark:bg-gradient-to-r dark:from-[#1F1F1F] dark:via-[#2C2C2C] dark:to-[#3B3B3B]
          overflow-hidden lg:overflow-visible"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Mobile/Tablet Version */}
        <motion.div
          className="lg:hidden flex flex-col p-6 space-y-4 text-dar dark:text-gray-100"
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="font-rob text-xs text-gray-500 dark:text-gray-400"
          >
            Aug 2024 – Dec 2024
          </motion.span>
          <motion.h4 variants={itemVariants} className="font-rob text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">
            Full-Stack Platform
          </motion.h4>
          <motion.h2 variants={itemVariants} className="font-cor text-2xl sm:text-3xl font-bold leading-tight">
            COEPES Academic Portal
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-lat text-dar p-4 text-base bg-gray-400/20 rounded-md border border-gray-300/30 dark:border-gray-600 shadow-sm"
          >
            Developed a centralized platform for university program management in Chiapas, featuring a React/Tailwind frontend with responsive components and a CodeIgniter 4 REST API backend. Implemented JWT authentication, dynamic pagination for 1,000+ institutions, and an admin dashboard with CRUD operations. Optimized performance through caching strategies and role-based access control.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex space-x-2"
          >
            {[..."123"].map((_, i) => (
              <motion.span
                key={i}
                className="w-2 h-2 bg-gray-300 rounded-full"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Desktop Version */}
        <motion.div
          className="hidden lg:block absolute left-8  z-10 w-1/2 space-y-4 text-dar dark:text-gray-100 translate-y-16"
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="font-rob text-sm text-gray-500 dark:text-gray-400"
          >
            Aug 2024 – Dec 2024
          </motion.span>
          <motion.h4 variants={itemVariants} className="font-rob text-sm uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">
          Full-Stack Developer
          </motion.h4>
          <motion.h2 variants={itemVariants} className="font-cor text-4xl font-bold leading-tight">
          Administrative System for University Programs
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-lat text-dar dark:text-whi p-4 text-base bg-gray-400/20 rounded-md border border-gray-600 shadow-sm"
          >
            Spearheaded development of a scalable academic portal using modern tech stack: React/Vite for the responsive interface, PHP CodeIgniter 4 for secure API development with JWT tokens, and MySQL for database management. Key achievements include implementing institution pagination with Redis caching, developing granular user permissions, and creating automated data synchronization between frontend and backend systems.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex space-x-2"
          >
            {[..."123"].map((_, i) => (
              <motion.span
                key={i}
                className="w-2 h-2 bg-gray-300 rounded-full"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Image Container */}
        <motion.div
          className="card w-full lg:absolute right-0 lg:top-1/4 lg:pl-9 lg:w-[55%] h-[300px] sm:h-[400px] lg:h-[60%] overflow-hidden mt-6 lg:mt-0"
          variants={imageVariants}
          whileHover="hover"
        >
          <motion.img
            src={sampleProject}
            alt="Project"
            className="w-full h-full object-cover rounded-xl lg:translate-y-9 border-b border-gray-200/30 dark:border-gray-600"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;