import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ProSidebarProvider } from "react-pro-sidebar";

const domain: string = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN || "";
const clientId: string = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID || "";
const audience: string = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE || "";

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    audience={audience}
    redirectUri={window.location.origin}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </Auth0Provider>
);
