
import React from "react";

const ContactGrid: React.FC = () => {
  return (
    <>
      {/* Fondo de cuadrícula */}
      {[...Array(8 * 5)].map((_, index) => (
        <div key={index} className="border border-5dar w-full h-full" />
      ))}

      {/* Letra "M" ajustada */}
      <div
        className="flex items-center justify-center"
        style={{
          gridColumnStart: 8,
          gridRowStart: 1,
        }}
      >
        <h1 className="font-cor text-dar text-[8vw] leading-none">M</h1>
      </div>

      {/* Letra "E" ajustada */}
      <div
        className="flex items-center justify-center"
        style={{
          gridColumnStart: 8,
          gridRowStart: 2,
        }}
      >
        <h1 className="font-cor text-dar text-[8vw] leading-none">E</h1>
      </div>
    </>
  );
};

export default ContactGrid;
