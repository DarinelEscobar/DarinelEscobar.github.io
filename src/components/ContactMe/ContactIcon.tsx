// src/components/ContactMe/ContactIcon.tsx
import React from "react";
import { IconType } from "react-icons";

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
    <div
      style={{
        gridColumnStart: position.col,
        gridRowStart: position.row,
      }}
      className="flex items-center justify-center border border-5bla"
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
          <Icon className="text-3xl text-dar" />
        </a>
      ) : (
        <Icon className="text-3xl text-dar" />
      )}
    </div>
  );
};

export default ContactIcon;
