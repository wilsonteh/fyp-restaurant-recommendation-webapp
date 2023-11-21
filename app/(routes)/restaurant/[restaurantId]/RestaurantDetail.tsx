import Globe from "@/app/_icons/globe";
import PhoneAlt from "@/app/_icons/phone-alt";
import { fetchImageUrls } from "@/app/_lib/data-fetching";
import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import { thousandSeparator } from "@/app/_utils/utils";
import Link from "next/link";
import RestaurantPhotoGrid from "./RestaurantPhotoGrid";
import RestaurantTab from "./RestaurantTab";
import StarRating from "./StarRating";

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

