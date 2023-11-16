import User from "../_icons/user";
import Gear from "../_icons/gear";
import Heart from "../_icons/heart";
import Pen from "../_icons/pen";
import Utensils from "../_icons/utensils";
import { ItemStyles, Star } from "@smastrom/react-rating";

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
    icon: <User size={15} /> 
  }, 
  {
    name: 'settings',
    href: '/user/settings',
    icon: <Gear size={15} /> 
  }, 
  {
    name: 'customize preferences', 
    href: '/user/preferences', 
    icon: <Utensils size={15} />
  },
  {
    name: 'favourited restaurants', 
    href: '/user/favourites', 
    icon: <Heart size={15} />
  },
  {
    name: 'my reviews', 
    href: '/user/reviews',
    icon: <Pen size={15} />
  },
];

export const starRatingStyles: ItemStyles = {
  itemShapes: Star, 
  itemStrokeWidth: 2, 
  activeFillColor: ['#dc2626', '#f97316', '#facc15', '#a3e635', '#22c55e'],
  activeStrokeColor: ['#c42727', '#e9680c', '#eabd0b', '#95db24', '#23a954'],
  inactiveFillColor: 'white',
  inactiveStrokeColor: '#c1c1c1',
}