import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import ResendEmail from "components/pages/ResendEmail";
import { css } from "@emotion/react";

const SendEmail = () => {
  const emailValue = JSON.parse(sessionStorage.getItem("form") || "");
  const [visible, setVisible] = useState(false);
  const handleOpen = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Typography variant="h5" sx={{ mt: 5 }}>
          メールを送信しました。
        </Typography>
        <Typography variant="h5" sx={{ mt: 4 }}>
          以下のメールアドレスへ送付したメールからユーザ登録を完了してください。
        </Typography>
        <Typography variant="h5" sx={{ mt: 4 }}>
          {emailValue}
        </Typography>
        <Button color="inherit" variant="outlined" disableRipple={true} onClick={handleOpen} css={resendButton}>
          メールアドレス再送
        </Button>
        {visible ? (
          <>
            <ResendEmail emailValue={emailValue} />
          </>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};

export default SendEmail;

// css

const resendButton = css`
  width: 400px;
  margin-top: 100px;
  color: #ff4755;
  text-decoration: none;
  backgroundcolor: #fff;
  &:hover {
    background-color: rgba(255, 71, 85, 0.1);
  }
`;
