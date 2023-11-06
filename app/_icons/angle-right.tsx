import { IconProps } from "../_utils/interfaces/Interfaces";

const AngleRight: React.FC<IconProps> = (props) => {
  const { size, className, ...restProps } = props;
  
  return (
    <span className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        fill="currentColor"
        width={size}
        height={size}
        {...restProps}
      >
        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
      </svg>
    </span>
  );
};

export default AngleRight;
