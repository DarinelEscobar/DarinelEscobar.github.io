import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface SectionWrapperProps {
  children: React.ReactNode;
  index: number;
  sectionRef?: (element: HTMLElement | null) => void;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, index, sectionRef }) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      localStorage.setItem("activeSection", String(index));
    }
  }, [inView, index]);

  const setRefs = React.useCallback(
    (element: HTMLElement | null) => {
      ref(element);
      sectionRef?.(element);
    },
    [ref, sectionRef]
  );

  return (
    <section
      ref={setRefs}
      className="relative flex min-h-screen min-h-[100dvh] w-full items-center justify-center overflow-x-hidden"
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
