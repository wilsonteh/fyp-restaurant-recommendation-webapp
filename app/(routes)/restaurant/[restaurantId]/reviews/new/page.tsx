import { fetchImageUrls, fetchRestaurantById, fetchRestaurants } from "@/app/_lib/data-fetching";
import RestaurantCard from "./RestaurantCard";
import ReviewForm from "./ReviewForm";

export default async function ReviewFormPage({
  params,
} : {
  params: { restaurantId: string }
}) {
  
  const restaurant = await fetchRestaurantById(params.restaurantId)
  const imageUrl = await fetchImageUrls([restaurant.photos[0].photo_reference]);

  return (
    <div className="flex gap-12">
      <section className="w-1/3">
        <RestaurantCard restaurant={restaurant} imageUrl={imageUrl[0]} />
      </section>
      <section className="w-2/3">
        <ReviewForm {...restaurant} />
      </section>
    </div>  
  );
}