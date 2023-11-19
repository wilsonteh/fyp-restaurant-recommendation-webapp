import { Rating } from "@smastrom/react-rating";
import { starRatingStyles } from "../_utils/constants";

export default function StarRating({
  value,
  maxWidth = 180, 
  readOnly = true, 
  ...rest 
} : {
  value: number;
  maxWidth?: number;
  readOnly?: boolean;
}) {


  return (
    <Rating 
      value={value}
      style={{ maxWidth }}
      itemStyles={starRatingStyles}
      readOnly={readOnly}
      {...rest}
    />
  );
}
 
