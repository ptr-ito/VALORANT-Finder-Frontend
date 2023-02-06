import React, { useEffect, useState } from "react";
import { AppBar, Box, Typography, Toolbar, Grid } from "@mui/material";
import { css } from "@emotion/react";
import "font-awesome/css/font-awesome.min.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const FooterForMobile = () => {
  const returnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      {windowDimensions.width < 560 ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0} css={appBar}>
            <Toolbar css={toolBar}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Button color="inherit" disableRipple={true} css={navButton} onClick={returnTop}>
                  <Typography variant="caption" css={spacing}>
                    Topに戻る
                  </Typography>
                </Button>
                <Button component={Link} to="tos" color="inherit" disableRipple={true} css={navButton}>
                  <Typography variant="caption" css={spacing}>
                    利用規約
                  </Typography>
                </Button>
              </Grid>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Button component={Link} to="privacy" color="inherit" disableRipple={true} css={navButton}>
                  <Typography variant="caption" css={spacing}>
                    プライバシーポリシー
                  </Typography>
                </Button>
                <Button component={Link} to="contact" color="inherit" disableRipple={true} css={navButton}>
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
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0} css={appBar}>
            <Toolbar css={toolBar}>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Button color="inherit" disableRipple={true} css={navButton} onClick={returnTop}>
                  <Typography variant="caption" css={spacing}>
                    Topに戻る
                  </Typography>
                </Button>
                <Button component={Link} to="tos" color="inherit" disableRipple={true} css={navButton}>
                  <Typography variant="caption" css={spacing}>
                    利用規約
                  </Typography>
                </Button>
                <Button component={Link} to="privacy" color="inherit" disableRipple={true} css={navButton}>
                  <Typography variant="caption" css={spacing}>
                    プライバシーポリシー
                  </Typography>
                </Button>
                <Button component={Link} to="contact" color="inherit" disableRipple={true} css={navButton}>
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
        </Box>
      )}
    </>
  );
};

export default FooterForMobile;

// css

const appBar = css`
  background-color: #fff;
  margin-bottom: 80px;
  width: 100vw;
`;

const toolBar = css`
  height: 80px;
`;

const spacing = css`
  margin-right: 20px;
  margin-left: 20px;
`;

const copyright = css`
  letter-spacing: 3px;
  color: #3f4551;
`;

const navButton = css`
  color: #3f4551;
  &:hover {
    color: #ff4755;
    border-bottom: 1px solid #ff4755;
    border-radius: 0;
  }
`;
