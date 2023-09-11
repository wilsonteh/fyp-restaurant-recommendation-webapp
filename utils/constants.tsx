import HeartIcon from "@/components/icons/HeartIcon";
import PenIcon from "@/components/icons/PenIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import SettingIcon from "@/components/icons/SettingIcon";
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
    href: '/user/profile',
    icon: <ProfileIcon className="w-4 h-4" /> 
  }, 
  {
    name: 'settings',
    href: '/user/settings',
    icon: <SettingIcon className="w-4 h-4" /> 
  }, 
  {
    name: 'customize preferences', 
    href: '/user/preferences', 
    icon: <UtensilsIcon className="w-4 h-4" />
  },
  {
    name: 'favourited restaurants', 
    href: '/user/favourites', 
    icon: <HeartIcon className="w-4 h-4" />
  },
  {
    name: 'my reviews', 
    href: '/user/reviews',
    icon: <PenIcon className="w-4 h-4" />
  },
];