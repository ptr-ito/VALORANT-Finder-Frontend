import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getPostComment } from "lib/api/comments";
import { MatchPostComment, GetComments } from "interfaces/index";
import { css } from "@emotion/react";
import "index.css";
import PostCommentItem from "components/pages/comment/PostCommentItem";
import PostCommentForm from "components/pages/comment/PostCommentForm";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "App";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

const PostCommentList = (query: any) => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();

  const [postComments, setPostComments] = useState<MatchPostComment[]>([]);
  const { isSignedIn, currentUser } = useContext(AuthContext);

  const rootComments = postComments.filter((comment) => comment.attributes.rootId === null);

  const getReplies = (commentId: string) => {
    return postComments.filter((comment) => comment.attributes.rootId === commentId);
  };

  const commentableId = query.query.id;
  const commentableType = "MatchPost";

  const params: GetComments = {
    commentableId: commentableId,
    commentableType: commentableType,
  };

  useEffect(() => {
    handleGetComments();
  }, [query]);

  const handleGetComments = async () => {
    try {
      const res = await getPostComment(params);

      if (res.status === 200) {
        setPostComments(res.data.data);
      } else {
        console.log("No comments");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isPcSite && (
        <Grid container direction="column" css={bottomSpace} sx={{ width: 900 }}>
          {rootComments?.map((postComment: MatchPostComment) => {
            return <PostCommentItem key={postComment.attributes.id} postComment={postComment} query={query} handleGetComments={handleGetComments} replies={getReplies(postComment.attributes.id)} />;
          })}
          {isSignedIn ? (
            <>
              <Grid container alignItems="center" sx={{ mt: 10 }}>
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
                <Typography sx={{ mb: 3 }}>アカウントをお持ちでない場合は</Typography>
                <Button variant="outlined" color="inherit" component={Link} to="/signup" disableRipple={true}>
                  新規登録する
                </Button>
              </Box>
            </>
          )}
        </Grid>
      )}
      {isMobileSite && (
        <Grid container direction="column" css={[bottomSpace, mobileCommentPosition]}>
          {rootComments?.map((postComment: MatchPostComment) => {
            return <PostCommentItem key={postComment.attributes.id} postComment={postComment} query={query} handleGetComments={handleGetComments} replies={getReplies(postComment.attributes.id)} />;
          })}
          {isSignedIn ? (
            <>
              <Grid container alignItems="center" sx={{ mt: 10 }}>
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
              <Box textAlign="center" css={mobileNavBox}>
                <Typography variant="body1" css={navStyle}>
                  コメントするためには
                  <Typography variant="body1" component={Link} to="/signin">
                    ログイン
                  </Typography>
                  が必要です。
                </Typography>
                <Typography sx={{ mb: 3 }}>アカウントをお持ちでない場合は</Typography>
                <Button variant="outlined" color="inherit" component={Link} to="/signup" disableRipple={true}>
                  新規登録する
                </Button>
              </Box>
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default PostCommentList;

// css

const avatar = css`
  width: 48px;
  height: 48px;
`;

const bottomSpace = css`
  margin-bottom: 40px;
  90vw
`;

const navStyle = css`
  margin-top: 50px;
  margin-bottom: 30px;
`;

const navBox = css`
  border-top: dotted 1px #535aaa;
  margin-top: 50px;
`;

const commentFormTitle = css`
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 15px;
`;

// css for mobile

const mobileCommentPosition = css`
  margin-left: 34px;
  width: 90vw;
`;

const mobileNavBox = css`
  border-top: dotted 1px #535aaa;
  margin-top: 50px;
  width: 80vw;
`;
