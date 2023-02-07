import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { SampleHome } from "components/pages/Home/Home";
import NotFound from "components/pages/NotFound";
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
import PrivacyPolicy from "components/pages/PrivacyPolicy";
import Tos from "components/pages/Tos";
import ContactForm from "components/pages/ContactForm";
import MyMatchPost from "components/pages/user/MyMatchPost";

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
