import { IconProps } from "../_utils/interfaces/Interfaces";

const Bars: React.FC<IconProps>  = (props) => {
  const { size, className, ...restProps } = props;
  
  return (
    <span className={className}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 448 512"
        fill="currentColor"
        width={size}
        height={size}
        {...restProps}
      >
        <path 
          d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
        />
      </svg>
    </span>
  );
};

export default Bars;