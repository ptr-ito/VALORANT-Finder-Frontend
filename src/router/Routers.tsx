import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { SampleHome } from "features/home/Home";
import NotFound from "features/other/NotFound";
import DefaultLayout from "components/layouts/DefaultLayout";
import { SignUp } from "features/auth/SignUp";
import { SignIn } from "features/auth/SignIn";
import MyPage from "features/user/MyPage";
import EditProfile from "features/user/EditProfile";
import UserSettings from "features/user/UserSettings";
import EditEmail from "features/auth/EditEmail";
import EditPassword from "features/auth/EditPassword";
import SendEmail from "features/auth/SendEmail";
import { PrivateRoute } from "router/PrivateRoute";
import MatchPostList from "features/post/MatchPostList";
import MatchPostDetail from "features/post/MatchPostDetail";
import UserProfile from "features/user/UserProfile";
import ForgotPassword from "features/auth/ForgotPassword";
import ResetPassaword from "features/auth/ResetPassword";
import PrivacyPolicy from "features/other/PrivacyPolicy";
import Tos from "features/other/Tos";
import ContactForm from "features/other/ContactForm";
import MyMatchPost from "features/user/myPost/MyMatchPost";

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
          <Route path="match" element={<MatchPostList />} />
          <Route path="match/:id" element={<MatchPostDetail />} />
          <Route path="user/:id" element={<UserProfile />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="tos" element={<Tos />} />
          <Route path="contact" element={<ContactForm />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<DefaultLayout />}>
            <Route path="mypage" element={<MyPage />} />
            <Route path="mypage/edit" element={<EditProfile />} />
            <Route path="mypage/settings" element={<UserSettings />} />
            <Route path="mypage/settings/email" element={<EditEmail />} />
            <Route path="mypage/settings/password" element={<EditPassword />} />
            <Route path="mypage/match" element={<MyMatchPost />} />
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
