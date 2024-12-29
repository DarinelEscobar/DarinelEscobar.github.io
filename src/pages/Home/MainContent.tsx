// src/pages/Home/components/MainContent.tsx
import React from 'react';
import img from "../../assets/images/me.png";
import data from "../../../data/data.json"; // Adjust the path as per your provided route

const MainContent: React.FC = () => {
  const { short_name } = data.resume.personal_info;

  return (
    <section className="flex flex-col items-center justify-between h-screen bg-whi text-dar">
      {/* Contenedor principal con flex-grow */}
      <div className="flex-grow flex items-center justify-center">
        <img
          src={img}
          alt={short_name}
          className="w-[200px] h-[300px] object-cover rounded-md"
        />
      </div>

      {/* Título dinámico */}
      <div className="w-full flex items-center justify-center px-4 pb-8">
        <h1 className="custom-title font-cor text-dar">
          {short_name}
        </h1>
      </div>
    </section>
  );
};

export default MainContent;
