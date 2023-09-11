import HeartIcon from "@/components/icons/HeartIcon";
import PenIcon from "@/components/icons/PenIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import SettingIcon from "@/components/icons/SettingIcon";
import SignoutIcon from "@/components/icons/SignoutIcon";
import UtensilsIcon from "@/components/icons/UtensilsIcon";

export const navbarItems = [
  {
    item: "home",
    href: "/",
  },
  {
    item: "explore",
    href: "/explore",
  },
];

export const profileDropdownItems = [
  {
    name: 'profile', 
    href: '/profile',
    icon: <ProfileIcon className="w-4 h-4" /> 
  }, 
  {
    name: 'settings',
    href: '/settings',
    icon: <SettingIcon className="w-4 h-4" /> 
  }, 
  {
    name: 'customize preferences', 
    href: '/customize', 
    icon: <UtensilsIcon className="w-4 h-4" />
  },
  {
    name: 'favourited restaurants', 
    href: '/favourites', 
    icon: <HeartIcon className="w-4 h-4" />
  },
  {
    name: 'my reviews', 
    href: '/reviews',
    icon: <PenIcon className="w-4 h-4" />
  },
  // {
  //   name: 'sign out', 
  //   href: '',
  //   icon: <SignoutIcon className="w-4 h-4" />
  // },
];