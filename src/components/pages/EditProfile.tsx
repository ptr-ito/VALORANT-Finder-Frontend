import React, { useContext, useState, useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "App";
import { ranks } from "data/ranks";
import { agents } from "data/agents";
import { UpdateUserFormData } from "interfaces/index";
import { UpdateUserData } from "interfaces/index";
// import { getUser, updateUser } from "lib/api/users";
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

// import Select from "react-select";

import { css } from "@emotion/react";

const EditProfile = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { success } = useAlertMessage();

  const [name, setName] = useState<string | undefined>(currentUser?.name);
  const [rankId, setRankId] = useState<number | undefined>(currentUser?.rankId || 0);
  const [agentId, setAgentId] = useState<number | undefined>(currentUser?.agentId || 0);
  const [selfIntroduction, setSelfIntroduction] = useState<string | undefined>(currentUser?.selfIntroduction);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");
  // アップロードした画像の情報を取得
  const uploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];
    setImage(file);
  }, []);

  // 画像プレビュー
  const previewImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateUserData>({
    mode: "onBlur",
    resolver: zodResolver(ProfileSchema),
  });

  const createFormData = (): UpdateUserFormData => {
    const formData = new FormData();

    formData.append("name", name || "");
    formData.append("rankId", String(rankId));
    formData.append("agentId", String(agentId));
    formData.append("selfIntroduction", selfIntroduction || "");
    if (image) formData.append("image", image);

    return formData;
  };

  const editProfileSubmit: SubmitHandler<UpdateUserData> = async () => {
    // const editProfileSubmit = async () => {
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
            <Avatar src={currentUser?.image.url} css={avatar} />
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
              required
              value={name}
              margin="dense"
              sx={{ width: 600 }}
              {...register("name")}
              error={!!errors["name"]}
              helperText={errors.name ? errors.name?.message : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <Typography sx={{ mt: 4 }}>ランク</Typography>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <Select value={rankId ?? ""} {...register("rankId")} error={!!errors["rankId"]} onChange={(e: SelectChangeEvent<number>) => setRankId(e.target.value as number)}>
                {ranks.map((rank, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {rank}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={true}>{errors.rankId ? errors.rankId?.message : ""}</FormHelperText>
            </FormControl>
            <Typography sx={{ mt: 4 }}>エージェント</Typography>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <Select value={agentId ?? ""} {...register("agentId")} error={!!errors["agentId"]} onChange={(e: SelectChangeEvent<number>) => setAgentId(e.target.value as number)}>
                {agents.map((agent, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {agent}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={true}>{errors.agentId ? errors.agentId?.message : ""}</FormHelperText>
            </FormControl>
            <Typography sx={{ mt: 4 }}>自己紹介</Typography>
            <TextField
              placeholder="1000文字以内で書いてください。"
              variant="outlined"
              fullWidth
              multiline
              minRows="10"
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
            <Box textAlign="center">
              <Button css={submitButton} variant="contained" color="primary" type="submit" disableRipple={true} fullWidth>
                プロフィール更新
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EditProfile;

// css
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
`;
