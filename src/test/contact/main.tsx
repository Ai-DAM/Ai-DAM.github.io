import React from "react";
import ReactDOM from "react-dom/client";
import ContactTestPage from "./ContactTestPage";
import "../shared/test-page.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContactTestPage />
  </React.StrictMode>
);
