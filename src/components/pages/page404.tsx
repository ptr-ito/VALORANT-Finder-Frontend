import React from "react";
import { Grid, Typography } from "@mui/material";
import { css } from "@emotion/react";

const NotFound = () => {
  return (
    <>
      <div css={pageStyle}>
        <h3>ページが見つかりませんでした。</h3>
        <h4>
          お探しのページはURLが間違っているか、削除された可能性があります。
        </h4>
      </div>
    </>
  );
};

export default NotFound;

// css

const pageStyle = css`
  text-align: center;
`;
