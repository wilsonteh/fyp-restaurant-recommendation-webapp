import RestaurantDetail from "@/components/RestaurantDetail";

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

  const restaurant = await fetchRestaurant(params.restaurantId);
  console.log("🚀 ~ file: page.tsx:20 ~ restaurant:", restaurant)

  return (
    <main className="max-w-screen-xl mx-auto h-screen border-red-500">
      restaurant id: { params.restaurantId }  
      <RestaurantDetail />
    </main>
  );
}
