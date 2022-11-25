import { useEffect } from "react";
import Routers from "router/Routers";
import { BrowserRouter, useLocation } from "react-router-dom";
import DefaultLayout from "components/layouts/DefaultLayout";

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
        <DefaultLayout>
          <Routers />
        </DefaultLayout>
      </BrowserRouter>
    </>
  );
};

export default App;
