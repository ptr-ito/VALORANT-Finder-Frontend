import React, { useState, useContext } from "react";
import { createPostComment } from "lib/api/comments";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCommentFormData, PostCommentReplyProps } from "interfaces/index";
import { MatchPostCommentSchema, MatchPostCommentSchemaType } from "validation/Schema";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import useAlertMessage from "hooks/useAlertMessage";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { AuthContext } from "App";
import Avatar from "@mui/material/Avatar";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

const PostCommentReply = ({ query, handleGetComments, rootId, setVisibleReply }: PostCommentReplyProps) => {
  const { currentUser } = useContext(AuthContext);
  const { isMobileSite, isPcSite } = useMediaQueryContext();
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const { success } = useAlertMessage();
  const commentableId = query.query.id;
  const commentableType = "MatchPost";

  // form with zod
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<MatchPostCommentSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(MatchPostCommentSchema),
  });

  const createFormData = (): PostCommentFormData => {
    const formData = new FormData();

    formData.append("content", content);
    formData.append("rootId", rootId);
    formData.append("commentableId", commentableId);
    formData.append("commentableType", commentableType);

    return formData;
  };

  const handleCancelSubmit = () => {
    setVisibleReply(false);
  };

  const handleCreatePostComment: SubmitHandler<MatchPostCommentSchemaType> = async () => {
    const data = createFormData();

    try {
      const res = await createPostComment(data);

      if (res.status === 200) {
        setContent("");
        navigate(`/post/${query.query.id}`);
        {
          success("コメントを投稿しました");
        }
      }
    } catch (err) {
      console.log(err);
      console.log("Failed in creating comment!");
    }
  };

  return (
    <>
      {isPcSite && (
        <Box css={float}>
          <Avatar src={currentUser?.attributes.image.url} css={avatar} />
          <form noValidate onSubmit={handleSubmit(handleCreatePostComment)}>
            <TextField
              sx={{ width: 700, mt: "20px", height: "auto" }}
              placeholder="コメントする"
              variant="outlined"
              fullWidth
              multiline
              rows="4"
              value={content}
              {...register("content")}
              error={!!errors["content"]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContent(e.target.value);
              }}
            />
            <FormHelperText error={true} sx={{ mt: 2, mb: 3 }}>
              {errors.content ? errors.content?.message : ""}
            </FormHelperText>
            <TextField type="hidden" label="commentable_id" value={commentableId} {...register("commentableId")} css={hiddenContent} />
            <TextField type="hidden" label="commentable_type" value={commentableType} {...register("commentableType")} css={hiddenContent} />
            <Grid container justifyContent="center">
              <Button type="submit" variant="contained" disableRipple={true} css={commentSubmit}>
                返信
              </Button>
              <Button variant="outlined" onClick={handleCancelSubmit} disableRipple={true} css={commentCancelSubmit}>
                キャンセル
              </Button>
            </Grid>
          </form>
        </Box>
      )}
      {isMobileSite && (
        <Box>
          <Avatar src={currentUser?.attributes.image.url} css={mobileAvatar} />
          <form noValidate onSubmit={handleSubmit(handleCreatePostComment)}>
            <TextField
              sx={{ width: "65vw", mt: "20px", height: "auto", ml: "-15px" }}
              placeholder="コメントする"
              variant="outlined"
              fullWidth
              multiline
              rows="4"
              value={content}
              {...register("content")}
              error={!!errors["content"]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContent(e.target.value);
              }}
            />
            <FormHelperText error={true} sx={{ mt: 2, mb: 3 }}>
              {errors.content ? errors.content?.message : ""}
            </FormHelperText>
            <TextField type="hidden" label="commentable_id" value={commentableId} {...register("commentableId")} css={hiddenContent} />
            <TextField type="hidden" label="commentable_type" value={commentableType} {...register("commentableType")} css={hiddenContent} />
            <Grid container justifyContent="center">
              <Button type="submit" variant="contained" disableRipple={true} css={commentSubmit}>
                返信
              </Button>
              <Button variant="outlined" onClick={handleCancelSubmit} disableRipple={true} css={commentCancelSubmit}>
                キャンセル
              </Button>
            </Grid>
          </form>
        </Box>
      )}
    </>
  );
};

export default PostCommentReply;

// css

const commentSubmit = css`
  background-color: #3f4551;
  &:hover {
    background-color: #3f4551;
  }
`;

const commentCancelSubmit = css`
  color: #3f4551;
  border-color: #3f4551;
  &:hover {
    bcolor: #3f4551;
    border-color: #3f4551;
  }
  margin-left: 15px;
`;

const hiddenContent = css`
  display: none;
`;

const avatar = css`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  margin-left: -15px;
`;

const float = css`
  display: flex;
`;

// css for mobile

const mobileAvatar = css`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  margin-left: -15px;
`;
