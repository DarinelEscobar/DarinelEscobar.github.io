// src/pages/Home/HomePage.tsx
import React from 'react';
import Header from '@/components/Header/Header';
import MainContent from './MainContent';
import AboutMe from './AboutMe';
import Skills from './Skills';
import Title from './Title';
import ContactMe from '@/components/ContactMe/ContactMe';

const HomePage: React.FC = () => {
  return (
   <main className="Container bg-whi  scroll-smooth text-dar w-[100vw]">
  {/* Header */}
  <Header />

  {/* Main Content */}
  <MainContent />

  {/* About Me Section */}
  <AboutMe />

  {/* Skills Section */}
  <Skills />

  <ContactMe />
  {/* Title */}
  <Title />

</main>

  );
};

export default HomePage;
