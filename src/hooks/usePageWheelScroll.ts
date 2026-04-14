import React from "react";

type Options = {
  enabled?: boolean;
  interceptTouchpad?: boolean;
  pixelThreshold?: number;
  animationMs?: number;
  wheelCooldownMs?: number;
  snapDelayMs?: number;
  triggerLine?: number;
  freeScrollIndices?: number[];
};

type SectionPosition = {
  index: number;
  top: number;
  bottom: number;
};

const SCROLL_EDGE_THRESHOLD = 1;

function getSectionPositions(sectionRefs: React.MutableRefObject<HTMLElement[]>) {
  return sectionRefs.current
    .map((section, index) => ({ section, index }))
    .filter((entry): entry is { section: HTMLElement; index: number } => Boolean(entry.section))
    .map(
      ({ section, index }): SectionPosition => ({
        index,
        top: section.offsetTop,
        bottom: section.offsetTop + section.offsetHeight,
      })
    );
}

function getNearestSectionIndex(scrollTop: number, sections: SectionPosition[]) {
  let nearestIndex = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  sections.forEach((section, index) => {
    const distance = Math.abs(section.top - scrollTop);

    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}

function getSectionRangeIndex(scrollTop: number, sections: SectionPosition[]) {
  for (let index = 0; index < sections.length; index += 1) {
    const nextTop = sections[index + 1]?.top ?? Number.POSITIVE_INFINITY;

    if (scrollTop >= sections[index].top && scrollTop < nextTop) {
      return index;
    }
  }

  return getNearestSectionIndex(scrollTop, sections);
}

function findNestedScrollable(
  target: HTMLElement | null,
  container: HTMLElement,
  direction: 1 | -1
) {
  let node = target;

  while (node && node !== container) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY || style.overflow;
    const isScrollable =
      /(auto|scroll|overlay)/.test(overflowY) && node.scrollHeight > node.clientHeight + 1;

    if (isScrollable) {
      const maxScrollTop = node.scrollHeight - node.clientHeight;
      const canScrollDown = node.scrollTop < maxScrollTop - SCROLL_EDGE_THRESHOLD;
      const canScrollUp = node.scrollTop > SCROLL_EDGE_THRESHOLD;

      if ((direction > 0 && canScrollDown) || (direction < 0 && canScrollUp)) {
        return node;
      }

      return null;
    }

    node = node.parentElement;
  }

  return null;
}

function resolveSnapTarget(
  scrollTop: number,
  sections: SectionPosition[],
  direction: 1 | -1 | 0,
  triggerLine: number,
  freeScrollIndices: number[]
) {
  if (sections.length === 0) {
    return null;
  }

  const sectionIndex = getSectionRangeIndex(scrollTop, sections);
  const currentSection = sections[sectionIndex];
  if (freeScrollIndices.includes(currentSection.index)) {
    return null;
  }

  const previousSection = sections[sectionIndex - 1];
  const nextSection = sections[sectionIndex + 1];

  if (direction > 0 && nextSection) {
    if (freeScrollIndices.includes(nextSection.index)) {
      return currentSection.top;
    }

    const gap = Math.max(1, nextSection.top - currentSection.top);
    const progress = (scrollTop - currentSection.top) / gap;

    return progress >= 1 - triggerLine ? nextSection.top : currentSection.top;
  }

  if (direction < 0 && previousSection) {
    if (freeScrollIndices.includes(previousSection.index)) {
      return currentSection.top;
    }

    const gap = Math.max(1, currentSection.top - previousSection.top);
    const progress = (scrollTop - previousSection.top) / gap;

    return progress <= triggerLine ? previousSection.top : currentSection.top;
  }

  return sections[getNearestSectionIndex(scrollTop, sections)].top;
}

/**
 * Normalizes desktop navigation between full-screen sections.
 * - Mouse wheels snap one section at a time.
 * - Touchpads keep native scrolling, then settle to the nearest section.
 * - Nested scroll areas keep working until they reach an edge.
 */
export function usePageWheelScroll(
  containerRef: React.RefObject<HTMLElement>,
  sectionRefs: React.MutableRefObject<HTMLElement[]>,
  options: Options = {}
) {
  const {
    enabled = true,
    interceptTouchpad = false,
    pixelThreshold = 60,
    animationMs = 480,
    wheelCooldownMs = 260,
    snapDelayMs = 140,
    triggerLine = 0.35,
    freeScrollIndices = [],
  } = options;

  const isAnimatingRef = React.useRef(false);
  const lastDirectionRef = React.useRef<1 | -1 | 0>(0);
  const animationFrameRef = React.useRef<number | null>(null);
  const scrollTimeoutRef = React.useRef<number | null>(null);
  const lockUntilRef = React.useRef(0);
  const lastScrollTopRef = React.useRef(0);

  const animateTo = React.useCallback((container: HTMLElement, targetTop: number, duration: number) => {
    const maxScrollTop = Math.max(0, container.scrollHeight - container.clientHeight);
    const clampedTargetTop = Math.max(0, Math.min(maxScrollTop, targetTop));
    const startTop = container.scrollTop;
    const delta = clampedTargetTop - startTop;

    if (Math.abs(delta) < 2) {
      container.scrollTop = clampedTargetTop;
      lastScrollTopRef.current = clampedTargetTop;
      return Promise.resolve();
    }

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    return new Promise<void>((resolve) => {
      const startTime = performance.now();
      const easeOutQuint = (progress: number) => 1 - Math.pow(1 - progress, 5);

      const step = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const nextTop = startTop + delta * easeOutQuint(progress);

        container.scrollTop = nextTop;
        lastScrollTopRef.current = nextTop;

        if (progress < 1) {
          animationFrameRef.current = window.requestAnimationFrame(step);
          return;
        }

        container.scrollTop = clampedTargetTop;
        lastScrollTopRef.current = clampedTargetTop;
        animationFrameRef.current = null;
        resolve();
      };

      animationFrameRef.current = window.requestAnimationFrame(step);
    });
  }, []);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    lastScrollTopRef.current = container.scrollTop;

    const snapToTop = (targetTop: number, lockMs: number) => {
      isAnimatingRef.current = true;
      lockUntilRef.current = performance.now() + lockMs;

      animateTo(container, targetTop, animationMs).finally(() => {
        isAnimatingRef.current = false;
      });
    };

    const snapToAdjacentSection = (direction: 1 | -1) => {
      const sections = getSectionPositions(sectionRefs);

      if (sections.length === 0) {
        return;
      }

      const currentIndex = getSectionRangeIndex(container.scrollTop, sections);
      if (freeScrollIndices.includes(sections[currentIndex].index)) {
        return;
      }

      const nextIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentIndex + (direction > 0 ? 1 : -1))
      );

      if (nextIndex === currentIndex) {
        return;
      }

      lastDirectionRef.current = direction;
      snapToTop(sections[nextIndex].top, animationMs + wheelCooldownMs);
    };

    const scheduleSnap = () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        if (isAnimatingRef.current || performance.now() < lockUntilRef.current) {
          return;
        }

        const sections = getSectionPositions(sectionRefs);
        const targetTop = resolveSnapTarget(
          container.scrollTop,
          sections,
          lastDirectionRef.current,
          triggerLine,
          freeScrollIndices
        );

        if (targetTop === null || Math.abs(targetTop - container.scrollTop) < 2) {
          return;
        }

        snapToTop(targetTop, animationMs / 2);
      }, snapDelayMs);
    };

    const handleWheel = (event: WheelEvent) => {
      if (isAnimatingRef.current || performance.now() < lockUntilRef.current) {
        event.preventDefault();
        return;
      }

      const isLineMode = event.deltaMode === 1;
      const isPageMode = event.deltaMode === 2;
      const isChunkyPixel = event.deltaMode === 0 && Math.abs(event.deltaY) >= pixelThreshold;
      const shouldIntercept = interceptTouchpad || isLineMode || isPageMode || isChunkyPixel;

      if (!shouldIntercept) {
        return;
      }

      const direction = Math.sign(event.deltaY) as 1 | -1 | 0;
      if (!direction) {
        return;
      }

      const sections = getSectionPositions(sectionRefs);
      if (sections.length === 0) {
        return;
      }

      const currentIndex = getSectionRangeIndex(container.scrollTop, sections);
      if (freeScrollIndices.includes(sections[currentIndex].index)) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (findNestedScrollable(target, container, direction)) {
        return;
      }

      event.preventDefault();
      snapToAdjacentSection(direction);
    };

    const handleScroll = () => {
      if (!isAnimatingRef.current) {
        const delta = container.scrollTop - lastScrollTopRef.current;

        if (Math.abs(delta) > 0.5) {
          lastDirectionRef.current = delta > 0 ? 1 : -1;
        }
      }

      lastScrollTopRef.current = container.scrollTop;
      scheduleSnap();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel as EventListener);
      container.removeEventListener("scroll", handleScroll as EventListener);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [
    animationMs,
    animateTo,
    containerRef,
    enabled,
    interceptTouchpad,
    pixelThreshold,
    freeScrollIndices,
    sectionRefs,
    snapDelayMs,
    triggerLine,
    wheelCooldownMs,
  ]);
}
