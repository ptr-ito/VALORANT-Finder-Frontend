import { useState } from "react";
import { AppBar, Box, Typography, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { css } from "@emotion/react";
import { useProSidebar } from "react-pro-sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Header = () => {
  const { collapseSidebar } = useProSidebar();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const login = () => loginWithRedirect();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} css={appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => collapseSidebar()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            // sx={{
            //   flexGrow: 1,
            //   fontFamily: "ValorantFont",
            //   letterSpacing: ".1rem",
            // }}
            css={siteTitle}
          >
            VALORANT Finder
          </Typography>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

// css
const appBar = css`
  background-color: #3f4551;
  color: #fff;
  flex-grow: 1;
  position: fixed;
  z-index: 1000;
`;

const signupButton = css`
  background-color: #ff4755;
`;

const siteTitle = css`
  flex-grow: 1;
  font-family: ValorantFont;
  letter-spacing: 0.1rem;
  color: #fff;
  text-decoration: none;
`;
