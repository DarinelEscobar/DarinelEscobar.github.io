import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "@/assets/styles/globals.css";
import { LanguageProvider } from "@/context/LanguageProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </LanguageProvider>
  </StrictMode>
);
