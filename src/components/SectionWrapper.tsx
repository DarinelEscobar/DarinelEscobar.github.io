// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\components\SectionWrapper.tsx
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface SectionWrapperProps {
  children: React.ReactNode;
  index?: number;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, index = 0 }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      // guardamos en localStorage SOLO si no es la sección 0
      if (index !== 0) {
        localStorage.setItem("activeSection", String(index));
      } else {
        // O, si prefieres, puedes guardar 0 para la principal
        // localStorage.setItem("activeSection", "0");
      }
    }
  }, [inView, index]);

  return (
    <section
      ref={ref}
      className="
        snap-start
        w-full
        h-screen
        flex
        items-center
        justify-center
        relative
      "
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
