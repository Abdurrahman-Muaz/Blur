import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { CompanyProvider } from "./context/CompanyContext.jsx";
import Companys from "../pages/Companys.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CompanyProvider>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Companys" element={<Companys />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CompanyProvider>
  </StrictMode>
);
