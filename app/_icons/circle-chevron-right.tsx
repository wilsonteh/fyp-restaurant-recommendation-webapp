import { IconProps } from "../_utils/interfaces/Interfaces";

const CircleChevronRight: React.FC<IconProps> = (props) => {
  const { size, className, ...restProps } = props;

  return (
    <span className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        width={size}
        height={size}
        {...restProps}
      >
        <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
      </svg>
    </span>
  );
};

export default CircleChevronRight;
