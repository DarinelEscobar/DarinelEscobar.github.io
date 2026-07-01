import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAssetImage } from "./utils";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectData } from "@/content/portfolio/types";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { revealScale, staggerContainer, staggerItem } from "@/lib/motionPresets";

interface HeroSectionProps {
  project: ProjectData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ project }) => {
  const {
    ui: { projects },
  } = usePortfolioContent();
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="flex min-h-[50vh] items-center px-5 py-24 sm:px-8 lg:px-12"
      variants={staggerContainer}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-12 lg:flex-row">
        {/* Información principal del proyecto */}
        <motion.div
          className="space-y-8 w-full lg:w-1/2"
          variants={staggerItem}
        >
          <motion.h1
            className="font-lat text-4xl font-bold leading-tight tracking-tight text-dar md:text-5xl"
            variants={staggerItem}
          >
            {project.name}
          </motion.h1>

          <motion.p
            className="font-lat text-dar text-lg md:text-xl leading-relaxed"
            variants={staggerItem}
          >
            {project.description}
          </motion.p>

          <motion.div
            className="flex sm:flex-row flex-col gap-4"
            variants={staggerItem}
          >
            {project.url && (
              <Button
                size="lg"
                className="w-full bg-[rgb(var(--cobalt))] px-8 py-6 text-lg text-white hover:bg-[rgb(var(--cobalt))] sm:w-auto"
                onClick={() => window.open(project.url, "_blank")}
              >
                {projects.exploreProjectLabel}
              </Button>
            )}
            {project.repository && (
              <Button
                size="lg"
                className="flex w-full items-center gap-2 bg-dar px-8 py-6 text-lg text-whi hover:bg-dar/85 dark:bg-white/10 dark:hover:bg-white/15 sm:w-auto"
                onClick={() => window.open(project.repository, "_blank")}
              >
                {projects.viewRepositoryLabel}
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Imagen principal del proyecto */}
        <motion.div
          className="group relative w-full lg:w-1/2"
          variants={revealScale}
          whileHover={reduceMotion ? undefined : { scale: 1.01 }}
        >
          <div className="overflow-hidden rounded-2xl border border-dar/10 shadow-[0_24px_70px_rgba(15,23,42,0.16)] dark:border-white/10">
            {project.media && project.media.length > 0 ? (
              <motion.img
                src={getAssetImage(project.media[0].url)}
                alt={project.media[0].description || projects.multimediaMaterialLabel}
                width={800}
                height={500}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex justify-center items-center bg-5whi dark:bg-5dar w-full h-full">
                <p className="text-5dar dark:text-5whi">{projects.noImageAvailableLabel}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
