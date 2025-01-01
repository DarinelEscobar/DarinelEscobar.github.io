import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";
import data from "@data/data.json";

// COMPONENTES EXISTENTES
import ContactGrid from "./ContactGrid";
import ContactIcon from "./ContactIcon";
import ContactText from "./ContactText";

// Tipos e interfaces
interface Cell {
  row: number;
  col: number;
}

interface ContactIconProps {
  Icon: IconType;
  href?: string;
  position: Cell;
}

// =======================================================================================
//                          VERSIÓN MOBILE: Layout sencillo
// =======================================================================================
const MobileContact: React.FC = () => {
  const { email, phone, linkedin, github } = data.resume.personal_info;

  return (
    <section className="w-full min-h-screen bg-whi flex flex-col items-center justify-center p-6">
      <h1 className="font-cor text-3xl text-dar mb-6">CONTACT</h1>
      <h2 className="font-lat text-dar text-lg mb-4">
        Let&apos;s get in touch ._.
      </h2>

      {/* Íconos en una fila o columna sencillos */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <a
          href={`https://wa.me/${phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dar text-4xl hover:text-blue-500 transition-colors"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>

        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dar text-4xl hover:text-blue-500 transition-colors"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>

        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dar text-4xl hover:text-blue-500 transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Email */}
      <a
        href={`mailto:${email}`}
        className="font-rob text-dar text-lg hover:text-blue-500 transition-colors"
      >
        {email}
      </a>
    </section>
  );
};

// =======================================================================================
//                         VERSIÓN TABLET: Grilla reducida y ordenada
// =======================================================================================
const TabletContact: React.FC = () => {
  const { email, phone, linkedin, github } = data.resume.personal_info;

  return (
    <section className="w-full min-h-screen bg-whi flex items-center justify-center">
      {/* Grilla de 4 x 3 */}
      <div className="grid grid-cols-4 grid-rows-3 w-full h-full relative">
        {/* Versión “pequeña” de la grilla (sin posiciones aleatorias) */}
        <div className="col-span-4 row-span-1 flex flex-col items-center justify-center">
          <h1 className="font-cor text-dar text-5xl mb-2">CONTACT</h1>
          <h2 className="font-lat text-dar text-xl">Let&apos;s get in touch ._.</h2>
        </div>

        {/* Íconos en celdas fijas (ej. posiciones definidas) */}
        <div className="col-start-2 row-start-2 flex items-center justify-center border border-5bla">
          <a
            href={`https://wa.me/${phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dar text-3xl hover:text-blue-500 transition-colors"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
        <div className="col-start-3 row-start-2 flex items-center justify-center border border-5bla">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dar text-3xl hover:text-blue-500 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
        <div className="col-start-4 row-start-2 flex items-center justify-center border border-5bla">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dar text-3xl hover:text-blue-500 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Email en la parte de abajo */}
        <div className="col-span-4 row-start-3 flex items-center justify-center">
          <a
            href={`mailto:${email}`}
            className="font-rob text-dar text-lg hover:text-blue-500 transition-colors"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  );
};

// =======================================================================================
//            VERSIÓN DESKTOP: Grilla grande (8 x 5) con posiciones aleatorias
// =======================================================================================

const ContactMeDesktop: React.FC = () => {
  const { email, phone, linkedin, github } = data.resume.personal_info;

  // ----------------- LÓGICA DE POSICIONES ALEATORIAS --------------------
  const totalRows = 5;
  const totalCols = 8;

  const initialOccupiedCells: Cell[] = [
    { row: 1, col: 8 },
    { row: 2, col: 8 },
    { row: 2, col: 2 },
    { row: 2, col: 3 },
    { row: 2, col: 4 },
    { row: 2, col: 5 },
    { row: 2, col: 6 },
    { row: 3, col: 2 },
    { row: 3, col: 3 },
    { row: 3, col: 4 },
    { row: 4, col: 6 },
    { row: 4, col: 7 },
    { row: 4, col: 8 },
  ];

  const [iconPositions, setIconPositions] = useState<{
    phone: Cell | null;
    github: Cell | null;
    linkedin: Cell | null;
  }>({
    phone: null,
    github: null,
    linkedin: null,
  });

  const getRandomCell = (occupied: Cell[]): Cell => {
    let position: Cell;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      const row = Math.floor(Math.random() * totalRows) + 1;
      const col = Math.floor(Math.random() * totalCols) + 1;
      position = { row, col };
      attempts += 1;
      if (attempts > maxAttempts) {
        throw new Error("No se pudieron encontrar celdas libres para los íconos.");
      }
    } while (
      occupied.some((cell) => cell.row === position.row && cell.col === position.col)
    );

    return position;
  };

  useEffect(() => {
    try {
      const occupied = [...initialOccupiedCells];
      const phonePos = getRandomCell(occupied);
      occupied.push(phonePos);

      const githubPos = getRandomCell(occupied);
      occupied.push(githubPos);

      const linkedinPos = getRandomCell(occupied);
      occupied.push(linkedinPos);

      setIconPositions({
        phone: phonePos,
        github: githubPos,
        linkedin: linkedinPos,
      });
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!iconPositions.phone || !iconPositions.github || !iconPositions.linkedin) {
    return null;
  }

  // Render
  return (
    <section className="h-screen w-screen bg-whi flex items-center justify-center">
      <div className="grid grid-cols-8 grid-rows-5 w-full h-full relative">
        {/* Grilla de fondo + letras M/E */}
        <ContactGrid />
        {/* Texto CONTACT & subtítulo */}
        <ContactText />

        {/* Íconos distribuidos aleatoriamente */}
        <ContactIcon
          Icon={FaWhatsapp}
          href={`https://wa.me/${phone.replace(/\D/g, "")}`}
          position={iconPositions.phone}
        />
        <ContactIcon
          Icon={FaGithub}
          href={github}
          position={iconPositions.github}
        />
        <ContactIcon
          Icon={FaLinkedin}
          href={linkedin}
          position={iconPositions.linkedin}
        />

        {/* Email en la parte de abajo */}
        <div className="col-start-6 col-span-3 row-start-4 flex items-center justify-end pr-4">
          <a
            href={`mailto:${email}`}
            className="custom-contactmail font-rob text-dar transition-all duration-300 hover:text-blue-500"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  );
};

// =======================================================================================
//                 CONTACTME PRINCIPAL: Renderiza según el breakpoint
// =======================================================================================
const ContactMe: React.FC = () => {
  return (
    <>
      {/* MOBILE: “block” hasta sm, “hidden” en sm o superior */}
      <div className="block sm:hidden">
        <MobileContact />
      </div>

      {/* TABLET: “hidden” antes de sm y después de md, “block” entre sm y md */}
      <div className="hidden sm:block md:hidden">
        <TabletContact />
      </div>

      {/* DESKTOP: “hidden” hasta md, “block” en md o superior */}
      <div className="hidden md:block">
        <ContactMeDesktop />
      </div>
    </>
  );
};

export default ContactMe;
