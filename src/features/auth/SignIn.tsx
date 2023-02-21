import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "lib/api/auth";
import { AuthContext } from "App";
import { SignInParams } from "interfaces/index";
import TextField from "@mui/material/TextField";
import { Grid, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { css } from "@emotion/react";
import { signInSchema } from "validation/Schema";
import useAlertMessage from "hooks/useAlertMessage";
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { HeadBlock } from "components/util/HeadBlock";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

export const SignIn = () => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState("");
  const { error } = useAlertMessage();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignInParams>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const signInSubmit: SubmitHandler<SignInParams> = async () => {
    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res.data.data);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"] || "");
        Cookies.set("_client", res.headers["client"] || "");
        Cookies.set("_uid", res.headers["uid"] || "");

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");

        setEmail("");
        setPassword("");

        console.log("Signed in successfully!");
      } else {
        {
          error("メールアドレスかパスワードが間違っています");
        }
      }
    } catch (e) {
      {
        error("メールアドレスかパスワードが間違っています");
      }
      console.log(e);
    }
  };
  return (
    <>
      <HeadBlock title="ログイン | VALORANT FINDER" />
      {isPcSite && (
        <Grid container direction="column" alignItems="center">
          <Typography variant="h4" sx={{ mb: "50px", mt: "50px" }}>
            ログイン
          </Typography>
          {formError}
          <Box width={450}>
            <form onSubmit={handleSubmit(signInSubmit)} noValidate>
              <Typography>メールアドレス</Typography>
              <TextField
                variant="outlined"
                sx={{ mb: "2rem" }}
                required
                fullWidth
                placeholder="メールアドレスを入力してください"
                value={email}
                margin="dense"
                {...register("email")}
                error={!!errors["email"]}
                helperText={errors.email ? errors.email?.message : ""}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Typography>パスワード</Typography>
              <TextField
                variant="outlined"
                sx={{ mb: "5rem" }}
                required
                fullWidth
                type="password"
                placeholder="パスワードを入力してください"
                value={password}
                margin="dense"
                autoComplete="current-password"
                {...register("password")}
                error={!!errors["password"]}
                helperText={errors.password ? errors.password?.message : ""}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button type="submit" variant="contained" size="large" fullWidth css={formLoginButton} disableRipple={true}>
                <Typography css={navText}>ログイン</Typography>
              </Button>
              <Divider />
              <Box textAlign="center">
                <Typography css={borderBottom}>アカウントをお持ちでない場合は</Typography>
                <Button variant="outlined" color="inherit" fullWidth component={Link} to="/signup" disableRipple={true}>
                  新規登録する
                </Button>
              </Box>
              <Button fullWidth component={Link} to="/password/forgot" disableRipple={true} endIcon={<ArrowForwardIosIcon />} css={forgotPassword}>
                パスワードを忘れた方はこちら
              </Button>
            </form>
          </Box>
        </Grid>
      )}
      {isMobileSite && (
        <Grid container direction="column" alignItems="center">
          <Typography variant="h4" sx={{ mb: "50px", mt: "50px", fontSize: "24px" }}>
            ログイン
          </Typography>
          {formError}
          <Box sx={{ width: "60vw" }}>
            <form onSubmit={handleSubmit(signInSubmit)} noValidate>
              <Typography>メールアドレス</Typography>
              <TextField
                variant="outlined"
                sx={{ mb: "2rem" }}
                required
                fullWidth
                placeholder="メールアドレスを入力してください"
                value={email}
                margin="dense"
                {...register("email")}
                error={!!errors["email"]}
                helperText={errors.email ? errors.email?.message : ""}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Typography>パスワード</Typography>
              <TextField
                variant="outlined"
                sx={{ mb: "5rem" }}
                required
                fullWidth
                type="password"
                placeholder="パスワードを入力してください"
                value={password}
                margin="dense"
                autoComplete="current-password"
                {...register("password")}
                error={!!errors["password"]}
                helperText={errors.password ? errors.password?.message : ""}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button type="submit" variant="contained" size="large" fullWidth css={formLoginButton} disableRipple={true}>
                <Typography css={navText}>ログイン</Typography>
              </Button>
              <Divider />
              <Box textAlign="center">
                <Typography css={borderBottom} sx={{ fontSize: "14px" }}>
                  アカウントをお持ちでない場合は
                </Typography>
                <Button variant="outlined" color="inherit" fullWidth component={Link} to="/signup" disableRipple={true}>
                  新規登録する
                </Button>
              </Box>
              <Button fullWidth component={Link} to="/password/forgot" disableRipple={true} endIcon={<ArrowForwardIosIcon />} css={forgotPassword} sx={{ fontSize: "12px" }}>
                パスワードを忘れた方はこちら
              </Button>
            </form>
          </Box>
        </Grid>
      )}
    </>
  );
};

// css

const formLoginButton = css`
  background-color: #3f4551;
  &:hover {
    background-color: #3f4551;
  }
`;

const navText = css`
  font-weight: 550;
`;

const borderBottom = css`
  padding-top: 60px;
  margin-top: 80px;
  margin-bottom: 20px;
  border-top: 1px solid #ced1d8;
  position: relative;
  &: after {
    position: absolute;
    content: " ";
    display: block;
    border-top: solid 1px #3f4551;
    top: -1px;
    width: 35%;
  }
`;

const forgotPassword = css`
  margin-top: 25px;
  &:hover {
    opacity: 0.5;
  }
`;
