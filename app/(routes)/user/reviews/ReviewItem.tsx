import EllipsisV from "@/app/_icons/ellipsis-v";
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

  const { data: restaurant } = useSWRImmutable<Restaurant>(
    `/api/place-detail?placeId=${review.restaurantId}&fields=name,vicinity,photos,place_id`, 
    fetcher
  );

  // dependent data fetching 
  const { data: imageUrl } = useSWRImmutable(
    () => `/api/place-photo?photoRef=${restaurant?.photos[0].photo_reference}`, 
    fetcher
  );

  const [photoShown, setPhotoShown] = useState<Photo|null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { atmosphere, food, main, service, value } = review.rating
  
  const handleImageClick = async (imageUrl: string) => {
    onOpen()
    const dimension = await getImageDimension(imageUrl) as Dimensions;
    setPhotoShown({
      url: imageUrl, 
      width: dimension?.width, 
      height: dimension?.height
    })
  };
  
  return (
    <div className="flex flex-col gap-2 px-2 py-3 border-slate-300 border-1 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-sm"> {review.title} </h2>
        <button>
          <EllipsisV size={15} />
        </button>
      </div>

      <div className="flex gap-1">
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

      <p className="font-light text-xs">{review.comment}</p>

      {review.imageUrls.length > 0 && (
        <div className="review-images flex gap-4 mb-3">
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

      <div className="restaurant flex items-start gap-2 border-1 border-slate-300 rounded-md">
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
    </div>
  );
}
