// src/pages/Home/components/MainContent.tsx
import React from 'react';
import img from "../../assets/images/me.png";

const MainContent: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-between h-screen bg-whi text-dar">
      {/* Contenedor principal con flex-grow */}
      <div className="flex-grow flex items-center justify-center">
        <img
          src={img}
          alt="Darinel Escobar"
          className="w-[200px] h-[300px] object-cover rounded-md"
        />
      </div>

      {/* Título dinámico */}
      <div className="w-full flex items-center justify-center px-4 pb-8">
        <h1 className="custom-title font-cor">
          Darinel Escobar
        </h1>
      </div>
    </section>
  );
};

export default MainContent;
