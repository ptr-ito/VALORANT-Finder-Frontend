import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "components/layouts/Header";
import Post from "components/pages/Post";
import { Router } from "router/Router";

const App = () => {
  return (
    <>
      <Router />
    </>
  );
};

export default App;
