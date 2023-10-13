import { IconProps } from "@/utils/Interfaces";

interface DoorIconProps extends IconProps {
  open: boolean;
}

const DoorIcon = ({ color, fill, className, stroke, open }: DoorIconProps) => {
  return (
    <span className="">
      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          color={color || ""}
          fill={fill || "black"}
          viewBox="0 0 640 512"
          strokeWidth={stroke || "1.5"}
          stroke="currentColor"
          className={className || "w-5 h-5"}
        >
          <path d="M624 448h-80V113.45C544 86.19 522.47 64 496 64H384v64h96v384h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM312.24 1.01l-192 49.74C105.99 54.44 96 67.7 96 82.92V448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h336V33.18c0-21.58-19.56-37.41-39.76-32.17zM264 288c-13.25 0-24-14.33-24-32s10.75-32 24-32 24 14.33 24 32-10.75 32-24 32z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          color={color || ""}
          fill={fill || "black"}
          viewBox="0 0 640 512"
          strokeWidth={stroke || "1.5"}
          stroke="currentColor"
          className={className || "w-5 h-5"}
        >
          <path d="M624 448H512V50.8C512 22.78 490.47 0 464 0H175.99c-26.47 0-48 22.78-48 50.8V448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM415.99 288c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32c.01 17.67-14.32 32-32 32z" />
        </svg>
      )}
    </span>
  );
};

export default DoorIcon;
