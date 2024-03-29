import { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { signUp } from "lib/api/auth";
import { SignUpParams } from "interfaces/index";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "validation/Schema";
import { css } from "@emotion/react";
import SendEmail from "./SendEmail";
import { HeadBlock } from "components/util/HeadBlock";
import useAlertMessage from "hooks/useAlertMessage";
import FormHelperText from "@mui/material/FormHelperText";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

export const SignUp = () => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();

  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const { error } = useAlertMessage();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const confirmSuccessUrl = `${import.meta.env.VITE_FRONT_URL}/signin`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>({
    mode: "onBlur",
    resolver: zodResolver(signupSchema),
  });

  const params: SignUpParams = {
    name: name,
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation,
    confirmSuccessUrl: confirmSuccessUrl,
  };

  const signUpSubmit: SubmitHandler<SignUpParams> = async () => {
    try {
      const res = await signUp(params);
      if (res.status === 200) {
        console.log(res);

        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");

        setFormSubmit(true);

        sessionStorage.setItem("form", JSON.stringify(email));
      } else {
        console.log(res);
      }
    } catch (e: any) {
      console.log(e);
      if (e.response.data.errors.fullMessages[0] === "Eメールはすでに存在します") {
        {
          error(`${e.response.data.data.email}はすでに登録済みです。`);
        }
      }
      if (e.response.data.errors.fullMessages[0] === "Eメールは有効ではありません") {
        error(`${e.response.data.data.email}は有効なメールアドレスではありません。`);
      }
    }
  };

  return (
    <>
      <HeadBlock title="新規登録 | VALORANT FINDER" />
      {isPcSite && (
        <>
          {formSubmit ? (
            <SendEmail />
          ) : (
            <Grid container direction="column" alignItems="center">
              <Typography variant="h4" sx={{ mb: "50px", mt: "50px" }}>
                新規登録
              </Typography>
              <Box width={450}>
                <form onSubmit={handleSubmit(signUpSubmit)} noValidate css={fontStyle}>
                  <Typography>ユーザーネーム</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="プロフィールに表示する名前を入力してください"
                    fullWidth
                    required
                    value={name}
                    {...register("name")}
                    error={!!errors["name"]}
                    helperText={errors.name ? errors.name?.message : ""}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <FormHelperText sx={{ mb: "2rem", mt: "0.5rem" }}>{errors.name ? <></> : "3文字以上20文字以内"}</FormHelperText>
                  <Typography>メールアドレス</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="メールアドレスを入力してください"
                    fullWidth
                    required
                    value={email}
                    sx={{ mb: "2rem", mt: "0.5rem" }}
                    {...register("email")}
                    error={!!errors["email"]}
                    helperText={errors.email ? errors.email?.message : ""}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Typography>パスワード</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="パスワードを入力してください"
                    fullWidth
                    required
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    {...register("password")}
                    error={!!errors["password"]}
                    helperText={errors.password ? errors.password?.message : ""}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <FormHelperText sx={{ mb: "2rem", mt: "0.5rem" }}>{errors.password ? <></> : "半角英数字6文字以上"}</FormHelperText>
                  <Typography>パスワードの確認</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="もう一度パスワードを入力してください"
                    fullWidth
                    required
                    type="password"
                    value={passwordConfirmation}
                    sx={{ mb: "2rem", mt: "0.5rem" }}
                    autoComplete="current-password"
                    {...register("passwordConfirmation")}
                    error={!!errors["passwordConfirmation"]}
                    helperText={errors.passwordConfirmation ? errors.passwordConfirmation?.message : ""}
                    onChange={(event) => setPasswordConfirmation(event.target.value)}
                  />
                  <TextField type="hidden" label="confirm_success_url" value={confirmSuccessUrl} {...register("confirmSuccessUrl")} css={hiddenContent} />
                  <Button type="submit" variant="contained" size="large" fullWidth css={registerButton} disableRipple={true}>
                    <Typography css={navText}>新規登録</Typography>
                  </Button>
                </form>
              </Box>
              <Typography sx={{ mt: 5 }}>
                アカウントをお持ちですか？
                <Link to="/signin" css={signInLink}>
                  ログイン
                </Link>
              </Typography>
            </Grid>
          )}
        </>
      )}
      {isMobileSite && (
        <>
          {formSubmit ? (
            <SendEmail />
          ) : (
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography variant="h4" sx={{ mb: "50px", mt: "50px", fontSize: "24px" }}>
                新規登録
              </Typography>
              <Box sx={{ width: "60vw" }}>
                <form onSubmit={handleSubmit(signUpSubmit)} noValidate css={fontStyle}>
                  <Typography>ユーザーネーム</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="プロフィールに表示する名前を入力してください"
                    fullWidth
                    required
                    value={name}
                    {...register("name")}
                    error={!!errors["name"]}
                    helperText={errors.name ? errors.name?.message : ""}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <FormHelperText sx={{ mb: "2rem", mt: "0.5rem" }}>{errors.name ? <></> : "3文字以上20文字以内"}</FormHelperText>
                  <Typography>メールアドレス</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="メールアドレスを入力してください"
                    fullWidth
                    required
                    value={email}
                    sx={{ mb: "2rem", mt: "0.5rem" }}
                    {...register("email")}
                    error={!!errors["email"]}
                    helperText={errors.email ? errors.email?.message : ""}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Typography>パスワード</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="パスワードを入力してください"
                    fullWidth
                    required
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    {...register("password")}
                    error={!!errors["password"]}
                    helperText={errors.password ? errors.password?.message : ""}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <FormHelperText sx={{ mb: "2rem", mt: "0.5rem" }}>{errors.password ? <></> : "半角英数字6文字以上"}</FormHelperText>
                  <Typography>パスワードの確認</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="もう一度パスワードを入力してください"
                    fullWidth
                    required
                    type="password"
                    value={passwordConfirmation}
                    sx={{ mb: "2rem", mt: "0.5rem" }}
                    autoComplete="current-password"
                    {...register("passwordConfirmation")}
                    error={!!errors["passwordConfirmation"]}
                    helperText={errors.passwordConfirmation ? errors.passwordConfirmation?.message : ""}
                    onChange={(event) => setPasswordConfirmation(event.target.value)}
                  />
                  <TextField type="hidden" label="confirm_success_url" value={confirmSuccessUrl} {...register("confirmSuccessUrl")} css={hiddenContent} />
                  <Button type="submit" variant="contained" size="large" fullWidth css={registerButton} disableRipple={true}>
                    <Typography css={navText}>新規登録</Typography>
                  </Button>
                </form>
              </Box>
              <Typography sx={{ mt: 5 }}>
                アカウントをお持ちですか？
                <Link to="/signin" css={signInLink}>
                  ログイン
                </Link>
              </Typography>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

// css

const registerButton = css`
  background-color: #3f4551;
  &:hover {
    background-color: #3f4551;
  }
`;

const signInLink = css`
  margin-top: 30px;
`;

const hiddenContent = css`
  display: none;
`;

const fontStyle = css`
  font-size: 0.875rem;
`;

const navText = css`
  font-weight: 550;
`;
