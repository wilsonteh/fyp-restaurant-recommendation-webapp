"use client";
import { auth } from "@/app/_firebase/auth";
import { db } from "@/app/_firebase/firestore";
import EllipsisV from "@/app/_icons/ellipsis-v";
import ThumbsUp from "@/app/_icons/thumbs-up";
import { starRatingStyles } from "@/app/_utils/constants";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import { Photo } from "@/app/_utils/interfaces/Interfaces";
import { User, useDisclosure } from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import {
  QueryDocumentSnapshot,
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Dimensions, getImageSize } from 'react-image-size';
import MultiRatingsPopover from "./MultiRatingsPopover";
import PhotoModal from "./PhotoModal";

export default function ReviewItem({
  reviewRef,
  review,
}: {
  reviewRef: QueryDocumentSnapshot;
  review: ReviewSchema;
}) {

  const [user] = useAuthState(auth);
  const [likeCount, setLikeCount] = useState<number|null>(null);
  const [hasLiked, setHasLiked] = useState<boolean|null>(null);
  const [photoShown, setPhotoShown] = useState<Photo|null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const date = review.createdAt.toDate();
  const datetime = date.toLocaleString();

  const sec = review.createdAt.seconds;
  const relativeTimestamp = moment.unix(sec).startOf("hour").fromNow();
  const { atmosphere, food, main, service, value } = review.rating

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

  const fetchImageDimension = async (imageUrl: string) => {
    try {
      const dimensions = await getImageSize(imageUrl);
      return dimensions

    } catch (e) {
      console.error("Error fetching image dimension", e);
    }
  }

  // when clicking on a review image
  const handleImageClick = async (imageUrl: string) => {
    onOpen()
    const dimension = await fetchImageDimension(imageUrl) as Dimensions;
    setPhotoShown({
      url: imageUrl, 
      width: dimension?.width, 
      height: dimension?.height
    })

  }

  // effect for liking reviews  
  useEffect(() => {
    const reviewDocRef = doc(db, "reviews", reviewRef.id);
    const unsub = onSnapshot(reviewDocRef, (doc) => {
      const review = doc.data() as ReviewSchema;
      setLikeCount(review.likes.count);
      if (user) setHasLiked(review.likes.likedBy.includes(user.uid));
    });

    return unsub;
    
  }, [reviewRef.id, user]);

  return (
    <div className="flex flex-col gap-2 px-2 py-3">
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

      <div className="flex items-center gap-4">
        <Rating
          value={review.rating.main}
          style={{ maxWidth: 130 }}
          itemStyles={starRatingStyles}
          readOnly
        />
      
        { [atmosphere, food, service, value].every(x => x !== 0) && (
          <MultiRatingsPopover
            rating={review.rating}
            ratingStyles={starRatingStyles}
          />
        )}
      </div>

      <div className="">
        <h2 className="font-semibold"> {review.title} </h2>
        <p className="font-light text-justify text-sm">{review.comment}</p>
      </div>
      
      { review.imageUrls.length > 0 && (
        <div className="flex gap-4">
          {review.imageUrls?.map((url) => (
            <Image
              key={url}
              src={url}
              width={125}
              height={125}
              className="cursor-pointer"
              alt="review image"
              onClick={() => handleImageClick(url)}
            />
          ))}

          {photoShown && (
            <PhotoModal
              photo={photoShown}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          )}
        </div>
      )}

      <div className="flex justify-between items-center my-2 px-1">
        <div className="text-sm flex items-center gap-2">
          <button
            onClick={handleLikeIncrement}
            className="rounded-full hover:bg-slate-200"
          >
            <ThumbsUp
              size={20}
              className={`${hasLiked ? "text-primary-600" : ""}`}
            />
          </button>
          <span> {likeCount} </span>
        </div>

        <div className="text-xs">
          <span>Written: {datetime} </span>
        </div>
      </div>

      <hr className="border-slate-300" />

    </div>
  );
}
