import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssetImage } from "./utils";
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
  const firstMedia = project.media?.[0];
  const {
    src: heroImageSrc,
    isLoading: isHeroImageLoading,
    hasError: hasHeroImageError,
  } = useAssetImage(firstMedia?.url);

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
            {heroImageSrc && !hasHeroImageError ? (
              <motion.img
                src={heroImageSrc}
                alt={firstMedia?.description || projects.multimediaMaterialLabel}
                width={800}
                height={500}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                className="flex min-h-[320px] w-full items-center justify-center bg-whi text-dar/62 dark:bg-white/[0.04]"
                aria-busy={isHeroImageLoading}
              >
                <p className="font-lat text-sm">
                  {isHeroImageLoading ? projects.multimediaMaterialLabel : projects.noImageAvailableLabel}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
