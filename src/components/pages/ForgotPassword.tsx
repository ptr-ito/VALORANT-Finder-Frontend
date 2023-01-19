import React, { useContext, useState, useCallback } from "react";
import { AuthContext } from "App";
import { ForgotPasswordSchema } from "validation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ForgotPassword } from "interfaces/index";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Grid, List } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAlertMessage from "components/util/useAlertMessage";
import { forgotPassword } from "lib/api/auth";
import { ConfirmDialog, ConfirmDialogProps } from "components/util/ConfirmDialog";

import { css } from "@emotion/react";

const PasswordForgot = () => {
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = React.useState<ConfirmDialogProps | undefined>();
  const [email, setEmail] = useState("");
  const redirectUrl = `${import.meta.env.VITE_FRONT_URL}/password/reset`;

  const { success } = useAlertMessage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const params: ForgotPassword = {
    email: email,
    redirectUrl: redirectUrl,
  };

  const forgotPasswordSubmit: SubmitHandler<ForgotPassword> = async () => {
    console.log(params);
    try {
      const ret = await new Promise<string>((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "メールを確認してください",
          message: `${params.email}にパスワード再設定のメールを送信しました。`,
          ok: "OK",
        });
      });
      setModalConfig(undefined);
      if (ret === "ok") {
        const res = await forgotPassword(params);
        if (res.data.success === true) {
          setEmail("");
          redirectUrl;

          navigate("/signin");
          console.log("Succeeded in send email");
        } else {
          console.log("Failed in ssend email");
        }
        console.log("確認:OK時の処理を実行する");
      }
    } catch (err) {
      console.log(err);
      console.log("Failed in updating user!");
    }
  };

  return (
    <>
      <>
        <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={backButton} component={Link} to="/signin">
          ログイン画面へ戻る
        </Button>
        <Typography variant="h5" css={title}>
          パスワードをお忘れの方
        </Typography>
        <Typography variant="body1" css={message}>
          ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(forgotPasswordSubmit)} css={form}>
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
            <TextField type="hidden" value={redirectUrl} {...register("redirectUrl")} css={hiddenContent} />
            <Button css={submitButton} variant="contained" color="primary" fullWidth disableRipple={true} type="submit">
              パスワードをリセット
            </Button>
          </Grid>
        </form>
        {modalConfig && <ConfirmDialog {...modalConfig} />}
      </>
    </>
  );
};

export default PasswordForgot;

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

const hiddenContent = css`
  display: none;
`;

const title = css`
  text-align: center;
  margin-bottom: 35px;
  margin-top: 55px;
`;

const message = css`
  text-align: center;
  margin-bottom: 20px;
`;

const form = css`
  margin-top: -20px;
`;
