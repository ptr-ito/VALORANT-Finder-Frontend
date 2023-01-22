import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "App";
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

const UserProfile = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const query = useParams<{ query: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();

  const backPage = () => {
    navigate(-1);
  };

  console.log(query);

  const handleGetUser = async (query: any) => {
    try {
      const res = await getUser(query.id);
      console.log(res?.data.data);

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

    setLoading(false);
  };

  useEffect(() => {
    handleGetUser(query);
  }, [query]);

  console.log(user);

  return (
    <>
      {/* {isSignedIn && currentUser ? ( */}
      <>
        <HeadBlock title="ユーザープロフィール | VALORANT FINDER" />
        <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={backButton} onClick={backPage}>
          募集詳細へ戻る
        </Button>
        <Grid container justifyContent="center">
          <Typography variant="h4" sx={{ mb: 5 }}>
            プロフィール
          </Typography>
        </Grid>
        <Card sx={{ boxShadow: 0 }} css={cardStyle}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <CardHeader
              avatar={<Avatar src={user?.attributes.image.url} css={avatar} />}
              title={
                <>
                  <Typography variant="h5" sx={{ pr: 40 }}>
                    {user?.attributes.name}
                  </Typography>
                </>
              }
            />
            <Box>
              <IconButton target="_blank" href={user?.attributes.youtubeUrl || ""} disableRipple={true} css={youtube} sx={{ ml: -35, mr: 2 }}>
                <YouTubeIcon sx={{ fontSize: 34 }} />
              </IconButton>
              {user?.attributes.twitterName === "" ? (
                <IconButton target="_blank" href={``} disableRipple={true} css={youtube}>
                  <TwitterIcon sx={{ fontSize: 34 }} />
                </IconButton>
              ) : (
                <IconButton target="_blank" href={`https://twitter.com/${user?.attributes.twitterName}`} disableRipple={true} css={youtube}>
                  <TwitterIcon sx={{ fontSize: 34 }} />
                </IconButton>
              )}
            </Box>
          </Grid>
          <CardContent>
            <List>
              <ListItem>
                <ListItemText primary="ゲーム内の名前" css={spacing} />
                <ListItemText primary={<Typography css={textAlign}>{user?.attributes.ingameName}</Typography>} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="VALORANT歴" css={spacing} />
                <ListItemText primary={<Typography css={textAlign}>{user?.attributes.startedOnVal}</Typography>} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="最高ランク" css={spacing} />
                <ListItemText
                  primary={
                    <Typography css={textAlign}>
                      {user?.attributes.highestRank.split("\n").map((rank: string, index: number) => {
                        return (
                          <Box component="span" key={index}>
                            {rank}
                          </Box>
                        );
                      })}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="現在のランク" css={spacing} />
                <ListItemText
                  primary={
                    <Typography css={textAlign}>
                      {user?.attributes.rank.split("\n").map((rank: string, index: number) => {
                        return (
                          <Box component="span" key={index}>
                            {rank}
                          </Box>
                        );
                      })}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="エージェント" css={spacing} />
                <ListItemText
                  primary={
                    <Typography css={textAlign}>
                      {String(user?.attributes.agent)
                        .split(/,|\s/)
                        .map((agent: string, index: number) => {
                          return <Chip variant="outlined" label={agent} key={index} css={chipStyle} />;
                        })}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="自己紹介" sx={{ pt: 1 }} />
              </ListItem>
              <ListItem>
                {user?.attributes.selfIntroduction ? (
                  <Typography css={border}>{user?.attributes.selfIntroduction}</Typography>
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
    </>
  );
};

export default UserProfile;

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
  margin-left: -40px;
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
  height: 900px;
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

const youtube = css`
  color: #3f4551;
  border-color: #3f4551;
  margin-left: auto;
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
  margin-bottom: 50px;
  color: #ff4755;
  margin-right: auto;
`;
