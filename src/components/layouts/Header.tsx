import React, { useContext } from "react";
import Cookies from "js-cookie";

import { AppBar, Box, Typography, Toolbar, Grid } from "@mui/material";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Groups3Icon from "@mui/icons-material/Groups3";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Icon } from "components/ui/icon/Icon";

import { signOut } from "lib/api/auth";
import { AuthContext } from "App";
import styled from "@emotion/styled";

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        navigate("/");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <Button color="inherit" onClick={handleSignOut}>
            ログアウト
          </Button>
        );
      } else {
        return (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/signin"
              css={loginButton}
            >
              ログイン
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
              css={signupButton}
            >
              新規登録
            </Button>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <AppBar position="static" elevation={0} css={appBar}>
          <Toolbar css={toolBar}>
            <Typography variant="h5" component={Link} to="/" css={siteTitle}>
              VALORANT Finder
            </Typography>
            <Grid item xs={6}>
              <Button
                component={NavLink}
                to="/"
                startIcon={<HomeIcon />}
                css={contentButtonStyle}
              >
                <Typography css={contentMenuText}>ホーム</Typography>
              </Button>
              <Button
                component={NavLink}
                to="post"
                end
                startIcon={<Icon iconName="Match_find" />}
                css={contentButtonStyle}
              >
                <Typography css={contentMenuText}>マッチ募集</Typography>
              </Button>
              <Button
                component={NavLink}
                to="friend"
                startIcon={<PersonSearchIcon />}
                css={contentButtonStyle}
              >
                <Typography css={contentMenuText}>フレンド募集</Typography>
              </Button>
              <Button
                component={NavLink}
                to="teams"
                startIcon={<PersonAddIcon />}
                css={contentButtonStyle}
              >
                <Typography css={contentMenuText}>固定パーティ募集</Typography>
              </Button>
              <Button
                component={NavLink}
                to="mypage"
                startIcon={<AccountCircleIcon />}
                css={contentButtonStyle}
              >
                <Typography css={contentMenuText}>マイページ</Typography>
              </Button>
            </Grid>
            <AuthButtons />
          </Toolbar>
        </AppBar>
      </Grid>
    </Box>
  );
};

export default Header;

// css
const appBar = css`
  background-color: #3f4551;
  color: #fff;
  position: fixed;
  z-index: 1000;
`;

const signupButton = css`
  background-color: #ff4755;
  &:hover {
    background-color: rgba(255, 15, 0, 1);
  }
`;

const loginButton = css`
  background-color: #3f4551;
`;

const siteTitle = css`
  flex-grow: 1;
  font-family: ValorantFont;
  letter-spacing: 0.1rem;
  color: #fff;
  text-decoration: none;
`;

const contentButtonStyle = css`
  color: #fff;
  margin-right: 40px;
  &:hover {
    color: #ff4755;
    border-bottom: 3px solid #ff4755;
    border-radius: 0;
  }
  &.active {
    color: #ff4755;
    border-bottom: 3px solid #ff4755;
    border-radius: 0;
  }
`;

const contentMenuText = css`
  font-weight: 750;
`;

const toolBar = css`
  height: 80px;
`;
