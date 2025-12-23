import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAssetImage } from "./utils";
import { motion } from "framer-motion";

interface HeroSectionProps {
  project: any;
}

// Contenedor para animación escalonada (cada hijo se revelará en cadena)
const containerVariants = {
  hidden: { opacity: 0, rotateX: 15, scale: 0.9 },
  visible: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 14,
      stiffness: 90,
      // Animaciones hijas escalonadas
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// Cada elemento hijo con un suave movimiento “spring”
const childVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

const HeroSection: React.FC<HeroSectionProps> = ({ project }) => {
  return (
    <motion.section
      className="flex items-center px-4 py-24 min-h-[50vh]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="flex lg:flex-row flex-col items-center gap-12 mx-auto container">
        {/* Información principal del proyecto */}
        <motion.div
          className="space-y-8 w-full lg:w-1/2"
          variants={childVariants}
        >
          <motion.h1
            className="font-cor font-bold text-dar text-4xl md:text-5xl leading-tight"
            variants={childVariants}
          >
            {project.name}
          </motion.h1>

          <motion.p
            className="font-lat text-dar text-lg md:text-xl leading-relaxed"
            variants={childVariants}
          >
            {project.description}
          </motion.p>

          <motion.div
            className="flex sm:flex-row flex-col gap-4"
            variants={childVariants}
          >
            {project.url && (
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-700 dark:bg-blue-600 px-8 py-6 w-full sm:w-auto text-whi text-lg"
                onClick={() => window.open(project.url, "_blank")}
              >
                Explore Project
              </Button>
            )}
            {project.repository && (
              <Button
                size="lg"
                className="flex items-center gap-2 bg-dar hover:bg-5dar dark:hover:bg-5dar dark:bg-5dar px-8 py-6 w-full sm:w-auto text-whi text-lg"
                onClick={() => window.open(project.repository, "_blank")}
              >
                View Repository
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Imagen principal del proyecto */}
        <motion.div
          className="group relative w-full lg:w-1/2"
          variants={childVariants}
          whileHover={{ scale: 1.02, rotateZ: 0.5 }}
        >
          <div className="shadow-2xl border border-5whi dark:border-5dar rounded-xl overflow-hidden">
            {project.media && project.media.length > 0 ? (
              <motion.img
                src={getAssetImage(project.media[0].url)}
                alt={project.media[0].description || "Project Image"}
                width={800}
                height={500}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex justify-center items-center bg-5whi dark:bg-5dar w-full h-full">
                <p className="text-5dar dark:text-5whi">No image available</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
