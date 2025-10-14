import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("@/pages/Home/HomePage"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const Project = lazy(() => import("@/pages/Project/Project"));

export default function AppRoutes() {
  const location = useLocation();

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const pageVariants = prefersReduced
    ? {
        initial: { opacity: 1, x: 0 },
        animate: { opacity: 1, x: 0, transition: { duration: 0 } },
        exit: { opacity: 1, x: 0 },
      }
    : {
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
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Suspense fallback={<div style={{padding: 24}}>Cargando…</div>}>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <HomePage />
              </motion.div>
            </Suspense>
          }
        />
        <Route
          path="/Contact"
          element={
            <Suspense fallback={<div style={{padding: 24}}>Cargando…</div>}>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Contact />
              </motion.div>
            </Suspense>
          }
        />
        <Route
          path="/Project"
          element={
            <Suspense fallback={<div style={{padding: 24}}>Cargando…</div>}>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Project />
              </motion.div>
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
