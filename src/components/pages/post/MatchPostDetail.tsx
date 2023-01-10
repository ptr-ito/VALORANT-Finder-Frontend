import React, { useEffect, useState } from "react";
import { showPost } from "lib/api/matchPosts";
import { useNavigate, useParams, Link } from "react-router-dom";
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
import { PostItemProps } from "interfaces/index";

const MatchPostDetail = () => {
  const navigate = useNavigate();
  const query = useParams<{ query: string }>();
  const [matchPost, setMatchPost] = useState<MatchPost>();

  useEffect(() => {
    handleGetDetail(query);
  }, [query]);

  const handleGetDetail = async (query: any) => {
    try {
      const res = await showPost(query.id);
      console.log(res.data.data);
      setMatchPost(res.data.data);
    } catch (e) {
      console.log(e);
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
      <Card css={cardStyle} sx={{ boxShadow: 0 }}>
        <CardHeader
          avatar={<Avatar src={matchPost?.attributes.userImage?.url} css={avatar} />}
          title={
            <>
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                <Typography variant="body2">{matchPost?.attributes.userName}</Typography>
                <Typography variant="body2" css={timeStyle}>
                  {matchPost?.attributes.createdAt}
                </Typography>
                {/* {isSignedIn && currentUser?.id == matchPost.attributes.userId ? ( */}
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
                {/* ) : (
                  <></>
                )} */}
              </Grid>
            </>
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
        </CardContent>
      </Card>
    </>
  );
};

export default MatchPostDetail;

const cardStyle = css`
  width: 900px;
  margin-top: 40px;
  margin-bottom: 40px;
  position: relative;
  line-height: 1.4;
  padding: 0.25em 1em;
  &: after,
  &: before {
    content: "";
    width: 30px;
    height: 40px;
    position: absolute;
    display: inline-block;
  }
  &: before {
    border-left: solid 1px #ff5722;
    border-top: solid 1px #ff5722;
    top: 0;
    left: 0;
  }
  &: after {
    border-right: solid 1px #ff5722;
    border-bottom: solid 1px #ff5722;
    bottom: 0;
    right: 0;
  }
`;

const avatar = css`
  width: 48px;
  height: 48px;
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
  color: #7f7f7f;
  display: flex;
  justify-content: flex-end;
  margin-left: 600px;
  margin-right: 30px;
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

const backButton = css`
  flex-grow: 1;
  margin-bottom: 50px;
  color: #ff4755;
`;
