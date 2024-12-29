// src/pages/Home/components/AboutMe.tsx
import React from 'react';
import data from "../../../data/data.json"; // Adjust path to match your project structure

const AboutMe: React.FC = () => {
  const { summary } = data.resume.professional_summary;

  return (
    <section className="flex items-center justify-center h-screen bg-5dar text-whi">
      <div className="text-center max-w-screen-md">
        <p className="text-[3rem] leading-relaxed font-cor">
          {summary}
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
