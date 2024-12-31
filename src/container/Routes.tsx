import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/Home/HomePage";
import Contact from "@/pages/Contact/contact"
import Page2 from "@/pages/Page2/Page2";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/page2" element={<Page2 />} />
    </Routes>
  );
}
