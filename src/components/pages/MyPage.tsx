import React, { useContext } from "react";
import { AuthContext } from "App";
import { Link } from "react-router-dom";
import { Typography, Grid, List, Box } from "@mui/material";
import { Card, CardContent, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { css } from "@emotion/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import Chip from "@mui/material/Chip";
import { HeadBlock } from "components/util/HeadBlock";

const MyPage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <HeadBlock title="マイページ | VALORANT FINDER"></HeadBlock>
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
        <Grid container direction="row" justifyContent="start" alignItems="center">
          <CardHeader avatar={<Avatar src={currentUser?.attributes.image.url} css={avatar} />} />
          <Box css={linkButtonPosition}>
            <IconButton target="_blank" href={currentUser?.attributes.youtubeUrl || ""} disableRipple={true} css={linkButton}>
              <YouTubeIcon sx={{ fontSize: 34 }} />
            </IconButton>
            {currentUser?.attributes.twitterName === "" ? (
              <IconButton target="_blank" href={``} disableRipple={true} css={linkButton}>
                <TwitterIcon sx={{ fontSize: 34 }} />
              </IconButton>
            ) : (
              <IconButton target="_blank" href={`https://twitter.com/${currentUser?.attributes.twitterName}`} disableRipple={true} css={linkButton}>
                <TwitterIcon sx={{ fontSize: 34 }} />
              </IconButton>
            )}
          </Box>
          <Button variant="outlined" css={editLinkButton} disableRipple={true} component={Link} to="/mypage/edit">
            <Typography>プロフィール編集</Typography>
          </Button>
        </Grid>
        <CardContent>
          <Typography variant="h5" css={userName}>
            {currentUser?.attributes.name}
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="ゲーム内の名前" css={spacing} />
              <ListItemText primary={<Typography css={listContent}>{currentUser?.attributes.ingameName}</Typography>} />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText primary="VALORANT歴" css={spacing} />
              <ListItemText primary={<Typography css={listContent}>{currentUser?.attributes.startedOnVal}</Typography>} />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText primary="最高ランク" css={spacing} />
              <ListItemText
                primary={
                  currentUser?.attributes.highestRank === "未選択" ? (
                    <></>
                  ) : (
                    <Typography css={listContent}>
                      {currentUser?.attributes.highestRank.split("\n").map((rank: string, index: number) => {
                        return (
                          <Box component="span" key={index}>
                            {rank}
                          </Box>
                        );
                      })}
                    </Typography>
                  )
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText primary="現在のランク" css={spacing} />
              <ListItemText
                primary={
                  currentUser?.attributes.rank === "未選択" ? (
                    <></>
                  ) : (
                    <Typography css={listContent}>
                      {currentUser?.attributes.rank.split("\n").map((rank: string, index: number) => {
                        return (
                          <Box component="span" key={index}>
                            {rank}
                          </Box>
                        );
                      })}
                    </Typography>
                  )
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText primary="エージェント" css={spacing} />
              <ListItemText
                sx={{ width: "300px" }}
                primary={
                  currentUser?.attributes.agent.length === 0 || currentUser?.attributes.agent == "未選択" ? (
                    <></>
                  ) : (
                    <Typography component="div" css={agentPosition}>
                      {String(currentUser?.attributes.agent)
                        .split(/,|\s/)
                        .map((agent: string, index: number) => {
                          return (
                            <Box component="span" key={index}>
                              {agent == "未選択" ? (
                                <>
                                  <Typography key={index} />
                                </>
                              ) : (
                                <Chip variant="outlined" label={agent} css={chipStyle} />
                              )}
                            </Box>
                          );
                        })}
                    </Typography>
                  )
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText primary="自己紹介" css={spacing} />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ width: "300px" }}
                primary={
                  currentUser?.attributes.selfIntroduction ? (
                    <Box>
                      {currentUser?.attributes.selfIntroduction.split("\n").map((content: string, index: number) => {
                        return (
                          <Typography component="p" key={index}>
                            {content}
                          </Typography>
                        );
                      })}
                    </Box>
                  ) : (
                    <Typography variant="body2">よろしくお願いします！</Typography>
                  )
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default MyPage;

// css

const avatar = css`
  width: 100px;
  height: 100px;
  margin-left: 16px;
`;

const spacing = css`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const agentPosition = css`
  text-align: right;
  margin-right: 6px;
`;

const cardStyle = css`
  width: 800px;
  height: auto;
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
  margin-left: auto;
  margin-right: 36px;
`;

const userSettingLinkButton = css`
  margin-bottom: 50px;
  color: #ff4755;
  letter-spacing: 1px;
`;

const linkButton = css`
  color: #3f4551;
  border-color: #3f4551;
  margin-right: 10px;
  &:hover {
    color: #3f4551;
    border-color: #3f4551;
    background-color: #fff;
  }
`;

const chipStyle = css`
  color: #3f4551;
  border-color: #3f4551;
  margin-top: 10px;
  margin-right: 10px;
`;

const linkButtonPosition = css`
  margin-right: auto;
`;

const userName = css`
  margin-left: 16px;
  margin-bottom: 16px;
  margin-top: -20px;
`;

const listContent = css`
  text-align: right;
  margin-right: 16px;
`;
