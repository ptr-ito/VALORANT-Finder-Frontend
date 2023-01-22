import React from "react";
import { Typography, Button } from "@mui/material";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div css={outside}>
        <div css={main}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            ページが見つかりませんでした。
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            お探しのページはURLが間違っているか、削除された可能性があります。
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            component={Link}
            to="/"
            css={buttonStyle}
          >
            <Typography variant="subtitle1" sx={{ pl: 10, pr: 10 }}>
              ホームへ
            </Typography>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;

// css

const outside = css`
  position: relative;
  flex-grow: 1;
  width: 100%;
  outline: none;
  max-width: 640px;
  margin: 0px auto;
  padding-top: 40px;
  padding-bottom: 64px;
`;

const main = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 560px;
  min-height: 100%;
  margin: auto;
  padding-top: 100px;
`;

const buttonStyle = css`
  color: #ff4755;
  text-decoration: none;
  backgroundcolor: #fff;
  &:hover {
    background-color: rgba(255, 71, 85, 0.1);
  }
`;
