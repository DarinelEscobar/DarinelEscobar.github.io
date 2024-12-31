

import React, { useState } from 'react';
import { motion } from 'framer-motion';


import awsAcademyCloudFoundations from '../../assets/images/badge/aws-academy-graduate-aws-academy-cloud-foundations.png';
import awsAcademyCloudDeveloping from '../../assets/images/badge/aws-academy-graduate-aws-academy-cloud-developing.png';
import awsAcademyCloudSecurityFoundations from '../../assets/images/badge/aws-academy-graduate-aws-academy-cloud-security-foundations.png';
import awsAcademyIntroductionToCloud from '../../assets/images/badge/aws-academy-graduate-aws-academy-introduction-to-cloud-semester-1.png';


import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';


import {
  Code2,
  Cloud,
  Database,
  Smartphone,
  Server,
  LayoutPanelLeft,
  PocketKnife,
  HeartHandshake,
  Speech,
  Award,
} from 'lucide-react';


import data from '../../../data/data.json';

import './skills.css';

const Skills: React.FC = () => {
  const imageMap: Record<string, string> = {
    awsAcademyCloudFoundations,
    awsAcademyCloudDeveloping,
    awsAcademyCloudSecurityFoundations,
    awsAcademyIntroductionToCloud,
  };

  const combinedSections = {
    ...data.resume.Skills_Technologies,
    certifications: data.resume.certifications,
  };


  const sectionKeys = Object.keys(combinedSections);


  const [selectedSection, setSelectedSection] = useState(sectionKeys[0]);


  const [isHovered, setIsHovered] = useState<string | null>(null);

  const getIcon = (iconName: string, library: string) => {
    switch (library.toLowerCase()) {
      case 'si':
        return SiIcons[iconName as keyof typeof SiIcons];
      case 'fa':
        return FaIcons[iconName as keyof typeof FaIcons];
      case 'gi':
        return GiIcons[iconName as keyof typeof GiIcons];
      case 'lucide-react': {
        const lucideMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
          code: Code2,
          Code: Code2,
          cloud: Cloud,
          Cloud: Cloud,
          database: Database,
          Database: Database,
          smartphone: Smartphone,
          Smartphone: Smartphone,
          server: Server,
          Server: Server,
          layoutpanelleft: LayoutPanelLeft,
          LayoutPanelLeft: LayoutPanelLeft,
          pocketknife: PocketKnife,
          PocketKnife: PocketKnife,
          hearthandshake: HeartHandshake,
          HeartHandshake: HeartHandshake,
          speech: Speech,
          Speech: Speech,
          award: Award,
          Award: Award,
        };

        return lucideMap[iconName] || Code2;
      }
      default:
        return null;
    }
  };


  const formatSectionTitle = (sectionKey: string) =>
    sectionKey
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());


  const activeSection = combinedSections[selectedSection];


  let currentSkills: any[] = [];
  if (activeSection) {

    if (selectedSection === 'languages' && activeSection.languages_list) {
      currentSkills = activeSection.languages_list;
    }

    else if (selectedSection === 'certifications' && activeSection.items) {
      currentSkills = activeSection.items;
    }

    else if (activeSection.skills) {
      currentSkills = activeSection.skills;
    }
  }

  return (
    <div className="flex min-h-screen bg-whi items-center justify-center">
      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
        className="sidebar my-4 ml-4 overflow-hidden flex flex-col"
      >
        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto h-auto">
          {sectionKeys.map((key) => {
            const isActive = key === selectedSection;
            const {
              name: iconName = '',
              library = '',
              color = '',
            } = combinedSections[key].section_icon || {};

            const IconComponent = getIcon(iconName, library);

            return (
              <motion.div
                key={key}
                onClick={() => setSelectedSection(key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative group cursor-pointer ${
                  isActive
                    ? 'bg-blue-300 bg-opacity-20 text-dar'
                    : 'text-5dar hover:bg-gray-700 hover:bg-opacity-50 hover:text-whi'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {IconComponent && (
                  <IconComponent
                    className="w-5 h-5"
                    style={{ color: color || '#000' }}
                  />
                )}
                <span className="font-lat text-5dar text-sm tracking-wide">
                  {formatSectionTitle(key)}
                </span>
                {/* Active section indicator */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-400 rounded-full"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.div>
            );
          })}
        </nav>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto space-y-16"
        >
          {/* HEADER */}
          <header className="text-center space-y-4">
            <h1 className="text-6xl font-serif font-bold text-text-color tracking-tight">
              Frontend Developer
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg tracking-wide font-light">
              Crafting beautiful and responsive web experiences
            </p>
          </header>

          {/* SECTION CONTENT */}
          {selectedSection === 'certifications' ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {currentSkills.map((cert: any) => (
                <motion.div
                  key={cert.name}
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center p-6 card transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gray-200/50">
                    <a href={cert.link} target="_blank" rel="noopener noreferrer">
                      {/* The image */}
                      <img
                        src={imageMap[cert.imageKey]}
                        alt={cert.name}
                        className="w-32 h-auto mb-4 object-contain"
                      />
                    </a>
                    <h3 className="text-lg font-lat">{cert.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 skills-grid">
              {currentSkills.map((skill: any) => {
                const SkillIcon = getIcon(skill.icon, skill.library);
                return (
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
                        {SkillIcon && (
                          <SkillIcon
                            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                            style={{
                              color: isHovered === skill.name ? skill.color : '#64748b',
                            }}
                          />
                        )}
                      </div>
                      <h3
                        className="text-lg font-lat transition-colors duration-300"
                        style={{
                          color:
                            isHovered === skill.name
                              ? skill.color
                              : 'rgb(var(--text-color))',
                        }}
                      >
                        {skill.name}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}


          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob blob" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 blob" />
          <div className="absolute top-40 right-0 w-64 h-64 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 blob" />
        </motion.div>
      </main>
    </div>
  );
};

export default Skills;
