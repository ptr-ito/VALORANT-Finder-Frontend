import React, { useContext, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "App";

import { EditEmailSchema } from "validation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { UpdateUserFormData } from "interfaces/index";
import { UpdateUserData } from "interfaces/index";
import { getUser, updateUser } from "lib/api/users";
import { updateUserSettings } from "lib/api/auth";

import { Link, useNavigate } from "react-router-dom";

import { Typography, Grid, List } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAlertMessage from "components/util/useAlertMessage";

import { css } from "@emotion/react";

const EditEmail = () => {
  const navigate = useNavigate();

  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string | undefined>(currentUser?.attributes.email);

  const { success } = useAlertMessage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateUserData>({
    mode: "onBlur",
    resolver: zodResolver(EditEmailSchema),
  });

  const createFormData = (): UpdateUserFormData => {
    const formData = new FormData();

    formData.append("email", email || "");
    // formData.append("confirmRedirectUrl", confirmRedirectUrl || "");
    return formData;
  };

  const editEmailSubmit: SubmitHandler<UpdateUserData> = async () => {
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
          success("メールアドレスの変更が完了しました");
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
      {isSignedIn && currentUser ? (
        <>
          <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={backButton} component={Link} to="/mypage/usersettings">
            個人設定へ戻る
          </Button>
          <Grid container justifyContent="center">
            <Typography variant="h4" sx={{ mb: 5 }}>
              メールアドレス変更
            </Typography>
          </Grid>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(editEmailSubmit)}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography sx={{ mt: 7 }}>メールアドレス</Typography>
              <TextField
                variant="outlined"
                required
                value={email}
                margin="dense"
                sx={{ width: 600 }}
                {...register("email")}
                error={!!errors["email"]}
                helperText={errors.email ? errors.email?.message : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              {/* <TextField type="hidden" label="confirm_redirect_url" value={confirmRedirectUrl} {...register("confirmRedirectUrl")} css={hiddenContent} /> */}
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

export default EditEmail;

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
