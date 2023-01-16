import React, { useContext, useState, useCallback } from "react";
import { AuthContext } from "App";
import { ResetPasswordSchema } from "validation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ResetPasswordFormData, ResetPassword } from "interfaces/index";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Grid, List } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAlertMessage from "components/util/useAlertMessage";
import { passwordReset } from "lib/api/auth";
import { ConfirmDialog, ConfirmDialogProps } from "components/util/ConfirmDialog";

import { css } from "@emotion/react";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = React.useState<ConfirmDialogProps | undefined>();
  const [email, setEmail] = useState("");
  const redirectUrl = "http://localhost:3001/signin";

  const { success } = useAlertMessage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ResetPassword>({
    mode: "onBlur",
    resolver: zodResolver(ResetPasswordSchema),
  });

  const params: ResetPassword = {
    email: email,
    redirectUrl: redirectUrl,
  };

  const resetPasswordSubmit: SubmitHandler<ResetPassword> = async () => {
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
        const res = await passwordReset(params);
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
          ログインへ戻る
        </Button>
        <Typography variant="h5" css={title}>
          パスワードをお忘れの方
        </Typography>
        <Typography variant="body1" css={message}>
          ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(resetPasswordSubmit)}>
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
            <TextField type="hidden" label="confirm_redirect_url" value={redirectUrl} {...register("redirectUrl")} css={hiddenContent} />
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

export default PasswordReset;

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
