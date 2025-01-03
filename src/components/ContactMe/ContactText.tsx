// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\components\ContactMe\ContactText.tsx

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Variantes de animación para contenedor e ítems
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1, // Aparece secuencial
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, x: -20 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 10 },
  },
};

const ContactText: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <>
      {/* "CONTACT" (col-start-2 col-span-5 row-start-2) */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="col-start-2 col-span-5 row-start-2 flex items-center justify-center"
      >
        <motion.h1
          variants={itemVariants}
          className="custom-contactme font-cor text-dar"
        >
          CONTACT
        </motion.h1>
      </motion.div>

      {/* "Let's get in touch ._." (col-start-2 col-span-2 row-start-3) */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="col-start-2 col-span-2 row-start-3 flex items-center"
      >
        <motion.h2
          variants={itemVariants}
          className="custom-contactmail font-lat text-dar"
        >
          Let&apos;s get in touch ._.
        </motion.h2>
      </motion.div>
    </>
  );
};

export default ContactText;
