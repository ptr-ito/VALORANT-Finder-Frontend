import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { theme } from "components/util/theme";
import { ThemeProvider } from "@mui/material/styles";
import { analytics } from "lib/production/Firebase";
import { Helmet, HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

// if (import.meta.env.PROD === true) {
//   analytics;
// }

root.render(
  <ThemeProvider theme={theme}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ThemeProvider>
);
