import { Box, Typography, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { css } from "@emotion/react";
import { Card } from "@mui/material";
import { HeadBlock } from "components/util/HeadBlock";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

const ContactForm = () => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();

  return (
    <>
      <HeadBlock title="お問い合わせ | VALORANT FINDER" />
      {isPcSite && (
        <Box sx={{ width: "600px" }}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h5" sx={{ mb: "50px", mt: "50px" }}>
              お問い合わせ
            </Typography>
            <Divider />
            <Grid container direction="column" justifyContent="center" alignItems="start">
              <Typography sx={{ mb: 3 }}>ご要望や誤字脱字の報告、その他お問い合わせは下記フォームよりご連絡お願い致します。</Typography>
              <Typography sx={{ mb: 5 }}>お問い合わせによっては返信できない場合がございますので、ご了承ください。</Typography>
            </Grid>
            <Card css={card}>
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdypcxprDQsQTfRRQvo-Nr5L7DNgFqES9o5-YQivdm_DqP0vQ/viewform?embedded=true" width="640" height="950" css={iframe}>
                読み込んでいます…
              </iframe>
            </Card>
          </Grid>
        </Box>
      )}
      {isMobileSite && (
        <Box>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h5" sx={{ mb: "50px", mt: "50px" }}>
              お問い合わせ
            </Typography>
            <Divider />
            <Grid container direction="column" justifyContent="center" alignItems="start">
              <Typography sx={{ mb: 3, ml: 2, mr: 2 }}>ご要望や誤字脱字の報告、その他お問い合わせは下記フォームよりご連絡お願い致します。</Typography>
              <Typography sx={{ mb: 5, ml: 2, mr: 2 }}>お問い合わせによっては返信できない場合がございますので、ご了承ください。</Typography>
            </Grid>
            <Card css={mobileCard}>
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdypcxprDQsQTfRRQvo-Nr5L7DNgFqES9o5-YQivdm_DqP0vQ/viewform?embedded=true" css={mobileIframe}>
                読み込んでいます…
              </iframe>
            </Card>
          </Grid>
        </Box>
      )}
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

// css for mobile

const mobileIframe = css`
  border: none;
  width: 90vw;
  height: 1200px;
`;

const mobileCard = css`
  height: 1030px;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  line-height: 1.4;
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
