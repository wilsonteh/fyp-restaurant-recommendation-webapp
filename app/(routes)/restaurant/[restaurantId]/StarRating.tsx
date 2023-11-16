"use client";
import { starRatingStyles } from "@/app/_utils/constants";
import { Rating } from "@smastrom/react-rating";

export default function StarRating({ value }: { value: number }) {
  return (
    <Rating
    value={value}
    style={{ maxWidth: 150 }}
    itemStyles={starRatingStyles}
    readOnly
  /> 
  )
};