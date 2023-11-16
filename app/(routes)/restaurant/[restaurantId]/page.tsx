import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import RestaurantDetail from "./RestaurantDetail";
import { fetchRestaurantById } from "@/app/_lib/data-fetching";

export default async function RestaurantDetailPage({
  params,
}: {
  params: { restaurantId: string }
}) {

  const restaurant = await fetchRestaurantById(params.restaurantId) as RestaurantDetailInterface;

  return (
    <RestaurantDetail restaurant={restaurant} />
  );
}
