import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Importaciones de íconos desde lucide-react
import {
  Code2,
  Database,
  Cloud,
  Smartphone,
  Wrench,
  Award,
  Brain,
  Languages,
  Terminal,
  Palette,
  Box,
  Layers,
  Coffee,
  Compass,
  Cpu,
  Globe,
} from 'lucide-react';
import './skills.css';

const Skills: React.FC = () => {
  // Estado para manejar el hover sobre cada skill
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Elementos de menú (barra lateral)
  const menuItems = [
    { icon: Code2, text: 'Frontend Development', active: true },
    { icon: Database, text: 'Backend Development' },
    { icon: Cloud, text: 'Cloud & DevOps' },
    { icon: Smartphone, text: 'Mobile Development' },
    { icon: Wrench, text: 'Tools' },
    { icon: Award, text: 'Certifications' },
    { icon: Brain, text: 'Soft Skills' },
    { icon: Languages, text: 'Languages' },
  ];

  // Lista de Skills (icono, nombre y color principal)
  const skills = [
    { name: 'Development', icon: Terminal, color: '#3B82F6' },
    { name: 'Design System', icon: Palette, color: '#EC4899' },
    { name: 'Architecture', icon: Box, color: '#10B981' },
    { name: 'Integration', icon: Layers, color: '#F59E0B' },
    { name: 'Performance', icon: Coffee, color: '#8B5CF6' },
    { name: 'Navigation', icon: Compass, color: '#EF4444' },
    { name: 'Systems', icon: Cpu, color: '#6366F1' },
    { name: 'Global Scale', icon: Globe, color: '#14B8A6' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[rgb(236,235,235)] to-gray-100 items-center">
      {/* Barra Lateral / Sidebar */}
      <motion.aside
        // Animación inicial para deslizar la barra lateral
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-auto h-full bg-whi bg-opacity-90 shadow-lg rounded-xl my-4 ml-4 overflow-hidden flex flex-col"
      >
        {/* Navegación de la barra lateral */}
        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto h-auto">
          {menuItems.map((item) => (
            <motion.a
              key={item.text}
              href="#"
              // Clases y estilos dinámicos para ítems activos / inactivos
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative group ${
                item.active
                  ? 'bg-blue-500 bg-opacity-20 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:bg-opacity-50 hover:text-white'
              }`}
              // Efectos de framer-motion
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-lato font-medium text-sm tracking-wide">
                {item.text}
              </span>
              {/* Indicador visual para el elemento activo */}
              {item.active && (
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-400 rounded-full"
                  layoutId="activeIndicator"
                />
              )}
            </motion.a>
          ))}
        </nav>
      </motion.aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-12">
        <motion.div
          // Efecto inicial de aparición y desplazamiento
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-16"
        >
          {/* Encabezado */}
          <header className="text-center space-y-4">
            <h1 className="text-6xl font-serif font-bold text-gray-800 tracking-tight">
              Frontend Developer
            </h1>
            <p className="text-gray-600 text-lg tracking-wide font-light">
              Crafting beautiful and responsive web experiences
            </p>
          </header>

          {/* Contenedor relativo para la cuadrícula de skills y los blobs */}
          <div className="relative">
            {/* Grid de Skills */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 skills-grid">
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="relative group"
                  // Manejo de eventos onHover para cambiar el estado
                  onHoverStart={() => setIsHovered(skill.name)}
                  onHoverEnd={() => setIsHovered(null)}
                  // Pequeña animación de escala al hacer hover/click
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="flex flex-col items-center p-6 rounded-xl bg-white border border-gray-100
                               transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gray-200/50"
                  >
                    {/* Contenedor del ícono con background dinámico en hover */}
                    <div
                      className="p-3 rounded-lg mb-4 transition-colors duration-300"
                      style={{
                        backgroundColor:
                          isHovered === skill.name ? `${skill.color}10` : 'transparent',
                      }}
                    >
                      <skill.icon
                        className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          color: isHovered === skill.name ? skill.color : '#64748b',
                        }}
                      />
                    </div>
                    {/* Nombre de la skill con color dinámico en hover */}
                    <h3
                      className="text-lg font-lato font-semibold transition-colors duration-300"
                      style={{
                        color:
                          isHovered === skill.name ? skill.color : 'rgb(50, 50, 50)',
                      }}
                    >
                      {skill.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Elementos decorativos flotantes (blobs) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob blob" />
            <div className="absolute top-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 blob" />
            <div className="absolute top-40 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 blob" />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Skills;
