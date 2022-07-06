import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesScreen from "./Views/Categories/CategoriesScreen";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/categorias/:idCategory" element={<CategoriesScreen />} />
    </Routes>
  </Router>
);
