import RestaurantList from "./RestaurantList";

export default async function HomePage() {

  return (
    <main className="max-w-[1300px] mx-auto border-red-500">
      <RestaurantList />  
    </main>
  )
}