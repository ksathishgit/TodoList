import React from "react";
import ReactDOM from "react-dom/client";
import App from "./views/App";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "react-toastify/dist/ReactToastify.css";
import "./styles/form.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <App />
    <ToastContainer position="top-right" autoClose={3000} />
  </LocalizationProvider>
);
