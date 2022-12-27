import React, { useContext, useState, useCallback, useEffect, useRef } from "react";

import { AuthContext } from "App";

import { Typography, Grid, List } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AlertMessage from "components/layouts/AlertMessage";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { css } from "@emotion/react";

const UserSettings = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);

  return (
    <>
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
          <Card sx={{ width: 800, height: 230 }}>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="メールアドレス" sx={{ mr: 7 }} css={spacing} />
                  <ListItemText primary={currentUser?.email} />
                  <Button variant="outlined" color="primary" disableRipple={true} component={Link} to="/mypage/usersettings/email">
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
                  <Button variant="outlined" color="primary" disableRipple={true} component={Link} to="/mypage/usersettings/password">
                    <Typography>編集</Typography>
                  </Button>
                </ListItem>
                <Divider component="li" />
              </List>
            </CardContent>
          </Card>
          {/* <AlertMessage // メールアドレスの変更が成功した場合のアラート
            open={alertMessageOpen}
            setOpen={setAlertMessageOpen}
            severity="success"
            message="メールアドレスの変更が完了しました"
            sx={{ height: "23%" }}
          /> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserSettings;

// css
const border = css`
  border: 1px solid #dcdfe4;
  width: 800px;
  height: 200px;
  padding: 10px;
`;

const avatar = css`
  width: 100px;
  height: 100px;
`;

const spacing = css`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const navUserSettings = css`
  margin-top: 20px;
  color: #fff;
  background-color: #ff4755;
  &:hover {
    background-color: #ff4755;
  }
`;

const backButton = css`
  flex-grow: 1;
  margin-bottom: 50px;
`;
