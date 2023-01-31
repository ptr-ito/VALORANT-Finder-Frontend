import react from "react";
import { AppBar, Box, Typography, Toolbar, Grid } from "@mui/material";
import { css } from "@emotion/react";
import "font-awesome/css/font-awesome.min.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Footer = () => {
  const returnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <AppBar position="static" elevation={0} css={appBar}>
        <Toolbar>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Button color="inherit" disableRipple={true} css={navButton} onClick={returnTop}>
              <Typography variant="caption" css={spacing}>
                Topに戻る
              </Typography>
            </Button>
            <Button color="inherit" disableRipple={true} css={navButton}>
              <Typography variant="caption" css={spacing}>
                利用規約
              </Typography>
            </Button>
            <Button component={Link} to="privacy" color="inherit" disableRipple={true} css={navButton}>
              <Typography variant="caption" css={spacing}>
                プライバシーポリシー
              </Typography>
            </Button>
            <Button color="inherit" disableRipple={true} css={navButton}>
              <Typography variant="caption" css={spacing}>
                お問い合わせ
              </Typography>
            </Button>
          </Grid>
        </Toolbar>
        <Toolbar>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Typography variant="caption" css={copyright}>
              &copy; 2023 VALORANT FINDER
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;

// css

const appBar = css`
  background-color: #3f4551;
  color: #fff;
`;

const spacing = css`
  margin-right: 20px;
  margin-left: 20px;
`;

const copyright = css`
  letter-spacing: 3px;
`;

const navButton = css`
  &:hover {
    color: #ff4755;
    border-bottom: 1px solid #ff4755;
    border-radius: 0;
  }
`;
