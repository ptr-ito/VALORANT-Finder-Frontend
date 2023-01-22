import React, { useState } from "react";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { rankOptions } from "data/ranks";
import { modeOptions } from "data/mode";
import { moodOptions } from "data/mood";
import { useForm, SubmitHandler } from "react-hook-form";
import { PostEditProps } from "interfaces/index";
import { css } from "@emotion/react";
import { MatchPostUpdateFormData } from "interfaces/index";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { MatchPostUpdateSchema } from "validation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAlertMessage from "components/util/useAlertMessage";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import FormHelperText from "@mui/material/FormHelperText";
import { updatePost } from "lib/api/matchPosts";
import { MatchPostUpdate } from "interfaces/index";
import { useNavigate } from "react-router-dom";

const MatchPostEdit = ({ handleGetPosts, setOpenModal, matchPost, query }: PostEditProps) => {
  const navigate = useNavigate();

  // any
  const rankParams: any = String(matchPost?.attributes.rank)
    .split(/,|\s/)
    .map((v) => rankOptions.find((rank) => rank.label == v)?.value);

  const [content, setContent] = useState<string | undefined>(matchPost?.attributes.content);
  const [rankIds, setRankIds] = useState<string[]>(rankParams);
  const [modeId, setModeId] = useState<number | undefined>(modeOptions.find((x) => x.label == matchPost?.attributes.mode)?.value) || 0;
  const [moodId, setMoodId] = useState<number | undefined>(moodOptions.find((x) => x.label == matchPost?.attributes.mood)?.value) || 0;

  const { success } = useAlertMessage();

  console.log(content);

  const submitCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (event: SelectChangeEvent<typeof rankIds>) => {
    const {
      target: { value },
    } = event;
    setRankIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // form with zod
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<MatchPostUpdate>({
    mode: "onBlur",
    resolver: zodResolver(MatchPostUpdateSchema),
  });

  const createFormData = (): MatchPostUpdateFormData => {
    const formData = new FormData();

    formData.append("content", content || "");
    rankIds?.forEach((rank) => formData.append("rankIds[]", String(rank)));
    formData.append("modeId", String(modeId));
    formData.append("moodId", String(moodId));

    return formData;
  };

  // Post更新処理
  const handleUpdatePost: SubmitHandler<MatchPostUpdate> = async () => {
    const data = createFormData();

    try {
      const res = await updatePost(data, String(query.id));
      console.log(query.id);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"] || "");
        Cookies.set("_client", res.headers["client"] || "");
        Cookies.set("_uid", res.headers["uid"] || "");

        // setContent("");
        // setRankIds([]);
        // setModeId(undefined);
        // setMoodId(undefined);
        submitCloseModal();
        navigate(`/post/${query.id}`);
        handleGetPosts();
        {
          success("編集を完了しました");
        }
      }
    } catch (err) {
      console.log(err);
      console.log("Failed in update post!");
    }
  };

  const chipDelete = (rank: string) => {
    setRankIds(rankIds?.filter((value) => value !== rank));
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center" css={content}>
        <Typography variant="body1" css={title}>
          投稿編集
        </Typography>
        <form noValidate onSubmit={handleSubmit(handleUpdatePost)}>
          <Divider css={dividerStyle} />
          <Grid item css={spacing}>
            <Typography variant="h4" css={subTitle} sx={{ mb: 1 }}>
              募集内容
            </Typography>
            <TextField
              placeholder="募集内容を入力してください"
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
              css={textWidth}
            />
            <FormHelperText error={true} sx={{ mt: 2, mb: 3 }}>
              {errors.content ? errors.content?.message : ""}
            </FormHelperText>
          </Grid>
          <Grid item css={spacing}>
            <Typography variant="h4" component="span" css={subTitle}>
              ランク帯
            </Typography>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <Select
                {...register("rankIds")}
                error={!!errors["rankIds"]}
                multiple
                value={rankIds}
                onChange={handleChange}
                renderValue={(selected) => {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={rankOptions.find((item) => item.value === value)?.label}
                          onDelete={() => chipDelete(value)}
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                        />
                      ))}
                    </Box>
                  );
                }}
                MenuProps={MenuProps}
                css={selectStyle}
              >
                {rankOptions.map((rank) => (
                  <MenuItem key={rank.value} value={rank.value}>
                    {rank.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={true} sx={{ ml: -0.2, mt: -1, mb: 3 }}>
                {errors.rankIds ? errors.rankIds?.message : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography variant="h4" component="span" css={subTitle}>
              対戦モード
            </Typography>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <Select displayEmpty {...register("modeId")} error={!!errors["modeId"]} value={modeId} onChange={(e: SelectChangeEvent<number>) => setModeId(e.target.value as number)} css={selectStyle}>
                {modeOptions.map((mode) => (
                  <MenuItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={true} sx={{ ml: -0.2, mt: -1, mb: 3 }}>
                {errors.modeId ? errors.modeId?.message : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography variant="h4" component="span" css={subTitle}>
              雰囲気
            </Typography>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <Select displayEmpty {...register("moodId")} error={!!errors["moodId"]} value={moodId} onChange={(e: SelectChangeEvent<number>) => setMoodId(e.target.value as number)} css={selectStyle}>
                {moodOptions.map((mood) => (
                  <MenuItem key={mood.value} value={mood.value}>
                    {mood.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={true} sx={{ ml: -0.2, mt: -1 }}>
                {errors.moodId ? errors.moodId?.message : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Divider sx={{ mt: 7 }} />
          <Button type="submit" variant="contained" fullWidth css={buttonStyle} disableRipple={true}>
            投稿する
          </Button>
        </form>
      </Grid>
    </>
  );
};

export default MatchPostEdit;

// css

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const title = css`
  font-weight: bold;
  font-size: 25px;
  letter-spacing: 1px;
  color: #222222;s
`;

const spacing = css`
  margin-top: 40px;
`;

const textWidth = css`
  width: 850px;
`;

const subTitle = css`
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const selectStyle = css`
  margin-bottom: 20px;
`;

const buttonStyle = css`
  margin-top: 30px;
  background-color: #3f4551;
  &:hover {
    background-color: #3f4551;
  }
  letter-spacing: 2px;
`;

const dividerStyle = css`
  padding-top: 35px;
`;
