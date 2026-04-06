import React, { lazy, useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import MainContent from "./MainContent";
import DeferredSection from "@/components/DeferredSection";
import SectionWrapper from "@/components/SectionWrapper";
import { usePageWheelScroll } from "@/hooks/usePageWheelScroll";

const AboutMe = lazy(() => import("./AboutMe"));
const Projects = lazy(() => import("@/components/Projects/Projects"));
const Skills = lazy(() => import("./Skills"));
const ContactMe = lazy(() => import("@/components/ContactMe/ContactMe"));
const Title = lazy(() => import("./Title"));

const getSavedSectionIndex = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  const savedIndex = window.localStorage.getItem("activeSection");
  const parsedIndex = Number.parseInt(savedIndex ?? "0", 10);

  if (Number.isNaN(parsedIndex)) {
    return 0;
  }

  return Math.max(0, Math.min(5, parsedIndex));
};

const HomePage: React.FC = () => {
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);
  const savedSectionIndexRef = useRef(getSavedSectionIndex());
  const savedSectionIndex = savedSectionIndexRef.current;

  useEffect(() => {
    if (savedSectionIndex === 0) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      sectionRefs.current[savedSectionIndex]?.scrollIntoView({ behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [savedSectionIndex]);

  // Normalize mouse wheel into smooth, page-by-page scroll
  usePageWheelScroll(
    containerRef as React.RefObject<HTMLElement>,
    sectionRefs as unknown as React.MutableRefObject<HTMLElement[]>,
    {
      interceptTouchpad: false,
      pixelThreshold: 60,
      animationMs: 500,
      backStrength: 1.0,
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
      className="Container h-[100dvh] w-screen overflow-auto overscroll-y-contain bg-whi pt-[env(safe-area-inset-top)] text-dar scroll-smooth snap-y snap-mandatory"
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

      <DeferredSection index={1} initiallyReady={savedSectionIndex >= 1}>
        <div ref={(el) => setSectionRef(el, 1)}>
          <AboutMe />
        </div>
      </DeferredSection>

      <DeferredSection index={2} initiallyReady={savedSectionIndex >= 2}>
        <div ref={(el) => setSectionRef(el, 2)}>
          <Projects />
        </div>
      </DeferredSection>

      <DeferredSection index={3} initiallyReady={savedSectionIndex >= 3}>
        <div ref={(el) => setSectionRef(el, 3)}>
          <Skills />
        </div>
      </DeferredSection>

      <DeferredSection index={4} initiallyReady={savedSectionIndex >= 4}>
        <div ref={(el) => setSectionRef(el, 4)}>
          <ContactMe />
        </div>
      </DeferredSection>

      <DeferredSection index={5} initiallyReady={savedSectionIndex >= 5}>
        <div ref={(el) => setSectionRef(el, 5)}>
          <Title />
        </div>
      </DeferredSection>
    </main>
  );
};

export default HomePage;
