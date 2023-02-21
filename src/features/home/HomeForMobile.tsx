import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import mobileHome from "assets/images/mobile_home.png";
import { css } from "@emotion/react";
import { Icon } from "components/ui/icon/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import profile from "assets/images/profile.png";
import post from "assets/images/post.png";
import twitterShare from "assets/images/twitterShare.png";
import { HeadBlock } from "components/util/HeadBlock";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

export const HomeForMobile = () => {
  return (
    <>
      <HeadBlock />
      <Box component="div" css={divStyle}>
        <img src={mobileHome} css={imgStyle} />
      </Box>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Box css={[boxStyle]}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Divider sx={{ width: "90vw" }} />
            <List sx={{ mt: 5 }}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon iconName="Problem" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography component="span" css={negativeStrongLine}>
                      SNSの募集から参加したけど思っていた雰囲気と違う...
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon iconName="Problem" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography component="span" css={negativeStrongLine}>
                      誰かと一緒にプレイしてみたいけど中々踏み出せない...
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon iconName="Problem" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography component="span" css={negativeStrongLine}>
                      募集したのに誰も来ない！
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <Typography sx={{ mt: 5 }} css={textStyle}>
              ...といった悩みを抱えたことはありませんか？
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }} css={textStyle}>
              VALORANT FINDERはそんな悩みを解消するお手伝いをします。
            </Typography>
          </Grid>
        </Box>
        <Divider sx={{ width: "90vw" }} />
        <List sx={{ mt: 5 }}>
          <ListItem disablePadding>
            <ListItemIcon>
              <Icon iconName="Light" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography component="span" variant="h5">
                  プロフィール機能
                </Typography>
              }
            />
          </ListItem>
        </List>
        <img src={profile} css={introImage} />
        <Card css={card}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography component="span" variant="body1" css={whiteSpace}>
              プロフィールを詳しく設定することで自分の情報を他のユーザーと共有できます。{`\n\n`}
              例えばランク帯やよく使用するエージェントを設定することで、募集する側や応募する側が{`\n`}
            </Typography>
            <Typography component="span" variant="body1" css={[strongLine, whiteSpace]}>
              {`\n`}その人のプロフィールを見れば募集要項に対するミスマッチを防げます。
            </Typography>
          </CardContent>
        </Card>
        <Divider sx={{ width: "90vw" }} />
        <List>
          <ListItem disablePadding sx={{ mt: 5 }}>
            <ListItemIcon>
              <Icon iconName="Light" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography component="span" variant="h5">
                  マッチ募集機能
                </Typography>
              }
            />
          </ListItem>
        </List>
        <img src={post} css={introImage} />
        <Card css={card}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography component="span" variant="body1" css={whiteSpace}>
              多様なプレイスタイルにマッチできるように様々な選択肢を用意しているので、{`\n\n`}
              「雰囲気が合わなかった...」「ランク帯は適正？」{`\n`}
            </Typography>
            <Typography component="span" variant="body1" css={whiteSpace}>
              {`\n`}などのミスマッチを事前に回避することが出来ます。{`\n`}
            </Typography>
            <Typography component="span" variant="body1" css={[strongLine, whiteSpace]}>
              {`\n`}合う募集がない場合は自分で投稿してみましょう！
            </Typography>
          </CardContent>
        </Card>
        <Divider sx={{ width: "90vw" }} />
        <List sx={{ mt: 5 }}>
          <ListItem disablePadding>
            <ListItemIcon>
              <Icon iconName="Light" />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="h5">Twitterシェア機能</Typography>} />
          </ListItem>
        </List>
        <img src={twitterShare} css={introImage} />
        <Card css={card}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography component="span" variant="body1" css={whiteSpace}>
              もちろんTwitterでのシェアもできます！{`\n\n`}
              募集投稿からシェアボタンを押していただければ簡単にTwitterへの投稿が出来ます。{`\n`}
            </Typography>
            <Typography component="span" css={[strongLine, whiteSpace]}>
              {`\n`}VALORANT FINDERでの利用と合わせてTwitterでも募集を投稿
            </Typography>
            <Typography component="span" css={whiteSpace}>
              してみると、{`\n`}
              {`\n`}理想の募集や仲間が見つかりやすくなります！
            </Typography>
          </CardContent>
        </Card>
        <Divider sx={{ width: "90vw" }} />
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ mt: 10, pb: 8 }}>
          <Typography sx={{ textAlign: "center", fontSize: "20px" }} variant="h5">
            自分にあった募集を見つけてVALORANTを更に楽しみましょう！
          </Typography>
          <Box css={buttonBorder}>
            <Button variant="contained" disableRipple={true} css={beginButton} component={Link} to="/signup">
              新規登録
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

// css

const imgStyle = css`
  width: 100vw;
  margin-top: -1px;
`;

const divStyle = css`
  position: relative;
  margin-top: 19px;
`;

const textStyle = css`
  text-align: center;
`;

const boxStyle = css`
  margin-top: 50px;
  padding-bottom: 50px;
  margin-left: 20px;
  margin-right: 20px;
`;

const introImage = css`
  margin-top: 20px;
  margin-bottom: 30px;
  box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.35);
  width: 90vw;
`;

const beginButton = css`
  letter-spacing: 4px;
  width: 245px;
  height: 60px;
  margin: 5px;
  background-color: #ff4755;
  &:hover {
    background-color: rgba(255, 15, 0, 1);
  }
`;

const buttonBorder = css`
  margin-top: 50px;
  position: relative;
  line-height: 1.4;
  padding: 0.1em;
  display: inline-block;
  border-bottom: solid 1px rgba(63, 69, 81, 0.5);
  border-top: solid 1px rgba(63, 69, 81, 0.5);

  &:before,
  &:after {
    border-width: 0.5px;
    position: absolute;
    content: "";
    width: 99.2%;
    display: inline-block;
    right: 0;
  }
  &:before {
    border-left: solid 1px rgba(63, 69, 81, 0.5);
    border-right: solid 1px rgba(63, 69, 81, 0.5);
    height: 40%;
    top: 0;
  }
  &:after {
    bottom: 0;
    border-left: solid 1px rgba(63, 69, 81, 0.5);
    border-right: solid 1px rgba(63, 69, 81, 0.5);
    height: 40%;
  }
`;

const strongLine = css`
  background: linear-gradient(transparent 70%, #c1e0ff 40%);
  font-weight: bold;
`;

const negativeStrongLine = css`
  background: linear-gradient(transparent 70%, #ffadad 40%);
  font-weight: bold;
`;

const whiteSpace = css`
  white-space: pre-wrap;
`;

const card = css`
  width: 700px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 20px;
  margin-left: 20px;
  box-shadow: none;
  position: relative;
  line-height: 1.4;
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
