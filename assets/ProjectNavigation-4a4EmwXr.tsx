import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

interface ProjectNavigationProps {
  handlePrevProject: () => void;
  handleNextProject: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  handlePrevProject,
  handleNextProject,
  disablePrev,
  disableNext,
}) => {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center px-8 gap-3">
      {/* Contenedor principal con glassmorphism mejorado */}
      <motion.div
        className="flex items-center justify-center gap-2 p-1.5
        bg-[rgba(245,245,245,0.3)] dark:bg-[rgba(15,15,15,0.4)]
        backdrop-blur-[8px] rounded-xl
        border border-[rgba(220,220,220,0.4)] dark:border-[rgba(100,100,100,0.2)]
        shadow-[0_8px_32px_rgba(31,38,135,0.1)] dark:shadow-[0_8px_32px_rba(0,0,0,0.3)]
        hover:shadow-[0_12px_40px_rgba(31,38,135,0.15)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
        transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Botón Anterior */}
        <motion.button
          onClick={handlePrevProject}
          disabled={disablePrev}
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(220,220,220,0.3)",
            transition: { duration: 0.2 }
          }}
          whileTap={{
            scale: 0.95,
            backgroundColor: "rgba(220,220,220,0.1)"
          }}
          className="flex items-center justify-center p-2.5 rounded-xl
          text-[rgb(51,51,51)] dark:text-[rgb(204,204,204)]
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all cursor-pointer hover:bg-[rgba(230,230,230,0.2)]"
        >
          <ChevronLeft className="h-7 w-7 stroke-[1.7] hover:stroke-blue-600" />
        </motion.button>

        {/* Separador visual sutil */}
        <div className="h-8 w-px bg-gray-300/20 dark:bg-gray-600/20 mx-1.5" />

        {/* Botón Siguiente */}
        <motion.button
          onClick={handleNextProject}
          disabled={disableNext}
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(220,220,220,0.3)",
            transition: { duration: 0.2 }
          }}
          whileTap={{
            scale: 0.95,
            backgroundColor: "rgba(220,220,220,0.1)"
          }}
          className="flex items-center justify-center p-2.5 rounded-xl
          text-[rgb(51,51,51)] dark:text-[rgb(204,204,204)]
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all cursor-pointer hover:bg-[rgba(230,230,230,0.2)]"
        >
          <ChevronRight className="h-7 w-7 stroke-[1.7] hover:stroke-blue-600" />
        </motion.button>
      </motion.div>

      
    </div>
  );
};

export default ProjectNavigation;