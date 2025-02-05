// \src\components\ContactMe\ContactGrid.tsx

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Variantes para cada celda
const cellVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 120, damping: 10 },
  },
};

// Variantes para letras M y E
const letterVariants = {
  hidden: { opacity: 0, scale: 0.8, x: 20 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring", stiffness: 140, damping: 8 },
  },
  hover: {
    scale: 1.1,
    rotate: [0, 3, -3, 0],
    transition: { duration: 0.8, repeat: Infinity },
  },
};

const ContactGrid: React.FC = () => {
  // Observador para repetir animaciones
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <>
      {/* Fondo de cuadrícula (8 cols x 5 rows = 40 celdas) */}
      {[...Array(8 * 5)].map((_, index) => (
        <motion.div
          key={index}
          // Cada celda se anima individualmente
          variants={cellVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          ref={ref}
          className="border border-5dar w-full h-full"
        />
      ))}

      {/* Letra "M" (col 8, row 1) */}
      <motion.div
        variants={letterVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        whileHover="hover"
        ref={ref}
        className="flex items-center justify-center"
        style={{
          gridColumnStart: 8,
          gridRowStart: 1,
        }}
      >
        <h1 className="font-cor text-dar text-[8vw] leading-none">M</h1>
      </motion.div>

      {/* Letra "E" (col 8, row 2) */}
      <motion.div
        variants={letterVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        whileHover="hover"
        ref={ref}
        className="flex items-center justify-center"
        style={{
          gridColumnStart: 8,
          gridRowStart: 2,
        }}
      >
        <h1 className="font-cor text-dar text-[8vw] leading-none">E</h1>
      </motion.div>
    </>
  );
};

export default ContactGrid;
