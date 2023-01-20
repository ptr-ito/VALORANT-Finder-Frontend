import React, { useEffect, useState, useContext } from "react";
import { showPost } from "lib/api/matchPosts";
import { useNavigate, useParams, Link, Route } from "react-router-dom";
import { MatchPost } from "interfaces/index";
import Avatar from "@mui/material/Avatar";
import { css } from "@emotion/react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { deletePost } from "lib/api/matchPosts";
import Chip from "@mui/material/Chip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { DeleteConfirmDialog, DeleteConfirmDialogProps } from "components/util/DeleteConfirmDaialog";
import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import useAlertMessage from "components/util/useAlertMessage";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { getPosts } from "lib/api/matchPosts";
import MatchPostEdit from "components/pages/post/MatchPostEdit";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostCommentList from "components/pages/comment/PostCommentList";
import { MatchPostComment } from "interfaces/index";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { AuthContext } from "App";
import { TwitterShareBtn } from "components/ui/icon/TwitterShareBtn";

const MatchPostDetail = () => {
  const navigate = useNavigate();
  const query = useParams<{ query: string }>();
  const [matchPost, setMatchPost] = useState<MatchPost>();
  const [postComments, setPostComments] = useState<MatchPostComment[]>([]);
  const { isSignedIn, currentUser } = useContext(AuthContext);

  useEffect(() => {
    handleGetDetail(query);
  }, [query]);

  const handleGetDetail = async (query: any) => {
    try {
      const res = await showPost(query.id);
      console.log(res);
      setMatchPost(res.data.data);
    } catch (e) {
      console.log(e);
      navigate("NotFound");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { success } = useAlertMessage();

  const [deleteConfirmDialogConfig, setDeleteConfirmDialogConfig] = React.useState<DeleteConfirmDialogProps | undefined>();

  const handleDeletePost = async (query: any) => {
    try {
      const ret = await new Promise<string>((resolve) => {
        setDeleteConfirmDialogConfig({ onClose: resolve });
      });
      setDeleteConfirmDialogConfig(undefined);
      console.log(ret);
      console.log(query);
      if (ret === "ok") {
        deletePost(query);
        handleGetPosts();
        navigate("/post");
        {
          success("投稿を削除しました");
        }
        console.log("削除する:OK時の処理を実行する");
      }
      if (ret === "cancel") {
        console.log("削除する:Cancel時の処理を実行する");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
    setAnchorEl(null);
  };
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (openModal) document.body.style.overflow = "hidden";
    else document.body.removeAttribute("style");
    return () => {
      document.body.removeAttribute("style");
    };
  }, [openModal]);

  // 投稿一覧取得
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

  return (
    <>
      <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={backButton} component={Link} to="/post">
        マッチ募集一覧へ戻る
      </Button>
      <Box css={boxStyle}>
        <Card css={cardStyle} sx={{ boxShadow: 0 }}>
          <CardHeader
            avatar={<Avatar src={matchPost?.attributes.userImage?.url} css={avatar} component={Link} to={`/user/${matchPost?.attributes.userUuid}`} />}
            title={
              <Grid container direction="row" justifyContent="flex-start" alignItems="center" css={flex}>
                <Typography variant="body2" component={Link} to={`/user/${matchPost?.attributes.userUuid}`} css={userLink}>
                  {matchPost?.attributes.userName}
                </Typography>
                <Typography variant="body2" css={timeStyle}>
                  {matchPost?.attributes.createdAt}
                </Typography>
                {isSignedIn && currentUser?.attributes.id == matchPost?.attributes.userId ? (
                  <>
                    <IconButton id="menu-button" aria-controls={openMenu ? "menu-button" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleMenuClick}>
                      <MoreHorizIcon />
                    </IconButton>
                    <Menu
                      id="menu-button"
                      aria-labelledby="menu-button"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <MenuItem disableRipple={true} onClick={handleOpenModal}>
                        <ListItemIcon>
                          <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText css={listTextColor} sx={{ ml: 3, mr: 3 }}>
                          編集
                        </ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleDeletePost(matchPost?.attributes.id)} disableRipple={true}>
                        <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText css={listTextColor} sx={{ ml: 3, mr: 3 }}>
                          削除
                        </ListItemText>
                      </MenuItem>
                      {deleteConfirmDialogConfig && <DeleteConfirmDialog {...deleteConfirmDialogConfig} />}
                    </Menu>
                    <Modal isOpen={openModal} onRequestClose={handleCloseModal} appElement={document.getElementById("root") || undefined} style={customStyles}>
                      <Button onClick={handleCloseModal} css={closeButtonStyle} startIcon={<CloseIcon />} disableRipple={true}>
                        閉じる
                      </Button>
                      {<MatchPostEdit handleGetPosts={handleGetPosts} setOpenModal={setOpenModal} matchPost={matchPost} query={query} />}
                    </Modal>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            }
          />
          <CardContent>
            <Typography variant="body2" component="span">
              {matchPost?.attributes.content.split("\n").map((content: string, index: number) => {
                return <p key={index}>{content}</p>;
              })}
            </Typography>
            <Divider css={borderStyle} />
            <Typography variant="h4" component="span" css={subTitle}>
              ランク帯
            </Typography>
            <Typography variant="body2" component="span">
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                {String(matchPost?.attributes.rank)
                  .split(/,|\s/)
                  .map((rank: string, index: number) => {
                    return <Chip label={rank} key={index} css={chipStyle} />;
                  })}
              </Grid>
            </Typography>
            <Divider css={borderStyle} />
            <Typography variant="h4" component="span" css={subTitle}>
              対戦モード
            </Typography>
            <Typography variant="body2" component="span">
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                {matchPost?.attributes.mode.split("\n").map((mode: string, index: number) => {
                  return <Chip label={mode} key={index} css={chipStyle} />;
                })}
              </Grid>
            </Typography>
            <Divider css={borderStyle} />
            <Typography variant="h4" component="span" css={subTitle}>
              雰囲気
            </Typography>
            <Typography variant="body2" component="span">
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                {matchPost?.attributes.mood.split("\n").map((mood: string, index: number) => {
                  return <Chip label={mood} key={index} css={chipStyle} />;
                })}
              </Grid>
            </Typography>
            <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
              <TwitterShareBtn
                title={`${matchPost?.attributes.content}\n\nランク帯: ${matchPost?.attributes.rank}\n\n`}
                url={`http://localhost:3001/post/${matchPost?.attributes.id}\n\n`}
                hashtags={["VALORANT\n", "VALORANTコンペ募集\n", "VALORANTランク募集\n", "VALORANT募集"]}
              />
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Grid container alignItems="center" css={commentTitle}>
        <Grid item>
          <QuestionAnswerOutlinedIcon css={commentIcon} />
        </Grid>
        <Grid item>
          <Typography variant="h5">コメント一覧</Typography>
        </Grid>
      </Grid>
      <PostCommentList query={query} />
    </>
  );
};

export default MatchPostDetail;

const cardStyle = css`
  width: 900px;
  margin-top: 40px;
`;

const avatar = css`
  width: 48px;
  height: 48px;
`;

const flex = css`
  display: flex;
`;

const borderStyle = css`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const subTitle = css`
  padding: 6px 8px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const timeStyle = css`
  olor: #7f7f7f;
  margin-left: auto;
  margin-right: 20px;
`;

const chipStyle = css`
  background-color: #ff4755;
  color: white;
  margin-top: 10px;
  margin-right: 10px;
`;

const listTextColor = css`
  color: #7f7f7f;
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

const backButton = css`
  flex-grow: 1;
  margin-bottom: 50px;
  color: #ff4755;
`;

const boxStyle = css`
  border-top: solid 1px #ced1d8;
  border-bottom: solid 1px #ced1d8;
  padding-bottom: 35px;
  position: relative;
  &: after {
    position: absolute;
    content: " ";
    display: block;
    border-bottom: solid 1px #3f4551;
    bottom: -1px;
    width: 30%;
  }
`;

const commentTitle = css`
  margin-top: 50px;
  margin-bottom: 30px;
`;

const commentIcon = css`
  padding-top: 10px;
  margin-right: 15px;
`;

const userLink = css`
  text-decoration: none;
  color: #333333;
  &: hover {
    border-bottom: 1px solid #333333;
  }
`;
