import { fetchDocsWithCondition } from "@/app/_firebase/firestore";
import RestaurantStars from "@/app/_icons/RestaurantStars";
import ReviewStars from "@/app/_icons/ReviewStars";
import Globe from "@/app/_icons/globe";
import PhoneAlt from "@/app/_icons/phone-alt";
import { fetchImageUrls } from "@/app/_lib/data-fetching";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import { getFractionalPart, thousandSeparator } from "@/app/_utils/utils";
import { where } from "firebase/firestore";
import Link from "next/link";
import RestaurantPhotoGrid from "./RestaurantPhotoGrid";
import RestaurantTab from "./RestaurantTab";
import { Rating } from "@smastrom/react-rating";
import { starRatingStyles } from "@/app/_utils/constants";
import StarRating from "./StarRating";

// fetch all reviews for that particular restaurant 
async function fetchReviews(restaurantId: string) {
  const query = [
    where('restaurantId', '==', restaurantId),
  ]
  const reviews = await fetchDocsWithCondition('reviews', query)
  return reviews as ReviewSchema[];
};

export default async function RestaurantDetail ({ 
  restaurant,  
}: { 
  restaurant: RestaurantDetailInterface 
}) {
  // *NOTE - data fetching on the server //
  const photoRefs = restaurant.photos.map(photo => photo.photo_reference);
  const imageUrls = await fetchImageUrls(photoRefs);
  // const reviews = await fetchReviews(restaurant.place_id);
  
  const imageDimensions = restaurant.photos.map((photo, i) => ({
    width: photo.width,
    height: photo.height,
  }))

  const restaurantPhotos = imageDimensions.map((dimension, i) =>({
    ...dimension, url: imageUrls[i]
  }))

  return (
    <div className="w-full flex flex-col gap-5">
      <section className="flex flex-col gap-2 py-2">
        <h1 className="text-lg font-semibold text-center">
          { restaurant.name }
        </h1>

        <div className="flex justify-center items-center gap-3">
          <span> { restaurant.rating } / 5</span>
          <StarRating value={restaurant.rating} />
          <span> ({ thousandSeparator(restaurant.user_ratings_total) }) </span>
        </div>
        
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <PhoneAlt size={15} className="w-4 h-4" />
            <Link href={`tel:+60162034216`} className="underline"> 
              { restaurant.formatted_phone_number } 
            </Link>
          </div>

          { restaurant.website && (
            <div className="flex items-center gap-2">
              <>
                <Globe size={15} className="w-4 h-4" />
                <Link href={restaurant.website} className="underline">
                  website
                </Link>
              </> 
            </div> )} 
        </div>
      </section>

      <RestaurantPhotoGrid photos={restaurantPhotos} />

      <section className="w-[800px] mx-auto">
        <RestaurantTab restaurant={restaurant} />
      </section>

    </div>
  );
};

