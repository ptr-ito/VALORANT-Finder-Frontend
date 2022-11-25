import { ReactNode } from "react";
import { Container, Grid } from "@mui/material";
import Header from "components/layouts/Header";
import SideBar from "components/layouts/SideBar";
import { css } from "@emotion/react";

// 全てのページで共通となるレイアウト
const DefaultLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main css={main}>
        <SideBar />
        <Container maxWidth="lg">
          <Grid container justifyContent="center">
            {children}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default DefaultLayout;

//css
const main = css`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding-top: 4rem;
`;
