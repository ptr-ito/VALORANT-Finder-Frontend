import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Header from "components/layouts/Header";
import HeaderForMobile from "components/layouts/HeaderForMobile";
import { css } from "@emotion/react";
import Footer from "components/layouts/Footer";
import { useMediaQueryContext } from "providers/MediaQueryProvider";
import MobileNavbar from "components/layouts/MobileNavbar";
import FooterForMobile from "./FooterForMobile";

// 全てのページで共通となるレイアウト
const DefaultLayout = memo(() => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();

  return (
    <>
      <Box component="header">
        {isPcSite && <Header />}
        {isMobileSite && <HeaderForMobile />}
      </Box>
      <Box component="main" css={main}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Outlet />
        </Grid>
      </Box>
      <Box component="footer">
        {isPcSite && <Footer />}
        {isMobileSite && <FooterForMobile />}
        {isMobileSite && <MobileNavbar />}
      </Box>
    </>
  );
});

export default DefaultLayout;

//css

const main = css`
  padding-top: 80px;
  padding-bottom: 8rem;
  width: 100vw;
`;
