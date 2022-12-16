import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Post from "components/pages//post/Post";
import { SampleHome } from "components/pages/Home";
import NotFound from "components/pages/Page404";
import DefaultLayout from "components/layouts/DefaultLayout";
import { SignUp } from "components/pages/SignUp";
import { SignIn } from "components/pages/SignIn";
import MyPage from "components/pages/MyPage";

const Routers = memo(() => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<SampleHome />} />
          <Route path="post" element={<Post />} />
          <Route path="*" element={<NotFound />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
});

export default Routers;
