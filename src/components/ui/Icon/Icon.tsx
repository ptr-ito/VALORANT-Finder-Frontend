import React from "react";
import { ReactComponent as Home } from "assets/icons/home.svg";
import { ReactComponent as Match_find } from "assets/icons/match_find_icon.svg";
import SvgIcon from "@mui/material/SvgIcon";
import { SvgIconProps } from "@mui/material";

const iconList: { [name: string]: JSX.Element } = {
  Match_find: <Match_find />,
};

interface Props extends React.HTMLProps<SvgIconProps> {
  iconName: "Match_find";
}

export const Icon: React.FC<Props> = (props) => {
  const { iconName } = props;

  return <SvgIcon>{iconList[iconName]}</SvgIcon>;
};
