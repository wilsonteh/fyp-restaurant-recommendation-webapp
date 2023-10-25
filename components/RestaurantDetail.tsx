import { RestaurantDetailInterface } from "@/utils/PlaceDetailInterface";
import PhoneAlt from "./icons/phone-alt";
import Globe from "./icons/globe";
import RestaurantTab from "./RestaurantTab";
import Image from "next/image";
import RestaurantPhotoGrid from "./RestaurantPhotoGrid";
import ReviewStars from "./icons/ReviewStars";
import RestaurantStars from "./icons/RestaurantStars";
import Link from "next/link";
import { getFractionalPart, thousandSeparator } from "@/utils/utils";

async function fetchImageUrls(photoRefs: String[]) {

  const imageUrls = await Promise.all(photoRefs.map(async (photoRef) => {
    const res = await fetch(`${process.env.HOST_URL}/api/place-photo?photoRef=${photoRef}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch photo of ref: ${photoRef}`);
    }
    return res.json();
  })) as string[];

  return imageUrls;
}

export default async function RestaurantDetail ({ 
  restaurant,  
}: { 
  restaurant: RestaurantDetailInterface 
}) {

  const photoRefs = restaurant.photos.map(photo => photo.photo_reference);
  const imageUrls = await fetchImageUrls(photoRefs);

  const imageDimensions = restaurant.photos.map((photo, i) => ({
    width: photo.width,
    height: photo.height,
  }))

  const photos = imageDimensions.map((dimension, i) =>({
    ...dimension, url: imageUrls[i]
  }))

  return (
    <div className="w-full flex flex-col gap-5">
      <section className="flex flex-col gap-2 py-2">
        <h1 className="text-lg font-semibold text-center">
          { restaurant.name }
        </h1>

        <div className="flex justify-center gap-3">
          <span> { restaurant.rating } / 5</span>
          { getFractionalPart(restaurant.rating) >= 5 ? (
            <RestaurantStars NthStar={Math.ceil(restaurant.rating)} />
            ): (
            <ReviewStars Nstar={Math.floor(restaurant.rating)} />
          )}
          <span> ({ thousandSeparator(restaurant.user_ratings_total) }) </span>
        </div>
        
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <PhoneAlt className="w-4 h-4" />
            <Link href={`tel:+60162034216`} className="underline"> 
              { restaurant.formatted_phone_number } 
            </Link>
          </div>

          { restaurant.website && (
            <div className="flex items-center gap-2">
              <>
                <Globe className="w-4 h-4" />
                <Link href={restaurant.website} className="underline">
                  website
                </Link>
              </> 
            </div> )} 
        </div>
      </section>

      <RestaurantPhotoGrid photos={photos} />

      <section className="w-[800px] mx-auto">
        <RestaurantTab restaurant={restaurant} />
      </section>

    </div>
  );
};

