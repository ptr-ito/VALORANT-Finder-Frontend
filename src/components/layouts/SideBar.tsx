import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { css } from "@emotion/react";
import Groups3Icon from "@mui/icons-material/Groups3";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const SideBar = () => {
  return (
    <div css={sidebarStyles}>
      <Sidebar width="350px">
        <Menu>
          <MenuItem icon={<HomeIcon />}>ホーム</MenuItem>
          <MenuItem icon={<Groups3Icon />}>マッチ募集</MenuItem>
          <MenuItem icon={<PersonAddIcon />}>フレンド募集</MenuItem>
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
