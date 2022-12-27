import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Post from "components/pages//post/Post";
import { SampleHome } from "components/pages/Home";
import NotFound from "components/pages/Page404";
import DefaultLayout from "components/layouts/DefaultLayout";
import { SignUp } from "components/pages/SignUp";
import { SignIn } from "components/pages/SignIn";
import MyPage from "components/pages/MyPage";
import EditProfile from "components/pages/EditProfile";
import UserSettings from "components/pages/UserSettings";
import EditEmail from "components/pages/EditEmail";
import EditPassword from "components/pages/EditPassword";
import SendEmail from "components/pages/SendEmail";
import { PrivateRoute } from "router/PrivateRoute";

const Routers = memo(() => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<SampleHome />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="sendemail" element={<SendEmail />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<DefaultLayout />}>
            <Route path="post" element={<Post />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="mypage/edit" element={<EditProfile />} />
            <Route path="mypage/usersettings" element={<UserSettings />} />
            <Route path="mypage/usersettings/email" element={<EditEmail />} />
            <Route path="mypage/usersettings/password" element={<EditPassword />} />
          </Route>
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<SampleHome />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="post" element={<Post />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="mypage/edit" element={<EditProfile />} />
          <Route path="mypage/usersettings" element={<UserSettings />} />
          <Route path="mypage/usersettings/email" element={<EditEmail />} />
          <Route path="mypage/usersettings/password" element={<EditPassword />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes> */}
    </>
  );
});

export default Routers;
