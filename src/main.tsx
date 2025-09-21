import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "@/assets/styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);

// Idle-time warmup of secondary routes for snappier navigation
const idle = (cb: () => void) =>
  ("requestIdleCallback" in window
    ? (window as any).requestIdleCallback(cb)
    : setTimeout(cb, 1200));

idle(() => {
  import("@/pages/Contact/Contact");
  import("@/pages/Project/Project");
});
