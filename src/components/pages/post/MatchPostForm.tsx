import React, { useCallback, useState, useContext } from "react";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { rankOptions } from "data/ranks";
import { modeOptions } from "data/mode";
import { moodOptions } from "data/mood";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { PostFormProps } from "interfaces/index";
import { createPost } from "lib/api/matchPosts";
import { css } from "@emotion/react";
import { MatchPostFormData } from "interfaces/index";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { MatchPostSchema } from "validation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MatchPostSchemaType } from "validation/Schema";
import useAlertMessage from "components/util/useAlertMessage";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import FormHelperText from "@mui/material/FormHelperText";

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

const MatchPostForm = ({ handleGetPosts, setOpenModal }: PostFormProps) => {
  const [content, setContent] = useState<string>("");
  const [rankIds, setRankIds] = useState<string[]>([]);
  const [modeId, setModeId] = useState<number>(0);
  const [moodId, setMoodId] = useState<number>(0);

  const { success } = useAlertMessage();

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
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<MatchPostSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(MatchPostSchema),
  });

  const createFormData = (): MatchPostFormData => {
    const formData = new FormData();

    formData.append("content", content);
    rankIds.forEach((rank) => formData.append("rankIds[]", String(rank)));
    // formData.append("rankIds[]", String(rankIds));
    formData.append("modeId", String(modeId));
    formData.append("moodId", String(moodId));

    return formData;
  };

  // Post投稿処理
  const handleCreatePost: SubmitHandler<MatchPostSchemaType> = async () => {
    const data = createFormData();

    try {
      const res = await createPost(data);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"] || "");
        Cookies.set("_client", res.headers["client"] || "");
        Cookies.set("_uid", res.headers["uid"] || "");

        setContent("");
        setRankIds([]);
        setModeId(0);
        setMoodId(0);
        handleGetPosts();
        submitCloseModal();
        {
          success("マッチ募集を投稿しました");
        }
      }
    } catch (err) {
      console.log(err);
      console.log("Failed in creating post!");
    }
  };

  const chipDelete = (name: string) => {
    setRankIds(rankIds.filter((value) => value !== name));
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center" css={content}>
        <Typography variant="body1" css={title}>
          マッチを募集
        </Typography>
        <form noValidate onSubmit={handleSubmit(handleCreatePost)}>
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
                defaultValue={[]}
                error={!!errors["rankIds"]}
                multiple
                displayEmpty
                value={rankIds}
                onChange={handleChange}
                renderValue={(selected) => {
                  console.log(selected);
                  if (selected.length === 0) {
                    return <em css={placeholder}>募集するランク帯を選択してください ※複数選択可</em>;
                  }

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
                <MenuItem disabled value="">
                  <em>募集するランク帯を選択してください</em>
                </MenuItem>
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
              <Select
                displayEmpty
                defaultValue={Number("0")}
                {...register("modeId")}
                error={!!errors["modeId"]}
                value={modeId}
                renderValue={(selected) => {
                  if (selected === 0) {
                    return <em css={placeholder}>プレイする対戦モードを選択してください</em>;
                  }

                  return modeOptions.find((item) => item.value === selected)?.label;
                }}
                onChange={(e: SelectChangeEvent<number>) => setModeId(e.target.value as number)}
                css={selectStyle}
              >
                <MenuItem disabled value="0">
                  <em>プレイする対戦モードを選択してください</em>
                </MenuItem>
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
              <Select
                displayEmpty
                defaultValue={Number("0")}
                {...register("moodId")}
                error={!!errors["moodId"]}
                renderValue={(selected) => {
                  if (selected === 0) {
                    return <em css={placeholder}>雰囲気を選択してください</em>;
                  }

                  return moodOptions.find((item) => item.value === selected)?.label;
                }}
                value={moodId}
                onChange={(e: SelectChangeEvent<number>) => setMoodId(e.target.value as number)}
                css={selectStyle}
              >
                <MenuItem disabled value="0">
                  <em>雰囲気を選択してください</em>
                </MenuItem>
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

export default MatchPostForm;

// css

const title = css`
  font-weight: bold;
  font-size: 25px;
  letter-spacing: 1px;
  color: #222222;s
`;

const paperStyle = css`
  width: 900px;
  height: 800px;
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

const placeholder = css`
  opacity: 0.5;
`;
