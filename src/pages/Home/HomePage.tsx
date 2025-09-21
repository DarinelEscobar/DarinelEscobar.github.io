import React, { useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import Projects from "@/components/Projects/Projects";
import MainContent from "./MainContent";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Title from "./Title";
import ContactMe from "@/components/ContactMe/ContactMe";
import SectionWrapper from "@/components/SectionWrapper";
import { usePageWheelScroll } from "@/hooks/usePageWheelScroll";

const HomePage: React.FC = () => {
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const savedIndex = localStorage.getItem("activeSection");
    if (savedIndex && savedIndex !== "0") {
      const idx = parseInt(savedIndex, 10);
      if (!isNaN(idx) && sectionRefs.current[idx]) {
        sectionRefs.current[idx].scrollIntoView({ behavior: "auto" });
      }
    }
  }, []);

  // Normalize mouse wheel into smooth, page-by-page scroll
  usePageWheelScroll(
    containerRef as React.RefObject<HTMLElement>,
    sectionRefs as unknown as React.MutableRefObject<HTMLElement[]>,
    {
      interceptTouchpad: false,
      pixelThreshold: 60,
      animationMs: 800,
      backStrength: 1.4,
      maxQueue: 2,
    }
  );

  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      sectionRefs.current[index] = el;
    }
  };

  return (
    <main
      id="main-container"
      // Se agrega pt-[env(safe-area-inset-top)] para que el contenido no inicie detrás del header sticky
      className="pt-[env(safe-area-inset-top)] bg-whi w-[100vw] h-screen overflow-auto overscroll-y-contain text-dar transition-colors duration-100 ease-in-out scroll-smooth snap-mandatory snap-y Container"
      style={{ scrollSnapType: "y mandatory" }}
      ref={(el) => {
        if (el) containerRef.current = el;
      }}
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
        <div ref={(el) => setSectionRef(el, 2)}>
          <Projects />
        </div>
      </SectionWrapper>

      <SectionWrapper index={3}>
        <div ref={(el) => setSectionRef(el, 3)}>
          <Skills />
        </div>
      </SectionWrapper>

      <SectionWrapper index={4}>
        <div ref={(el) => setSectionRef(el, 4)}>
          <ContactMe />
        </div>
      </SectionWrapper>

      <SectionWrapper index={5}>
        <div ref={(el) => setSectionRef(el, 5)}>
          <Title />
        </div>
      </SectionWrapper>
    </main>
  );
};

export default HomePage;
