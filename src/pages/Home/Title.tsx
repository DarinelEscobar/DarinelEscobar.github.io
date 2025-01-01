// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\pages\Home\Title.tsx
import React from "react";
import Footer from "@/components/Footer/Footer";
import data from "@data/data.json";

// 1) Importamos framer-motion
import { motion } from "framer-motion";

// Variants para “stagger” (animación escalonada)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Stagger para los hijos
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 50 // Empieza un poco más abajo
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

const Title: React.FC = () => {
  const { short_name, rol } = data.resume.personal_info;

  return (
    // 2) Usamos motion.section para animar todo el contenedor
    <motion.section
      className="flex flex-col justify-between h-screen w-screen bg-whi text-dar"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // Si quisieras que se repita al entrar en viewport, puedes usar:
      // viewport={{ once: false }} // NO se ejecuta solo la primera vez
      // onViewportEnter={() => ...} // etc.
    >
      {/* Título y texto central */}
      <motion.div
        className="flex items-center justify-center flex-grow flex-col"
        variants={containerVariants} // Podrías usar uno global o separar
      >
        {/* Cada uno es “hijo” y tendrá su animación escalonada */}
        <motion.h1
          className="custom-title font-cor"
          variants={childVariants}
        >
          {short_name}
        </motion.h1>

        <motion.p
          className="custom-paragraph font-cor"
          variants={childVariants}
        >
          {rol}
        </motion.p>
      </motion.div>

      {/* Footer animado como hijo también si deseas */}
      <motion.div variants={childVariants}>
        <Footer />
      </motion.div>
    </motion.section>
  );
};

export default Title;
