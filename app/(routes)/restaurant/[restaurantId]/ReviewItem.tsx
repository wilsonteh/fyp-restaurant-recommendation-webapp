"use client";
import EllipsisV from "@/app/_icons/ellipsis-v";
import ReviewStars from "@/app/_icons/ReviewStars";
import ThumbsUp from "@/app/_icons/thumbs-up";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import { User } from "@nextui-org/react";
import { QueryDocumentSnapshot } from "firebase/firestore";
import moment from "moment";
import Image from "next/image";

export default function ReviewItem({ 
  reviewRef, 
  review, 
}: { 
  reviewRef: QueryDocumentSnapshot, 
  review: ReviewSchema, 
}) {

  const sec = review.createdAt.seconds;
  const relativeTimestamp = moment.unix(sec).startOf("hour").fromNow();

  function handleLikeIncrement() {
    console.log("clicked");
    // get the review id to identify which review item is being clicked
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <User
          as="button"
          isFocusable
          name={review.user.displayName}
          description={"xx written reviews"}
          avatarProps={{
            src: review.user.avatarUrl,
            size: "md",
          }}
          classNames={{
            base: "px-2 py-1",
            name: "font-semibold",
          }}
        />
        <button>
          <EllipsisV />
        </button>
      </div>

      <div className="p-2 flex flex-col gap-3">
        <ReviewStars Nstar={review.rating} />

        <div className="">
          <h2 className="font-semibold"> {review.title} </h2>

          <p className="font-light text-justify text-sm">{review.comment}</p>
        </div>

        {/* <div className="">
          <Image
            src="https://via.placeholder.com/125x125"
            width={125}
            height={125}
            alt="review image"
          />
        </div> */}

        <div className="p-2 flex justify-between items-center">
          <div className="text-sm flex items-center gap-2">
            <button
              onClick={handleLikeIncrement}
              className="p-2 rounded-full hover:bg-slate-200"
            >
              <ThumbsUp />
            </button>
            <span> {review.likeCount} </span>
          </div>

          <div className="text-xs">
            <span>Written: {relativeTimestamp} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
