import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Grid, List, Box } from "@mui/material";
import { Card, CardContent, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { css } from "@emotion/react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import Chip from "@mui/material/Chip";
import { User } from "interfaces/index";
import { getUser } from "lib/api/users";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HeadBlock } from "components/util/HeadBlock";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

const UserProfile = () => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();
  const query = useParams<{ query: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();

  const backPage = () => {
    navigate(-1);
  };

  const handleGetUser = async (query: any) => {
    try {
      const res = await getUser(query.id);

      if (res?.status === 200) {
        setUser(res?.data.data);
      } else {
        console.log("No users");
      }
      if (res?.data.data === null) {
        navigate("NotFound");
      }
    } catch (err) {
      console.log(err);
      navigate("NotFound");
    }
  };

  useEffect(() => {
    handleGetUser(query);
  }, [query]);

  return (
    <>
      <HeadBlock title="ユーザープロフィール | VALORANT FINDER" />
      {isPcSite && (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={backButton} onClick={backPage}>
            募集詳細へ戻る
          </Button>
          <Typography variant="h4" sx={{ mb: 5 }}>
            ユーザープロフィール
          </Typography>
          <Card sx={{ boxShadow: 0 }} css={cardStyle}>
            <Grid container direction="row" alignItems="center">
              <CardHeader
                avatar={<Avatar src={user?.attributes.image.url} css={avatar} />}
                title={
                  <>
                    <Typography variant="h5" sx={{ pl: 3 }}>
                      {user?.attributes.name}
                    </Typography>
                  </>
                }
              />
              <Box css={mediaLinkPosition}>
                <IconButton target="_blank" href={user?.attributes.youtubeUrl || ""} disableRipple={true} css={mediaLinkButton}>
                  <YouTubeIcon sx={{ fontSize: 34 }} />
                </IconButton>
                {user?.attributes.twitterName === "" ? (
                  <IconButton target="_blank" href={``} disableRipple={true} css={mediaLinkButton}>
                    <TwitterIcon sx={{ fontSize: 34 }} />
                  </IconButton>
                ) : (
                  <IconButton target="_blank" href={`https://twitter.com/${user?.attributes.twitterName}`} disableRipple={true} css={mediaLinkButton}>
                    <TwitterIcon sx={{ fontSize: 34 }} />
                  </IconButton>
                )}
              </Box>
            </Grid>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="ゲーム内の名前" css={spacing} />
                  <ListItemText primary={<Typography css={listContent}>{user?.attributes.ingameName}</Typography>} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="VALORANT歴" css={spacing} />
                  <ListItemText primary={<Typography css={listContent}>{user?.attributes.startedOnVal}</Typography>} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="最高ランク" css={spacing} />
                  <ListItemText
                    primary={
                      user?.attributes.highestRank === "未選択" ? (
                        <></>
                      ) : (
                        <Typography css={listContent}>
                          {user?.attributes.highestRank.split("\n").map((rank: string, index: number) => {
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
                      user?.attributes.rank === "未選択" ? (
                        <></>
                      ) : (
                        <Typography css={listContent}>
                          {user?.attributes.rank.split("\n").map((rank: string, index: number) => {
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
                      user?.attributes.agent.length === 0 || user?.attributes.agent == "未選択" ? (
                        <></>
                      ) : (
                        <Typography component="div" css={agentPosition}>
                          {String(user?.attributes.agent)
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
                      user?.attributes.selfIntroduction ? (
                        <Box>
                          {user?.attributes.selfIntroduction.split("\n").map((content: string, index: number) => {
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
        </Grid>
      )}
      {isMobileSite && (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Box sx={{ width: "85vw", mt: "50px" }}>
            <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={mobileBackButton} onClick={backPage}>
              募集詳細へ戻る
            </Button>
          </Box>
          <Typography variant="h5" sx={{ mb: 5 }}>
            ユーザープロフィール
          </Typography>
          <Card sx={{ boxShadow: 0 }} css={mobileCard}>
            <Grid container direction="row" alignItems="center">
              <CardHeader
                avatar={<Avatar src={user?.attributes.image.url} css={mobileAvatar} />}
                title={
                  <>
                    <Typography variant="h5" sx={{ pl: 3, fontSize: 20 }}>
                      {user?.attributes.name}
                    </Typography>
                  </>
                }
              />
              <Box css={mediaLinkPosition}>
                <IconButton target="_blank" href={user?.attributes.youtubeUrl || ""} disableRipple={true} css={mediaLinkButton}>
                  <YouTubeIcon sx={{ fontSize: 24 }} />
                </IconButton>
                {user?.attributes.twitterName === "" ? (
                  <IconButton target="_blank" href={``} disableRipple={true} css={mediaLinkButton}>
                    <TwitterIcon sx={{ fontSize: 24 }} />
                  </IconButton>
                ) : (
                  <IconButton target="_blank" href={`https://twitter.com/${user?.attributes.twitterName}`} disableRipple={true} css={mediaLinkButton}>
                    <TwitterIcon sx={{ fontSize: 24 }} />
                  </IconButton>
                )}
              </Box>
            </Grid>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="ゲーム内の名前" css={spacing} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<Typography css={mobileListContent}>{user?.attributes.ingameName}</Typography>} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="VALORANT歴" css={spacing} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<Typography css={mobileListContent}>{user?.attributes.startedOnVal}</Typography>} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="最高ランク" css={spacing} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      user?.attributes.highestRank === "未選択" ? (
                        <></>
                      ) : (
                        <Typography css={mobileListContent}>
                          {user?.attributes.highestRank.split("\n").map((rank: string, index: number) => {
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
                      user?.attributes.rank === "未選択" ? (
                        <></>
                      ) : (
                        <Typography css={mobileListContent}>
                          {user?.attributes.rank.split("\n").map((rank: string, index: number) => {
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
                      user?.attributes.agent.length === 0 || user?.attributes.agent == "未選択" ? (
                        <></>
                      ) : (
                        <Typography component="div" css={mobileListContent}>
                          <Grid container direction="column">
                            {String(user?.attributes.agent)
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
                      user?.attributes.selfIntroduction ? (
                        <Box>
                          {user?.attributes.selfIntroduction.split("\n").map((content: string, index: number) => {
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
        </Grid>
      )}
    </>
  );
};

export default UserProfile;

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

const mediaLinkButton = css`
  color: #3f4551;
  border-color: #3f4551;
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

const backButton = css`
  margin-top: 50px;
  margin-bottom: 50px;
  right: 350px;
  color: #ff4755;
`;

const mediaLinkPosition = css`
  margin-left: auto;
  margin-right: 36px;
`;

const listContent = css`
  text-align: right;
  margin-right: 16px;
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

const mobileBackButton = css`
  margin-bottom: 50px;
  margin-right: auto;
  color: #ff4755;
`;

const mobileAvatar = css`
  width: 80px;
  height: 80px;
  margin-left: 16px;
`;

const mobileListContent = css`
  margin-right: 16px;
`;
