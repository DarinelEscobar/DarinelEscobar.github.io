// src/components/Footer/Footer.tsx
import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { ChevronUp } from 'lucide-react';
import data from "@data/data.json";

const Footer: React.FC = () => {
  const { short_name, email, linkedin, github, phone } = data.resume.personal_info;

  return (
    <footer className="w-full py-3 px-5 text-sm bg-transparent z-10">
      {/* VERSIÓN COMPACTA (MOBILE) */}
      <div className="block md:hidden flex-col items-center justify-between">
        {/* Compacta: Una sola “fila” o dos “filas” con lo esencial */}
        <div className="flex items-center justify-between">
          {/* Año y Derechos */}
          <p className="text-dar text-[0.89rem]">
            &copy; 2024
          </p>
          {/* Subir al top */}
          <a href="#top" className="text-dar text-[0.89rem] flex items-center gap-1 hover:underline">
            Top <ChevronUp size={16} />
          </a>
        </div>

        {/* Íconos de contacto */}
        <div className="mt-2 flex items-center gap-3 justify-center">
          <a
            href={`mailto:${email}`}
            className="hover:underline flex items-center gap-1"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={`https://wa.me/${phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>

        {/* Autor, si deseas mostrarlo en mobile */}
        <div className="mt-2 text-center">
          <p className="text-dar text-[0.89rem]">
            {short_name}
          </p>
        </div>
      </div>

      {/* VERSIÓN COMPLETA (DESKTOP) */}
      <div className="hidden md:flex justify-between">
        {/* Columna: Copyright */}
        <div className="text-left">
          <h1 className="font-bold font-rob text-dar text-[0.89rem]">Copyright:</h1>
          <p className="text-dar text-[0.89rem] flex items-center gap-1">
            &copy; 2024
          </p>
        </div>

        {/* Columna: Quick Jump */}
        <div className="text-left">
          <h1 className="font-bold font-rob text-dar text-[0.89rem]">Quick Jump:</h1>
          <p className="text-dar text-[0.89rem] flex items-center gap-1">
            Ascend to Top <ChevronUp size={16} />
          </p>
        </div>

        {/* Columna: Contact Info */}
        <div className="text-left">
          <h1 className="font-bold font-rob text-dar text-[0.89rem]">Contact Info:</h1>
          <p className="text-dar text-[0.89rem] flex items-center gap-2">
            <a
              href={`mailto:${email}`}
              className="hover:underline flex items-center gap-1"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={`https://wa.me/${phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </p>
        </div>

        {/* Columna: Crafted & Aesthetic by */}
        <div className="text-left">
          <h1 className="font-bold font-rob text-dar text-[0.89rem]">Crafted & Aesthetic by:</h1>
          <p className="text-dar text-[0.89rem] flex items-center gap-1">
            {short_name}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
