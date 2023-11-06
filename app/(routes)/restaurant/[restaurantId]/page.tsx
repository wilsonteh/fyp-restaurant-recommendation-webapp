import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import RestaurantDetail from "./RestaurantDetail";

async function fetchRestaurant(placeId: string) {
  const res = await fetch(`${process.env.HOST_URL}/api/place-detail?placeId=${placeId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch restaurant of id: ${placeId}`);
  }
  return res.json();
}

export default async function RestaurantDetailPage({
  params,
}: {
  params: { restaurantId: string }
}) {

  const restaurant = await fetchRestaurant(params.restaurantId) as RestaurantDetailInterface;

  return (
    <main className="max-w-screen-xl mx-auto h-screen border-red-500">
      <RestaurantDetail restaurant={restaurant} />
    </main>
  );
}
