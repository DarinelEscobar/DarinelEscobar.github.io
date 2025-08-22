import { RefObject, MutableRefObject, useEffect } from "react";
import { animate } from "framer-motion";

function useSmoothScroll(
  containerRef: RefObject<HTMLDivElement>,
  sectionRefs: MutableRefObject<HTMLElement[]>
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isAnimating = false;

    const scrollToSection = (index: number) => {
      const target = sectionRefs.current[index];
      if (!target) return;

      isAnimating = true;
      animate(container.scrollTop, target.offsetTop, {
        type: "spring",
        stiffness: 60,
        damping: 20,
        bounce: 0.15,
        onUpdate: (latest) => {
          container.scrollTop = latest;
        },
        onComplete: () => {
          isAnimating = false;
        },
      });
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating) return;

      const direction = Math.sign(e.deltaY);
      const scrollPos = container.scrollTop;
      const rawIndex = sectionRefs.current.findIndex((section, idx) => {
        const next = sectionRefs.current[idx + 1];
        return scrollPos >= section.offsetTop && (!next || scrollPos < next.offsetTop);
      });
      const currentIndex = rawIndex === -1 ? 0 : rawIndex;
      let nextIndex = currentIndex + direction;
      nextIndex = Math.max(0, Math.min(nextIndex, sectionRefs.current.length - 1));
      if (nextIndex !== currentIndex) {
        scrollToSection(nextIndex);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [containerRef, sectionRefs]);
}

export default useSmoothScroll;

