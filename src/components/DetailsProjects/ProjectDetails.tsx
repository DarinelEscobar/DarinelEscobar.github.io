import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Trophy, ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  description: string;
  responsibilities: string[];
  achievements: string[];
}

interface ProjectDetailsProps {
  project: Project;
}

const detailsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2 },
  },
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <motion.div
      className="space-y-16 lg:col-span-2"
      variants={detailsVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Visión General del Proyecto */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-blue-500/10 p-2 rounded-full">
            <ArrowUpRight className="w-6 h-6 text-blue-500" />
          </div>
          <h2 className="font-cor font-bold text-dar text-3xl tracking-tight">
            Project Overview
          </h2>
        </div>
        <p className="max-w-3xl font-lat text-dar text-lg leading-relaxed">
          {project.description}
        </p>
      </section>

      {/* Responsabilidades Clave */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-green-500/10 p-2 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="font-cor font-semibold text-dar text-2xl tracking-tight">
            Key Responsibilities
          </h3>
        </div>
        <div className="flex flex-col gap-6">
          {project.responsibilities.map((resp, index) => (
            <Card key={index} className="hover:shadow-md border border-5dar transition-shadow duration-300">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex justify-center items-center bg-blue-500/10 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="font-rob text-dar text-lg leading-relaxed">
                    {resp}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Logros Destacados */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-yellow-500/10 p-2 rounded-full">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <h3 className="font-cor font-semibold text-dar text-2xl tracking-tight">
            Notable Achievements
          </h3>
        </div>
        <div className="space-y-6">
          {project.achievements.map((achievement, index) => (
            <Card key={index} className="bg-gradient-to-r from-whi/5 dark:from-dar/5 to-transparent hover:shadow-md border border-5whi dark:border-5dar border-blue-500/50 border-l-4 transition-shadow duration-300">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex justify-center items-center bg-yellow-500/10 p-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="font-lat text-dar text-lg leading-relaxed">
                  {achievement}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetails;
