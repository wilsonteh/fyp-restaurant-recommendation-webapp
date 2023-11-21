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
  {
    item: "search a restaurant",
    href: "/search",
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
};

export const priceScales = [
  {
    label: "budget friendly",
    number: 0,
    bgColor: "#22c55e",
    color: "#fff",
    tooltip: "Wallet-friendly options for a tight budget",
  },
  {
    label: "affordable",
    number: 1,
    bgColor: "#a3e635",
    color: "#000",
    tooltip: "Reasonably priced for a satisfying experience",
  },
  {
    label: "mid-range",
    number: 2,
    bgColor: "#facc15",
    color: "#000",
    tooltip: "Moderate prices for a diverse dining experience",
  },
  {
    label: "premium",
    number: 3,
    bgColor: "#f97316",
    color: "#fff",
    tooltip: "Higher-end dining with superior quality",
  },
  {
    label: "luxury",
    number: 4,
    bgColor: "#dc2626",
    color: "#fff",
    tooltip: "Exquisite, upscale dining experience",
  },
];