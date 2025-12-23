import React from "react";

type Options = {
  interceptTouchpad?: boolean; // if true, intercept all wheel deltas
  pixelThreshold?: number; // threshold to treat pixel-delta as chunky
  animationMs?: number; // duration to lock wheel inputs while animating
  backStrength?: number; // overshoot strength for easeOutBack
};

/**
 * Normalizes mouse wheel into smooth, page-by-page scrolling between full-screen sections.
 * - Only intercepts "chunky" deltas (typical mouse wheels) by default.
 * - Leaves touchpads/touch with fine-grained deltas to native behavior.
 */
export function usePageWheelScroll(
  containerRef: React.RefObject<HTMLElement>,
  sectionRefs: React.MutableRefObject<HTMLElement[]>,
  options: Options = {}
) {
  const {
    interceptTouchpad = false,
    pixelThreshold = 60,
    animationMs = 700,
    backStrength = 1.3,
  } = options;

  const isAnimatingRef = React.useRef(false);
  const lastDirectionRef = React.useRef<1 | -1 | 0>(0);
  const targetIndexRef = React.useRef<number | null>(null);
  // Cache viewport height to avoid reading clientHeight on every wheel (reflow)
  const viewportHeightRef = React.useRef(0);

  const animateTo = React.useCallback(
    (el: HTMLElement, to: number, duration: number, back = backStrength) => {
      const start = el.scrollTop;
      const change = to - start;
      const startTime = performance.now();

      // easeOutBack for a subtle bounce/overshoot
      const easeOutBack = (t: number) => {
        const c1 = back; // default ~1.3–1.7 for subtle to punchy
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };

      // Temporarily disable scroll-snap to avoid fighting the animation
      const prevSnap = (el.style as any).scrollSnapType;
      el.style.scrollSnapType = "none";

      return new Promise<void>((resolve) => {
        const step = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(1, elapsed / duration);
          const eased = easeOutBack(t);
          const next = start + change * eased;
          // Clamp to valid range
          const max = el.scrollHeight - el.clientHeight;
          el.scrollTop = Math.max(0, Math.min(max, next));
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            // Ensure we end exactly at target and restore snap
            el.scrollTop = Math.max(0, Math.min(max, to));
            el.style.scrollSnapType = prevSnap || "y mandatory";
            resolve();
          }
        };
        requestAnimationFrame(step);
      });
    },
    [backStrength]
  );

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect user accessibility setting
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Initialize cache
    viewportHeightRef.current = el.clientHeight;

    // Update cache on resize
    const updateViewport = () => {
      viewportHeightRef.current = el.clientHeight;
    };
    window.addEventListener("resize", updateViewport);

    const handleWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const isLineMode = e.deltaMode === 1;
      const isPageMode = e.deltaMode === 2;
      const isChunkyPixel = e.deltaMode === 0 && Math.abs(e.deltaY) >= pixelThreshold;

      const shouldIntercept = interceptTouchpad || isLineMode || isPageMode || isChunkyPixel;
      if (!shouldIntercept) return;

      // Avoid interfering with nested scrollable areas
      // OPTIMIZED: Removed heavy getComputedStyle check.
      // Relies on scrollHeight > clientHeight check which is cheaper (though still triggers layout).
      const target = e.target as HTMLElement | null;
      if (target) {
        let node: HTMLElement | null = target;
        while (node && node !== el) {
           // Simple heuristic: if content is significantly larger than view, assumes scrollable.
          if (node.scrollHeight > node.clientHeight + 1) {
             // We could check getComputedStyle(node).overflowY here but it forces heavy reflow.
             // For now we assume if it has overflow content, we let it scroll.
             return;
          }
          node = node.parentElement;
        }
      }

      e.preventDefault();

      const viewport = viewportHeightRef.current; // Use cached value
      const total = sectionRefs.current.length;
      if (viewport <= 0 || total === 0) return;

      const direction = Math.sign(e.deltaY) as 1 | -1 | 0;
      const scrollTop = el.scrollTop; // Triggers reflow but necessary for current position
      const currentIndex = Math.round(scrollTop / viewport);
      let nextIndex = currentIndex + (direction > 0 ? 1 : -1);
      nextIndex = Math.max(0, Math.min(total - 1, nextIndex));

      if (nextIndex === currentIndex) return;

      const intensity = Math.min(1, Math.abs(e.deltaY) / 240);
      const duration = Math.max(400, Math.round(animationMs - intensity * 200));
      const back = Math.min(1.9, backStrength + intensity * 0.4);

      const run = (toIndex: number) => {
        isAnimatingRef.current = true;
        lastDirectionRef.current = direction || 1;
        targetIndexRef.current = toIndex;
        const targetTop = toIndex * viewport;
        animateTo(el, targetTop, duration, back).finally(() => {
          isAnimatingRef.current = false;
        });
      };

      run(nextIndex);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel as EventListener);
      window.removeEventListener("resize", updateViewport);
    };
  }, [containerRef, sectionRefs, interceptTouchpad, pixelThreshold, animationMs, animateTo, backStrength]);
}
