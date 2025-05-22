import { ICON_NAMES } from "./config";

export const Icons = ({ name = "" }) => {
  const CustomIcon = ICON_NAMES[name];

  if (!CustomIcon) {
    return null;
  }
  return <CustomIcon />;
};