// \src\components\ContactMe\ContactMe.tsx

import React, { useMemo } from "react";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import { usePortfolioContent } from "@/lib/portfolioContent";
import useMediaQuery from "@/hooks/useMediaQuery";

// COMPONENTES
import ContactGrid from "./ContactGrid";
import ContactIcon from "./ContactIcon";
import ContactText from "./ContactText";

// Tipos
interface Cell {
  row: number;
  col: number;
}

const TOTAL_ROWS = 5;
const TOTAL_COLS = 8;

const getRandomCell = (occupied: Cell[]): Cell => {
  let position: Cell;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    const row = Math.floor(Math.random() * TOTAL_ROWS) + 1;
    const col = Math.floor(Math.random() * TOTAL_COLS) + 1;
    position = { row, col };
    attempts++;
    if (attempts > maxAttempts) {
      throw new Error("Unable to find free cells for contact icons.");
    }
  } while (
    occupied.some((cell) => cell.row === position.row && cell.col === position.col)
  );

  return position;
};

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

// ================== MOBILE ==================
const MobileContact: React.FC = () => {
  const {
    resume: {
      personal_info: { email, phone, linkedin, github },
    },
    ui,
  } = usePortfolioContent();
  return (
    <section className="flex min-h-screen min-h-[100dvh] w-full flex-col items-center justify-center bg-whi p-6">
      <h1 className="font-cor text-3xl text-dar mb-6">{ui.contact.title}</h1>
      <h2 className="font-lat text-dar text-lg mb-4">
        {ui.contact.subtitle}
      </h2>

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

      <a
        href={`mailto:${email}`}
        className="font-rob text-dar text-lg hover:text-blue-500 transition-colors"
      >
        {email}
      </a>
    </section>
  );
};

// ================== TABLET ==================
const TabletContact: React.FC = () => {
  const {
    resume: {
      personal_info: { email, phone, linkedin, github },
    },
    ui,
  } = usePortfolioContent();

  return (
    <section className="flex min-h-screen min-h-[100dvh] w-full items-center justify-center bg-whi">
      <div className="grid grid-cols-4 grid-rows-3 w-full h-full relative">
        <div className="col-span-4 row-span-1 flex flex-col items-center justify-center">
          <h1 className="font-cor text-dar text-5xl mb-2">{ui.contact.title}</h1>
          <h2 className="font-lat text-dar text-xl">
            {ui.contact.subtitle}
          </h2>
        </div>

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

// ================== DESKTOP ==================
const ContactMeDesktop: React.FC = () => {
  const {
    resume: {
      personal_info: { email, phone, linkedin, github },
    },
  } = usePortfolioContent();

  const iconPositions = useMemo(() => {
    try {
      const occupied = [...initialOccupiedCells];

      const phonePos = getRandomCell(occupied);
      occupied.push(phonePos);

      const githubPos = getRandomCell(occupied);
      occupied.push(githubPos);

      const linkedinPos = getRandomCell(occupied);
      occupied.push(linkedinPos);

      return {
        phone: phonePos,
        github: githubPos,
        linkedin: linkedinPos,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  if (!iconPositions) {
    return null;
  }

  return (
    <section className="flex min-h-screen h-[100dvh] w-screen items-center justify-center bg-whi">
      <div className="grid grid-cols-8 grid-rows-5 w-full h-full relative">
        {/* Grilla de celdas + letras M/E */}
        <ContactGrid />

        {/* Texto CONTACT y subtítulo */}
        <ContactText />

        {/* Íconos en celdas aleatorias */}
        <ContactIcon
          Icon={FaWhatsapp}
          href={`https://wa.me/${phone.replace(/\D/g, "")}`}
          ariaLabel="WhatsApp"
          position={iconPositions.phone}
        />
        <ContactIcon
          Icon={FaGithub}
          href={github}
          ariaLabel="GitHub"
          position={iconPositions.github}
        />
        <ContactIcon
          Icon={FaLinkedin}
          href={linkedin}
          ariaLabel="LinkedIn"
          position={iconPositions.linkedin}
        />

        {/* Email al final */}
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

// =============== CONTACTME PRINCIPAL ===============
const ContactMe: React.FC = () => {
  const isTablet = useMediaQuery("(min-width: 640px)");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <ContactMeDesktop />;
  }

  if (isTablet) {
    return <TabletContact />;
  }

  return <MobileContact />;
};

export default ContactMe;
