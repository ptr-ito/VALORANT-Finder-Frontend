import React, { useContext, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "App";
import { HeadBlock } from "components/util/HeadBlock";
import { EditPasswordSchema } from "validation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateUserFormData } from "interfaces/index";
import { UpdateUserData } from "interfaces/index";
import { updateUserSettings } from "lib/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Grid, List } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { css } from "@emotion/react";
import useAlertMessage from "components/util/useAlertMessage";

const EditPassword = () => {
  const navigate = useNavigate();

  const { success } = useAlertMessage();

  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);

  const [password, setPassword] = useState<string | undefined>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateUserData>({
    mode: "onBlur",
    resolver: zodResolver(EditPasswordSchema),
  });

  const createFormData = (): UpdateUserFormData => {
    const formData = new FormData();

    formData.append("password", password || "");
    formData.append("passwordConfirmation", passwordConfirmation || "");
    return formData;
  };

  const editPasswordSubmit: SubmitHandler<UpdateUserData> = async () => {
    const data = createFormData();

    try {
      const res = await updateUserSettings(data);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"] || "");
        Cookies.set("_client", res.headers["client"] || "");
        Cookies.set("_uid", res.headers["uid"] || "");

        console.log(res?.data.data);

        navigate("/mypage/usersettings");

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        {
          success("パスワードの変更が完了しました");
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
      <HeadBlock title="パスワード変更 | VALORANT FINDER" />
      {isSignedIn && currentUser ? (
        <>
          <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={backButton} component={Link} to="/mypage/usersettings">
            個人設定へ戻る
          </Button>
          <Grid container justifyContent="center">
            <Typography variant="h4" sx={{ mb: 5 }}>
              パスワード変更
            </Typography>
          </Grid>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(editPasswordSubmit)}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography sx={{ mt: 7 }}>パスワード</Typography>
              <TextField
                variant="outlined"
                required
                value={password}
                type="password"
                margin="dense"
                sx={{ width: 600, mb: -4 }}
                {...register("password")}
                error={!!errors["password"]}
                helperText={errors.password ? errors.password?.message : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <Typography sx={{ mt: 7 }}>パスワード確認</Typography>
              <TextField
                variant="outlined"
                required
                value={passwordConfirmation}
                type="password"
                margin="dense"
                sx={{ width: 600 }}
                {...register("passwordConfirmation")}
                error={!!errors["passwordConfirmation"]}
                helperText={errors.passwordConfirmation ? errors.passwordConfirmation?.message : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}
              />
              <Button css={submitButton} variant="contained" color="primary" fullWidth disableRipple={true} type="submit">
                変更する
              </Button>
            </Grid>
          </form>
        </>
      ) : (
        <>
          <h2>ログインしてください</h2>
        </>
      )}
    </>
  );
};

export default EditPassword;

// css
const submitButton = css`
  margin-top: 50px;
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
