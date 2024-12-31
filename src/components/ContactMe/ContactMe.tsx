import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import ContactGrid from "./ContactGrid";
import ContactText from "./ContactText";
import ContactIcon from "./ContactIcon";
import data from "@data/data.json";

interface Cell {
  row: number;
  col: number;
}

const ContactMe: React.FC = () => {
  const { email, phone, linkedin, github } = data.resume.personal_info; // Importa las variables directamente

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

  const totalRows = 5;
  const totalCols = 8;

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
  }, []);

  if (!iconPositions.phone || !iconPositions.github || !iconPositions.linkedin) {
    return null;
  }

  return (
    <section className="h-screen w-screen bg-whi flex items-center justify-center">
      <div className="grid grid-cols-8 grid-rows-5 w-full h-full relative">
        <ContactGrid />
        <ContactText />

        {/* Íconos distribuidos dinámicamente */}
        <ContactIcon
          Icon={FaWhatsapp}
          href={`https://wa.me/${phone.replace(/\D/g, "")}`}
          position={iconPositions.phone}
        />
        <ContactIcon
          Icon={FaGithub}
          href={github} // Usa la URL de GitHub desde el JSON
          position={iconPositions.github}
        />
        <ContactIcon
          Icon={FaLinkedin}
          href={linkedin} // Usa la URL de LinkedIn desde el JSON
          position={iconPositions.linkedin}
        />

        {/* Email */}
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

export default ContactMe;
