import { BelIcon } from "../icons/BelIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { UserIcon } from "../icons/UserIcon";

export const navigations = [
  {
    id: 1,
    name: "Home",
    href: "/",
    Icon: <HomeIcon />,
  },
  {
    id: 4,
    name: "Create",
    href: "/create",
    Icon: <PlusIcon />,
  },
  {
    id: 2,
    name: "Notification",
    href: "/notification",
    Icon: <BelIcon />,
  },
  {
    id: 3,
    name: "Profile",
    href: "/profile",
    Icon: <UserIcon />,
  },
];
