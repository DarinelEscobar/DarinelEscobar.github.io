import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "@/pages/Home/HomePage";
import Contact from "@/pages/Contact/Contact";
import Project from "@/pages/Project/Project";

export default function AppRoutes() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else if (navigationType !== "POP") {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
  }, [pathname, hash, navigationType]);

  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Project" element={<Project />} />
      </Routes>
  );
}
