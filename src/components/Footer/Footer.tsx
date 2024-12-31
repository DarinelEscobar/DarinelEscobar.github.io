// src/components/Footer/Footer.tsx
import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { ChevronUp } from 'lucide-react';
import data from "@data/data.json";

const Footer: React.FC = () => {
  const { short_name, email, linkedin, github, phone } = data.resume.personal_info;

  return (
    <footer className="w-full py-3 px-5 flex justify-between text-sm bg-transparent z-10">
      <div className="text-left">
        <h1 className="font-bold font-rob text-dar text-[0.89rem]">Copyright:</h1>
        <p className="text-dar text-[0.89rem] flex items-center gap-1"> &copy; 2024</p>
      </div>
      <div className="text-left">
        <h1 className="font-bold font-rob text-dar text-[0.89rem]">Quick Jump:</h1>
        <p className="text-dar text-[0.89rem] flex items-center gap-1">
          Ascend to Top <ChevronUp />
        </p>
      </div>
      <div className="text-left">
        <h1 className="font-bold font-rob text-dar text-[0.89rem]">Contact Info:</h1>
        <p className="text-dar text-[0.89rem] flex items-center gap-2">
          <a href={`mailto:${email}`} className="hover:underline flex items-center gap-1">
            <FaEnvelope />
          </a>,
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
            <FaLinkedin />
          </a>,
          <a href={github} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
            <FaGithub />
          </a>,
          <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
            <FaWhatsapp />
          </a>
        </p>
      </div>
      <div className="text-left">
        <h1 className="font-bold font-rob text-dar text-[0.89rem]">Crafted & Aesthetic by:</h1>
        <p className="text-dar text-[0.89rem] flex items-center gap-1">
          {short_name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
