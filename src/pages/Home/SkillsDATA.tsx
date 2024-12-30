import React, { useState } from "react";
import data from "../../../data/data.json";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";

const Skills: React.FC = () => {
  const skills = data.resume.Skills_Technologies;

  // Estado para la sección seleccionada (por defecto, "frontend_development" a modo de ejemplo)
  const [selectedSection, setSelectedSection] = useState<string>("frontend_development");

  // Obtiene el icono dinámicamente
  const getIcon = (iconName: string, library: string) => {
    switch (library) {
      case "si":
        return SiIcons[iconName as keyof typeof SiIcons];
      case "fa":
        return FaIcons[iconName as keyof typeof FaIcons];
      default:
        return null;
    }
  };

  // Formatea el título: elimina guiones bajos y capitaliza cada palabra
  const formatTitle = (title: string) =>
    title.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Cuando se hace clic en una sección del sidebar
  const handleSectionClick = (sectionKey: string) => {
    setSelectedSection(sectionKey);
  };

  // Renderiza la sección seleccionada
  const renderSectionContent = (sectionKey: string) => {
    // Caso especial: languages
    if (sectionKey === "languages") {
      const { languages_list, proficiency_list } = skills.languages;
      // Combino cada idioma con su nivel de proficiencia
      const combinedLanguages = languages_list.map((lang: any, idx: number) => ({
        ...lang,
        proficiency: proficiency_list[idx],
      }));

      return (
        <div className="flex flex-wrap justify-center space-x-6">
          {combinedLanguages.map((item: any, i: number) => {
            const IconComponent = getIcon(item.icon, item.library);
            return (
              <div key={i} className="flex flex-col items-center">
                {IconComponent && <IconComponent className="text-4xl mb-2" />}
                <span className="text-white">{`${item.name} (${item.proficiency})`}</span>
              </div>
            );
          })}
        </div>
      );
    }

    // Para el resto de secciones que son arrays
    const sectionData = skills[sectionKey];
    if (Array.isArray(sectionData)) {
      return (
        <div className="flex flex-wrap justify-center space-x-8">
          {sectionData.map((skill: any, index: number) => {
            const IconComponent = getIcon(skill.icon, skill.library);
            return (
              <div key={index} className="flex flex-col items-center">
                {IconComponent && <IconComponent className="text-4xl mb-2" />}
                <span className="text-white">{skill.name}</span>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <aside className="w-60 m-4 p-4 bg-gray-900 border border-gray-700 rounded shadow-md">
        <ul className="space-y-2">
          {Object.keys(skills).map((key, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleSectionClick(key)}
                className={`w-full text-left px-2 py-1 rounded hover:bg-gray-800 transition ${
                  selectedSection === key ? "bg-gray-800 font-semibold" : ""
                }`}
              >
                {formatTitle(key)}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* TÍTULO DE LA SECCIÓN */}
        <h1 className="text-4xl font-bold mb-8">
          {formatTitle(selectedSection)}
        </h1>

        {/* CONTENEDOR DE SKILLS (CON BORDE PARA PARECERSE AL EJEMPLO) */}
        <div className="border border-blue-500 rounded p-6 max-w-4xl w-full flex flex-col items-center">
          {renderSectionContent(selectedSection)}
        </div>
      </main>
    </div>
  );
};

export default Skills;
