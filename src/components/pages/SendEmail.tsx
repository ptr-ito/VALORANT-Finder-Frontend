import { Grid, Typography, Box } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "App";
import { css } from "@emotion/react";

const SendEmail = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);
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
