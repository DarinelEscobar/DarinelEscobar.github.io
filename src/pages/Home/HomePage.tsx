import React, { useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import Projects from "@/components/Projects/Projects";
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
        transition-colors
        duration-100
        ease-in-out
      "
      style={{ scrollSnapType: "y mandatory", overscrollBehavior: "none" }}
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
      <Projects/>
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
