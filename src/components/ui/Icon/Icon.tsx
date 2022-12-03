import { ReactComponent as Home } from "assets/icons/home.svg";
import { ReactComponent as Match_find } from "assets/icons/match_find_icon.svg";
import { ReactComponent as Mode } from "assets/icons/mode_icon.svg";

const icons = { Home, Match_find, Mode };

type Name = keyof typeof icons;

type Props = {
  name: Name;
  size?: number;
  className?: string;
};

const DEFAULT_SIZE = 24;

export function Icon({ name, size = DEFAULT_SIZE, className }: Props) {
  const SvgComponent = icons[name];

  return (
    <SvgComponent
      style={{ height: `${size}px`, width: `${size}px` }}
      className={className}
    />
  );
}
