import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense, lazy, useEffect, useRef } from "react";
import HomePage from "@/pages/Home/HomePage";

const Contact = lazy(() => import("@/pages/Contact/Contact"));
const Project = lazy(() => import("@/pages/Project/Project"));

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-whi text-dar">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
  </div>
);

export default function AppRoutes() {
  const location = useLocation();
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        onComplete: () => {
          const savedIndex = localStorage.getItem("activeSection");
          if (!savedIndex && location.pathname === "/") {
            const mainContainer = document.getElementById("main-container");
            if (mainContainer && mainContainer.scrollHeight > mainContainer.clientHeight + 1) {
              mainContainer.scrollTo(0, 0);
            } else {
              window.scrollTo({ top: 0, behavior: "auto" });
            }
          }
        },
      },
    },
    exit: { opacity: 0, x: -50 },
  };

  const renderAnimatedPage = (page: React.ReactNode, useFallback = false) => {
    const animatedPage = (
      <motion.div
        variants={pageVariants}
        initial={isFirstRenderRef.current ? false : "initial"}
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {page}
      </motion.div>
    );

    if (!useFallback) {
      return animatedPage;
    }

    return <Suspense fallback={<LoadingFallback />}>{animatedPage}</Suspense>;
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={renderAnimatedPage(<HomePage />)} />
        <Route path="/Contact" element={renderAnimatedPage(<Contact />, true)} />
        <Route path="/Project" element={renderAnimatedPage(<Project />, true)} />
      </Routes>
    </AnimatePresence>
  );
}
