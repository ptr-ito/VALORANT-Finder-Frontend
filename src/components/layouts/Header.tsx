import React, { useEffect, useState } from "react";
import { AppBar, Box, Typography, Toolbar, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { css } from "@emotion/react";
import { useProSidebar } from "react-pro-sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Icon } from "components/ui/Icon/Icon";
import { NavLink } from "react-router-dom";
import Groups3Icon from "@mui/icons-material/Groups3";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const Header = () => {
  const { collapseSidebar } = useProSidebar();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const login = () => loginWithRedirect();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <AppBar position="static" elevation={0} css={appBar}>
          <Toolbar css={toolBar}>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => collapseSidebar()}
          >
            <MenuIcon />
          </IconButton> */}
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
                startIcon={<Groups3Icon />}
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
                to="mypage"
                startIcon={<PersonAddIcon />}
                css={contentButtonStyle}
              >
                <Typography css={contentMenuText}>固定パーティ募集</Typography>
              </Button>
              <Button
                component={NavLink}
                to="teams"
                startIcon={<AccountCircleIcon />}
                css={contentButtonStyle}
              >
                <Typography css={contentMenuText}>マイページ</Typography>
              </Button>
            </Grid>
            {!isAuthenticated ? (
              <>
                <Button color="inherit" onClick={login} css={loginButton}>
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
