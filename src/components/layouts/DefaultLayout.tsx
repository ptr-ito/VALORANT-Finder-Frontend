import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Header from "components/layouts/Header";
import { css } from "@emotion/react";
import Footer from "components/layouts/Footer";

// 全てのページで共通となるレイアウト
const DefaultLayout = memo(() => {
  return (
    <>
      <Box component="header">
        <Header />
      </Box>
      <Box component="main" css={main}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
      <Box component="footer">
        <Footer />
      </Box>
    </>
  );
});

export default DefaultLayout;

//css

const main = css`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding-top: 8rem;
  padding-bottom: 8rem;
  height: 
`;
