import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense, lazy, useEffect, useRef } from "react";
import HomePage from "@/pages/Home/HomePage";
import { routeFade } from "@/lib/motionPresets";

const Contact = lazy(() => import("@/pages/Contact/Contact"));
const Project = lazy(() => import("@/pages/Project/Project"));

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-whi text-dar">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--cobalt))] border-t-transparent" />
  </div>
);

export default function AppRoutes() {
  const location = useLocation();
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  const handleRouteAnimationComplete = () => {
    const savedIndex = localStorage.getItem("activeSection");
    if (!savedIndex && location.pathname === "/") {
      const mainContainer = document.getElementById("main-container");
      if (mainContainer && mainContainer.scrollHeight > mainContainer.clientHeight + 1) {
        mainContainer.scrollTo(0, 0);
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }
  };

  const renderAnimatedPage = (page: React.ReactNode, useFallback = false) => {
    const animatedPage = (
      <motion.div
        variants={routeFade}
        initial={isFirstRenderRef.current ? false : "initial"}
        animate="animate"
        exit="exit"
        onAnimationComplete={handleRouteAnimationComplete}
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
