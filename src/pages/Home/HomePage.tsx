// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\pages\Home\HomePage.tsx

import React, { useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import MainContent from "./MainContent";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Title from "./Title";
import ContactMe from "@/components/ContactMe/ContactMe";

// Importamos SectionWrapper
import SectionWrapper from "@/components/SectionWrapper";

const HomePage: React.FC = () => {
  // Para poder “scrollear” a la sección, tendremos refs a cada SectionWrapper
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  // Al montar, leemos el localStorage y hacemos scroll a la sección guardada
  useEffect(() => {
    const savedIndex = localStorage.getItem("activeSection");
    if (savedIndex && sectionRefs.current[+savedIndex]) {
      sectionRefs.current[+savedIndex].scrollIntoView({ behavior: "auto" });
    }
  }, []);

  // Callback para asignar refs
  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      sectionRefs.current[index] = el;
    }
  };

  return (
    <>
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

        {/*
          A cada SectionWrapper le pasamos:
          - index: para identificarlo
          - ref: para poder hacer scroll con .scrollIntoView
        */}
        <SectionWrapper index={0}>
          <div ref={(el) => setSectionRef(el, 0)}>
            <MainContent />
          </div>
        </SectionWrapper>

        <SectionWrapper index={1}>
          <div ref={(el) => setSectionRef(el, 1)}>
            <AboutMe />
          </div>
        </SectionWrapper>

        <SectionWrapper index={2}>
          <div ref={(el) => setSectionRef(el, 2)}>
            <Skills />
          </div>
        </SectionWrapper>

        <SectionWrapper index={3}>
          <div ref={(el) => setSectionRef(el, 3)}>
            <ContactMe />
          </div>
        </SectionWrapper>

        <SectionWrapper index={4}>
          <div ref={(el) => setSectionRef(el, 4)}>
            <Title />
          </div>
        </SectionWrapper>
      </main>
    </>
  );
};

export default HomePage;
