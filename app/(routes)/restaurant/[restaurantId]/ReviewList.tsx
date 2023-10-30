import { Review } from "@/app/_utils/interfaces/Interfaces";
import ReviewItem from "./ReviewItem";

export default function ReviewList({ reviews }: { reviews: Review[] }) {

  return (
    <div className="">
      <h1>Reviews (1,464)</h1>
      {/* Dropdown filter */}

      { reviews.map((review, i) => (
        <ReviewItem key={i} />
      ))}

    </div>
  );
};