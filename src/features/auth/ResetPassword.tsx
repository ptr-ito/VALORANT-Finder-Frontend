import React, { useState } from "react";
import { ResetPasswordSchema } from "validation/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ResetPassword } from "interfaces/index";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAlertMessage from "hooks/useAlertMessage";
import { resetPassword } from "lib/api/auth";
import { ConfirmDialogProps } from "components/util/ConfirmDialog";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { useMediaQueryContext } from "providers/MediaQueryProvider";
import { HeadBlock } from "components/util/HeadBlock";

const PasswordReset = () => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = React.useState<ConfirmDialogProps | undefined>();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const accessToken = query.get("access-token");
  const client = query.get("client");
  const uid = query.get("uid");

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
    password: password,
    passwordConfirmation: passwordConfirmation,
    accessToken: accessToken || "",
    client: client || "",
    uid: uid || "",
  };

  const resetPasswordSubmit: SubmitHandler<ResetPassword> = async () => {
    console.log(params);
    try {
      const res = await resetPassword(params);
      if (res.data.success === true) {
        setPassword("");
        setPasswordConfirmation("");
        navigate("/signin");

        {
          success("パスワードの変更が完了しました");
        }
        console.log("Succeeded in send password");
      } else {
        console.log("Succeeded in send password");
      }
    } catch (err) {
      console.log(err);
      console.log("Failed in updating user!");
    }
  };

  return (
    <>
      <HeadBlock title="パスワード再設定 | VALORANT FINDER" />
      {isPcSite && (
        <>
          <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={backButton} component={Link} to="/signin">
            ログイン画面へ戻る
          </Button>
          <Typography variant="h5" css={title}>
            パスワード再設定
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(resetPasswordSubmit)} css={form}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography sx={{ mt: 7 }}>パスワード</Typography>
              <TextField
                variant="outlined"
                required
                type="password"
                value={password}
                margin="dense"
                sx={{ width: 600 }}
                {...register("password")}
                error={!!errors["password"]}
                helperText={errors.password ? errors.password?.message : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <Typography sx={{ mt: 7 }}>パスワード（確認）</Typography>
              <TextField
                variant="outlined"
                required
                type="password"
                value={passwordConfirmation}
                margin="dense"
                sx={{ width: 600 }}
                {...register("passwordConfirmation")}
                error={!!errors["passwordConfirmation"]}
                helperText={errors.passwordConfirmation ? errors.passwordConfirmation?.message : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}
              />
              <Button css={submitButton} variant="contained" color="primary" fullWidth disableRipple={true} type="submit">
                設定する
              </Button>
            </Grid>
          </form>
        </>
      )}
      {isMobileSite && (
        <>
          <Button startIcon={<ArrowBackIcon />} disableRipple={true} css={mobileBackButton} component={Link} to="/signin">
            ログイン画面へ戻る
          </Button>
          <Typography variant="h5" css={title} sx={{ fontSize: "20px" }}>
            パスワード再設定
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(resetPasswordSubmit)} css={form}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography sx={{ mt: 7 }}>パスワード</Typography>
              <TextField
                variant="outlined"
                required
                type="password"
                value={password}
                margin="dense"
                sx={{ width: "60vw" }}
                {...register("password")}
                error={!!errors["password"]}
                helperText={errors.password ? errors.password?.message : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <Typography sx={{ mt: 7 }}>パスワード（確認）</Typography>
              <TextField
                variant="outlined"
                required
                type="password"
                value={passwordConfirmation}
                margin="dense"
                sx={{ width: "60vw" }}
                {...register("passwordConfirmation")}
                error={!!errors["passwordConfirmation"]}
                helperText={errors.passwordConfirmation ? errors.passwordConfirmation?.message : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}
              />
              <Button css={submitButton} variant="contained" color="primary" fullWidth disableRipple={true} type="submit">
                設定する
              </Button>
            </Grid>
          </form>
        </>
      )}
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
  margin-top: 50px;
  margin-bottom: 50px;
  right: 230px;
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

// css for mobile

const mobileBackButton = css`
  margin-top: 50px;
  margin-bottom: 50px;
  margin-right: auto;
  left: 80px;
  color: #ff4755;
`;
