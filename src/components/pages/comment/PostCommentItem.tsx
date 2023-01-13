import React, { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { css } from "@emotion/react";
import Grid from "@mui/material/Grid";
import { Card, CardContent, CardHeader, Typography, Box, CardActions } from "@mui/material";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { PostCommentItemProps, PostCommentFormData, PostCommentFormProps } from "interfaces/index";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "App";
import useAlertMessage from "components/util/useAlertMessage";
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

const PostCommentItem = ({ postComment, query, handleGetComments, replies }: PostCommentItemProps) => {
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
    console.log(openMenu);
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

  console.log(replies);

  return (
    <>
      <Box>
        <Card sx={{ boxShadow: 0 }}>
          <Box css={flex}>
            <Paper css={paperStyle}>
              <Grid container wrap="nowrap" spacing={2} css={flex}>
                <Grid item>
                  <Avatar src={postComment.attributes.userImage?.url} css={avatar} />
                </Grid>
                <Grid container justifyContent="left" item xs zeroMinWidth>
                  <Typography variant="body2" css={userNameStyle}>
                    {postComment.attributes.userName}
                  </Typography>
                  <Typography variant="body2" css={timeStyle}>
                    {postComment.attributes.createdAt}
                  </Typography>
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
                      <PostCommentReply query={query} handleGetComments={handleGetComments} rootId={rootId} />
                    </Box>
                  )}
                </>
              ) : (
                <></>
              )}
            </Paper>
            {/* <CardHeader
              avatar={<Avatar src={postComment.attributes.userImage?.url} css={avatar} />}
              title={
                <>
                  <Grid container alignItems="center">
                    <Typography variant="body2" css={userNameStyle}>
                      {postComment.attributes.userName}
                    </Typography>
                    <Typography variant="body2" css={timeStyle}>
                      {postComment.attributes.createdAt}
                    </Typography>
                    {/* {isSignedIn && currentUser?.id == postComment.attributes.userId ? ( }
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
                    {/* ) : (
                      <>
                        <Box component="span" css={menuStyle}>
                          &nbsp;
                        </Box>
                      </>
                    )} }
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
                </>
              }
              subheader={
                visibleEdit ? (
                  <Box css={contentStyle}>
                    <PostCommentEdit postComment={postComment} query={query} setVisibleEdit={setVisibleEdit} handleGetComments={handleGetComments} />
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body2" component="span" css={contentStyle}>
                      {postComment.attributes.content.split("\n").map((content: string, index: number) => {
                        return <p key={index}>{content}</p>;
                      })}
                    </Typography>
                    <Box>
                      {replies.length > 0 &&
                        replies.map((reply: any) => {
                          return <PostCommentItem key={reply.id} postComment={reply} query={query} handleGetComments={handleGetComments} replies={[]} />;
                        })}
                    </Box>
                  </Box>
                )
              }
            /> */}
            {/* <Button onClick={handleOpenReply} startIcon={<SendIcon />} variant="outlined" disableRipple={true} css={replyStyle}>
                {visibleReply ? "返信する" : "返信する"}
              </Button>
              {visibleReply && (
                <Box css={replyTextForm} sx={{ width: "100px" }}>
                  <PostCommentReply query={query} handleGetComments={handleGetComments} rootId={rootId} />
                </Box>
              )} */}
          </Box>
        </Card>
      </Box>
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
  margin-left: 30px;
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

const userNameStyle = css`
  font-weight: 500;
`;

const menuStyle = css`
  margin-left: auto;
`;

const flex = css``;

const contentDisplay = css`
  margin-left: 56px;
`;

const paperStyle = css`
  padding-top: 40px;
  padding-bottom: 30px;
  padding-left: 56px;
`;
