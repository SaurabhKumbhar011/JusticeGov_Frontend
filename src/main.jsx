import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ✅ Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// ✅ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  </React.StrictMode>
);