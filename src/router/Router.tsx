import { FC, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "components/pages//post/Post";
import { CommonLayout } from "components/layouts/CommonLayout";
import Header from "components/layouts/Header";
import { SampleHome } from "components/pages/Home";

export const Router: FC = memo(() => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<SampleHome />} />
          <Route element={<Header />}>
            <Route path="post" element={<Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
});
