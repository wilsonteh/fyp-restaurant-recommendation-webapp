"use client";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import ReviewItem from "./ReviewItem";

export default function ReviewList({ reviews } : { reviews: ReviewSchema[] }) {

  return (
    <div className="">
      <h1>Reviews (1,464)</h1>
      
      {/* Dropdown filter */}

      { reviews.map((review, i) => (
        <ReviewItem key={i} review={review} />
      ))}

    </div>
  );
};