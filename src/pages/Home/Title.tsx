// src/components/Title/Title.tsx
import React from 'react';
import Footer from '@/components/Footer/Footer';
import data from "@data/data.json";

const Title: React.FC = () => {
  const { short_name, rol } = data.resume.personal_info;

  return (
    <section className="flex flex-col justify-between h-screen bg-whi text-dar">
      {/* Título */}
      <div className="flex items-center justify-center flex-grow flex-col">
        <h1 className="custom-title font-cor">
          {short_name}
        </h1>
        <p className="custom-paragraph font-cor ">
          {rol}
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default Title;
