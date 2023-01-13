import React, { useState } from "react";
import { updatePostComment } from "lib/api/comments";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MatchPostComment, PostCommentFormData, PostCommentEditProps } from "interfaces/index";
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

const PostCommentEdit = ({ postComment, query, setVisibleEdit, handleGetComments }: PostCommentEditProps) => {
  const [content, setContent] = useState<string>(postComment.attributes.content);
  const navigate = useNavigate();
  const { success } = useAlertMessage();

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
    formData.append("matchPostId", postComment.attributes.matchPostId);

    return formData;
  };

  const handleUpdatePostComment: SubmitHandler<MatchPostCommentSchemaType> = async () => {
    const data = createFormData();

    try {
      const res = await updatePostComment(data, String(postComment.attributes.id));

      if (res.status === 200) {
        setContent("");
        setVisibleEdit(false);
        navigate(`/post/${query.query.id}`);
        {
          success("コメントを更新しました");
        }
      }
    } catch (err) {
      console.log(err);
      console.log("Failed in creating comment!");
    }
  };

  const handleCancelSubmit = () => {
    setVisibleEdit(false);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleUpdatePostComment)}>
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
        <Grid container justifyContent="center">
          <Button type="submit" variant="contained" disableRipple={true} css={commentSubmit}>
            更新
          </Button>
          <Button variant="outlined" onClick={handleCancelSubmit} disableRipple={true} css={commentCancelSubmit}>
            キャンセル
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default PostCommentEdit;

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
