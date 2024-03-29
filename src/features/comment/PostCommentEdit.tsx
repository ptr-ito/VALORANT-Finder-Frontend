import React, { useState } from "react";
import { updatePostComment } from "lib/api/comments";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCommentFormData, PostCommentEditProps } from "interfaces/index";
import { MatchPostCommentEditSchema, MatchPostCommentEditSchemaType } from "validation/Schema";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import useAlertMessage from "hooks/useAlertMessage";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

const PostCommentEdit = ({ postComment, query, setVisibleEdit, handleGetComments }: PostCommentEditProps) => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();
  const [content, setContent] = useState<string>(postComment.attributes.content);
  const navigate = useNavigate();
  const { success } = useAlertMessage();

  // form with zod
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<MatchPostCommentEditSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(MatchPostCommentEditSchema),
  });

  const createFormData = (): PostCommentFormData => {
    const formData = new FormData();

    formData.append("content", content);

    return formData;
  };

  const handleUpdatePostComment: SubmitHandler<MatchPostCommentEditSchemaType> = async () => {
    const data = createFormData();

    try {
      const res = await updatePostComment(data, String(postComment.attributes.id));

      if (res.status === 200) {
        setContent("");
        setVisibleEdit(false);
        navigate(`/match/${query.query.id}`);
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
      {isPcSite && (
        <form noValidate onSubmit={handleSubmit(handleUpdatePostComment)}>
          <TextField
            css={form}
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
      )}
      {isMobileSite && (
        <form noValidate onSubmit={handleSubmit(handleUpdatePostComment)}>
          <TextField
            css={mobileForm}
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
      )}
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

const form = css`
  width: 800px;
  margin-top: 20px;
  margin-right: 30px;
`;

// css for mobile

const mobileForm = css`
  width: 70vw;
  margin-top: 20px;
  margin-right: 30px;
`;
