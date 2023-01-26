import React, { useContext, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "App";
import { rankOptions } from "data/ranks";
import { agentOptions } from "data/agents";
import { UpdateUserFormData } from "interfaces/index";
import { UpdateUserData } from "interfaces/index";
import { updateUserSettings } from "lib/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { ProfileSchema } from "validation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Typography, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { SelectChangeEvent } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormHelperText from "@mui/material/FormHelperText";
import useAlertMessage from "components/util/useAlertMessage";
import Chip from "@mui/material/Chip";
import { css } from "@emotion/react";
import InputAdornment from "@mui/material/InputAdornment";

const EditProfile = () => {
  const { setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);

  const agentParams: any = String(currentUser?.attributes.agent)
    .split(/,|\s/)
    .map((v) => agentOptions.find((agent) => agent.label == v)?.value);

  const navigate = useNavigate();

  const { success } = useAlertMessage();

  const [name, setName] = useState<string | undefined>(currentUser?.attributes.name);
  const [rankId, setRankId] = useState<string | undefined>(rankOptions.find((x) => x.label == currentUser?.attributes.rank)?.value) || 0;
  const [highestRankId, setHighestRankId] = useState<string | undefined>(rankOptions.find((x) => x.label == currentUser?.attributes.highestRank)?.value) || 0;
  const [agentIds, setAgentIds] = useState<string[]>(agentParams);
  const [ingameName, setIngameName] = useState<string | undefined>(currentUser?.attributes.ingameName);
  const [startedOnVal, setStartedOnVal] = useState<string | undefined>(currentUser?.attributes.startedOnVal);
  const [youtubeUrl, setYoutubeUrl] = useState<string | undefined>(currentUser?.attributes.youtubeUrl);
  const [twitterName, setTwitterName] = useState<string | undefined>(currentUser?.attributes.twitterName);
  const [selfIntroduction, setSelfIntroduction] = useState<string | undefined>(currentUser?.attributes.selfIntroduction);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");

  const uploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];
    setImage(file);
  }, []);

  const previewImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof agentIds>) => {
    const {
      target: { value },
    } = event;
    setAgentIds(typeof value === "string" ? value.split(",") : value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserData>({
    mode: "onBlur",
    resolver: zodResolver(ProfileSchema),
  });

  const createFormData = (): UpdateUserFormData => {
    const formData = new FormData();

    formData.append("name", name || "");
    formData.append("rankId", String(rankId));
    formData.append("highestRankId", String(highestRankId));
    agentIds?.forEach((agent) => formData.append("agentIds[]", String(agent)));
    formData.append("selfIntroduction", selfIntroduction || "");
    formData.append("ingameName", ingameName || "");
    formData.append("startedOnVal", startedOnVal || "");
    formData.append("youtubeUrl", youtubeUrl || "");
    formData.append("twitterName", twitterName || "");
    if (image) formData.append("image", image);

    return formData;
  };

  const editProfileSubmit: SubmitHandler<UpdateUserData> = async () => {
    const data = createFormData();

    try {
      const res = await updateUserSettings(data);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"] || "");
        Cookies.set("_client", res.headers["client"] || "");
        Cookies.set("_uid", res.headers["uid"] || "");

        console.log(res?.data.data);
        navigate("/mypage");

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        {
          success("プロフィールの変更が完了しました");
        }

        console.log("Update user successfully!");
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
      console.log("Failed in updating user!");
    }
  };

  const chipDelete = (agent: string) => {
    setAgentIds(agentIds?.filter((value) => value !== agent));
  };

  return (
    <>
      <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={backButton} component={Link} to="/mypage">
        マイページへ戻る
      </Button>
      <Grid container justifyContent="center">
        <Typography variant="h4" sx={{ mb: 5 }}>
          プロフィール編集
        </Typography>
      </Grid>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(editProfileSubmit)}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          {preview ? (
            <Box>
              <IconButton color="inherit" onClick={() => setPreview("")}>
                <CancelIcon />
              </IconButton>
              <Avatar src={preview} alt="preview img" css={avatar} />
            </Box>
          ) : (
            <Avatar src={currentUser?.attributes.image.url} css={avatar} />
          )}
          <Grid item>
            <div css={input}>
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  uploadImage(e);
                  previewImage(e);
                }}
              />
            </div>
            <Typography sx={{ mt: 7 }}>ユーザー名</Typography>
            <TextField
              variant="outlined"
              minRows="10"
              rows="15"
              required
              value={name}
              margin="dense"
              sx={{ width: 600 }}
              {...register("name")}
              error={!!errors["name"]}
              helperText={errors.name ? errors.name?.message : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <Typography sx={{ mt: 7 }}>ゲーム内の名前</Typography>
            <TextField
              variant="outlined"
              minRows="10"
              rows="15"
              placeholder="test-name#123"
              required
              value={ingameName || ""}
              margin="dense"
              sx={{ width: 600 }}
              {...register("ingameName")}
              error={!!errors["ingameName"]}
              helperText={errors.ingameName ? errors.ingameName?.message : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIngameName(e.target.value)}
            />
            <Typography sx={{ mt: 7 }}>VALORANT歴</Typography>
            <TextField
              variant="outlined"
              minRows="10"
              rows="15"
              placeholder="1年"
              required
              value={startedOnVal || ""}
              margin="dense"
              sx={{ width: 600 }}
              {...register("startedOnVal")}
              error={!!errors["startedOnVal"]}
              helperText={errors.startedOnVal ? errors.startedOnVal?.message : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartedOnVal(e.target.value)}
            />
            <Typography sx={{ mt: 4 }}>最高ランク</Typography>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <Select
                value={highestRankId}
                {...register("highestRankId")}
                error={!!errors["highestRankId"]}
                onChange={(e: SelectChangeEvent<string>) => setHighestRankId(e.target.value)}
                MenuProps={{
                  sx: { maxHeight: "300px" },
                }}
              >
                {rankOptions.map((highestRankId, index) => (
                  <MenuItem key={index} value={highestRankId.value}>
                    {highestRankId.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={true}>{errors.rankId ? errors.rankId?.message : ""}</FormHelperText>
            </FormControl>
            <Typography sx={{ mt: 4 }}>現在のランク</Typography>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <Select
                value={rankId}
                {...register("rankId")}
                error={!!errors["rankId"]}
                onChange={(e: SelectChangeEvent<string>) => setRankId(e.target.value)}
                MenuProps={{
                  sx: { maxHeight: "300px" },
                }}
              >
                {rankOptions.map((rank, index) => (
                  <MenuItem key={index} value={rank.value}>
                    {rank.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={true}>{errors.rankId ? errors.rankId?.message : ""}</FormHelperText>
            </FormControl>
            <Typography sx={{ mt: 4 }}>エージェント</Typography>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <Select
                sx={{ width: 600 }}
                {...register("agentIds")}
                error={!!errors["agentIds"]}
                displayEmpty
                multiple
                value={agentIds}
                onChange={handleChange}
                renderValue={(selected) => {
                  console.log(selected[0]);
                  if (selected[0] === undefined) {
                    selected.shift();
                    return <em css={placeholder}>エージェントを選ばない場合は「未選択」を選択してください</em>;
                  }
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={agentOptions.find((item) => item.value === value)?.label}
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
                  <em>普段使用しているエージェントを選択してください</em>
                </MenuItem>
                {agentOptions.map((agent) => (
                  <MenuItem key={agent.value} value={agent.value}>
                    {agent.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={true} sx={{ ml: -0.2, mt: -1, mb: 3 }}>
                {errors.agentIds ? errors.agentIds?.message : ""}
              </FormHelperText>
            </FormControl>
            <Typography sx={{ mt: 7 }}>YouTube</Typography>
            <TextField
              variant="outlined"
              minRows="10"
              rows="15"
              placeholder="https://www.youtube.com/"
              required
              value={youtubeUrl || ""}
              margin="dense"
              sx={{ width: 600 }}
              {...register("youtubeUrl")}
              error={!!errors["youtubeUrl"]}
              helperText={errors.youtubeUrl ? errors.youtubeUrl?.message : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYoutubeUrl(e.target.value)}
            />
            <Typography sx={{ mt: 7 }}>Twitter</Typography>
            <TextField
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">@</InputAdornment>,
              }}
              minRows="10"
              rows="15"
              placeholder="Twitterのアカウント名を入力してください"
              required
              value={twitterName || ""}
              margin="dense"
              sx={{ width: 600 }}
              {...register("twitterName")}
              error={!!errors["twitterName"]}
              helperText={errors.twitterName ? errors.twitterName?.message : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTwitterName(e.target.value)}
            />
            <Typography sx={{ mt: 4 }}>自己紹介</Typography>
            <TextField
              placeholder="1000文字以内で書いてください。"
              variant="outlined"
              fullWidth
              multiline
              rows="15"
              value={selfIntroduction ?? ""}
              margin="dense"
              {...register("selfIntroduction")}
              error={!!errors["selfIntroduction"]}
              helperText={errors.selfIntroduction ? errors.selfIntroduction?.message : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSelfIntroduction(e.target.value);
              }}
            />
          </Grid>

          <Box textAlign="center">
            <Button css={submitButton} variant="contained" color="primary" type="submit" disableRipple={true} fullWidth>
              プロフィール更新
            </Button>
          </Box>
        </Grid>
      </form>
    </>
  );
};

export default EditProfile;

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

const avatar = css`
  width: 100px;
  height: 100px;
`;

const input = css`
  margin-top: 25px;
  text-align: center;
`;

const submitButton = css`
  margin-top: 40px;
  background-color: #3f4551;
  &:hover {
    background-color: #3f4551;
  }
`;

const backButton = css`
  flex-grow: 1;
  margin-bottom: 50px;
  color: #ff4755;
`;

const selectStyle = css`
  margin-bottom: 20px;
`;

const placeholder = css`
  opacity: 0.5;
`;
