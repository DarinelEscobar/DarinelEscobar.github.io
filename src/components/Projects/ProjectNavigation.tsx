import React from "react";
import { motion } from "framer-motion";

interface ProjectNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}) => {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center px-8">
      {/* Botón Anterior */}
      <motion.button
        onClick={onPrev}
        disabled={disablePrev}
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

      {/* Botón Siguiente */}
      <motion.button
        onClick={onNext}
        disabled={disableNext}
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
  );
};

export default ProjectNavigation;
