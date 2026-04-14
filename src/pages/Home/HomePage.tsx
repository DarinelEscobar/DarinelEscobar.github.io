import React, { lazy, useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import MainContent from "./MainContent";
import DeferredSection from "@/components/DeferredSection";
import SectionWrapper from "@/components/SectionWrapper";
import useMediaQuery from "@/hooks/useMediaQuery";
import { usePageWheelScroll } from "@/hooks/usePageWheelScroll";

const AboutMe = lazy(() => import("./AboutMe"));
const Projects = lazy(() => import("@/components/Projects/Projects"));
const Skills = lazy(() => import("./Skills"));
const ContactMe = lazy(() => import("@/components/ContactMe/ContactMe"));
const Title = lazy(() => import("./Title"));

const HOME_SECTION_COUNT = 6;

const getSavedSectionIndex = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  const savedIndex = window.localStorage.getItem("activeSection");
  const parsedIndex = Number.parseInt(savedIndex ?? "0", 10);

  if (Number.isNaN(parsedIndex)) {
    return 0;
  }

  return Math.max(0, Math.min(HOME_SECTION_COUNT - 1, parsedIndex));
};

const HomePage: React.FC = () => {
  const sectionRefs = useRef<HTMLElement[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);
  const savedSectionIndexRef = useRef(getSavedSectionIndex());
  const savedSectionIndex = savedSectionIndexRef.current;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (savedSectionIndex === 0) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      sectionRefs.current[savedSectionIndex]?.scrollIntoView({ behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [savedSectionIndex]);
  usePageWheelScroll(
    containerRef,
    sectionRefs,
    {
      enabled: isDesktop,
      interceptTouchpad: false,
      pixelThreshold: 60,
      animationMs: 480,
      wheelCooldownMs: 260,
      snapDelayMs: 140,
      triggerLine: 0.35,
      freeScrollIndices: [2],
    }
  );

  const setSectionRef = (el: HTMLElement | null, index: number) => {
    if (el) {
      sectionRefs.current[index] = el;
    }
  };

  return (
    <main
      id="main-container"
      className={`Container w-screen bg-whi pt-[env(safe-area-inset-top)] text-dar ${
        isDesktop
          ? "h-[100dvh] overflow-auto overscroll-y-contain"
          : "min-h-screen overflow-visible"
      }`}
      ref={(el) => {
        if (el) containerRef.current = el;
      }}
    >
      <Header />

      <SectionWrapper index={0} sectionRef={(el) => setSectionRef(el, 0)}>
        <MainContent />
      </SectionWrapper>

      <DeferredSection
        index={1}
        initiallyReady={savedSectionIndex >= 1}
        sectionRef={(el) => setSectionRef(el, 1)}
      >
        <AboutMe />
      </DeferredSection>

      <DeferredSection
        index={2}
        initiallyReady={savedSectionIndex >= 2}
        sectionRef={(el) => setSectionRef(el, 2)}
        fullHeight={false}
        className="items-start"
      >
        <Projects layoutMode="section" />
      </DeferredSection>

      <DeferredSection
        index={3}
        initiallyReady={savedSectionIndex >= 3}
        sectionRef={(el) => setSectionRef(el, 3)}
      >
        <Skills />
      </DeferredSection>

      <DeferredSection
        index={4}
        initiallyReady={savedSectionIndex >= 4}
        sectionRef={(el) => setSectionRef(el, 4)}
      >
        <ContactMe />
      </DeferredSection>

      <DeferredSection
        index={5}
        initiallyReady={savedSectionIndex >= 5}
        sectionRef={(el) => setSectionRef(el, 5)}
      >
        <Title />
      </DeferredSection>
    </main>
  );
};

export default HomePage;
