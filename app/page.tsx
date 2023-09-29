import RestaurantList from "@/components/RestaurantList";

export default async function HomePage() {

  return (
    <main className="max-w-screen-xl mx-auto h-screen border-red-500">
      <RestaurantList />  
    </main>
  )
}