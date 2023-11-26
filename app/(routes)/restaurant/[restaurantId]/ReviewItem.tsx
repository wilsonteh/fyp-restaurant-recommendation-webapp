"use client";
import { auth } from "@/app/_firebase/auth";
import { db } from "@/app/_firebase/firestore";
import { EllipsisV, ThumbsUp } from "@/app/_icons/Index";
import { starRatingStyles } from "@/app/_utils/constants";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import { Photo } from "@/app/_utils/interfaces/Interfaces";
import { getImageDimension } from "@/app/_utils/utils";
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
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Dimensions } from 'react-image-size';
import MultiRatingsPopover from "./MultiRatingsPopover";
import PhotoModal from "./PhotoModal";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";

export default function ReviewItem({
  reviewRef,
  review,
}: {
  reviewRef: QueryDocumentSnapshot;
  review: ReviewSchema;
}) {

  const { theme } = useTheme();
  const [user] = useAuthState(auth);
  const [likeCount, setLikeCount] = useState<number|null>(null);
  const [hasLiked, setHasLiked] = useState<boolean|null>(null);
  const [photoShown, setPhotoShown] = useState<Photo|null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const date = review.createdAt.toDate();
  const datetime = date.toLocaleString();

  const sec = review.createdAt.seconds;
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

  // when clicking on a review image
  const handleImageClick = async (imageUrl: string) => {
    onOpen()
    const dimension = await getImageDimension(imageUrl) as Dimensions;
    setPhotoShown({
      url: imageUrl, 
      width: dimension?.width, 
      height: dimension?.height
    })
  };

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
      <div className="user-panel flex justify-between items-center">
        <User
          as="button"
          isFocusable
          name={review.user.displayName}
          description={"xx written reviews"}
          avatarProps={{
            src: review.user.avatarUrl,
            size: "md",
            className: twMerge(
              'border-2',
              theme === 'dark' ? 'border-primary-400' : 'border-slate-300'
            )
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
              className="cursor-pointer rounded-md"
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
            className={twMerge(
              "rounded-full p-2", 
              theme === 'dark' ? 'hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200'
            )}
          >
            <ThumbsUp
              size={20}
              className={twMerge(
                theme === 'dark' && hasLiked ? 'text-primary-500'
              : theme === 'light' && hasLiked ? 'text-primary-700' : '', 
              )}
            />
          </button>
          <span> {likeCount} </span>
        </div>

        <div className="text-xs">
          <span>Written: {datetime} </span>
        </div>
      </div>

      <hr className={twMerge(
        'w-2/3 mx-auto',
        theme === 'dark' ? 'border-slate-700/70' : 'border-slate-300'
      )} />

    </div>
  );
}
