import User from "../_icons/user";
import Gear from "../_icons/gear";
import Heart from "../_icons/heart";
import Pen from "../_icons/pen";
import Utensils from "../_icons/utensils";

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
    icon: <User className="w-4 h-4" /> 
  }, 
  {
    name: 'settings',
    href: '/user/settings',
    icon: <Gear className="w-4 h-4" /> 
  }, 
  {
    name: 'customize preferences', 
    href: '/user/preferences', 
    icon: <Utensils className="w-4 h-4" />
  },
  {
    name: 'favourited restaurants', 
    href: '/user/favourites', 
    icon: <Heart className="w-4 h-4" />
  },
  {
    name: 'my reviews', 
    href: '/user/reviews',
    icon: <Pen className="w-4 h-4" />
  },
];