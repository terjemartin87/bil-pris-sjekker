import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarSearch from "./search";  // 🔍 Endre til din faktiske søkeside
import CarDetails from "./CarDetails"; // 🚗 Endre til din detaljer-side

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<CarSearch />} /> {/* Hovedsiden (søkesiden) */}
        <Route path="/bil/:kjennemerke" element={<CarDetails />} /> {/* Detaljer */}
        <Route path="*" element={<h1>❌ Denne siden finnes ikke</h1>} /> {/* 404-side */}
      </Routes>
    </Router>
  </React.StrictMode>
);