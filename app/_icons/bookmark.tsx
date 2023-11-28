import { IconProps } from "../_utils/interfaces/Interfaces";

const BookmarkIcon: React.FC<IconProps>  = (props) => {
  const { size, className, ...restProps } = props;
  
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="currentColor"
        width={size}
        height={size}
        {...restProps}
      >
        <path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z" />
      </svg>
    </span>
  );
};

export default BookmarkIcon;