import { IconProps } from "../_utils/interfaces/Interfaces";

const FilterIcon: React.FC<IconProps>  = (props) => {
  const { size, className, ...restProps } = props;
  
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        width={size}
        height={size}
        {...restProps}
      >
        <path d="M488 0H24C2.7 0-8 25.9 7.1 41L192 225.9V432c0 7.8 3.8 15.2 10.2 19.7l80 56C298 518.7 320 507.5 320 488V225.9l184.9-185C520 25.9 509.3 0 488 0z" />
      </svg>
    </span>
  );
};

export default FilterIcon;