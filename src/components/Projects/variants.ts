// Variantes para animar la aparición de los contenedores hijos
export const containerVariants = {
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
export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

// Variantes para la imagen del proyecto
export const imageVariants = {
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
export const projectCardVariants = {
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
