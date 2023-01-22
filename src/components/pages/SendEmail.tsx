import { Grid, Typography } from "@mui/material";
import React from "react";

const SendEmail = () => {
  const emailValue = JSON.parse(sessionStorage.getItem("form") || "");
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h5" sx={{ mt: 5 }}>
          メールを送信しました。
        </Typography>
        <Typography variant="h5" sx={{ mt: 4 }}>
          以下のメールアドレスへ送付したメールからユーザ登録を完了してください。
        </Typography>
        <Typography variant="h5" sx={{ mt: 4 }}>
          {emailValue}
        </Typography>
      </Grid>
    </>
  );
};

export default SendEmail;
