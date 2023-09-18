
export default function RestaurantDetailPage({
  params,
}: {
  params: { restaurantId: string }
}) {
  return (
    <main className="max-w-screen-xl mx-auto h-screen border-red-500">
      restaurant { params.restaurantId } detail page 
    </main>
  );
}
