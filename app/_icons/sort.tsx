import { IconProps } from "../_utils/interfaces/Interfaces";

const SortIcon: React.FC<IconProps>  = (props) => {
  const { size, className, ...restProps } = props;
  
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        fill="currentColor"
        width={size}
        height={size}
        {...restProps}
      >
        <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z" />
      </svg>
    </span>
  );
};

export default SortIcon;