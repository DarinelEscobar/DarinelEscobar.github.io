// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\pages\Home\MainContent.tsx
import React from "react";
import img from "../../assets/images/me.png";
import data from "@data/data.json";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  },
};

const MainContent: React.FC = () => {
  const { short_name } = data.resume.personal_info;

  return (
    // Contenedor con fade in
    <motion.section
      className="flex flex-col items-center justify-between h-screen w-screen bg-whi text-dar"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Imagen con tilt al hover */}
      <div className="flex-grow flex items-center justify-center">
        <motion.img
          src={img}
          alt={short_name}
          className="w-[200px] h-[300px] object-cover rounded-md"
          // Al poner whileHover rotamos un poco
          whileHover={{ rotate: 2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        />
      </div>

      {/* Título dinámico */}
      <div className="w-full flex items-center justify-center px-4 pb-8">
        <h1 className="custom-title font-cor text-dar">{short_name}</h1>
      </div>
    </motion.section>
  );
};

export default MainContent;
