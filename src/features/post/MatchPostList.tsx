import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Typography } from "@mui/material";
import MatchPostItem from "features/post/MatchPostItem";
import MatchPostForm from "features/post/MatchPostForm";
import Button from "@mui/material/Button";
import { getPosts } from "lib/api/matchPosts";
import { MatchPost } from "interfaces/index";
import { css } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import "index.css";
import match_samb from "assets/images/match_samb.png";
import mobile_match_samb from "assets/images/mobile_match_samb.png";
import Modal from "react-modal";
import { AuthContext } from "App";
import { useNavigate } from "react-router-dom";
import useAlertMessage from "hooks/useAlertMessage";
import { Icon } from "components/ui/icon/Icon";
import { HeadBlock } from "components/util/HeadBlock";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

const MatchPostList = () => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();
  const { isSignedIn } = useContext(AuthContext);
  const { error } = useAlertMessage();
  const navigate = useNavigate();
  const [matchPosts, setMatchPosts] = useState<MatchPost[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    if (isSignedIn) {
      setOpenModal(true);
    } else {
      navigate("/signin");
      {
        error("ログインしてください");
      }
    }
  };
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    if (openModal) document.body.style.overflow = "hidden";
    else document.body.removeAttribute("style");
    return () => {
      document.body.removeAttribute("style");
    };
  }, [openModal]);

  const handleGetPosts = async () => {
    try {
      const res = await getPosts();

      if (res.status === 200) {
        console.log(res);
        setMatchPosts(res.data.data);
      } else {
        console.log("No posts");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <>
      <HeadBlock title="マッチ募集一覧 | VALORANT FINDER" />
      <Grid container direction="row" justifyContent="center" css={overflow}>
        {isPcSite && (
          <>
            <Box component="div" css={pcStyle}>
              <Box>
                <img src={match_samb} css={image} />
              </Box>
              <Typography variant="h1" component="p" css={text}>
                マッチ募集
              </Typography>
            </Box>
            <Grid item css={border}>
              <Box css={buttonBorder}>
                <Button variant="contained" onClick={handleOpen} css={openButtonStyle} disableRipple={true} startIcon={<Icon iconName="Create" />}>
                  マッチ募集を投稿する
                </Button>
              </Box>
              <Modal isOpen={openModal} onRequestClose={handleClose} appElement={document.getElementById("root") || undefined} style={customStyles}>
                <Button onClick={handleClose} css={closeButtonStyle} startIcon={<CloseIcon />} disableRipple={true}>
                  閉じる
                </Button>
                {<MatchPostForm handleGetPosts={handleGetPosts} setOpenModal={setOpenModal} />}
              </Modal>
              {matchPosts.length === 0 ? (
                <Typography css={nonePost}>投稿がありません</Typography>
              ) : (
                <>
                  {matchPosts?.map((matchPost: MatchPost) => {
                    return <MatchPostItem key={matchPost.attributes.id} matchPost={matchPost} handleGetPosts={handleGetPosts} />;
                  })}
                </>
              )}
            </Grid>
          </>
        )}
        {isMobileSite && (
          <>
            <Box component="div" css={divStyle}>
              <img src={mobile_match_samb} />
              <Typography component="p" css={mobileText}>
                マッチ募集
              </Typography>
            </Box>
            <Grid item>
              <Grid container direction="row" justifyContent="center" css={border}>
                <Box css={buttonBorder}>
                  <Button variant="contained" onClick={handleOpen} css={openButtonStyle} disableRipple={true} startIcon={<Icon iconName="Create" />}>
                    マッチ募集を投稿する
                  </Button>
                </Box>
              </Grid>
              <Modal isOpen={openModal} onRequestClose={handleClose} appElement={document.getElementById("root") || undefined} style={mobileCustomStyles}>
                <Button onClick={handleClose} css={mobileCloseButtonStyle} startIcon={<CloseIcon />} disableRipple={true}>
                  閉じる
                </Button>
                {<MatchPostForm handleGetPosts={handleGetPosts} setOpenModal={setOpenModal} />}
              </Modal>
              {matchPosts.length === 0 ? (
                <Typography css={nonePost}>投稿がありません</Typography>
              ) : (
                <>
                  {matchPosts?.map((matchPost: MatchPost) => {
                    return <MatchPostItem key={matchPost.attributes.id} matchPost={matchPost} handleGetPosts={handleGetPosts} />;
                  })}
                </>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default MatchPostList;

// css

const divStyle = css`
  position: relative;
`;

const pcStyle = css`
  position: relative;
`;

const image = css``;

const overflow = css`
  overflow: hidden;
`;

const mobileText = css`
  position: absolute;
  color: #ff4755;
  top: 50%;
  left: 50%;
  opacity: 0.9;
  font-weight: bold;
  font-size: 25px;
  letter-spacing: 2px;
  font-family: "Noto Sans JP", sans-serif;
  margin: 0;
  padding: 0;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const text = css`
  position: absolute;
  color: #ff4755;
  top: 50%;
  left: 50%;
  opacity: 0.9;
  font-weight: bold;
  font-size: 45px;
  letter-spacing: 7px;
  font-family: "Noto Sans JP", sans-serif;
  margin: 0;
  padding: 0;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const openButtonStyle = css`
  background-color: #ff4755;
  width: 274px;
  height: 59px;
  &:hover {
    background-color: #ff4755;
  }
`;

const closeButtonStyle = css`
  color: black;
  font-size: 16px;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "900px",
    height: "880px",
  },
  overlay: {
    zIndex: 10,
  },
};

const border = css`
  margin-top: 50px;
  padding-bottom: 50px;
  border-top: solid 1px #ced1d8;
  position: relative;
  &: after {
    position: absolute;
    content: " ";
    display: block;
    border-top: solid 1px #3f4551;
    top: -1px;
    width: 31%;
  }
`;

const buttonBorder = css`
  margin-top: 50px;
  position: relative;
  line-height: 1.4;
  padding: 0.5em 0.5em;
  display: inline-block;
  border-bottom: solid 1px rgba(63, 69, 81, 0.5);
  border-top: solid 1px rgba(63, 69, 81, 0.5);

  &:before,
  &:after {
    border-width: 0.5px;
    position: absolute;
    content: "";
    width: 99.2%;
    display: inline-block;
    right: 0;
  }
  &:before {
    border-left: solid 1px rgba(63, 69, 81, 0.5);
    border-right: solid 1px rgba(63, 69, 81, 0.5);
    height: 40%;
    top: 0;
  }
  &:after {
    bottom: 0;
    border-left: solid 1px rgba(63, 69, 81, 0.5);
    border-right: solid 1px rgba(63, 69, 81, 0.5);
    height: 40%;
  }
`;

const nonePost = css`
  text-align: center;
  margin-top: 100px;
`;

// css for mobile
const mobileCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    height: "88vh",
  },
  overlay: {
    zIndex: 10,
  },
};

const mobileCloseButtonStyle = css`
  color: black;
  font-size: 16px;
`;
