// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\components\SectionWrapper.tsx

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  index?: number; // para identificar la sección
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, index = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Hook de Framer Motion para saber si el elemento está en el viewport
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", once: false });

  // Al “entrar” en la vista, guardamos en Local Storage el índice actual
  useEffect(() => {
    if (isInView) {
      localStorage.setItem("activeSection", String(index));
    }
  }, [isInView, index]);

  return (
    // Usamos motion.section para disparar animaciones suaves de entrada
    <motion.section
      ref={ref}
      className="
        snap-start
        w-full
        h-screen
        flex
        items-center
        justify-center
        relative
      "
      // Variants para la animación de entrada
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
