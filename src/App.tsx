import { Routers } from "router/Routers";
import { BrowserRouter } from "react-router-dom";
import DefaultLayout from "components/layouts/DefaultLayout";
import SideBar from "components/layouts/SideBar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <DefaultLayout>
          <Routers />
        </DefaultLayout>
      </BrowserRouter>
    </>
  );
};

export default App;
