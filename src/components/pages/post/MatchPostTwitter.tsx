import TwitterIcon from "@mui/icons-material/Twitter";
import { TwitterShareButton } from "react-share";
import { MatchPostTwitterProps } from "interfaces/index";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import { css } from "@emotion/react";

const MatchPostTwitter = ({ matchPost, handleMenuClose }: MatchPostTwitterProps) => {
  return (
    <>
      {matchPost?.attributes.mode === "コンペティティブ" && (
        <TwitterShareButton
          title={`${matchPost?.attributes.content}\n\nランク帯: ${matchPost?.attributes.rank}\n\n`}
          url={`${import.meta.env.VITE_FRONT_URL}/match/${matchPost?.attributes.id}\n\n`}
          hashtags={["VALORANT\n", "VALORANTコンペ募集\n", "VALORANTランク募集\n", "VALORANT募集"]}
          onClick={handleMenuClose}
        >
          <MenuItem disableRipple={true}>
            <ListItemIcon>
              <TwitterIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText css={listTextColor} sx={{ ml: 3, mr: 3 }}>
              募集内容をツイート
            </ListItemText>
          </MenuItem>
        </TwitterShareButton>
      )}
      {matchPost?.attributes.mode === "アンレート" && (
        <TwitterShareButton
          title={`${matchPost?.attributes.content}\n\nランク帯: ${matchPost?.attributes.rank}\n\n`}
          url={`${import.meta.env.VITE_FRONT_URL}/match/${matchPost?.attributes.id}\n\n`}
          hashtags={["VALORANT\n", "VALORANTアンレート募集\n", "VALORANTアンレ募集\n", "VALORANT募集"]}
          onClick={handleMenuClose}
        >
          <MenuItem disableRipple={true}>
            <ListItemIcon>
              <TwitterIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText css={listTextColor} sx={{ ml: 3, mr: 3 }}>
              募集内容をツイート
            </ListItemText>
          </MenuItem>
        </TwitterShareButton>
      )}
      {matchPost?.attributes.mode === "カスタム" && (
        <TwitterShareButton
          title={`${matchPost?.attributes.content}\n\nランク帯: ${matchPost?.attributes.rank}\n\n`}
          url={`${import.meta.env.VITE_FRONT_URL}/match/${matchPost?.attributes.id}\n\n`}
          hashtags={["VALORANT\n", "VALORANTカスタム募集\n", "VALORANT募集"]}
          onClick={handleMenuClose}
        >
          <MenuItem disableRipple={true}>
            <ListItemIcon>
              <TwitterIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText css={listTextColor} sx={{ ml: 3, mr: 3 }}>
              募集内容をツイート
            </ListItemText>
          </MenuItem>
        </TwitterShareButton>
      )}
      {matchPost?.attributes.mode === "その他" && (
        <TwitterShareButton
          title={`${matchPost?.attributes.content}\n\nランク帯: ${matchPost?.attributes.rank}\n\n`}
          url={`${import.meta.env.VITE_FRONT_URL}/match/${matchPost?.attributes.id}\n\n`}
          hashtags={["VALORANT\n", "VALORANT募集"]}
          onClick={handleMenuClose}
        >
          <MenuItem disableRipple={true}>
            <ListItemIcon>
              <TwitterIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText css={listTextColor} sx={{ ml: 3, mr: 3 }}>
              募集内容をツイート
            </ListItemText>
          </MenuItem>
        </TwitterShareButton>
      )}
    </>
  );
};

export default MatchPostTwitter;

// css

const listTextColor = css`
  color: #7f7f7f;
`;
