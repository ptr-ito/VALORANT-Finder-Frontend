import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Post from "components/pages//post/Post";
import { SampleHome } from "components/pages/Home";
import NotFound from "components/pages/page404";
import DefaultLayout from "components/layouts/DefaultLayout";

const Routers = memo(() => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<SampleHome />} />
          <Route path="post" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
});

export default Routers;
