import { Box, Typography, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { css } from "@emotion/react";
import { Card } from "@mui/material";

const ContactForm = () => {
  return (
    <>
      <Box sx={{ width: "600px" }}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h5" sx={{ mb: 7 }}>
            お問い合わせ
          </Typography>
          <Divider />
          <Grid container direction="column" justifyContent="center" alignItems="start">
            <Typography sx={{ mb: 3 }}>ご要望や誤字脱字の報告、その他お問い合わせは下記フォームよりご連絡お願い致します。</Typography>
            <Typography sx={{ mb: 5 }}>問い合わせによっては返信できない場合がございますので、ご了承ください。</Typography>
          </Grid>
          <Card css={card}>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdypcxprDQsQTfRRQvo-Nr5L7DNgFqES9o5-YQivdm_DqP0vQ/viewform?embedded=true" width="640" height="950" css={iframe}>
              読み込んでいます…
            </iframe>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export default ContactForm;

// css

const iframe = css`
  border: none;
`;

const card = css`
  margin-top: 40px;
  margin-bottom: 40px;
  position: relative;
  line-height: 1.4;
  padding: 0.25em 1em;
  background-color: #f4f5f7;
  box-shadow: none;
  &: after,
  &: before {
    content: "";
    width: 30px;
    height: 40px;
    position: absolute;
    display: inline-block;
  }
  &: before {
    border-left: solid 1px #3f4551;
    border-top: solid 1px #3f4551;
    top: 0;
    left: 0;
  }
  &: after {
    border-right: solid 1px #3f4551;
    border-bottom: solid 1px #3f4551;
    bottom: 0;
    right: 0;
  }
`;
