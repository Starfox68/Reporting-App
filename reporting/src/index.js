import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CustomForm from "./customForm";
import SummaryPage from "./summaryPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="form" element={<CustomForm />} />
      <Route path="summary" element={<SummaryPage />} />
    </Routes>
  </BrowserRouter>
);
