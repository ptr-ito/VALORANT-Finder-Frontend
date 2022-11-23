import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { css } from "@emotion/react";
import UserProfileDropdown from "components/pages/user/UserProfileDropdown";

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const login = () => loginWithRedirect();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  return (
    <>
      {!isAuthenticated ? (
        <>
          <Button color="inherit" onClick={login}>
            ログイン
          </Button>
          <Button color="inherit" css={signupButton} onClick={signUp}>
            新規登録
          </Button>
        </>
      ) : (
        <>
          {/* <UserProfileDropdown /> */}
          <Button
            color="inherit"
            onClick={() => {
              logout({ returnTo: window.location.origin });
            }}
          >
            ログアウト
          </Button>
        </>
      )}
    </>
  );
};

export default LoginButton;

// css
const signupButton = css`
  background-color: #ff4755;
`;
