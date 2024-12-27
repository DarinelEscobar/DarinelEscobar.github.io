// src/pages/Home/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-between h-screen bg-dark text-white">
      {/* Title */}
      <div className="flex items-center justify-center flex-grow">
        <h1 className="custom-title cor">
          Darinel Escobar
        </h1>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-3 px-5 flex justify-between text-sm bg-transparent z-10">
        <div className="text-left">
          <h1 className="font-rob text-[1.2rem] font-bold">Copyright:</h1>
          <p className="text-[1rem] font-lat">&copy; 2024</p>
        </div>
        <div className="text-left">
          <h1 className="font-rob text-[1.2rem] font-bold">Quick Jump:</h1>
          <p className="text-[1rem] font-lat">Ascend to Top</p>
        </div>
        <div className="text-left">
          <h1 className="font-rob text-[1.2rem] font-bold">Contact Info:</h1>
          <p className="text-[1rem] font-lat">Email, LinkedIn, GitHub</p>
        </div>
        <div className="text-left">
          <h1 className="font-rob text-[1.2rem] font-bold">Crafted & Aesthetic by:</h1>
          <p className="text-[1rem] font-lat">Darinel Escobar</p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
