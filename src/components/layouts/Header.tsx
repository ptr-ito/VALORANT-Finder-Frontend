import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AppBar, Box, Typography, Toolbar, Grid, Container } from "@mui/material";
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
import title from "assets/images/title.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = React.useState<MyDialogProps | undefined>();

  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSignOut = async () => {
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
          Cookies.remove("_access_token");
          Cookies.remove("_client");
          Cookies.remove("_uid");

          setOpen(false);
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
    if (!loading) {
      if (isSignedIn) {
        return (
          <Button color="inherit" onClick={handleSignOut} disableRipple={true}>
            ログアウト
          </Button>
        );
      } else {
        return (
          <Box sx={{ ml: "auto", display: "flex" }}>
            <Button color="inherit" component={Link} to="/signin" disableRipple={true} css={loginButton}>
              ログイン
            </Button>
            <Button color="inherit" component={Link} to="/signup" disableRipple={true} css={signupButton}>
              新規登録
            </Button>
          </Box>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} css={appBar}>
        <Toolbar css={toolBar}>
          <Link to="/">
            <img src={title} css={siteTitle} />
          </Link>
          {windowDimensions.width < 1435 ? (
            <>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleOpen} css={sideBarOpenButton}>
                <Icon iconName="Menu" />
              </IconButton>
              <Drawer
                anchor="right"
                open={open}
                onClose={toggleOpen}
                elevation={0}
                PaperProps={{
                  sx: {
                    width: 240,
                    backgroundColor: "#3f4551",
                  },
                }}
              >
                <IconButton size="large" color="inherit" disableRipple={true} onClick={toggleOpen} css={sideBarCloseButton}>
                  <Icon iconName="Menu" />
                </IconButton>
                <Grid container justifyContent="flex-start" alignItems="center">
                  <Button component={NavLink} to="/" startIcon={<HomeIcon />} disableRipple={true} css={sideBarButton} sx={{ width: "136px" }} onClick={toggleOpen}>
                    <Typography css={contentMenuText} sx={{ ml: 2 }}>
                      ホーム
                    </Typography>
                  </Button>
                  <Button component={NavLink} to="post" end startIcon={<Icon iconName="Match_find" />} disableRipple={true} css={sideBarButton} onClick={toggleOpen}>
                    <Typography css={contentMenuText} sx={{ ml: 2 }}>
                      マッチ募集
                    </Typography>
                  </Button>
                  <Button component={NavLink} to="mypage" startIcon={<AccountCircleIcon />} disableRipple={true} css={sideBarButton} onClick={toggleOpen}>
                    <Typography css={contentMenuText} sx={{ ml: 2 }}>
                      マイページ
                    </Typography>
                  </Button>
                </Grid>
                <Box sx={{ mt: 20 }}>
                  <Grid container justifyContent="center" alignItems="center">
                    <Divider css={divider} />
                  </Grid>
                  <Grid container justifyContent="flex-start" alignItems="center">
                    <Button component={Link} to="tos" color="inherit" disableRipple={true} css={navButton} sx={{ width: "119.77px" }} onClick={toggleOpen}>
                      <Typography variant="caption">利用規約</Typography>
                    </Button>
                    <Button component={Link} to="privacy" color="inherit" disableRipple={true} css={navButton} onClick={toggleOpen}>
                      <Typography variant="caption">プライバシーポリシー</Typography>
                    </Button>
                    <Button component={Link} to="contact" color="inherit" disableRipple={true} css={navButton} sx={{ width: "119.77px", mb: "25px" }} onClick={toggleOpen}>
                      <Typography variant="caption">お問い合わせ</Typography>
                    </Button>
                  </Grid>
                  <Grid container justifyContent="center" alignItems="center">
                    <Divider css={divider} />
                  </Grid>
                </Box>
                <Grid container justifyContent="center" alignItems="center">
                  {isSignedIn ? (
                    <Button color="inherit" onClick={handleSignOut} disableRipple={true} css={[loginButton, sideAuthButton]}>
                      ログアウト
                    </Button>
                  ) : (
                    <>
                      <Button color="inherit" component={Link} to="/signin" disableRipple={true} css={[loginButton, sideAuthButton]} onClick={toggleOpen}>
                        ログイン
                      </Button>
                      <Button color="inherit" component={Link} to="/signup" disableRipple={true} css={[signupButton, sideAuthButton]} onClick={toggleOpen}>
                        新規登録
                      </Button>
                    </>
                  )}
                </Grid>
                {modalConfig && <MyDialog {...modalConfig} />}
              </Drawer>
            </>
          ) : (
            <>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Button component={NavLink} to="/" startIcon={<HomeIcon />} disableRipple={true} css={contentButtonStyle} sx={{ ml: 10 }}>
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
            </>
          )}
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
  position: fixed;
  z-index: 1;
`;

const signupButton = css`
  background-color: #ff4755;
  width: 100px;
  margin-right: 30px;
  &:hover {
    background-color: rgba(255, 15, 0, 1);
  }
`;

const loginButton = css`
  background-color: #3f4551;
  width: 100px;
`;

const siteTitle = css`
  color: #fff;
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

const sideBarButton = css`
  color: #fff;
  margin-top: 27px;
  margin-bottm: 27px;
  margin-left: 30px;
  margin-right: 30px;
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

  display: flex;
  justify-content: flex-start;
`;

const sideBarCloseButton = css`
  color: #fff;
  margin: 30px;
  bottom: 15px;
`;

const sideAuthButton = css`
  color: #fff;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 20px;
  top: 30px;
`;

const divider = css`
  background-color: #fff;
  width: 200px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const navButton = css`
  color: #fff;
  margin-top: 25px;
  margin-bottm: 25px;
  margin-right: 30px;
  margin-left: 30px;
  &:hover {
    color: #ff4755;
    border-bottom: 1px solid #ff4755;
    border-radius: 0;
  }
  display: flex;
  justify-content: flex-start;
`;

const sideBarOpenButton = css`
  margin-left: auto;
`;
