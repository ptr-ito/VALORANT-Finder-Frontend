import React, { useContext, useEffect, useState } from "react";
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
import { useMediaQueryContext } from "providers/MediaQueryProvider";
import MediaLinkButon from "components/ui/icon/MediaLinkButton";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";

const MyPage = () => {
  const { currentUser } = useContext(AuthContext);

  const { isMobileSite, isPcSite } = useMediaQueryContext();

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <HeadBlock title="マイページ | VALORANT FINDER" />
      {isPcSite && (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Button endIcon={<ArrowForwardIcon />} disableRipple={true} css={userSettingLinkButton} component={Link} to="/mypage/settings">
            個人設定
          </Button>
          <Grid container justifyContent="center" alignItems="center">
            <PersonIcon sx={{ mr: 2, mb: 5, fontSize: "42px", textAlign: "center", color: "#3f4551" }} />
            <Typography variant="h4" sx={{ mb: 5 }}>
              プロフィール
            </Typography>
          </Grid>
          <Card sx={{ boxShadow: 0 }} css={cardStyle}>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <CardHeader avatar={<Avatar src={currentUser?.attributes.image.url} css={avatar} />} />
              <Box css={linkButtonPosition}>
                <MediaLinkButon />
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
          <Divider sx={{ width: "800px", mt: "50px" }} />
          <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: "50px", mt: "50px" }}>
            <HistoryIcon sx={{ mr: 2, fontSize: "42px", textAlign: "center", color: "#3f4551" }} />
            <Typography variant="h4">投稿した募集</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Button endIcon={<ArrowForwardIcon />} disableRipple={true} css={checkMyPostButton} component={Link} to="/mypage/match">
              <Typography>マッチ募集を確認する</Typography>
            </Button>
          </Grid>
        </Grid>
      )}
      {isMobileSite && (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Box sx={{ width: "85vw", mt: "50px" }}>
            <Grid container justifyContent="center" alignItems="flex-end">
              <Button endIcon={<ArrowForwardIcon />} disableRipple={true} css={mobileUserSettingLinkButton} component={Link} to="/mypage/settings">
                個人設定
              </Button>
            </Grid>
          </Box>
          <Grid container justifyContent="center">
            <Grid container justifyContent="center" alignItems="center">
              <PersonIcon sx={{ mr: 2, mb: 5, fontSize: "30px", color: "#3f4551" }} />
              <Typography variant="h5" sx={{ mb: 5 }}>
                プロフィール
              </Typography>
            </Grid>
          </Grid>
          <Card sx={{ boxShadow: 0 }} css={mobileCard}>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <CardHeader avatar={<Avatar src={currentUser?.attributes.image.url} css={mobileAvatar} />} />
              <Box css={linkButtonPosition}>{windowDimensions.width < 525 ? <></> : <MediaLinkButon />}</Box>
              <Button variant="outlined" size="small" css={mobileEditLinkButton} disableRipple={true} component={Link} to="/mypage/edit">
                <Typography sx={{ fontSize: 15 }}>プロフィール編集</Typography>
              </Button>
            </Grid>
            <CardContent>
              <Typography variant="h5" css={mobileUserName}>
                {currentUser?.attributes.name}
              </Typography>
              {windowDimensions.width < 525 ? <MediaLinkButon /> : <></>}
              <List>
                <ListItem>
                  <ListItemText primary="ゲーム内の名前" css={spacing} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<Typography css={mobileListContent}>{currentUser?.attributes.ingameName}</Typography>} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="VALORANT歴" css={spacing} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<Typography css={mobileListContent}>{currentUser?.attributes.startedOnVal}</Typography>} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="最高ランク" css={spacing} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      currentUser?.attributes.highestRank === "未選択" ? (
                        <></>
                      ) : (
                        <Typography css={mobileListContent}>
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
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      currentUser?.attributes.rank === "未選択" ? (
                        <></>
                      ) : (
                        <Typography css={mobileListContent}>
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
                </ListItem>
                <ListItem>
                  <ListItemText
                    sx={{ width: "300px" }}
                    primary={
                      currentUser?.attributes.agent.length === 0 || currentUser?.attributes.agent == "未選択" ? (
                        <></>
                      ) : (
                        <Typography component="div" css={mobileListContent}>
                          <Grid container direction="column">
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
                          </Grid>
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
          <Divider sx={{ width: "80vw", mt: "50px" }} />
          <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: "50px", mt: "50px" }}>
            <HistoryIcon sx={{ mr: 2, fontSize: "30px", color: "#3f4551" }} />
            <Typography variant="h5">投稿した募集</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Button endIcon={<ArrowForwardIcon />} disableRipple={true} css={checkMyPostButton} component={Link} to="/mypage/match">
              <Typography>マッチ募集を確認する</Typography>
            </Button>
          </Grid>
        </Grid>
      )}
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
  margin-top: 50px;
  margin-bottom: 50px;
  color: #ff4755;
  letter-spacing: 1px;
  left: 350px;
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

const checkMyPostButton = css`
  color: #ff4755;
  border-color: #ff4755;
  width: 200px;
  &:hover {
    color: #ff4755;
    border-color: #ff4755;
    background-color: RGB(255, 71, 85, 0.1);
  }
`;

// css for mobile

const mobileCard = css`
  width: 80vw;
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

const mobileUserSettingLinkButton = css`
  margin-bottom: 50px;
  margin-left: auto;
  color: #ff4755;
`;

const mobileAvatar = css`
  width: 80px;
  height: 80px;
  margin-left: 16px;
`;

const mobileUserName = css`
  margin-left: 16px;
  margin-bottom: 16px;
  margin-top: -20px;
  font-size: 20px;
`;

const mobileEditLinkButton = css`
  color: #ff4755;
  border-color: #ff4755;
  &:hover {
    color: #ff4755;
    border-color: #ff4755;
    background-color: RGB(255, 71, 85, 0.1);
  }
  margin-left: auto;
  width: 140px;
`;

const mobileListContent = css`
  margin-right: 16px;
`;
