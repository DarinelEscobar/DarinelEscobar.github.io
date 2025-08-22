import React, { useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import Projects from "@/components/Projects/Projects";
import MainContent from "./MainContent";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Title from "./Title";
import ContactMe from "@/components/ContactMe/ContactMe";
import SectionWrapper from "@/components/SectionWrapper";
import useSmoothScroll from "@/hooks/useSmoothScroll";

const HomePage: React.FC = () => {
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useSmoothScroll(containerRef, sectionRefs);

  useEffect(() => {
    const savedIndex = localStorage.getItem("activeSection");
    if (savedIndex && savedIndex !== "0") {
      const idx = parseInt(savedIndex, 10);
      if (!isNaN(idx) && sectionRefs.current[idx]) {
        sectionRefs.current[idx].scrollIntoView({ behavior: "auto" });
      }
    }
  }, []);

  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      sectionRefs.current[index] = el;
    }
  };

  return (
    <main
      id="main-container"
      ref={containerRef}
      // Se agrega pt-[env(safe-area-inset-top)] para que el contenido no inicie detrás del header sticky
      className="pt-[env(safe-area-inset-top)] bg-whi w-[100vw] h-screen overflow-auto text-dar transition-colors duration-100 ease-in-out scroll-smooth snap-mandatory snap-y Container"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <Header />

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
        <div ref={(el) => setSectionRef(el, 5)}>
          <Projects />
        </div>
      </SectionWrapper>

      <SectionWrapper index={3}>
        <div ref={(el) => setSectionRef(el, 2)}>
          <Skills />
        </div>
      </SectionWrapper>

      <SectionWrapper index={4}>
        <div ref={(el) => setSectionRef(el, 3)}>
          <ContactMe />
        </div>
      </SectionWrapper>

      <SectionWrapper index={5}>
        <div ref={(el) => setSectionRef(el, 4)}>
          <Title />
        </div>
      </SectionWrapper>
    </main>
  );
};

export default HomePage;
