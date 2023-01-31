import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import home from "assets/images/home.png";
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

export const SampleHome = () => {
  return (
    <>
      <HeadBlock />
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Box component="div" css={divStyle}>
          <img src={home} css={imgStyle} />
        </Box>
        <Grid item>
          <Box css={[boxStyle, boxStyleBottom]}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <List sx={{ mt: 5 }}>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Icon iconName="Problem" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography css={negativeStrongLine}>SNSの募集から参加したけど思っていた雰囲気と違う...</Typography>} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Icon iconName="Problem" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography css={negativeStrongLine}>誰かと一緒にプレイしてみたいけど中々踏み出せない...</Typography>} />
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
            </Grid>
            <Typography sx={{ mt: 5 }} css={textStyle}>
              ...といった悩みを抱えたことはありませんか？
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }} css={textStyle}>
              VALORANT FINDERはそんな悩みを解消するお手伝いをします。
            </Typography>
          </Box>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <List sx={{ mt: 5 }}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon iconName="Light" />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h5">プロフィール機能</Typography>} />
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
            <Divider sx={{ width: "700px" }} />
            <List>
              <ListItem disablePadding sx={{ mt: 5 }}>
                <ListItemIcon>
                  <Icon iconName="Light" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="h5">マッチ募集機能</Typography>
                    </>
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
            <Divider sx={{ width: "700px" }} />
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
            <Divider sx={{ width: "700px" }} />
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ mt: 10, pb: 8 }}>
            <Typography variant="h5">自分にあった募集を見つけてVALORANTを更に楽しみましょう！</Typography>
            <Box css={buttonBorder}>
              <Button variant="contained" disableRipple={true} css={beginButton} component={Link} to="/signup">
                新規登録
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// css

const imgStyle = css`
  margin-top: -50px;
  margin-left: -15px;
`;

const divStyle = css`
  position: relative;
`;

const textStyle = css`
  text-align: center;
`;

const boxStyle = css`
  margin-top: 50px;
  padding-bottom: 50px;
  border-top: solid 1px #ced1d8;
  width: 900px;
  position: relative;
  &: after {
    position: absolute;
    content: " ";
    display: block;
    border-top: solid 1px #3f4551;
    top: -1px;
    width: 21%;
  }
`;

const boxStyleBottom = css`
  border-bottom: solid 1px #ced1d8;
  position: relative;
  &: before {
    position: absolute;
    content: " ";
    display: block;
    border-bottom: solid 1px #3f4551;
    bottom: -1px;
    left: 79%;
    width: 21%;
  }
`;

const introImage = css`
  margin-top: 20px;
  margin-bottom: 30px;
  box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.35);
  width: 700px;
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
  padding: 0.25em 1em;
  display: inline-block;
  top: 0;
  &:before,
  &:after {
    position: absolute;
    top: 0;
    content: "";
    width: 8px;
    height: 100%;
    display: inline-block;
  }
  &:before {
    border-left: solid 1px black;
    border-top: solid 1px black;
    border-bottom: solid 1px black;
    left: 0;
  }
  &:after {
    content: "";
    border-top: solid 1px black;
    border-right: solid 1px black;
    border-bottom: solid 1px black;
    right: 0;
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
