// \src\components\ContactMe\ContactIcon.tsx

import React from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ContactIconProps {
  Icon: IconType;
  href?: string;
  position: {
    row: number;
    col: number;
  };
}

// Variantes un poco más “fancy” para el ícono
const iconVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 10 },
  },
};

const ContactIcon: React.FC<ContactIconProps> = ({ Icon, href, position }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      variants={iconVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={{
        gridColumnStart: position.col,
        gridRowStart: position.row,
      }}
      className="flex items-center justify-center border border-5bla"
      whileHover={{ scale: 1.15, rotate: 2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <Icon className="text-3xl text-dar" />
        </a>
      ) : (
        <Icon className="text-3xl text-dar" />
      )}
    </motion.div>
  );
};

export default ContactIcon;
