import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { useProSidebar } from "react-pro-sidebar";

import HeaderButton from "./HeaderButton";

const Header = () => {
  const { collapseSidebar } = useProSidebar();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} css={appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => collapseSidebar()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "ValorantFont",
              letterSpacing: ".1rem",
            }}
          >
            VALORANT Finder
          </Typography>
          <HeaderButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

// css
const appBar = css`
  background-color: #3f4551;
  color: #fff;
  flex-grow: 1;
  position: fixed;
  z-index: 1000;
`;
