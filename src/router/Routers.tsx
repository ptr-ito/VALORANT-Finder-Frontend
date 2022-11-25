import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Post from "components/pages//post/Post";
import { SampleHome } from "components/pages/Home";

const Routers = memo(() => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SampleHome />} />
        <Route path="post" element={<Post />} />
      </Routes>
    </>
  );
});

export default Routers;
