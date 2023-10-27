import { IconProps } from "../_utils/Interfaces";

const EllipsisV = ({ color, fill, className, stroke }: IconProps) => {
  return (
    <span className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        color={color || ""}
        fill={fill || "currentColor"}
        viewBox="0 0 192 512"
        strokeWidth={stroke || "1.5"}
        stroke="currentColor"
        className={className || "w-5 h-5"}
      >
        <path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" />
      </svg>
    </span>
  );
};

export default EllipsisV;
