
import { fetchImageUrls, fetchRestaurantById } from "@/app/_lib/data-fetching";
import ReviewForm from "./ReviewForm";
import RestaurantCard from "./RestaurantCard";

export default async function ReviewFormPage({
  params,
} : {
  params: { restaurantId: string }
}) {
  
  const restaurant = await fetchRestaurantById(params.restaurantId)
  const imageUrl = await fetchImageUrls([restaurant.photos[0].photo_reference]);

  return (
    <div className="flex flex-col items-center md:flex-row md:items-start gap-4 xl:gap-12 px-4">
      <section className="w-full xs:w-2/3 sm:w-1/2 md:w-1/3">
        <RestaurantCard restaurant={restaurant} imageUrl={imageUrl[0]} />
      </section>
      <section className="w-full md:w-2/3">
        <ReviewForm {...restaurant} />
      </section>
    </div>  
  );
};