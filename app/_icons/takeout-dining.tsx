import { IconProps } from "../_utils/interfaces/Interfaces";

const TakeoutDiningIcon: React.FC<IconProps> = (props) => {
  const { size, className, ...restProps } = props;

  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width={size}
        height={size}
        {...restProps}
      >
        <g>
          <rect fill="none" height="24" width="24" />
        </g>
        <g>
          <path
            d="M5.26,11h13.48l-0.67,9H5.93L5.26,11z M9.02,4h5.95L19,7.38l1.59-1.59L22,7.21 L19.21,10H4.79L2,7.21l1.41-1.41L5,7.38L9.02,4z"
            fill-rule="evenodd"
          />
        </g>
      </svg>
    </span>
  );
};

export default TakeoutDiningIcon;