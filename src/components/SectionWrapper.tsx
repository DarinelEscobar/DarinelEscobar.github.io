// Path: src/components/SectionWrapper.tsx
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface SectionWrapperProps {
  children: React.ReactNode;
  index?: number;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, index = 0 }) => {
  // 1) Detectamos si está en viewport. threshold = 0.2 → 20% visible
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false, // Queremos que detecte cada vez
  });

  // 2) Cuando la sección entra en viewport, guardamos su índice.
  useEffect(() => {
    if (inView) {
      localStorage.setItem("activeSection", String(index));
    }
  }, [inView, index]);

  // 3) No agregamos animaciones globales
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
