import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Container, Grid, Box } from "@mui/material";
import Header from "components/layouts/Header";
import { css } from "@emotion/react";

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
`;
