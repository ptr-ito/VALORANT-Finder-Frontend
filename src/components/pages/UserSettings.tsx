import React, { useContext, useState, useCallback, useEffect, useRef } from "react";

import { AuthContext } from "App";

import { Typography, Grid, List } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HeadBlock } from "components/util/HeadBlock";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { css } from "@emotion/react";

const UserSettings = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);
  console.log(currentUser?.attributes);

  return (
    <>
      <HeadBlock title="プロフィール編集 | VALORANT FINDER" />
      {isSignedIn && currentUser ? (
        <>
          <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={backButton} component={Link} to="/mypage">
            マイページへ戻る
          </Button>
          <Grid container justifyContent="center">
            <Typography variant="h4" sx={{ mb: 5 }}>
              個人設定
            </Typography>
          </Grid>
          <Card sx={{ boxShadow: 0 }} css={cardStyle}>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="メールアドレス" sx={{ mr: 7 }} css={spacing} />
                  <ListItemText primary={currentUser?.attributes.email} />
                  <Button variant="outlined" css={linkButton} disableRipple={true} component={Link} to="/mypage/usersettings/email">
                    <Typography>編集</Typography>
                  </Button>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="パスワード" sx={{ mr: 9 }} css={spacing} />
                  <ListItemText
                    primary="・・・・・・・・・"
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      variant: "h5",
                      letterSpacing: "-7px",
                    }}
                  />
                  <Button variant="outlined" css={linkButton} disableRipple={true} component={Link} to="/mypage/usersettings/password">
                    <Typography>編集</Typography>
                  </Button>
                </ListItem>
                <Divider component="li" />
              </List>
            </CardContent>
          </Card>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserSettings;

// css
const spacing = css`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const backButton = css`
  flex-grow: 1;
  margin-bottom: 50px;
  color: #ff4755;
`;

const cardStyle = css`
  width: 800px;
  height: 230px;
  position: relative;
  line-height: 1.4;
  padding: 0.25em 1em;
  &: after,
  &: before {
    content: "";
    width: 30px;
    height: 40px;
    position: absolute;
    display: inline-block;
  }
  &: before {
    border-left: solid 1px #ff5722;
    border-top: solid 1px #ff5722;
    top: 0;
    left: 0;
  }
  &: after {
    border-right: solid 1px #ff5722;
    border-bottom: solid 1px #ff5722;
    bottom: 0;
    right: 0;
  }
`;

const linkButton = css`
  color: #ff4755;
  border-color: #ff4755;
  &:hover {
    color: #ff4755;
    border-color: #ff4755;
    background-color: RGB(255, 71, 85, 0.1);
  }
`;
