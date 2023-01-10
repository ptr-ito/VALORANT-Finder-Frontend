import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Typography, cardActionAreaClasses } from "@mui/material";
import MatchPostItem from "components/pages/post/MatchPostItem";
import MatchPostForm from "components/pages/post/MatchPostForm";
import Button from "@mui/material/Button";
import { getPosts } from "lib/api/matchPosts";
import { MatchPost } from "interfaces/index";
import Divider from "@mui/material/Divider";
import { css } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import "index.css";
import macth_samb from "assets/images/macth_samb.jpeg";
import Modal from "react-modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const MatchPostList = () => {
  const [matchPosts, setMatchPosts] = useState<MatchPost[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
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
        console.log(res.data.data);
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
    <Container maxWidth="lg">
      <Grid container direction="row" justifyContent="center">
        <Box component="div" css={divStyle}>
          <Grid item>
            <img src={macth_samb} css={imgStyle} />
          </Grid>
          <Typography component="p" css={text}>
            マッチ募集
          </Typography>
        </Box>
        <Divider sx={{ mt: 5, mb: 2 }} />
        <Grid item>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Button variant="contained" onClick={handleOpen} css={openButtonStyle} disableRipple={true} startIcon={<AddCircleIcon />}>
            マッチ募集を投稿する
          </Button>
          <Modal isOpen={openModal} onRequestClose={handleClose} appElement={document.getElementById("root") || undefined} style={customStyles}>
            <Button onClick={handleClose} css={closeButtonStyle} startIcon={<CloseIcon />} disableRipple={true}>
              閉じる
            </Button>
            {<MatchPostForm handleGetPosts={handleGetPosts} setOpenModal={setOpenModal} />}
          </Modal>
          {matchPosts?.map((matchPost: MatchPost) => {
            return <MatchPostItem key={matchPost.attributes.id} matchPost={matchPost} handleGetPosts={handleGetPosts} />;
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MatchPostList;

// css

const imgStyle = css`
  margin-top: -40px;
`;

const divStyle = css`
  position: relative;
`;

const text = css`
  position: absolute;
  color: white;
  top: 50%;
  left: 50%;
  opacity: 0.9;
  font-weight: bold;
  font-size: 2em;
  font-family: "Noto Sans JP", sans-serif;
  margin: 0;
  padding: 0;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const openButtonStyle = css`
  background-color: #ff4755;
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
    top: "54%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "900px",
    height: "800px",
  },
};
