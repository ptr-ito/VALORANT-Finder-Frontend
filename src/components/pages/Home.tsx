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
import { HeadBlock } from "components/util/HeadBlock";

export const SampleHome = () => {
  return (
    <>
      <HeadBlock />
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Box component="div" css={divStyle}>
          <img src={home} css={imgStyle} />
          <Typography css={text}>VALORANT FINDER</Typography>
          <Typography variant="h5" sx={{ mt: 5 }} css={textContent}>
            VALORANT FINDERへようこそ！
          </Typography>
          <Typography variant="h5" sx={{ mt: 5 }} css={textContentSub}>
            気の合う仲間たちと一緒にVALORANTを更に楽しみましょう！
          </Typography>
        </Box>
        <Grid item>
          <Box css={[boxStyle, boxStyleBottom]}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <List sx={{ mt: 5 }}>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Icon iconName="Problem" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography>SNSの募集から参加したけど思っていた雰囲気と違う...</Typography>} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Icon iconName="Problem" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography>誰かと一緒にプレイしてみたいけど中々踏み出せない...</Typography>} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Icon iconName="Problem" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography>募集したのに誰も来ない！</Typography>} />
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
            <Typography variant="body1" sx={{ mt: 5, pb: 5 }} css={[listBorder, textStyle]}>
              プロフィールを詳しく設定することで自分の情報を他のユーザーと共有できます。
            </Typography>
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
            <Typography variant="body1" sx={{ mt: 5 }} css={textStyle}>
              多様なプレイスタイルにマッチできるように様々な選択肢を用意しているので、
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }} css={textStyle}>
              「雰囲気が合わなかった...」「使えるエージェントの枠が埋まっている...」「自分のランクに適正？」
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }} css={textStyle}>
              などのミスマッチを事前に回避することが出来ます。
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, pb: 5 }} css={[textStyle, listBorder]}>
              合う募集がない場合は自分で投稿してみましょう！
            </Typography>
          </Grid>
          <Typography></Typography>
        </Grid>
      </Grid>
    </>
  );
};

// css

const imgStyle = css`
  margin-top: -50px;
`;

const divStyle = css`
  position: relative;
`;

const text = css`
  position: absolute;
  text-shadow: 0px 4px;
  color: #ff4755;
  top: 30%;
  left: 50%;
  opacity: 0.9;
  font-weight: bold;
  font-size: 3em;
  font-family: "Noto Sans JP", sans-serif;
  margin: 0;
  padding: 0;
  letter-spacing: 4px;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
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

const textContent = css`
  position: absolute;
  color: #fff;
  left: 50%;
  top: 55%;
  font-family: "Noto Sans JP", sans-serif;
  margin: 0;
  padding: 0;
  letter-spacing: 4px;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const textContentSub = css`
  position: absolute;
  color: #fff;
  left: 50%;
  top: 65%;
  font-family: "Noto Sans JP", sans-serif;
  margin: 0;
  padding: 0;
  letter-spacing: 4px;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const introImage = css`
  margin-top: 20px;
  box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.35);
`;

const listBorder = css`
  border-bottom: solid 1px #ced1d8;
  width: 900px;
  position: relative;
  &: before {
    position: absolute;
    content: " ";
    display: block;
    border-bottom: solid 1px #3f4551;
    bottom: -1px;
    left: 35%;
    width: 30%;
  }
`;
