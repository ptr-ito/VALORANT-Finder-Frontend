import { memo } from "react";
import { Route, Routes } from "react-router-dom";
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
import MatchPostList from "components/pages/post/MatchPostList";
import MatchPostDetail from "components/pages/post/MatchPostDetail";
import UserProfile from "components/pages/user/UserProfile";
import ForgotPassword from "components/pages/ForgotPassword";
import ResetPassaword from "components/pages/ResetPassword";

const Routers = memo(() => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<SampleHome />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="sendemail" element={<SendEmail />} />
          <Route path="password/forgot" element={<ForgotPassword />} />
          <Route path="password/reset" element={<ResetPassaword />} />
          <Route path="post" element={<MatchPostList />} />
          <Route path="post/:id" element={<MatchPostDetail />} />
          <Route path="user/:id" element={<UserProfile />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<DefaultLayout />}>
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
    </>
  );
});

export default Routers;
