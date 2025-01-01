// Path: src/components/SectionWrapper.tsx
import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  index?: number;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children }) => {
  return (
    <section
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
