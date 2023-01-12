import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Typography, cardActionAreaClasses } from "@mui/material";
import MatchPostItem from "components/pages/post/MatchPostItem";
import MatchPostForm from "components/pages/post/MatchPostForm";
import Button from "@mui/material/Button";
import { getPosts } from "lib/api/matchPosts";
import { MatchPost, MatchPostComment } from "interfaces/index";
import Divider from "@mui/material/Divider";
import { css } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import "index.css";
import macth_samb from "assets/images/macth_samb.jpeg";
import Modal from "react-modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PostCommentItem from "components/pages/comment/PostCommentItem";
import { showPost } from "lib/api/matchPosts";
import PostCommentForm from "components/pages/comment/PostCommentForm";

const PostCommentList = (query: any) => {
  const [matchPosts, setMatchPosts] = useState<MatchPost[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [postComments, setPostComments] = useState<MatchPostComment[]>([]);

  useEffect(() => {
    if (openModal) document.body.style.overflow = "hidden";
    else document.body.removeAttribute("style");
    return () => {
      document.body.removeAttribute("style");
    };
  }, [openModal]);

  const handleGetComments = async (query: any) => {
    try {
      const res = await showPost(query.id);

      if (res.status === 200) {
        console.log(res.data.included);
        setPostComments(res.data.included);
      } else {
        console.log("No posts");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   handleGetComments(query);
  // }, [query]);

  return (
    <Container maxWidth="lg">
      <Grid container direction="row" justifyContent="center">
        <Grid item>{/* <PostCommentForm query={query} /> */}</Grid>
        <Grid item>
          {postComments?.map((postComment: MatchPostComment) => {
            return <PostCommentItem key={postComment.attributes.id} postComment={postComment} />;
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostCommentList;

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
