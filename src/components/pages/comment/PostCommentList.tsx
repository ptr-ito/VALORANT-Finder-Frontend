import React, { useEffect, useState, useContext } from "react";
import { Container, Grid, Box, Typography, cardActionAreaClasses } from "@mui/material";
import MatchPostItem from "components/pages/post/MatchPostItem";
import MatchPostForm from "components/pages/post/MatchPostForm";
import Button from "@mui/material/Button";
import { getPostComment } from "lib/api/comments";
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
import { useNavigate, useParams, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "App";

const PostCommentList = (query: any) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [postComments, setPostComments] = useState<MatchPostComment[]>([]);
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);

  const rootComments = postComments.filter((comment) => comment.attributes.rootId === null);

  const getReplies = (commentId: string) => {
    return postComments.filter((comment) => comment.attributes.rootId === commentId);
  };

  // console.log(postComments.filter((comment) => comment.attributes.rootId == "83"));

  useEffect(() => {
    handleGetComments(query);
  }, [query]);

  const handleGetComments = async (query: any) => {
    try {
      const res = await getPostComment(query.query.id);

      if (res.status === 200) {
        setPostComments(res.data.data);
      } else {
        console.log("No comments");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (openModal) document.body.style.overflow = "hidden";
  //   else document.body.removeAttribute("style");
  //   return () => {
  //     document.body.removeAttribute("style");
  //   };
  // }, [openModal]);

  return (
    <Grid container direction="column" css={bottomSpace}>
      {rootComments?.map((postComment: MatchPostComment) => {
        return <PostCommentItem key={postComment.attributes.id} postComment={postComment} query={query} handleGetComments={handleGetComments} replies={getReplies(postComment.attributes.id)} />;
      })}
      {isSignedIn ? (
        <>
          <Grid container alignItems="center">
            <Grid item>
              <Avatar src={currentUser?.attributes.image.url} css={avatar} />
            </Grid>
            <Grid item>
              <Typography variant="h5" css={commentFormTitle}>
                コメントする
              </Typography>
            </Grid>
          </Grid>
          <PostCommentForm query={query} handleGetComments={handleGetComments} />
        </>
      ) : (
        <>
          <Box textAlign="center" css={navBox}>
            <Typography variant="body1" css={navStyle}>
              コメントするためには
              <Typography variant="body1" component={Link} to="/signin">
                ログイン
              </Typography>
              が必要です。
            </Typography>
            <Typography sx={{ mb: 1 }}>アカウントをお持ちでない場合は</Typography>
            <Button variant="outlined" color="inherit" component={Link} to="/signup" disableRipple={true}>
              新規登録する
            </Button>
          </Box>
        </>
      )}
    </Grid>
  );
};

export default PostCommentList;

// css

const avatar = css`
  width: 48px;
  height: 48px;
`;

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

const bottomSpace = css`
  margin-bottom: 40px;
`;

const navStyle = css`
  margin-top: 50px;
  margin-bottom: 30px;
`;

const navBox = css`
  border-top: dotted 1px #535aaa;
`;

const commentFormTitle = css`
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 15px;
`;
