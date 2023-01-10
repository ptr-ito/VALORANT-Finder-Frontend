import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "App";
import { ranks } from "data/ranks";
import { agents } from "data/agents";
import { Link, useLocation } from "react-router-dom";
import { Typography, Grid, List, Box } from "@mui/material";
import { Card, CardContent, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { css } from "@emotion/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MyPage = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);

  const currentUserRank = (): string => {
    return ranks[(currentUser?.rankId || 0) - 1];
  };

  const currentUserAgent = (): string => {
    return agents[(currentUser?.agentId || 0) - 1];
  };

  return (
    <>
      {/* {isSignedIn && currentUser ? ( */}
      <>
        <Grid container justifyContent="flex-end" alignItems="flex-end">
          <Button endIcon={<ArrowForwardIcon />} disableRipple={true} css={userSettingLinkButton} component={Link} to="/mypage/usersettings">
            個人設定
          </Button>
        </Grid>
        <Grid container justifyContent="center">
          <Typography variant="h4" sx={{ mb: 5 }}>
            プロフィール
          </Typography>
        </Grid>
        <Card sx={{ boxShadow: 0 }} css={cardStyle}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <CardHeader
              avatar={<Avatar src={currentUser?.image.url} css={avatar} />}
              title={
                <>
                  <Typography variant="h5" sx={{ pr: 40 }}>
                    {currentUser?.name}
                  </Typography>
                </>
              }
            />
            <Button variant="outlined" css={editLinkButton} disableRipple={true} component={Link} to="/mypage/edit">
              <Typography>プロフィール編集</Typography>
            </Button>
          </Grid>
          <CardContent>
            <List>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="ランク" sx={{ mr: 7 }} css={spacing} />
                <ListItemText primary={currentUserRank()} css={textAlign} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="エージェント" css={spacing} />
                <ListItemText primary={currentUserAgent()} css={textAlign} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="自己紹介" sx={{ pt: 1 }} />
              </ListItem>
              <ListItem>
                {currentUser?.selfIntroduction ? (
                  <Typography css={border}>{currentUser?.selfIntroduction}</Typography>
                ) : (
                  <Typography css={border} variant="body2">
                    よろしくお願いします！
                  </Typography>
                )}
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </>
      {/* ) : (
        <></>
      )} */}
    </>
  );
};

export default MyPage;

// css
const border = css`
  border: 1px solid #dcdfe4;
  width: 800px;
  height: 300px;
  padding: 10px;
  border-radius: 5px;
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

const navText = css`
  font-weight: 500;
  text-align: center;
`;

const textAlign = css`
  text-align: center;
`;

const cardStyle = css`
  width: 800px;
  height: 700px;
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

const editLinkButton = css`
  color: #ff4755;
  border-color: #ff4755;
  &:hover {
    color: #ff4755;
    border-color: #ff4755;
    background-color: RGB(255, 71, 85, 0.1);
  }
`;

const userSettingLinkButton = css`
  margin-bottom: 50px;
  color: #ff4755;
  letter-spacing: 1px;
`;
