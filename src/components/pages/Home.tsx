import React, { useContext } from "react";
import { Typography, Grid, Box } from "@mui/material";
import home from "assets/images/home.png";
import { css } from "@emotion/react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Icon } from "components/ui/icon/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const SampleHome = () => {
  return (
    <>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Box component="div" css={divStyle}>
          <img src={home} css={imgStyle} />
          <Typography component="p" css={text}>
            VALORANT FINDER
          </Typography>
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
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon iconName="Problem" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography>
                          <Typography>SNSの募集から参加したけど思っていた雰囲気と違う...</Typography>
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon iconName="Problem" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography>誰かと一緒にプレイしてみたいけど中々踏み出せない...</Typography>} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon iconName="Problem" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography>募集したのに誰も来ない！</Typography>} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
            <Typography sx={{ mt: 5 }} css={textStyle}>
              ...といった悩みを抱えたことはありませんか？
            </Typography>
            <Typography sx={{ mt: 2 }} css={textStyle}>
              VALORANT FINDERはそんな悩みを解消するお手伝いをします。
            </Typography>
          </Box>
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
