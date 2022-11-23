import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Header from "components/layouts/Header";

export const CommonLayout: FC = memo(() => {
  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      sx={{
        height: "200vh",
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            height: "100%",
            background: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <Header />
          <div className="scrolldown">
            <span>Scroll</span>
          </div>
        </Box>
      </Grid>
      <Grid item xs={6} height="100%"></Grid>
    </Grid>
  );
});
