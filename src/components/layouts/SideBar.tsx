import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { css } from "@emotion/react";
import Groups3Icon from "@mui/icons-material/Groups3";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { NavLink } from "react-router-dom";
import { Icon } from "components/ui/icon/Icon";
import { Box, Typography, Toolbar, Container, Button } from "@mui/material";
import "css/layout/Sidebar.css";

const SideBar = () => {
  return (
    <div css={sidebarStyles}>
      <Sidebar width="350px">
        <Menu>
          <NavLink to="/" end css={textColor}>
            <MenuItem icon={<Icon name="Home" css={menuIcon} />}>
              <Typography
                component="div"
                sx={{
                  ml: "24px",
                  align: "center",
                }}
              >
                ホーム
              </Typography>
            </MenuItem>
          </NavLink>
          <NavLink to="post" end css={textColor}>
            <MenuItem icon={<Groups3Icon />} css={menuSpace}>
              <Typography
                component="div"
                sx={{
                  ml: "24px",
                  align: "center",
                }}
              >
                マッチ募集
              </Typography>
            </MenuItem>
          </NavLink>
          <NavLink to="friend" end css={textColor}>
            <MenuItem icon={<PersonAddIcon />} css={menuSpace}>
              <Typography
                component="div"
                sx={{
                  ml: "24px",
                  align: "center",
                }}
              >
                フレンド募集
              </Typography>
            </MenuItem>
          </NavLink>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;

//css
const sidebarStyles = css`
  display: flex;
  position: fixed;
  margin-top: 5px;
  height: 140vh;
`;

const menuSpace = css`
  margin-top: 10px;
  margin-right: 24px;
`;

const menuIcon = css`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const textColor = css`
  color: #3f4551;
`;
