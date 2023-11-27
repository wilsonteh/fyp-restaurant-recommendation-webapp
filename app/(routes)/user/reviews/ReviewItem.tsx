import { fetcher } from "@/app/_lib/swr/fetcher";
import { starRatingStyles } from "@/app/_utils/constants";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import { Photo } from "@/app/_utils/interfaces/Interfaces";
import { getImageDimension } from "@/app/_utils/utils";
import { useDisclosure } from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dimensions } from "react-image-size";
import useSWRImmutable from "swr/immutable";
import MultiRatingsPopover from "../../restaurant/[restaurantId]/MultiRatingsPopover";
import PhotoModal from "../../restaurant/[restaurantId]/PhotoModal";
import { EllipsisV } from "@/app/_icons/Index";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

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
  review, 
} : { 
  review: ReviewSchema; 
}) {  

  const { theme } = useTheme();
  const date = review.createdAt.toDate();
  const datetime = date.toLocaleString();

  const { data: restaurant } = useSWRImmutable<Restaurant>(
    `/api/place-detail?placeId=${review.restaurantId}&fields=name,vicinity,photos,place_id`, 
    fetcher
  );

  // dependent data fetching 
  const { data: imageUrl, isLoading: isImgLoading } = useSWRImmutable(
    () => `/api/place-photo?photoRef=${restaurant?.photos[0].photo_reference}`, 
    fetcher
  );

  const { atmosphere, food, main, service, value } = review.rating
  
  return (
    <div className={twMerge(
      'flex flex-col gap-2 px-2 py-3 border-1 rounded-lg', 
      theme === 'dark' ? 'border-slate-700' : 'border-slate-300'
    )}>
      <div className="title-row flex justify-between items-center">
        <h2 className="font-semibold text-sm"> {review.title} </h2>
        <button>
          <EllipsisV size={15} />
        </button>
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

      <p className="comment font-light text-xs">{review.comment}</p>

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

    </div>
  );
}
