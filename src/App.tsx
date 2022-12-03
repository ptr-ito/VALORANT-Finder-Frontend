import { useEffect } from "react";
import Routers from "router/Routers";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ForceRemountProvider } from "contexts/ForceRemountContext";
const App = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routers />
      </BrowserRouter>
    </>
  );
};

export default App;
