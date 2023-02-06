import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { AuthContext } from "App";
import { css } from "@emotion/react";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

const MediaLinkButon = () => {
  const { currentUser } = useContext(AuthContext);
  const { isMobileSite, isPcSite } = useMediaQueryContext();

  return (
    <>
      {isPcSite && (
        <>
          <IconButton target="_blank" href={currentUser?.attributes.youtubeUrl || ""} disableRipple={true} css={linkButton}>
            <YouTubeIcon sx={{ fontSize: 34 }} />
          </IconButton>
          {currentUser?.attributes.twitterName === "" ? (
            <IconButton target="_blank" href={``} disableRipple={true} css={linkButton}>
              <TwitterIcon sx={{ fontSize: 34 }} />
            </IconButton>
          ) : (
            <IconButton target="_blank" href={`https://twitter.com/${currentUser?.attributes.twitterName}`} disableRipple={true} css={linkButton}>
              <TwitterIcon sx={{ fontSize: 34 }} />
            </IconButton>
          )}
        </>
      )}
      {isMobileSite && (
        <>
          <IconButton target="_blank" href={currentUser?.attributes.youtubeUrl || ""} disableRipple={true} css={linkButton}>
            <YouTubeIcon sx={{ fontSize: 24 }} />
          </IconButton>
          {currentUser?.attributes.twitterName === "" ? (
            <IconButton target="_blank" href={``} disableRipple={true} css={linkButton}>
              <TwitterIcon sx={{ fontSize: 24 }} />
            </IconButton>
          ) : (
            <IconButton target="_blank" href={`https://twitter.com/${currentUser?.attributes.twitterName}`} disableRipple={true} css={linkButton}>
              <TwitterIcon sx={{ fontSize: 24 }} />
            </IconButton>
          )}
        </>
      )}
    </>
  );
};

export default MediaLinkButon;

// css
const linkButton = css`
  color: #3f4551;
  border-color: #3f4551;
  margin-right: 10px;
  &:hover {
    color: #3f4551;
    border-color: #3f4551;
    background-color: #fff;
  }
`;
