import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAssetImage } from "./utils";
import { motion } from "framer-motion";

interface HeroSectionProps {
  project: any;
}

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const HeroSection: React.FC<HeroSectionProps> = ({ project }) => {
  return (
    <motion.section
      className="flex items-center bg-whi px-4 py-24 min-h-[50vh]"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex lg:flex-row flex-col items-center gap-12 mx-auto container">
        {/* Información principal del proyecto */}
        <div className="space-y-8 w-full lg:w-1/2">
          <h1 className="font-bold font-cor text-4xl text-dar md:text-5xl dark:text-5whi leading-tight">
            {project.name}
          </h1>
          <p className="font-lat text-5dar text-lg md:text-xl dark:text-5whi leading-relaxed">
            {project.description}
          </p>
          <div className="flex sm:flex-row flex-col gap-4">
            {project.url && (
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-700 dark:bg-blue-600 px-8 py-6 w-full sm:w-auto text-lg text-whi"
                onClick={() => window.open(project.url, "_blank")}
              >
                Explore Project
              </Button>
            )}
            {project.repository && (
              <Button
                size="lg"
                className="flex items-center gap-2 bg-dar hover:bg-5dar dark:hover:bg-5dar dark:bg-5dar px-8 py-6 w-full sm:w-auto text-lg text-whi"
                onClick={() => window.open(project.repository, "_blank")}
              >
                View Repository
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Imagen principal del proyecto */}
        <div className="group relative w-full lg:w-1/2">
          <div className="border-5whi dark:border-5dar shadow-2xl border rounded-xl overflow-hidden">
            {project.media && project.media.length > 0 ? (
              <img
                src={getAssetImage(project.media[0].url)}
                alt={project.media[0].description || "Project Image"}
                width={800}
                height={500}
                className="group-hover:scale-105 transition-transform duration-300 object-cover"
              />
            ) : (
              <div className="flex justify-center items-center bg-5whi dark:bg-5dar w-full h-full">
                <p className="text-5dar dark:text-5whi">No image available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
