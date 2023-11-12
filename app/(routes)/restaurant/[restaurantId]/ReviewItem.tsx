"use client";
import { auth } from "@/app/_firebase/auth";
import { db, updateDocument } from "@/app/_firebase/firestore";
import EllipsisV from "@/app/_icons/ellipsis-v";
import ReviewStars from "@/app/_icons/ReviewStars";
import ThumbsUp from "@/app/_icons/thumbs-up";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import { Button, Tooltip, User } from "@nextui-org/react";
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentData,
  increment,
  onSnapshot,
  QueryDocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import MultiRatingsPopover from "./MultiRatingsPopover";
import { ItemStyles, Rating, Star } from "@smastrom/react-rating";

export default function ReviewItem({
  reviewRef,
  review,
}: {
  reviewRef: QueryDocumentSnapshot;
  review: ReviewSchema;
}) {
  const [user] = useAuthState(auth);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState<boolean | null>(null);

  const sec = review.createdAt.seconds;
  const relativeTimestamp = moment.unix(sec).startOf("hour").fromNow();

  const starRatingStyles: ItemStyles = {
    itemShapes: Star, 
    itemStrokeWidth: 2, 
    activeFillColor: ['#dc2626', '#f97316', '#facc15', '#a3e635', '#22c55e'],
    activeStrokeColor: ['#c42727', '#e9680c', '#eabd0b', '#95db24', '#23a954'],
    inactiveFillColor: 'white',
    inactiveStrokeColor: '#c1c1c1',
  }

  const handleLikeIncrement = async () => {
    // ensure user is authenticated
    if (!user) {
      alert("You must be signed in to like a review.");
      return;
    }

    const reviewDocRef = doc(db, "reviews", reviewRef.id);
    if (hasLiked) {
      await updateDoc(reviewDocRef, {
        "likes.count": increment(-1),
        "likes.likedBy": arrayRemove(user.uid),
      });
    } else {
      await updateDoc(reviewDocRef, {
        "likes.count": increment(1),
        "likes.likedBy": arrayUnion(user.uid),
      });
    }
  };

  useEffect(() => {
    const reviewDocRef = doc(db, "reviews", reviewRef.id);
    const unsub = onSnapshot(reviewDocRef, (doc) => {
      const review = doc.data() as ReviewSchema;
      setLikeCount(review.likes.count);
      if (user) setHasLiked(review.likes.likedBy.includes(user.uid));
    });

    return unsub;
    
  }, [likeCount, reviewRef.id, user]);

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
          <EllipsisV size={15} />
        </button>
      </div>

      <div className="p-2 flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <Rating
            value={review.rating.main}
            style={{ maxWidth: 130 }}
            itemStyles={starRatingStyles}
            readOnly
          />

          <MultiRatingsPopover
            rating={review.rating}
            ratingStyles={starRatingStyles}
          />
        </div>

        <div className="">
          <h2 className="font-semibold"> {review.title} </h2>

          <p className="font-light text-justify text-sm">{review.comment}</p>
        </div>

        <div className="flex gap-4">
          {review.imageUrls?.map((url) => (
            <Image
              key={url}
              src={url}
              width={125}
              height={125}
              alt="review image"
            />
          ))}
        </div>

        <div className="p-2 flex justify-between items-center">
          <div className="text-sm flex items-center gap-2">
            <button
              onClick={handleLikeIncrement}
              className="p-2 rounded-full hover:bg-slate-200"
            >
              <ThumbsUp
                size={20}
                className={`${hasLiked ? "text-primary-600" : ""}`}
              />
            </button>
            <span> {likeCount} </span>
          </div>

          <div className="text-xs">
            <span>Written: {relativeTimestamp} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
