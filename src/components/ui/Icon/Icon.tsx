import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { SxProps } from "@mui/material/styles";

import { ReactComponent as Match_find } from "assets/icons/match_find_icon.svg";
import { ReactComponent as Send_email } from "assets/icons/send_email.svg";
import { ReactComponent as Create } from "assets/icons/create.svg";
import { ReactComponent as Problem } from "assets/icons/problem.svg";
import { ReactComponent as Light } from "assets/icons/light.svg";
import { ReactComponent as Title } from "assets/icons/title.svg";


const iconList: { [name: string]: JSX.Element } = {
  Match_find: <Match_find />,
  Send_email: <Send_email />,
  Create: <Create />,
  Problem: <Problem />,
  Light: <Light />,
  Title: <Title />,
};

interface Props extends React.HTMLProps<SvgIconProps> {
  iconName: "Match_find" | "Send_email" | "Create" | "Problem" | "Light" | "Title";
  sx?: SxProps;
}

export const Icon: React.FC<Props> = (props) => {
  const { iconName } = props;

  return <SvgIcon>{iconList[iconName]}</SvgIcon>;
};
