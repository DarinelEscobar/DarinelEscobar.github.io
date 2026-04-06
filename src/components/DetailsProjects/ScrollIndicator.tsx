import React from "react";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollIndicatorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onClick: () => void;
  text?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  containerRef,
  onClick,
  text = "Scroll to continue",
}) => {
  const { scrollY } = useScroll({ container: containerRef });

  const opacity = useTransform(scrollY, [0, 90, 180], [1, 0.55, 0]);
  const y = useTransform(scrollY, [0, 180], [0, 10]);

  return (
    <motion.button
      type="button"
      aria-label={text}
      onClick={onClick}
      style={{ opacity, y }}
      className="bottom-6 left-1/2 z-40 fixed flex flex-col items-center gap-2 -translate-x-1/2 text-dar/60 hover:text-dar/85 drop-shadow-[0_2px_12px_rgba(255,255,255,0.32)] transition-colors dark:text-whi/72 dark:hover:text-whi/92 dark:drop-shadow-[0_2px_16px_rgba(0,0,0,0.78)]"
    >
      <span className="font-rob text-[11px] uppercase tracking-[0.34em]">
        {text}
      </span>

      <div className="flex flex-col items-center">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>

        <motion.div
          className="-mt-2"
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.1,
            delay: 0.15,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ScrollIndicator;
