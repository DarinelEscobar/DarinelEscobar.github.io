import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface SectionWrapperProps {
  children: React.ReactNode;
  index: number;
  sectionRef?: (el: HTMLElement | null) => void;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  index,
  sectionRef,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: false,
  });

  const setRefs = (el: HTMLElement | null) => {
    ref(el);
    if (sectionRef) sectionRef(el);
  };

  useEffect(() => {
    if (inView) {
      localStorage.setItem("activeSection", String(index));
    }
  }, [inView, index]);

  return (
    <section
      ref={setRefs}
      className="relative flex justify-center items-center w-full h-screen snap-start"
    >
      {children}
    </section>
  );
};

export default SectionWrapper;