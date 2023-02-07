import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { TwitterShareButton } from "react-share";
import TwitterIcon from "@mui/icons-material/Twitter";
import { css, SerializedStyles } from "@emotion/react";

interface Props {
  url: string;
  title: string;
  hashtags?: string[];
  css?: SerializedStyles;
}

export const TwitterShareBtn = ({ url, title, hashtags }: Props) => {
  return (
    <TwitterShareButton url={url} title={title} hashtags={hashtags}>
      <Grid container direction="row" justifyContent="center" alignItems="center" css={color}>
        <Box p={0.8}>
          <TwitterIcon />
        </Box>
        <Box>募集内容をツイート</Box>
      </Grid>
    </TwitterShareButton>
  );
};

// css

const color = css`
  color: #1da1f2;
  &:hover {
    opacity: 0.5;
  }
`;
