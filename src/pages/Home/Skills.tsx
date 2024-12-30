// Skills.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

const Skills = () => {
  const [isHovered, setIsHovered] = useState(null);

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
    <div className="flex min-h-screen bg-whi items-center">
      {/* Barra Lateral / Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
        className="sidebar my-4 ml-4 overflow-hidden flex flex-col"
      >
        {/* Navegación de la barra lateral */}
        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto h-auto">
          {menuItems.map((item) => (
            <motion.a
              key={item.text}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative group ${
                item.active
                  ? 'bg-blue-300 bg-opacity-20 text-dar'
                  : 'text-5dar hover:bg-gray-700 hover:bg-opacity-50 hover:text-whi'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-5 h-5  " />
              <span className="font-lat text-5dar text-sm tracking-wide">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto space-y-16"
        >
          {/* Encabezado */}
          <header className="text-center space-y-4">
            <h1 className="text-6xl font-serif font-bold text-text-color tracking-tight">
              Frontend Developer
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg tracking-wide font-light">
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
                  onHoverStart={() => setIsHovered(skill.name)}
                  onHoverEnd={() => setIsHovered(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center p-6 card transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gray-200/50">
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
                    <h3
                      className="text-lg font-lat transition-colors duration-300"
                      style={{
                        color:
                          isHovered === skill.name ? skill.color : 'rgb(var(--text-color))',
                      }}
                    >
                      {skill.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Elementos decorativos flotantes (blobs) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob blob" />
            <div className="absolute top-20 right-20 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 blob" />
            <div className="absolute top-40 right-0 w-64 h-64 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 blob" />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Skills;
