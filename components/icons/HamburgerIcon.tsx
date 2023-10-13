import { IconProps } from "@/utils/Interfaces";

const HamburgerIcon = ({ color, fill, className, stroke }: IconProps) => {
  return (
    <span className="">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        color={color || ""}
        fill={fill || "black"}
        viewBox="0 0 448 512"
        strokeWidth={stroke || "1.5"}
        stroke="currentColor"
        className={className || "w-5 h-5"}
      >
        <path 
          d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
        />
      </svg>
    </span>
  );
};

export default HamburgerIcon;