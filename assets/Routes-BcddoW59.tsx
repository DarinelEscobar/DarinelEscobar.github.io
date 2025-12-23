import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense, lazy } from "react";

// Lazy load the components
const HomePage = lazy(() => import("@/pages/Home/HomePage"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const Project = lazy(() => import("@/pages/Project/Project"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-whi dark:bg-dar text-dar dark:text-whi">
    <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
  </div>
);

export default function AppRoutes() {
  const location = useLocation();

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
            if (mainContainer) {
              mainContainer.scrollTo(0, 0);
            }
          }
        },
      },
    },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/Contact"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Contact />
              </motion.div>
            }
          />
          <Route
            path="/Project"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Project />
              </motion.div>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
