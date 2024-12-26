import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/Home/HomePage";
import Page2 from "@/pages/Page2/Page2";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/page2" element={<Page2 />} />
    </Routes>
  );
}
