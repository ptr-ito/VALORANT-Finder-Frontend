import React, { useState } from "react";
import { createPostComment } from "lib/api/comments";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCommentFormData, PostCommentFormProps } from "interfaces/index";
import { MatchPostCommentSchema, MatchPostCommentSchemaType } from "validation/Schema";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import useAlertMessage from "hooks/useAlertMessage";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

const PostComment = ({ query, handleGetComments }: PostCommentFormProps) => {
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
    formData.append("commentableId", commentableId);
    formData.append("commentableType", commentableType);

    return formData;
  };

  const handleCreatePostComment: SubmitHandler<MatchPostCommentSchemaType> = async () => {
    const data = createFormData();

    try {
      const res = await createPostComment(data);

      if (res.status === 200) {
        setContent("");
        navigate(`/match/${query.query.id}`);
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
          <Button type="submit" variant="contained" disableRipple={true} css={commentSubmit} fullWidth>
            投稿する
          </Button>
        </form>
      )}
      {isMobileSite && (
        <form noValidate onSubmit={handleSubmit(handleCreatePostComment)}>
          <TextField
            placeholder="コメントする"
            variant="outlined"
            fullWidth
            sx={{ width: "90vw", right: "15px" }}
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
          <Button type="submit" variant="contained" disableRipple={true} css={mobileSubmitButton} fullWidth>
            投稿する
          </Button>
        </form>
      )}
    </>
  );
};

export default PostComment;

// css

const commentSubmit = css`
  background-color: #3f4551;
  &:hover {
    background-color: #3f4551;
  }
`;

const hiddenContent = css`
  display: none;
`;

// css for mobile

const mobileSubmitButton = css`
  background-color: #3f4551;
  &:hover {
    background-color: #3f4551;
  }
  width: 90vw;
  margin-left: -15px;
`;
