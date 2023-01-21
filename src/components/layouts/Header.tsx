import React, { useContext } from "react";
import Cookies from "js-cookie";
import { AppBar, Box, Typography, Toolbar, Grid } from "@mui/material";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { MyDialog, MyDialogProps } from "components/util/MyDialog";
import { Icon } from "components/ui/icon/Icon";
import { signOut } from "lib/api/auth";
import { AuthContext } from "App";
import { RotatingSquare } from "react-loader-spinner";
import title from "assets/images/title.png";

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = React.useState<MyDialogProps | undefined>();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const ret = await new Promise<string>((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "ログアウトしますか?",
          ok: "ログアウト",
          cancel: "キャンセル",
        });
      });
      setModalConfig(undefined);
      if (ret === "ok") {
        const res = await signOut();
        if (res.data.success === true) {
          // サインアウト時には各Cookieを削除
          Cookies.remove("_access_token");
          Cookies.remove("_client");
          Cookies.remove("_uid");

          setIsSignedIn(false);
          navigate("/");

          console.log("Succeeded in sign out");
        } else {
          console.log("Failed in sign out");
        }
        console.log("ログアウトする:OK時の処理を実行する");
      }
      if (ret === "cancel") {
        console.log("ログアウトする:Cancel時の処理を実行する");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <Button color="inherit" onClick={handleSignOut} disableRipple={true}>
            ログアウト
          </Button>
        );
      } else {
        return (
          <>
            <Button color="inherit" component={Link} to="/signin" disableRipple={true} css={loginButton}>
              ログイン
            </Button>
            <Button color="inherit" component={Link} to="/signup" disableRipple={true} css={signupButton}>
              新規登録
            </Button>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <AppBar position="static" elevation={0} css={appBar}>
          <Toolbar css={toolBar}>
            <img src={title} css={siteTitle} />
            {/* <Typography variant="h5" component={Link} to="/" css={siteTitle}>
              VALORANT Finder
            </Typography> */}
            <Grid item xs={6}>
              <Button component={NavLink} to="/" startIcon={<HomeIcon />} disableRipple={true} css={contentButtonStyle}>
                <Typography css={contentMenuText}>ホーム</Typography>
              </Button>
              <Button component={NavLink} to="post" end startIcon={<Icon iconName="Match_find" />} disableRipple={true} css={contentButtonStyle}>
                <Typography css={contentMenuText}>マッチ募集</Typography>
              </Button>
              {/* <Button component={NavLink} to="friend" startIcon={<PersonSearchIcon />} disableRipple={true} css={contentButtonStyle}>
                <Typography css={contentMenuText}>フレンド募集</Typography>
              </Button>
              <Button component={NavLink} to="teams" startIcon={<PersonAddIcon />} disableRipple={true} css={contentButtonStyle}>
                <Typography css={contentMenuText}>固定パーティ募集</Typography>
              </Button> */}
              <Button component={NavLink} to="mypage" startIcon={<AccountCircleIcon />} disableRipple={true} css={contentButtonStyle}>
                <Typography css={contentMenuText}>マイページ</Typography>
              </Button>
            </Grid>
            <AuthButtons />
            {modalConfig && <MyDialog {...modalConfig} />}
          </Toolbar>
        </AppBar>
      </Grid>
    </Box>
  );
};

export default Header;

// css
const appBar = css`
  background-color: #3f4551;
  color: #fff;
  position: fixed;
  z-index: 1;
`;

const signupButton = css`
  background-color: #ff4755;
  marginrn-left: auto;
  &:hover {
    background-color: rgba(255, 15, 0, 1);
  }
`;

const loginButton = css`
  background-color: #3f4551;
`;

const siteTitle = css`
  color: #fff;
  margin-right: 450px;
`;

const contentButtonStyle = css`
  color: #fff;
  margin-right: 40px;
  &:hover {
    color: #ff4755;
    border-bottom: 3px solid #ff4755;
    border-radius: 0;
  }
  &.active {
    color: #ff4755;
    border-bottom: 3px solid #ff4755;
    border-radius: 0;
  }
`;

const contentMenuText = css`
  font-weight: 750;
`;

const toolBar = css`
  height: 80px;
`;

const authButton = css`
  marginrn-left: auto;
`;
