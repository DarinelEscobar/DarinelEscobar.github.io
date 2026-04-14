import React, { Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "./SectionWrapper";

interface DeferredSectionProps {
  children: React.ReactNode;
  index: number;
  initiallyReady?: boolean;
  sectionRef?: (element: HTMLElement | null) => void;
  fullHeight?: boolean;
  className?: string;
}

const DeferredSection: React.FC<DeferredSectionProps> = ({
  children,
  index,
  initiallyReady = false,
  sectionRef,
  fullHeight = true,
  className,
}) => {
  const [isReady, setIsReady] = useState(initiallyReady);
  const { ref, inView } = useInView({
    rootMargin: "25% 0px",
    triggerOnce: true,
  });

  useEffect(() => {
    if (initiallyReady || inView) {
      setIsReady(true);
    }
  }, [inView, initiallyReady]);

  return (
    <SectionWrapper
      index={index}
      sectionRef={sectionRef}
      fullHeight={fullHeight}
      className={className}
    >
      <div ref={ref} className="w-full">
        {isReady ? (
          <Suspense fallback={<div aria-hidden="true" className="min-h-screen min-h-[100dvh] w-full bg-whi" />}>
            {children}
          </Suspense>
        ) : null}
      </div>
    </SectionWrapper>
  );
};

export default DeferredSection;
