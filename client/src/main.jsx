import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./View/Home/Home.jsx";
import Petdetails from "./Components/Petdetails.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pet/:id" element={<Petdetails />} />
    </Routes>
  </BrowserRouter>
);
