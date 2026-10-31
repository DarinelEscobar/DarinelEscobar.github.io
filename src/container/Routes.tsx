import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "@/pages/Home/HomePage";
import Contact from "@/pages/Contact/Contact";
import Project from "@/pages/Project/Project";

export default function AppRoutes() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/Contact" element={<Contact />} />
    <Route path="/Project" element={<Project />} />
  </Routes>;
}
