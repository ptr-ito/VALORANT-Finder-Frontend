import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { css } from "@emotion/react";
import Groups3Icon from "@mui/icons-material/Groups3";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const SideBar = () => {
  return (
    <div css={sidebarStyles}>
      <Sidebar width="350px" css={fixed}>
        <Menu>
          <MenuItem
            icon={<HomeIcon />}
            routerLink={<Link to="/" />}
            css={menuSpace}
          >
            ホーム
          </MenuItem>
          <MenuItem
            icon={<Groups3Icon />}
            routerLink={<Link to="/post" />}
            css={menuSpace}
          >
            マッチ募集
          </MenuItem>
          <MenuItem icon={<PersonAddIcon />} css={menuSpace}>
            フレンド募集
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;

//css
const sidebarStyles = css`
  display: flex;
  height: 140vh;
  margin-top: 1px;
`;

const fixed = css`
  position: fixed;
`;

const menuSpace = css`
  margin-top: 10px;
`;
