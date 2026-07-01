import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Trophy, ArrowUpRight, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectData } from "@/content/portfolio/types";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { revealUp, staggerContainer, staggerItem } from "@/lib/motionPresets";

interface ProjectDetailsProps {
  project: Pick<ProjectData, "Project_Overview" | "responsibilities" | "achievements">;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const {
    ui: { projects },
  } = usePortfolioContent();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="space-y-16 lg:col-span-2"
      variants={revealUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Visión General del Proyecto */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center rounded-full bg-[rgba(var(--cobalt),0.1)] p-2">
            <ArrowUpRight className="h-6 w-6 text-[rgb(var(--cobalt))]" />
          </div>
          <h2 className="font-lat text-3xl font-bold tracking-tight text-dar">
            {projects.projectOverviewLabel}
          </h2>
        </div>
        <p className="max-w-3xl font-lat text-dar text-lg leading-relaxed">
          {project.Project_Overview}
        </p>
      </section>

      {/* Responsabilidades Clave */}
      {project.responsibilities.length > 0 && (
        <motion.section
          className="space-y-6"
          variants={staggerContainer}
        >
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center rounded-full bg-[rgba(var(--cobalt),0.1)] p-2">
              <CheckCircle className="h-6 w-6 text-[rgb(var(--cobalt))]" />
            </div>
            <h3 className="font-lat text-2xl font-semibold tracking-tight text-dar">
              {projects.keyResponsibilitiesLabel}
            </h3>
          </div>

          <motion.div
            className="flex flex-col gap-6"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {project.responsibilities.map((resp, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              >
                <Card
                  className="border border-dar/10 bg-white/50 transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex justify-center items-center rounded-lg bg-[rgba(var(--cobalt),0.1)] p-3">
                        <CheckCircle className="h-6 w-6 text-[rgb(var(--cobalt))]" />
                      </div>
                      <p className="font-rob text-dar text-lg leading-relaxed">
                        {resp}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      )}

      {/* Logros Destacados */}
      {project.achievements.length > 0 && (
        <motion.section
          className="space-y-6"
          variants={staggerContainer}
        >
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center rounded-full bg-[rgba(var(--cobalt),0.1)] p-2">
              <Trophy className="h-6 w-6 text-[rgb(var(--cobalt))]" />
            </div>
            <h3 className="font-lat text-2xl font-semibold tracking-tight text-dar">
              {projects.notableAchievementsLabel}
            </h3>
          </div>

          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {project.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              >
                <Card
                  className="border border-l-4 border-dar/10 border-l-[rgb(var(--cobalt))] bg-white/50 transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:border-l-[rgb(var(--cobalt))] dark:bg-white/[0.04]"
                >
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex justify-center items-center rounded-full bg-[rgba(var(--cobalt),0.1)] p-2">
                      <Star className="h-5 w-5 text-[rgb(var(--cobalt))]" />
                    </div>
                    <p className="font-lat text-dar text-lg leading-relaxed">
                      {achievement}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default ProjectDetails;
