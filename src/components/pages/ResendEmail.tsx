import react, { useState } from "react";
import { EmailData } from "interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resendEmailSchema } from "validation/Schema";
import { resendEmail } from "lib/api/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ResendEmailFormData } from "interfaces";
import useAlertMessage from "hooks/useAlertMessage";
import { css } from "@emotion/react";
import Grid from "@mui/material/Grid";

const ResendEmail = (emailValue: any) => {
  const [email, setEmail] = useState<string | "">(emailValue.emailValue);
  const { success, error } = useAlertMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>({
    mode: "onBlur",
    resolver: zodResolver(resendEmailSchema),
  });

  const createFormData = (): ResendEmailFormData => {
    const formData = new FormData();

    formData.append("email", email || "");
    return formData;
  };

  const resendEmailSubmit: SubmitHandler<EmailData> = async () => {
    const data = createFormData();

    try {
      const res = await resendEmail(data);
      if (res.status === 200) {
        console.log(res);
        {
          success("メールを送信しました");
        }
      }
    } catch (e: any) {
      console.log(e);
      if (e.response.status === 404) {
        {
          error("メールアドレスが見つかりません");
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(resendEmailSubmit)} noValidate>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <TextField
            variant="outlined"
            placeholder="メールアドレスを入力してください"
            required
            value={email}
            css={emailForm}
            {...register("email")}
            error={!!errors["email"]}
            helperText={errors.email ? errors.email?.message : ""}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit" variant="contained" css={registerButton} disableRipple={true}>
            送信
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default ResendEmail;

// css

const registerButton = css`
  background-color: #ff4755;
  &:hover {
    background-color: #ff4755;
  }
  width: 200px;
  bottom: 70px;
`;

const emailForm = css`
  margin-bottom: 30px;
  bottom: 100px;
  width: 400px;
`;
