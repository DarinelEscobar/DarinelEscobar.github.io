// src/pages/Home/HomePage.tsx
import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import AboutMe from './AboutMe';
import Skills from './Skills';
import Footer from './Footer';

const HomePage: React.FC = () => {
  return (
   <main className="relative bg-whi  scroll-smooth">
  {/* Header */}
  <Header />

  {/* Main Content */}
  <MainContent />

  {/* About Me Section */}
  <AboutMe />

  {/* Skills Section */}
  <Skills />

  {/* Footer */}
  <Footer />
</main>

  );
};

export default HomePage;
