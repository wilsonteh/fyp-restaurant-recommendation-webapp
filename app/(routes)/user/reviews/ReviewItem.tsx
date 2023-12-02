"use client";
import { fetcher } from "@/app/_lib/swr/fetcher";
import { starRatingStyles } from "@/app/_utils/constants";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import { Photo } from "@/app/_utils/interfaces/Interfaces";
import { getImageDimension } from "@/app/_utils/utils";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dimensions } from "react-image-size";
import useSWRImmutable from "swr/immutable";
import MultiRatingsPopover from "../../restaurant/[restaurantId]/MultiRatingsPopover";
import PhotoModal from "../../restaurant/[restaurantId]/PhotoModal";
import { TrashAlt } from "@/app/_icons/Index";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/_firebase/firestore";
import TrashAltIcon from "@/app/_icons/trash-alt";

interface Restaurant {
  name: string; 
  vicnity: string; 
  place_id: string;
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[], 
}

export default function ReviewItem({ 
  id,
  review, 
} : { 
  id: string;
  review: ReviewSchema; 
}) {  

  const { theme } = useTheme();
  const date = review.createdAt.toDate();
  const datetime = date.toLocaleString();
  const { atmosphere, food, main, service, value } = review.rating

  const [photoShown, setPhotoShown] = useState<Photo|null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: restaurant } = useSWRImmutable<Restaurant>(
    `/api/place-detail?placeId=${review.restaurantId}&fields=name,vicinity,photos,place_id`, 
    fetcher
  );

  // dependent data fetching 
  const { data: imageUrl, isLoading: isImgLoading } = useSWRImmutable(
    () => `/api/place-photo?photoRef=${restaurant?.photos[0].photo_reference}`, 
    fetcher
  );

  const handleImageClick = async (imageUrl: string) => {
    onOpen()
    const dimension = await getImageDimension(imageUrl) as Dimensions;
    setPhotoShown({
      url: imageUrl, 
      width: dimension?.width, 
      height: dimension?.height
    })
  };

  const deleteReview = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const reviewRef = doc(db, "reviews", id)
      await deleteDoc(reviewRef);
    } catch (e) {
      console.error(`Error deleting review of id ${id}`)
    }
  };
  
  return (
    <div className={twMerge(
      'flex flex-col gap-2 px-4 py-3 border-1 rounded-lg hover:scale-105', 
      theme === 'dark' ? 'border-slate-700' : 'border-slate-300',
    )}>
      <div className="title-row flex justify-between items-center">
        <h2 className="font-semibold text-sm"> {review.title} </h2>
      </div>

      <div className="rating-row flex gap-1">
        <Rating
          value={review?.rating.main}
          style={{ maxWidth: 130 }}
          itemStyles={starRatingStyles}
          readOnly
        />

        {[atmosphere, food, service, value].every((x) => x !== 0) && (
          <MultiRatingsPopover
            rating={review.rating}
            ratingStyles={starRatingStyles}
          />
        )}
      </div>

      <p className="comment font-light text-xs text-justify">{review.comment}</p>

      {review.imageUrls.length > 0 && (
        <div className="review-images grid grid-cols-3 gap-4 mb-3">
          {review.imageUrls?.map((url) => (
            <Image
              key={url}
              src={url}
              width={100}
              height={100}
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

      <div className={twMerge(
        'box-wrapper restaurant flex items-start gap-2 border-1 border-slate-300 rounded-lg', 
        theme === 'dark' ? 'border-slate-700' : 'border-slate-300'
      )}>
        <div className="min-w-[100px] min-h-[100px] relative overflow-hidden">
          <Image
            src={imageUrl || "https://via.placeholder.com/100x100"}
            alt={restaurant?.name || "image"}
            className="rounded-md"
            fill={true}
            objectFit="cover"
          />
        </div>
        
        <div className="flex flex-col py-2">
          <Link
            href={`/restaurant/${restaurant?.place_id}`}
            className="text-xs font-medium"
          >
            { restaurant?.name }
          </Link>
        </div>
      </div>

      <p className="text-xs font-light"> Written { datetime } </p>
      
      <div className="button-row flex justify-end items-center gap-2">
        <Button
          color="danger"
          size="sm"
          isIconOnly
          variant={theme === 'dark' ? 'flat' : 'solid'}
          onClick={() => deleteReview(id)}
        >
          <TrashAltIcon size={15} />
        </Button>
      </div>

    </div>
  );
};