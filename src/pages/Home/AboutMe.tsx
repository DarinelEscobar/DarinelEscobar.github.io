import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Ejemplo de importación de íconos si los necesitas
// import { IconName } from "lucide-react";

const AboutMe: React.FC = () => {
  // Controla la aparición del texto adicional con este estado
  const [showNote, setShowNote] = useState(false);

  // Efectos de animación con framer-motion + intersection observer
  const titleControls = useAnimation();
  const textControls = useAnimation();

  // Hooks para intersection observer
  // threshold = 0.3 => se dispara cuando el 30% del componente es visible
  const { ref: aboutMeRef, inView: aboutMeInView } = useInView({
    threshold: 0.3,
    triggerOnce: false, // si quieres que se anime cada vez que entres
  });

  useEffect(() => {
    // Mostramos la nota a los 500ms
    const timer = setTimeout(() => setShowNote(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Si está en vista => inicia animaciones
    if (aboutMeInView) {
      titleControls.start("visible");
      textControls.start("visible");
    } else {
      titleControls.start("hidden");
      textControls.start("hidden");
    }
  }, [aboutMeInView, titleControls, textControls]);

  // Variants para animar "título" y "texto" según inView
  const variantsTitle = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delayChildren: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  // Variants para animar cada “línea” del título de manera escalonada
  const variantsLine = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const variantsText = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  return (
    <section
      ref={aboutMeRef}
      // Clases de Tailwind para soportar dark mode: "dark:bg-gray-900", "dark:text-white", etc.
      className="min-h-screen flex items-center justify-center
                 bg-gradient-radial from-white via-[#ECECEC] to-[#DCDCDC]
                 dark:bg-gradient-radial dark:from-[#1F1F1F] dark:via-[#2C2C2C] dark:to-[#3B3B3B]
                 font-sans relative overflow-hidden text-cool-gray-800
                 dark:text-gray-100 transition-colors duration-300"
    >
      {/* Líneas diagonales de fondo (puedes darle un toque distinto para dark mode) */}
      <div className="diagonal-lines dark:opacity-40"></div>

      {/* Contenedor principal */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-8 py-12 relative z-10">
        {/* Sección Izquierda / Título con animaciones escalonadas */}
        <motion.div
          className="md:w-5/12 mb-8 md:mb-0 text-shadow"
          variants={variantsTitle}
          initial="hidden"
          animate={titleControls}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold
                       leading-snug"
          >
            {/* Cada línea del título animada por separado */}
            <motion.div variants={variantsLine} whileHover={{ scale: 1.1, color: "#2563EB" }}>
              I'm{" "}
              <span className="text-blue-500 dark:text-blue-400">
                Darinel
              </span>,
            </motion.div>

            <motion.div
              variants={variantsLine}
              whileHover={{
                x: -5,
                textShadow: "2px 2px 5px rgba(59, 130, 246, 0.5)",
              }}
            >
              a{" "}
              <span className="text-gray-600 dark:text-gray-300">
                versatile software engineer
              </span>
            </motion.div>

            <motion.div
              variants={variantsLine}
              whileHover={{ x: 5, scale: 1.05, rotate: 1 }}
            >
              who enjoys{" "}
              <span className="text-gray-600 dark:text-gray-300">
                full-stack development
              </span>
            </motion.div>

            <motion.div
              variants={variantsLine}
              whileHover={{
                y: -5,
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              and{" "}
              <span className="text-gray-600 dark:text-gray-300">
                problem-solving
              </span>
              .
            </motion.div>
          </motion.h1>
        </motion.div>

        {/* Separador en vista de escritorio */}
        <div className="hidden md:block w-px h-64 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-8 dark:via-gray-600"></div>

        {/* Sección Derecha / Texto adicional (aparece tras 500ms) */}
        {showNote && (
          <motion.div
            className="md:w-5/12 md:text-right text-shadow"
            variants={variantsText}
            initial="hidden"
            animate={textControls}
          >
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-sans text-warm-gray-700 dark:text-gray-200">
              Always eager to{" "}
              <motion.span
                initial={{ backgroundSize: "0% 2px" }}
                animate={{ backgroundSize: "100% 2px" }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{
                  scale: 1.1,
                  textShadow: "2px 2px 5px rgba(37, 99, 235, 0.5)",
                }}
                className="hover-effect text-cool-gray-600 dark:text-gray-300
                           font-semibold bg-gradient-to-r from-cool-gray-600 to-cool-gray-600
                           dark:from-gray-400 dark:to-gray-400
                           bg-no-repeat bg-bottom"
              >
                learn and grow
              </motion.span>
              , I thrive on tackling{" "}
              <motion.span
                initial={{ backgroundSize: "0% 2px" }}
                animate={{ backgroundSize: "100% 2px" }}
                transition={{ delay: 1.0, duration: 0.8 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 1,
                  textShadow: "2px 2px 5px rgba(37, 99, 235, 0.5)",
                }}
                className="hover-effect text-cool-gray-600 dark:text-gray-300
                           font-semibold bg-gradient-to-r from-cool-gray-600 to-cool-gray-600
                           dark:from-gray-400 dark:to-gray-400
                           bg-no-repeat bg-bottom"
              >
                new challenges
              </motion.span>{" "}
              and expanding my skill set.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutMe;
