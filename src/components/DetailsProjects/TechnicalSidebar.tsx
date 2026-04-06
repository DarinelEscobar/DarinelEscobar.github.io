import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, Users, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { ProjectData } from "@/content/portfolio/types";
import { usePortfolioContent } from "@/lib/portfolioContent";

interface TechnicalSidebarProps {
  project: Pick<ProjectData, "start_date" | "end_date" | "client" | "team_size" | "role" | "technologies">;
}

// Variantes para contenedor principal
const sidebarVariants = {
  hidden: { opacity: 0, rotateX: 15, scale: 0.9 },
  visible: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
      staggerChildren: 0.08,
    },
  },
};

// Cada ítem en la barra lateral
const sidebarItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 120,
    },
  },
};

// Para animar cada badge
const badgeItem = {
  hidden: { scale: 0.8, rotateY: 90, opacity: 0 },
  visible: {
    scale: 1,
    rotateY: 0,
    opacity: 1,
    transition: { type: "spring", damping: 12, stiffness: 120 },
  },
};

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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <Card className="top-0 sticky bg-whi dark:bg-white/5 shadow-lg border border-5whi dark:border-5dar/30">
        <CardHeader className="pb-4">
          <CardTitle className="font-cor text-dar text-2xl">
            {projects.technicalDetailsLabel}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 font-lat text-dar">
          {/* Contenedor con stagger en sus hijos */}
          <motion.div
            className="space-y-6"
            variants={sidebarVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {project.client && (
              <motion.div className="flex items-center gap-4" variants={sidebarItem}>
                <Building className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-5dar text-sm">{projects.clientLabel}</p>
                  <p className="font-rob font-medium text-lg">{project.client}</p>
                </div>
              </motion.div>
            )}

            {duration && (
              <motion.div className="flex items-center gap-4" variants={sidebarItem}>
                <Calendar className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-5dar text-sm">{projects.durationLabel}</p>
                  <p className="font-rob font-medium text-lg">{duration}</p>
                </div>
              </motion.div>
            )}

            {typeof project.team_size === "number" && (
              <motion.div className="flex items-center gap-4" variants={sidebarItem}>
                <Users className="w-6 h-6 text-blue-500" />
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
              <Briefcase className="w-6 h-6 text-blue-500" />
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
              variants={sidebarVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              <motion.h4
                className="font-cor font-semibold text-dar text-lg"
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
                            whileHover={{ rotateY: 180, scale: 1.1 }}
                          >
                            <Badge
                              variant="outline"
                              className="hover:bg-blue-500/5 px-3 py-1.5 border-blue-500/20 font-rob font-medium text-dar text-sm"
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
