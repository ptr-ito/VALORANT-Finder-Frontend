import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { css } from "@emotion/react";
import Grid from "@mui/material/Grid";
import { Card, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { PostCommentItemProps } from "interfaces/index";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "App";
import useAlertMessage from "hooks/useAlertMessage";
import PostCommentReply from "components/pages/comment/PostCommentReply";
import PostCommentEdit from "components/pages/comment/PostCommentEdit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePostComment } from "lib/api/comments";
import { DeleteConfirmDialog, DeleteConfirmDialogProps } from "components/util/DeleteConfirmDaialog";
import { useMediaQueryContext } from "providers/MediaQueryProvider";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PostCommentItem = ({ postComment, query, handleGetComments, replies }: PostCommentItemProps) => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();
  const [visibleReply, setVisibleReply] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const { error } = useAlertMessage();
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const [deleteConfirmDialogConfig, setDeleteConfirmDialogConfig] = React.useState<DeleteConfirmDialogProps | undefined>();
  const { success } = useAlertMessage();
  const navigate = useNavigate();
  const [rootId, setRootId] = useState<string>("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEdit = () => {
    setVisibleEdit(!visibleEdit);
    handleMenuClose();
  };

  const handleDeletePostComment = async (id: string) => {
    try {
      const ret = await new Promise<string>((resolve) => {
        setDeleteConfirmDialogConfig({ onClose: resolve });
      });
      setDeleteConfirmDialogConfig(undefined);
      if (ret === "ok") {
        const res = await deletePostComment(id);
        if (res.status === 200) {
          navigate(`/post/${query.query.id}`);
          {
            success("コメントを削除しました");
          }
          console.log("削除する:OK時の処理を実行する");
        }
      }
      if (ret === "cancel") {
        setAnchorEl(null);
        console.log("削除する:Cancel時の処理を実行する");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenReply = () => {
    if (isSignedIn) {
      setVisibleReply(!visibleReply);
      setRootId(postComment.attributes.id);
    } else {
      setVisibleReply(false);
      {
        error("ログインしてください");
      }
    }
  };

  return (
    <>
      {isPcSite && (
        <Card sx={{ boxShadow: 0 }}>
          <Paper css={paperStyle} elevation={0}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar src={postComment.attributes.userImage?.url} css={avatar} component={Link} to={`/user/${postComment?.attributes.userUuid}`} />
              </Grid>
              <Grid container justifyContent="left" item xs zeroMinWidth>
                <Typography variant="body2" component={Link} to={`/user/${postComment?.attributes.userUuid}`} css={userLink}>
                  {postComment.attributes.userName}
                </Typography>
                <Typography variant="body2" css={timeStyle}>
                  {postComment.attributes.createdAt}
                </Typography>
                {postComment.attributes.userId === currentUser?.attributes.id ? (
                  <IconButton
                    css={menuStyle}
                    id="menu-button"
                    aria-controls={openMenu ? "menu-button" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={handleMenuClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                ) : (
                  <></>
                )}
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
                  <MenuItem disableRipple={true} onClick={handleOpenEdit}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText css={listTextColor} sx={{ ml: 3, mr: 3 }}>
                      編集
                    </ListItemText>
                  </MenuItem>
                  <MenuItem disableRipple={true} onClick={() => handleDeletePostComment(postComment.attributes.id)}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText css={listTextColor} sx={{ ml: 3, mr: 3 }}>
                      削除
                    </ListItemText>
                  </MenuItem>
                  {deleteConfirmDialogConfig && <DeleteConfirmDialog {...deleteConfirmDialogConfig} />}
                </Menu>
              </Grid>
            </Grid>
            {visibleEdit ? (
              <Box css={contentStyle}>
                <PostCommentEdit postComment={postComment} query={query} setVisibleEdit={setVisibleEdit} handleGetComments={handleGetComments} />
              </Box>
            ) : (
              <>
                <Box css={contentDisplay}>
                  <Typography variant="body2" component="span" css={contentStyle}>
                    {postComment.attributes.content.split("\n").map((content: string, index: number) => {
                      return <p key={index}>{content}</p>;
                    })}
                  </Typography>
                </Box>
                <Box>
                  {replies.length > 0 &&
                    replies.map((reply: any) => {
                      return <PostCommentItem key={reply.id} postComment={reply} query={query} handleGetComments={handleGetComments} replies={[]} />;
                    })}
                </Box>
              </>
            )}
            {postComment.attributes.rootId === null ? (
              <>
                <Button onClick={handleOpenReply} startIcon={<SendIcon />} variant="outlined" disableRipple={true} css={replyStyle}>
                  {visibleReply ? "返信する" : "返信する"}
                </Button>
                {visibleReply && (
                  <Box css={replyTextForm} sx={{ width: "100px" }}>
                    <PostCommentReply query={query} handleGetComments={handleGetComments} rootId={rootId} setVisibleReply={setVisibleReply} />
                  </Box>
                )}
              </>
            ) : (
              <></>
            )}
          </Paper>
        </Card>
      )}
      {isMobileSite && (
        <Card css={mobileCard} elevation={0}>
          <Paper css={mobilePaper} elevation={0}>
            <Grid container wrap="nowrap" justifyContent="center" alignItems="center" spacing={2}>
              <Grid item>
                <Avatar src={postComment.attributes.userImage?.url} css={avatar} component={Link} to={`/user/${postComment?.attributes.userUuid}`} />
              </Grid>
              <Grid container justifyContent="left" item xs zeroMinWidth>
                <Typography variant="body2" component={Link} to={`/user/${postComment?.attributes.userUuid}`} css={userLink}>
                  {postComment.attributes.userName}
                </Typography>
                <Typography variant="body2" css={timeStyle}>
                  {postComment.attributes.createdAt}
                </Typography>
                {postComment.attributes.userId === currentUser?.attributes.id ? (
                  <>
                    {postComment.attributes.rootId === null ? (
                      <IconButton
                        css={mobileMenuStyle}
                        id="menu-button"
                        aria-controls={openMenu ? "menu-button" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? "true" : undefined}
                        onClick={handleMenuClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        css={mobileMenu}
                        id="menu-button"
                        aria-controls={openMenu ? "menu-button" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? "true" : undefined}
                        onClick={handleMenuClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </>
                ) : (
                  <></>
                )}
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
                  <MenuItem disableRipple={true} onClick={handleOpenEdit}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText css={listTextColor} sx={{ ml: 3, mr: 3 }}>
                      編集
                    </ListItemText>
                  </MenuItem>
                  <MenuItem disableRipple={true} onClick={() => handleDeletePostComment(postComment.attributes.id)}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText css={listTextColor} sx={{ ml: 3, mr: 3 }}>
                      削除
                    </ListItemText>
                  </MenuItem>
                  {deleteConfirmDialogConfig && <DeleteConfirmDialog {...deleteConfirmDialogConfig} />}
                </Menu>
              </Grid>
            </Grid>
            {visibleEdit ? (
              <Box css={contentStyle}>
                <PostCommentEdit postComment={postComment} query={query} setVisibleEdit={setVisibleEdit} handleGetComments={handleGetComments} />
              </Box>
            ) : (
              <>
                <Box css={contentDisplay}>
                  <Typography variant="body2" component="span" css={contentStyle}>
                    {postComment.attributes.content.split("\n").map((content: string, index: number) => {
                      return <p key={index}>{content}</p>;
                    })}
                  </Typography>
                </Box>
                <Box>
                  {replies.length > 0 &&
                    replies.map((reply: any) => {
                      return <PostCommentItem key={reply.id} postComment={reply} query={query} handleGetComments={handleGetComments} replies={[]} />;
                    })}
                </Box>
              </>
            )}
            {postComment.attributes.rootId === null ? (
              <>
                <Button onClick={handleOpenReply} startIcon={<SendIcon />} variant="outlined" disableRipple={true} css={replyStyle}>
                  {visibleReply ? "返信する" : "返信する"}
                </Button>
                {visibleReply && (
                  <Box css={replyTextForm} sx={{ width: "100px" }}>
                    <PostCommentReply query={query} handleGetComments={handleGetComments} rootId={rootId} setVisibleReply={setVisibleReply} />
                  </Box>
                )}
              </>
            ) : (
              <></>
            )}
          </Paper>
        </Card>
      )}
    </>
  );
};

export default PostCommentItem;

// css

const avatar = css`
  width: 40px;
  height: 40px;
`;

const timeStyle = css`
  color: #7f7f7f;
  margin-left: 20px;
`;

const replyStyle = css`
  margin-top: 20px;
  font-size: 0.5px;
  width: 100px;
  height: 30px;
  color: #3f4551;
  border-color: #cccccc;
  &: hover {
    color: #cccccc;
    border-color: #cccccc;
    background-color: rgb(204, 204, 204, 0.1);
  }
`;

const replyTextForm = css`
  width: 80%;
  margin-top: 10px;
  margin-left: 60px;
`;

const listTextColor = css`
  color: #7f7f7f;
`;

const contentStyle = css`
  color: #333333;
`;

const userLink = css`
  font-weight: 500;
  text-decoration: none;
  color: #333333;
`;

const menuStyle = css`
  margin-left: auto;
  margin-right: 56px;
`;

const contentDisplay = css`
  margin-left: 56px;
`;

const paperStyle = css`
  padding-top: 40px;
  padding-bottom: 30px;
  padding-left: 56px;
`;

// css for mobile

const mobilePaper = css`
  padding-left: 34px;
  padding-top: 40px;
  padding-bottom: 30px;
`;

const mobileCard = css`
  width: 90vw;
  margin-right: 25px;
  margin-left: -14px;
`;

const mobileMenu = css`
  margin-left: auto;
  right: 77px;
  bottom: 8px;
`;

const mobileMenuStyle = css`
  margin-left: auto;
  margin-right: 56px;
  bottom: 8px;
`;
