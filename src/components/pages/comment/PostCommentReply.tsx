import React, { useState } from "react";
import { createPostComment } from "lib/api/comments";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MatchPostComment, PostCommentFormData, PostCommentReplyProps } from "interfaces/index";
import { MatchPostCommentSchema, MatchPostCommentSchemaType } from "validation/Schema";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import { Typography } from "@mui/material";
import useAlertMessage from "components/util/useAlertMessage";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import ForumIcon from "@mui/icons-material/Forum";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";

const PostCommentReply = ({ query, handleGetComments, rootId, setVisibleReply }: PostCommentReplyProps) => {
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
      <form noValidate onSubmit={handleSubmit(handleCreatePostComment)}>
        <TextField
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
