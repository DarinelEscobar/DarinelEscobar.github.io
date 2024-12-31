// src/pages/Home/Contact.tsx
import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactMe from '@/components/ContactMe/ContactMe';

const Contact: React.FC = () => {
  return (
   <main className="relative bg-whi  scroll-smooth text-dar">
  <Header />
  <ContactMe />
</main>

  );
};

export default Contact;
