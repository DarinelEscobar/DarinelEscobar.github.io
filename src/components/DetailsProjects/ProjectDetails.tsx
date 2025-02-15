import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Trophy, ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  Project_Overview: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
}

interface ProjectDetailsProps {
  project: Project;
}

// Variantes globales para el contenedor principal
const detailsVariants = {
  hidden: { opacity: 0, rotateX: 15, scale: 0.9 },
  visible: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      damping: 14,
      stiffness: 90,
      delay: 0.1,
      staggerChildren: 0.1, // Para animar secciones/hijos
    },
  },
};

// Para cada bloque (responsibilities y achievements) haremos un “spring” normal
const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Variantes de cada Card en la lista
const cardItem = {
  hidden: { y: 20, opacity: 0 },
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

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <motion.div
      className="space-y-16 lg:col-span-2"
      variants={detailsVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
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
          {project.Project_Overview}
        </p>
      </section>

      {/* Responsabilidades Clave */}
      <motion.section
        className="space-y-6"
        variants={listVariants}
      >
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-green-500/10 p-2 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="font-cor font-semibold text-dar text-2xl tracking-tight">
            Key Responsibilities
          </h3>
        </div>

        <motion.div
          className="flex flex-col gap-6"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {project.responsibilities.map((resp, index) => (
            <motion.div key={index} variants={cardItem}>
              <Card
                className="hover:shadow-md border border-5dar transition-shadow duration-300"
                whileHover={{ scale: 1.03, rotateZ: 1 }}
              >
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
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Logros Destacados */}
      <motion.section
        className="space-y-6"
        variants={listVariants}
      >
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-yellow-500/10 p-2 rounded-full">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <h3 className="font-cor font-semibold text-dar text-2xl tracking-tight">
            Notable Achievements
          </h3>
        </div>

        <motion.div
          className="space-y-6"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {project.achievements.map((achievement, index) => (
            <motion.div key={index} variants={cardItem}>
              <Card
                className="bg-gradient-to-r from-whi/5 dark:from-dar/5 to-transparent hover:shadow-md border border-5whi dark:border-5dar border-blue-500/50 border-l-4 transition-shadow duration-300"
                whileHover={{ scale: 1.03, rotateZ: 1 }}
              >
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex justify-center items-center bg-yellow-500/10 p-2 rounded-full">
                    <Star className="w-5 h-5 text-yellow-500" />
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
    </motion.div>
  );
};

export default ProjectDetails;
