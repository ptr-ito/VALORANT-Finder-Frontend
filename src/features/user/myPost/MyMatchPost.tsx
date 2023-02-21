import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Typography } from "@mui/material";
import MyMatchPostItem from "features/user/myPost/MyMatchPostItem";
import Button from "@mui/material/Button";
import { getPosts } from "lib/api/matchPosts";
import { MatchPost } from "interfaces/index";
import { css } from "@emotion/react";
import "index.css";
import { AuthContext } from "App";
import { useNavigate } from "react-router-dom";
import useAlertMessage from "hooks/useAlertMessage";
import { HeadBlock } from "components/util/HeadBlock";
import { useMediaQueryContext } from "providers/MediaQueryProvider";
import HistoryIcon from "@mui/icons-material/History";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const MyMatchPost = () => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();
  const { currentUser } = useContext(AuthContext);
  const [matchPosts, setMatchPosts] = useState<MatchPost[]>([]);

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

  const myMatchPost = matchPosts.map((x) => x.attributes.userId === currentUser?.attributes.id);

  return (
    <>
      <HeadBlock title="投稿したマッチ募集 | VALORANT FINDER" />
      <Grid container direction="row" justifyContent="center" css={overflow}>
        {isPcSite && (
          <>
            <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={backButton} component={Link} to="/mypage">
              マイページへ戻る
            </Button>
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: "50px", mt: "50px" }}>
              <HistoryIcon sx={{ mr: 2, fontSize: "42px", textAlign: "center", color: "#3f4551" }} />
              <Typography variant="h4">投稿したマッチ募集</Typography>
            </Grid>
            {matchPosts?.map((matchPost: MatchPost) => {
              return <MyMatchPostItem key={matchPost.attributes.id} matchPost={matchPost} handleGetPosts={handleGetPosts} />;
            })}
            {myMatchPost.includes(true) ? (
              <></>
            ) : (
              <Box sx={{ height: "318px" }}>
                <Typography css={nonePost}>投稿がありません</Typography>
              </Box>
            )}
          </>
        )}
        {isMobileSite && (
          <>
            <Box sx={{ width: "80vw", mt: "50px" }}>
              <Grid container justifyContent="center" alignItems="flex-start">
                <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={mobileBackButton} component={Link} to="/mypage">
                  マイページへ戻る
                </Button>
              </Grid>
            </Box>
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: "50px", mt: "50px" }}>
              <HistoryIcon sx={{ mr: 2, fontSize: "30px", textAlign: "center", color: "#3f4551" }} />
              <Typography variant="h5">投稿したマッチ募集</Typography>
            </Grid>
            {matchPosts.length === 0 ? (
              <Typography css={nonePost}>投稿がありません</Typography>
            ) : (
              <>
                {matchPosts?.map((matchPost: MatchPost) => {
                  return <MyMatchPostItem key={matchPost.attributes.id} matchPost={matchPost} handleGetPosts={handleGetPosts} />;
                })}
              </>
            )}
            {myMatchPost.includes(true) ? (
              <></>
            ) : (
              <Box sx={{ height: "318px" }}>
                <Typography css={nonePost}>投稿がありません</Typography>
              </Box>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default MyMatchPost;

// css

const overflow = css`
  overflow: hidden;
`;

const nonePost = css`
  text-align: center;
  margin-top: 100px;
`;

const backButton = css`
  margin-top: 50px;
  margin-bottom: 50px;
  right: 350px;
  color: #ff4755;
`;

// css for mobile

const mobileBackButton = css`
  margin-bottom: 50px;
  margin-right: auto;
  color: #ff4755;
`;
