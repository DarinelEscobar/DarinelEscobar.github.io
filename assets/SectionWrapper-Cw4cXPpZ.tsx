import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface SectionWrapperProps {
  children: React.ReactNode;
  index: number;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      localStorage.setItem("activeSection", String(index));
    }
  }, [inView, index]);

  return (
    <section
      ref={ref}
      className="relative flex justify-center items-center w-full h-screen snap-start"
    >
      {children}
    </section>
  );
};

export default SectionWrapper;