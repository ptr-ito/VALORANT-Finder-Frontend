import { Box, Typography, Toolbar, Container, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import "css/layout/Sidebar.css";
import { Icon } from "components/ui/Icon/Icon";
import { css } from "@emotion/react";

const NavlinkMenu = () => {
  return (
    <>
      <NavLink
        to="/"
        end
        style={{ textDecoration: "none" }}
        className="iconColor"
      >
        <Typography
          component="div"
          sx={{
            flexGrow: 1,
          }}
          css={menuTitle}
        >
          <Icon name="Home" css={menuIcon} />
          ホーム
        </Typography>
      </NavLink>
    </>
  );
};

export default NavlinkMenu;

// css
const menuIcon = css`
  margin-rigt: 10px;
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
`;

const menuTitle = css`
  font-size: 1.2rem;
  line-height: 2rem;
  font-weight: 400;
  color: white;
`;
