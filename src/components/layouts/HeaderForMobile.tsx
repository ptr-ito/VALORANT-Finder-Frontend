import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AppBar, Box, Toolbar, Grid } from "@mui/material";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { MyDialog, MyDialogProps } from "components/util/MyDialog";
import { signOut } from "lib/api/auth";
import { AuthContext } from "App";
import title from "assets/images/title.png";
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
          <Box sx={{ mt: 2 }}>
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
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Link to="/">
              <img src={title} css={siteTitle} />
            </Link>
            <Divider sx={{ width: "160px", backgroundColor: "#ced1d8", mt: "10px" }} />
            <AuthButtons />
            {modalConfig && <MyDialog {...modalConfig} />}
          </Grid>
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
  top: 0;
`;

const signupButton = css`
  background-color: #ff4755;
  width: 80px;
  height: 30px;
  margin-top: -10px;
  margin-right: 15px;
  &:hover {
    background-color: rgba(255, 15, 0, 1);
  }
`;

const loginButton = css`
  background-color: #3f4551;
  margin-top: -10px;
  width: 80px;
`;

const siteTitle = css`
  color: #fff;
`;

const toolBar = css`
  height: 100px;
  margin-top: -1px;
`;
