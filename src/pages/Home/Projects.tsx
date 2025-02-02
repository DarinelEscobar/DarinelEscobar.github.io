import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import data from "@data/experience.json";
import "./Projects.css";
import { ChevronLeft, ChevronRight } from "lucide-react";


// Variantes para animar la aparición de los contenedores hijos
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

// Variantes para elementos individuales (texto, bullets, etc.)
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

// Variantes para la imagen del proyecto
const imageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  hover: {
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

// Variantes para la tarjeta de proyecto
// Usamos la prop "direction" para determinar desde qué lado aparece o sale el contenido
const projectCardVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, type: "spring" },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    transition: { duration: 0.6 },
  }),
};

// Función para formatear fechas al estilo "MMM YYYY" en español
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date
    .toLocaleString("es-ES", { month: "short", year: "numeric" })
    .replace(".", "")
    .toUpperCase();
};

const Projects: React.FC = () => {
  // Estado para controlar el proyecto actual y la imagen mostrada
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Dirección: 1 = siguiente, -1 = anterior
  const [direction, setDirection] = useState(1);

  const projects = data.experience.projects;
  const currentProject = projects[currentProjectIndex];
  const media = currentProject.media || [];

  // Intersection Observer para animar al hacer scroll
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  const startDate = formatDate(currentProject.start_date);
  const endDate = formatDate(currentProject.end_date);

  // Funciones para navegar entre proyectos, actualizando la dirección para la animación
  const handlePrevProject = () => {
    if (currentProjectIndex > 0) {
      setDirection(-1);
      setCurrentImageIndex(0);
      setCurrentProjectIndex((prev) => prev - 1);
    }
  };

  const handleNextProject = () => {
    if (currentProjectIndex < projects.length - 1) {
      setDirection(1);
      setCurrentImageIndex(0);
      setCurrentProjectIndex((prev) => prev + 1);
    }
  };

  return (
    // Agregamos "relative" para que los elementos posicionados de forma absoluta se ubiquen respecto a este contenedor
    <motion.div
      ref={ref}
      className="relative flex flex-col min-h-screen w-screen bg-whi justify-center items-center py-8 lg:py-0 px-4 sm:px-6 transition-colors duration-300"
    >
      {/* AnimatePresence permite animar la salida y entrada del contenido al cambiar de proyecto */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentProjectIndex}
          className="flex justify-center items-center  lg:w-[90%] "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="card relative w-full mb-16 lg:mb-24 h-auto lg:h-[80vh] overflow-hidden lg:overflow-visible"
            custom={direction}
            variants={projectCardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Versión Mobile/Tablet */}
            <motion.div
              className="lg:hidden flex flex-col p-6 space-y-4 text-dar dark:text-gray-100"
              variants={containerVariants}
            >
              <motion.span
                variants={itemVariants}
                className="font-rob text-xs text-gray-500 dark:text-gray-400"
              >
                {startDate} – {endDate}
              </motion.span>
              <motion.h4
                variants={itemVariants}
                className="font-rob text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400"
              >
                {currentProject.role}
              </motion.h4>
              <motion.h2
                variants={itemVariants}
                className="font-cor text-2xl sm:text-3xl font-bold leading-tight"
              >
                {currentProject.name}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="font-lat text-dar p-4 text-base bg-gray-400/20 rounded-md border border-gray-300/30 dark:border-gray-600 shadow-sm"
              >
                {currentProject.description}
              </motion.p>

              {media.length > 1 && (
                <motion.div variants={itemVariants} className="flex space-x-2">
                  {media.map((_, i) => (
                    <motion.span
                      key={i}
                      className={`w-2 h-2 rounded-full cursor-pointer ${
                        i === currentImageIndex
                          ? "bg-blue-500 dark:bg-blue-400"
                          : "bg-gray-300"
                      }`}
                      onMouseEnter={() => setCurrentImageIndex(i)}
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Versión Desktop */}
            <motion.div
              className="hidden lg:block absolute left-8 z-10 w-1/2 space-y-4 text-dar dark:text-gray-100 translate-y-16"
              variants={containerVariants}
            >
              <motion.span
                variants={itemVariants}
                className="font-rob text-sm text-gray-500 dark:text-gray-400"
              >
                {startDate} – {endDate}
              </motion.span>
              <motion.h4
                variants={itemVariants}
                className="font-rob text-sm uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400"
              >
                {currentProject.role}
              </motion.h4>
              <motion.h2
                variants={itemVariants}
                className="font-cor text-4xl font-bold leading-tight"
              >
                {currentProject.name}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="font-lat text-dar dark:text-whi p-4 text-base bg-gray-400/20 rounded-md border border-gray-600 shadow-sm"
              >
                {currentProject.description}
              </motion.p>

              {media.length > 1 && (
                <motion.div variants={itemVariants} className="flex space-x-2">
                  {media.map((_, i) => (
                    <motion.span
                      key={i}
                      className={`w-2 h-2 rounded-full cursor-pointer ${
                        i === currentImageIndex
                          ? "bg-blue-500 dark:bg-blue-400"
                          : "bg-gray-300"
                      }`}
                      onMouseEnter={() => setCurrentImageIndex(i)}
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Contenedor de imágenes */}
            <motion.div
              className="card w-full lg:absolute right-0 lg:top-1/4 lg:pl-9 lg:w-[55%] h-[300px] sm:h-[400px] lg:h-[60%] overflow-hidden mt-6 lg:mt-0"
              variants={imageVariants}
              whileHover="hover"
            >
              {media.length > 0 ? (
                <motion.img
                  src={media[currentImageIndex].url}
                  alt={media[currentImageIndex].description || "Project Media"}
                  className="w-full h-full object-cover rounded-xl lg:translate-y-9 border-b border-gray-200/30 dark:border-gray-600"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-xl">
                  <p className="text-gray-500 dark:text-gray-300">
                    Sin imágenes disponibles
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Flechas de navegación minimalistas, posicionadas de forma absoluta en la parte inferior */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center px-8">
        <motion.button
          onClick={handlePrevProject}
          disabled={currentProjectIndex === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center p-2 text-gray-700 dark:text-gray-300 disabled:opacity-50"
        >
          {/* Icono de flecha izquierda */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          onClick={handleNextProject}
          disabled={currentProjectIndex === projects.length - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center p-2 text-gray-700 dark:text-gray-300 disabled:opacity-50"
        >
          {/* Icono de flecha derecha */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Projects;
