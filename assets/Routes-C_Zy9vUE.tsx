import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "@/pages/Home/HomePage";
import Contact from "@/pages/Contact/Contact";
import Project from "@/pages/Project/Project";

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
          if (savedIndex && location.pathname === "/") {
            const mainContainer = document.getElementById('main-container');
            if (mainContainer) {
              mainContainer.scrollTo(0, 0);
            }
          }
        }
      }
    },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <AnimatePresence mode="wait">
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
    </AnimatePresence>
  );
}