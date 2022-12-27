import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

import { ReactComponent as Match_find } from "assets/icons/match_find_icon.svg";
import { ReactComponent as Send_email } from "assets/icons/send_email.svg";

const iconList: { [name: string]: JSX.Element } = {
  Match_find: <Match_find />,
  Send_email: <Send_email />,
};

interface Props extends React.HTMLProps<SvgIconProps> {
  iconName: "Match_find" | "Send_email";
}

export const Icon: React.FC<Props> = (props) => {
  const { iconName } = props;

  return <SvgIcon>{iconList[iconName]}</SvgIcon>;
};
