// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\components\ContactMe\ContactIcon.tsx
import React from "react";
import { IconType } from "react-icons";
// ** Framer Motion import opcional por si deseas animar el ícono **
import { motion } from "framer-motion";

interface ContactIconProps {
  Icon: IconType;
  href?: string;
  position: {
    row: number;
    col: number;
  };
}

const ContactIcon: React.FC<ContactIconProps> = ({ Icon, href, position }) => {
  return (
    <motion.div
      style={{
        gridColumnStart: position.col,
        gridRowStart: position.row,
      }}
      className="flex items-center justify-center border border-5bla"
      // Ejemplo de pequeña animación al hacer hover:
      whileHover={{ scale: 1.1 }}
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
