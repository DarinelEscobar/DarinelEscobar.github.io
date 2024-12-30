import React from "react";
import { FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";
import data from "../../../data/data.json";

const ContactMe: React.FC = () => {
  const { email } = data.resume.personal_info;

  // Celdas ocupadas inicialmente (por textos y elementos estáticos)
  const occupiedCells = [
    { row: 1, col: 8 }, // "M"
    { row: 2, col: 8 }, // "E"
    { row: 2, col: 2 }, // Parte de "CONTACT"
    { row: 2, col: 3 },
    { row: 2, col: 4 },
    { row: 2, col: 5 },
    { row: 2, col: 6 },
    { row: 3, col: 2 }, // "Let's get in touch" comienza aquí
    { row: 3, col: 3 }, // Reserva la segunda celda del texto
    { row: 3, col: 4 }, // Reserva la tercera celda del texto
    { row: 4, col: 6 }, // Email
    { row: 4, col: 7 },
    { row: 4, col: 8 },
  ];

  const getRandomCell = () => {
    let position;
    do {
      const row = Math.floor(Math.random() * 5) + 1;
      const col = Math.floor(Math.random() * 8) + 1;
      position = { row, col };
    } while (
      occupiedCells.some(
        (cell) => cell.row === position.row && cell.col === position.col
      )
    );
    occupiedCells.push(position); // Marcar como ocupada
    return position;
  };

  const phonePosition = getRandomCell();
  const githubPosition = getRandomCell();
  const linkedinPosition = getRandomCell();

  return (
    <section className="h-screen w-screen bg-whi flex items-center justify-center">
      <div className="grid grid-cols-8 grid-rows-5 w-full h-full relative">
        {/* Fondo de cuadrícula */}
        {[...Array(8 * 5)].map((_, index) => (
          <div key={index} className="border border-5dar w-full h-full" />
        ))}

        {/* Letra "M" ajustada */}
        <div
          className="flex items-center justify-center"
          style={{
            gridColumnStart: 8,
            gridRowStart: 1,
          }}
        >
          <h1 className="font-cor text-dar text-[8vw] leading-none">M</h1>
        </div>

        {/* Letra "E" ajustada */}
        <div
          className="flex items-center justify-center"
          style={{
            gridColumnStart: 8,
            gridRowStart: 2,
          }}
        >
          <h1 className="font-cor text-dar text-[8vw] leading-none">E</h1>
        </div>

        {/* Título “CONTACT” */}
        <div className="col-start-2 col-span-5 row-start-2 flex items-center justify-center">
          <h1 className="custom-contactme font-cor text-dar">CONTACT</h1>
        </div>

        {/* Subtítulo */}
        <div className="col-start-2 col-span-2 row-start-3 flex items-center">
          <h2 className="custom-contactmail font-lat text-dar text-dar">Let's get in touch ._.</h2>
        </div>

        {/* Íconos distribuidos dinámicamente */}
        <div
          style={{
            gridColumnStart: phonePosition.col,
            gridRowStart: phonePosition.row,
          }}
          className="flex items-center justify-center border border-5bla"
        >
          <FaPhone className="text-3xl text-dar" />
        </div>
        <div
          style={{
            gridColumnStart: githubPosition.col,
            gridRowStart: githubPosition.row,
          }}
          className="flex items-center justify-center border border-5bla"
        >
          <FaGithub className="text-3xl text-dar" />
        </div>
        <div
          style={{
            gridColumnStart: linkedinPosition.col,
            gridRowStart: linkedinPosition.row,
          }}
          className="flex items-center justify-center border border-5bla"
        >
          <FaLinkedin className="text-3xl text-dar" />
        </div>

        {/* Email */}
        <div className="col-start-6 col-span-3 row-start-4 flex items-center justify-end pr-4">
          <a
            href={`mailto:${email}`}
            className="custom-contactmail font-rob text-black transition-all duration-300 hover:text-gray-600"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
