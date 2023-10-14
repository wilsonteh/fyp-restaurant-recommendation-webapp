import Heart from "@/components/icons/heart";
import Pen from "@/components/icons/pen";
import User from "@/components/icons/user";
import Gear from "@/components/icons/gear";
import Utensils from "@/components/icons/utensils";

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