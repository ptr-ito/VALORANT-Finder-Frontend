import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "components/layouts/Header";
import { Router } from "router/Router";
import SideBar from "components/layouts/SideBar";

const App = () => {
  return (
    <>
      <Router />
      <SideBar />
    </>
  );
};

export default App;
