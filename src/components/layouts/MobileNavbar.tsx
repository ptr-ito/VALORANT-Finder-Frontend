import React, { useEffect, useState } from "react";
import { AppBar, Box, Typography, Toolbar, Grid, Container } from "@mui/material";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Icon } from "components/ui/icon/Icon";

const MobileNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} css={appBar}>
        <Toolbar css={toolBar}>
          <Grid container justifyContent="center" alignItems="center">
            <Button component={NavLink} to="/" disableRipple={true} css={contentButtonStyle}>
              <HomeIcon />
              <Typography css={contentMenuText}>ホーム</Typography>
            </Button>
            <Button component={NavLink} to="post" end disableRipple={true} css={contentButtonStyle}>
              <Icon iconName="Match_find" />
              <Typography css={contentMenuText}>マッチ募集</Typography>
            </Button>
            {/* <Button component={NavLink} to="friend" startIcon={<PersonSearchIcon />} disableRipple={true} css={contentButtonStyle}>
                  <Typography css={contentMenuText}>フレンド募集</Typography>
                </Button>
                <Button component={NavLink} to="teams" startIcon={<PersonAddIcon />} disableRipple={true} css={contentButtonStyle}>
                  <Typography css={contentMenuText}>固定パーティ募集</Typography>
                </Button> */}
            <Button component={NavLink} to="mypage" disableRipple={true} css={contentButtonStyle}>
              <AccountCircleIcon />
              <Typography css={contentMenuText}>マイページ</Typography>
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileNavbar;

// css

const appBar = css`
  background-color: #3f4551;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

const contentButtonStyle = css`
  color: #fff;
  width: 25vw;
  flex-direction: column;
  &:hover {
    color: #ff4755;
    border-radius: 0;
  }
  &.active {
    color: #ff4755;
    border-radius: 0;
  }
`;

const contentMenuText = css`
  font-weight: 400;
  font-size: 12px;
  margin-top: 2px;
`;

const toolBar = css`
  height: 80px;
  bottom: 0;
  left: 0;
`;
