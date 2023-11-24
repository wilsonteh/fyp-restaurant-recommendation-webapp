import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import { fetchDistanceInfo, fetchImageUrls, fetchRestaurantById } from "@/app/_lib/data-fetching";
import { Globe, PhoneAlt } from "@/app/_icons/Index";
import { thousandSeparator } from "@/app/_utils/utils";
import Link from "next/link";
import RestaurantPhotoGrid from "./RestaurantPhotoGrid";
import RestaurantTab from "./RestaurantTab";
import StarRating from "./StarRating";

export default async function RestaurantDetailPage({
  params,
}: {
  params: { restaurantId: string }
}) {

  const restaurant = await fetchRestaurantById(params.restaurantId) as RestaurantDetailInterface;
  const photoRefs = restaurant.photos.map(photo => photo.photo_reference);
  const urls = await fetchImageUrls(photoRefs);
  const imageUrls = urls.map(url => url.imageUrl || url);
  
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
        <h1 className="text-2xl font-semibold text-center">
          { restaurant.name }
        </h1>

        <div className="flex justify-center items-center gap-3">
          <span> { restaurant.rating } / 5</span>
          <StarRating value={restaurant.rating} />
          <span> ({ thousandSeparator(restaurant.user_ratings_total) }) </span>
        </div>
        
        <div className="flex justify-center items-center gap-4">
          { restaurant.formatted_phone_number && (
            <div className="flex items-center gap-2">
              <PhoneAlt size={15} className="w-4 h-4" />
              <Link href={`tel:+60162034216`} className="underline"> 
                { restaurant.formatted_phone_number } 
              </Link>
            </div>
          )}

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
}
