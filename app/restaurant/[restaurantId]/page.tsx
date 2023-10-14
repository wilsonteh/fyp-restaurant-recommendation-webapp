import RestaurantDetail from "@/components/RestaurantDetail";
import AngleDown from "@/components/icons/angle-down";

export default function RestaurantDetailPage({
  params,
}: {
  params: { restaurantId: string }
}) {
  return (
    <main className="max-w-screen-xl mx-auto h-screen border-red-500">
      restaurant id: { params.restaurantId }  
      <RestaurantDetail />
      <AngleDown />

    </main>
  );
}
