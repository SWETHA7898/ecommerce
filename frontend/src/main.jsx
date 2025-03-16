import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App";
import "./index.css";
import StoreContextProvider from "./context/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter> {/* Wrap everything inside BrowserRouter */}
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
