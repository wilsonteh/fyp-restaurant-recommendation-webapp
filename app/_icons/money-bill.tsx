import { IconProps } from "../_utils/interfaces/Interfaces";

const MoneyBillIcon: React.FC<IconProps>  = (props) => {
  const { size, className, ...restProps } = props;
  
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        fill="currentColor"
        width={size}
        height={size}
        {...restProps}
      >
        <path d="M608 64H32C14.3 64 0 78.3 0 96v320c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zM48 400v-64c35.4 0 64 28.7 64 64H48zm0-224v-64h64c0 35.4-28.7 64-64 64zm272 176c-44.2 0-80-43-80-96 0-53 35.8-96 80-96s80 43 80 96c0 53-35.8 96-80 96zm272 48h-64c0-35.4 28.7-64 64-64v64zm0-224c-35.4 0-64-28.7-64-64h64v64z" />
      </svg>
    </span>
  );
};

export default MoneyBillIcon;