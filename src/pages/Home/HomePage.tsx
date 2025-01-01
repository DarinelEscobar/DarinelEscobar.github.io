// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\pages\Home\HomePage.tsx

import React, { useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import MainContent from "./MainContent";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Title from "./Title";
import ContactMe from "@/components/ContactMe/ContactMe";

import SectionWrapper from "@/components/SectionWrapper";

const HomePage: React.FC = () => {
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const savedIndex = localStorage.getItem("activeSection");
    // Si savedIndex NO existe (null) o es "0", NO hacemos scroll
    // (significa que está en la primera sección o nunca cambió)
    if (savedIndex && savedIndex !== "0") {
      const idx = parseInt(savedIndex, 10);
      if (!isNaN(idx) && sectionRefs.current[idx]) {
        sectionRefs.current[idx].scrollIntoView({ behavior: "auto" });
      }
    }
  }, []);

  // Función para asignar refs
  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      sectionRefs.current[index] = el;
    }
  };

  return (
    <main
      className="
        Container
        bg-whi
        text-dar
        w-[100vw]
        h-screen
        snap-y
        snap-mandatory
        overflow-auto
        scroll-smooth
      "
      style={{ scrollSnapType: "y mandatory", overscrollBehavior: "none" }}
    >
      <Header />

      {/* Sección 0: MainContent (Principal) */}
      <SectionWrapper index={0}>
        <div ref={(el) => setSectionRef(el, 0)}>
          <MainContent />
        </div>
      </SectionWrapper>

      {/* Sección 1: AboutMe */}
      <SectionWrapper index={1}>
        <div ref={(el) => setSectionRef(el, 1)}>
          <AboutMe />
        </div>
      </SectionWrapper>

      {/* Sección 2: Skills */}
      <SectionWrapper index={2}>
        <div ref={(el) => setSectionRef(el, 2)}>
          <Skills />
        </div>
      </SectionWrapper>

      {/* Sección 3: ContactMe */}
      <SectionWrapper index={3}>
        <div ref={(el) => setSectionRef(el, 3)}>
          <ContactMe />
        </div>
      </SectionWrapper>

      {/* Sección 4: Title */}
      <SectionWrapper index={4}>
        <div ref={(el) => setSectionRef(el, 4)}>
          <Title />
        </div>
      </SectionWrapper>
    </main>
  );
};

export default HomePage;
