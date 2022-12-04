import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeOptions } from "./theme";
import { SWRConfig } from "swr";
import swrConfig from "./lib/swrConfig";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SWRConfig value={swrConfig}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={themeOptions}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>
);
