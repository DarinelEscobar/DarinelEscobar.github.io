import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, Users, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectData } from "@/content/portfolio/types";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { revealUp, staggerContainer, staggerItem } from "@/lib/motionPresets";

interface TechnicalSidebarProps {
  project: Pick<ProjectData, "start_date" | "end_date" | "client" | "team_size" | "role" | "technologies">;
}

// Variantes para contenedor principal
const sidebarVariants = revealUp;

// Cada ítem en la barra lateral
const sidebarItem = staggerItem;

// Para animar cada badge
const badgeItem = staggerItem;

const calculateDuration = (
  start: string,
  end: string,
  locale: string,
  labels: {
    monthSingular: string;
    monthPlural: string;
    weekSingular: string;
    weekPlural: string;
    andLabel: string;
  }
) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return null;
  }

  const diffInDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const months = Math.floor(diffInDays / 30);
  const weeks = Math.floor((diffInDays % 30) / 7);

  const startFormatted = startDate.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const endFormatted = endDate.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const durationParts: string[] = [];

  if (months > 0) {
    durationParts.push(`${months} ${months === 1 ? labels.monthSingular : labels.monthPlural}`);
  }

  if (weeks > 0) {
    durationParts.push(`${weeks} ${weeks === 1 ? labels.weekSingular : labels.weekPlural}`);
  }

  const durationLabel = durationParts.length > 0 ? ` (${durationParts.join(` ${labels.andLabel} `)})` : "";

  return `${startFormatted} - ${endFormatted}${durationLabel}`;
};

const TechnicalSidebar: React.FC<TechnicalSidebarProps> = ({ project }) => {
  const {
    ui: { locale, projects },
  } = usePortfolioContent();
  const reduceMotion = useReducedMotion();
  const duration = project.start_date && project.end_date
    ? calculateDuration(project.start_date, project.end_date, locale.duration, {
        monthSingular: projects.monthSingular,
        monthPlural: projects.monthPlural,
        weekSingular: projects.weekSingular,
        weekPlural: projects.weekPlural,
        andLabel: projects.andLabel,
      })
    : null;

  return (
    <motion.div
      className="lg:col-span-1"
      variants={sidebarVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card className="sticky top-0 border border-dar/10 bg-white/52 shadow-[0_18px_48px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.04]">
        <CardHeader className="pb-4">
          <CardTitle className="font-lat text-2xl font-bold text-dar">
            {projects.technicalDetailsLabel}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 font-lat text-dar">
          {/* Contenedor con stagger en sus hijos */}
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {project.client && (
              <motion.div className="flex items-center gap-4" variants={sidebarItem}>
                <Building className="h-6 w-6 text-[rgb(var(--cobalt))]" />
                <div>
                  <p className="text-5dar text-sm">{projects.clientLabel}</p>
                  <p className="font-rob font-medium text-lg">{project.client}</p>
                </div>
              </motion.div>
            )}

            {duration && (
              <motion.div className="flex items-center gap-4" variants={sidebarItem}>
                <Calendar className="h-6 w-6 text-[rgb(var(--cobalt))]" />
                <div>
                  <p className="text-5dar text-sm">{projects.durationLabel}</p>
                  <p className="font-rob font-medium text-lg">{duration}</p>
                </div>
              </motion.div>
            )}

            {typeof project.team_size === "number" && (
              <motion.div className="flex items-center gap-4" variants={sidebarItem}>
                <Users className="h-6 w-6 text-[rgb(var(--cobalt))]" />
                <div>
                  <p className="text-5dar text-sm">{projects.teamLabel}</p>
                  <p className="font-rob font-medium text-lg">
                    {project.team_size}{" "}
                    {project.team_size === 1 ? projects.teamMemberSingular : projects.teamMemberPlural}
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div className="flex items-center gap-4" variants={sidebarItem}>
              <Briefcase className="h-6 w-6 text-[rgb(var(--cobalt))]" />
              <div>
                <p className="text-5dar text-sm">{projects.roleLabel}</p>
                <p className="font-rob font-medium text-lg">{project.role}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Tecnología */}
          {project.technologies && Object.keys(project.technologies).length > 0 && (
            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h4
                className="font-lat text-lg font-semibold text-dar"
                variants={sidebarItem}
              >
                {projects.technologyStackLabel}
              </motion.h4>
              <motion.div className="flex flex-wrap gap-3" variants={sidebarItem}>
                {Object.entries(project.technologies).map(
                  ([category, techs]: [string, string[]]) => (
                    <div key={category} className="space-y-2">
                      <span className="font-lat text-5dar text-sm">
                        {category}:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <motion.div
                            key={tech}
                            variants={badgeItem}
                            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.03 }}
                          >
                            <Badge
                              variant="outline"
                              className="border-[rgba(var(--cobalt),0.24)] px-3 py-1.5 font-rob text-sm font-medium text-dar hover:bg-[rgba(var(--cobalt),0.08)]"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TechnicalSidebar;
